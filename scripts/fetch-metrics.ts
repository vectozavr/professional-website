import { mkdir, readFile, rename, writeFile } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

import { profile } from '../src/data/profile';

interface RepositoryMetric {
  repository: string;
  stars: number;
  forks: number;
  language: string | null;
  updatedAt: string;
  url: string;
}

interface GitHubAccountMetric {
  username: string;
  url: string;
  totalStars: number;
  followers: number;
  publicRepositories: number;
  originalRepositories: number;
  updatedAt: string;
}

interface CitationPaperMetric {
  configuredId: string;
  paperId: string;
  title: string;
  citationCount: number;
}

interface GoogleScholarCitationMetric {
  source: 'Google Scholar';
  authorId: string;
  url: string;
  citationCount: number;
  hIndex: number;
  i10Index: number;
  updatedAt: string;
}

interface SemanticScholarCitationMetric {
  source: 'Semantic Scholar';
  citationCount: number;
  hIndex: number;
  i10Index: number;
  paperCount: number;
  paperIds: string[];
  papers: CitationPaperMetric[];
  updatedAt: string;
}

type CitationMetric =
  | GoogleScholarCitationMetric
  | SemanticScholarCitationMetric;

interface StoredMetrics {
  github: {
    account: GitHubAccountMetric | null;
    repositories: Record<string, RepositoryMetric>;
    repositoriesUpdatedAt: string | null;
  };
  citations: CitationMetric | null;
}

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const outputPath = path.join(root, 'src/data/generated/metrics.json');
const temporaryOutputPath = `${outputPath}.tmp`;
const emptyMetrics: StoredMetrics = {
  github: {
    account: null,
    repositories: {},
    repositoriesUpdatedAt: null,
  },
  citations: null,
};

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === 'object' && value !== null && !Array.isArray(value);
}

function isRepositoryMetric(value: unknown): value is RepositoryMetric {
  return (
    isRecord(value) &&
    typeof value.repository === 'string' &&
    typeof value.stars === 'number' &&
    typeof value.forks === 'number' &&
    (typeof value.language === 'string' || value.language === null) &&
    typeof value.updatedAt === 'string' &&
    typeof value.url === 'string'
  );
}

function isGitHubAccountMetric(value: unknown): value is GitHubAccountMetric {
  return (
    isRecord(value) &&
    typeof value.username === 'string' &&
    typeof value.url === 'string' &&
    typeof value.totalStars === 'number' &&
    typeof value.followers === 'number' &&
    typeof value.publicRepositories === 'number' &&
    typeof value.originalRepositories === 'number' &&
    typeof value.updatedAt === 'string'
  );
}

function isCitationPaperMetric(value: unknown): value is CitationPaperMetric {
  return (
    isRecord(value) &&
    typeof value.configuredId === 'string' &&
    typeof value.paperId === 'string' &&
    typeof value.title === 'string' &&
    typeof value.citationCount === 'number'
  );
}

function isNonNegativeInteger(value: unknown): value is number {
  return typeof value === 'number' && Number.isInteger(value) && value >= 0;
}

function isCitationMetric(value: unknown): value is CitationMetric {
  if (
    !isRecord(value) ||
    !isNonNegativeInteger(value.citationCount) ||
    !isNonNegativeInteger(value.hIndex) ||
    !isNonNegativeInteger(value.i10Index) ||
    typeof value.updatedAt !== 'string'
  ) {
    return false;
  }

  if (value.source === 'Google Scholar') {
    return typeof value.authorId === 'string' && typeof value.url === 'string';
  }

  return (
    value.source === 'Semantic Scholar' &&
    isNonNegativeInteger(value.paperCount) &&
    Array.isArray(value.paperIds) &&
    value.paperIds.every((paperId) => typeof paperId === 'string') &&
    Array.isArray(value.papers) &&
    value.papers.every(isCitationPaperMetric)
  );
}

async function readExisting(): Promise<StoredMetrics> {
  try {
    const parsed: unknown = JSON.parse(await readFile(outputPath, 'utf8'));
    if (!isRecord(parsed) || !isRecord(parsed.github)) {
      return structuredClone(emptyMetrics);
    }

    const repositories: Record<string, RepositoryMetric> = {};
    if (isRecord(parsed.github.repositories)) {
      for (const [key, value] of Object.entries(parsed.github.repositories)) {
        if (isRepositoryMetric(value)) repositories[key.toLowerCase()] = value;
      }
    }

    return {
      github: {
        account: isGitHubAccountMetric(parsed.github.account)
          ? parsed.github.account
          : null,
        repositories,
        repositoriesUpdatedAt:
          typeof parsed.github.repositoriesUpdatedAt === 'string'
            ? parsed.github.repositoriesUpdatedAt
            : typeof parsed.github.updatedAt === 'string'
              ? parsed.github.updatedAt
              : null,
      },
      citations: isCitationMetric(parsed.citations) ? parsed.citations : null,
    };
  } catch {
    return structuredClone(emptyMetrics);
  }
}

async function fetchResponse(url: string, init?: RequestInit) {
  const response = await fetch(url, {
    ...init,
    signal: AbortSignal.timeout(15_000),
  });

  if (!response.ok) {
    throw new Error(`${response.status} ${response.statusText}`);
  }

  return response;
}

function nextPageUrl(linkHeader: string | null) {
  if (!linkHeader) return null;

  for (const segment of linkHeader.split(',')) {
    const match = segment.match(/<([^>]+)>;\s*rel="([^"]+)"/);
    if (match?.[2] === 'next') return match[1] ?? null;
  }

  return null;
}

async function fetchGitHub(existing: StoredMetrics) {
  const username = profile.githubUsername.trim();
  if (!username) return emptyMetrics.github;

  const headers: Record<string, string> = {
    Accept: 'application/vnd.github+json',
    'User-Agent': 'ivan-ilin-website-build',
    'X-GitHub-Api-Version': '2022-11-28',
  };

  if (process.env.GITHUB_TOKEN) {
    headers.Authorization = `Bearer ${process.env.GITHUB_TOKEN}`;
  }

  try {
    const userResponse = await fetchResponse(
      `https://api.github.com/users/${encodeURIComponent(username)}`,
      { headers },
    );
    const userPayload: unknown = await userResponse.json();

    if (
      !isRecord(userPayload) ||
      typeof userPayload.html_url !== 'string' ||
      typeof userPayload.followers !== 'number' ||
      typeof userPayload.public_repos !== 'number'
    ) {
      throw new Error('Unexpected GitHub profile response');
    }

    const repositoryPayloads: Record<string, unknown>[] = [];
    let pageUrl: string | null =
      `https://api.github.com/users/${encodeURIComponent(username)}/repos` +
      '?type=owner&sort=full_name&direction=asc&per_page=100';

    while (pageUrl) {
      const response = await fetchResponse(pageUrl, { headers });
      const payload: unknown = await response.json();
      if (!Array.isArray(payload) || !payload.every(isRecord)) {
        throw new Error('Unexpected GitHub repository response');
      }
      repositoryPayloads.push(...payload);
      pageUrl = nextPageUrl(response.headers.get('link'));
    }

    if (repositoryPayloads.length !== userPayload.public_repos) {
      throw new Error(
        `GitHub repository count mismatch: expected ${userPayload.public_repos}, received ${repositoryPayloads.length}`,
      );
    }

    for (const repository of repositoryPayloads) {
      if (
        typeof repository.full_name !== 'string' ||
        typeof repository.fork !== 'boolean' ||
        typeof repository.stargazers_count !== 'number' ||
        typeof repository.forks_count !== 'number' ||
        typeof repository.updated_at !== 'string' ||
        typeof repository.html_url !== 'string' ||
        !(typeof repository.language === 'string' || repository.language === null)
      ) {
        throw new Error('Unexpected GitHub repository fields');
      }
    }

    const originalRepositories = repositoryPayloads.filter(
      (repository) => repository.fork === false,
    );
    const totalStars = originalRepositories.reduce(
      (sum, repository) => sum + (repository.stargazers_count as number),
      0,
    );
    const repositoryByName = new Map(
      repositoryPayloads.map((repository) => [
        (repository.full_name as string).toLowerCase(),
        repository,
      ]),
    );
    const repositories: Record<string, RepositoryMetric> = {};

    for (const configuredRepository of profile.repositories) {
      const key = configuredRepository.toLowerCase();
      const repository = repositoryByName.get(key);
      if (!repository) {
        console.warn(
          `[metrics] Configured repository ${configuredRepository} was not found in the public account listing.`,
        );
        continue;
      }

      repositories[key] = {
        repository: repository.full_name as string,
        stars: repository.stargazers_count as number,
        forks: repository.forks_count as number,
        language: repository.language as string | null,
        updatedAt: repository.updated_at as string,
        url: repository.html_url as string,
      };
    }

    const updatedAt = new Date().toISOString();
    return {
      account: {
        username,
        url: userPayload.html_url,
        totalStars,
        followers: userPayload.followers,
        publicRepositories: userPayload.public_repos,
        originalRepositories: originalRepositories.length,
        updatedAt,
      },
      repositories,
      repositoriesUpdatedAt: updatedAt,
    };
  } catch (error) {
    console.warn(
      `[metrics] GitHub account data unavailable; preserving the previous complete snapshot. ${error instanceof Error ? error.message : ''}`,
    );
    return existing.github.account?.username.toLowerCase() === username.toLowerCase()
      ? existing.github
      : {
          account: null,
          repositories: existing.github.repositories,
          repositoriesUpdatedAt: existing.github.repositoriesUpdatedAt,
        };
  }
}

function calculateHIndex(citationCounts: number[]) {
  return [...citationCounts]
    .sort((left, right) => right - left)
    .reduce(
      (hIndex, citationCount, index) =>
        citationCount >= index + 1 ? index + 1 : hIndex,
      0,
    );
}

function samePaperSet(left: readonly string[], right: readonly string[]) {
  if (left.length !== right.length) return false;
  const normalizedLeft = [...left].map((id) => id.toLowerCase()).sort();
  const normalizedRight = [...right].map((id) => id.toLowerCase()).sort();
  return normalizedLeft.every((id, index) => id === normalizedRight[index]);
}

function decodeScholarText(value: string) {
  return value
    .replace(/<[^>]+>/g, ' ')
    .replace(/&nbsp;|&#160;/gi, ' ')
    .replace(/&amp;/gi, '&')
    .replace(/&quot;/gi, '"')
    .replace(/&#39;|&apos;/gi, "'")
    .replace(/\s+/g, ' ')
    .trim();
}

function parseGoogleScholarMetrics(html: string) {
  const profileNameMatch = html.match(
    /<div\b[^>]*id=["']gsc_prf_in["'][^>]*>([\s\S]*?)<\/div>/i,
  );
  const profileName = profileNameMatch
    ? decodeScholarText(profileNameMatch[1] ?? '')
    : '';

  if (profileName.toLocaleLowerCase('en') !== profile.name.toLocaleLowerCase('en')) {
    throw new Error(
      `Google Scholar returned an unexpected profile${profileName ? `: ${profileName}` : ''}`,
    );
  }

  const tableMatch = html.match(
    /<table\b[^>]*id=["']gsc_rsb_st["'][^>]*>([\s\S]*?)<\/table>/i,
  );
  if (!tableMatch) {
    throw new Error('Google Scholar response is missing the metrics table');
  }

  const metrics = new Map<string, number>();
  for (const rowMatch of tableMatch[1]?.matchAll(/<tr\b[^>]*>([\s\S]*?)<\/tr>/gi) ?? []) {
    const row = rowMatch[1] ?? '';
    const labelText = decodeScholarText(row).toLocaleLowerCase('en');
    const label = ['citations', 'h-index', 'i10-index'].find((candidate) =>
      labelText.includes(candidate),
    );
    if (!label) continue;

    const valueMatch = row.match(
      /<td\b[^>]*class=["'][^"']*\bgsc_rsb_std\b[^"']*["'][^>]*>\s*([\d,\s]+)\s*<\/td>/i,
    );
    if (!valueMatch) {
      throw new Error(`Google Scholar response is missing the all-time ${label}`);
    }

    const value = Number.parseInt((valueMatch[1] ?? '').replace(/[,\s]/g, ''), 10);
    if (!isNonNegativeInteger(value)) {
      throw new Error(`Google Scholar returned an invalid ${label}`);
    }
    metrics.set(label, value);
  }

  const citationCount = metrics.get('citations');
  const hIndex = metrics.get('h-index');
  const i10Index = metrics.get('i10-index');
  if (
    !isNonNegativeInteger(citationCount) ||
    !isNonNegativeInteger(hIndex) ||
    !isNonNegativeInteger(i10Index)
  ) {
    throw new Error('Google Scholar response did not contain all three metrics');
  }

  return { citationCount, hIndex, i10Index };
}

async function fetchGoogleScholarCitations(
  existing: StoredMetrics,
): Promise<GoogleScholarCitationMetric | null> {
  const authorId = profile.googleScholarAuthorId.trim();
  if (!authorId) return null;

  const existingSnapshot =
    existing.citations?.source === 'Google Scholar' &&
    existing.citations.authorId === authorId
      ? existing.citations
      : null;

  try {
    const failures: string[] = [];
    let parsed: ReturnType<typeof parseGoogleScholarMetrics> | null = null;

    for (const origin of [
      'https://scholar.google.com',
      'https://scholar.google.co.uk',
      'https://scholar.google.de',
    ]) {
      try {
        const url = new URL('/citations', origin);
        url.searchParams.set('view_op', 'list_works');
        url.searchParams.set('user', authorId);
        url.searchParams.set('hl', 'en');

        const response = await fetchResponse(url.toString(), {
          headers: {
            Accept: 'text/html,application/xhtml+xml',
            'Accept-Language': 'en-US,en;q=0.9',
            'Cache-Control': 'no-cache',
            'User-Agent':
              'Mozilla/5.0 (compatible; IvanIlinWebsiteMetrics/1.0; +https://ivanilin.org/)',
          },
        });
        parsed = parseGoogleScholarMetrics(await response.text());
        break;
      } catch (error) {
        failures.push(
          `${new URL(origin).hostname}: ${error instanceof Error ? error.message : 'unknown error'}`,
        );
      }
    }

    if (!parsed) {
      throw new Error(failures.join('; '));
    }

    return {
      source: 'Google Scholar',
      authorId,
      url: profile.googleScholarUrl,
      ...parsed,
      updatedAt: new Date().toISOString(),
    };
  } catch (error) {
    console.warn(
      `[metrics] Google Scholar data unavailable; preserving the previous verified profile snapshot. ${error instanceof Error ? error.message : ''}`,
    );
    return existingSnapshot;
  }
}

async function fetchSemanticScholarCitations(existing: StoredMetrics) {
  const paperIds = profile.semanticScholarPaperIds
    .map((paperId) => paperId.trim())
    .filter(Boolean);
  if (paperIds.length === 0) return null;

  const headers: Record<string, string> = {
    Accept: 'application/json',
    'Content-Type': 'application/json',
    'User-Agent': 'ivan-ilin-website-build',
  };

  if (process.env.SEMANTIC_SCHOLAR_API_KEY) {
    headers['x-api-key'] = process.env.SEMANTIC_SCHOLAR_API_KEY;
  }

  try {
    const response = await fetchResponse(
      'https://api.semanticscholar.org/graph/v1/paper/batch?fields=title,citationCount',
      {
        method: 'POST',
        headers,
        body: JSON.stringify({ ids: paperIds }),
      },
    );
    const payload: unknown = await response.json();

    if (!Array.isArray(payload) || payload.length !== paperIds.length) {
      throw new Error('Unexpected Semantic Scholar batch response');
    }

    const papers = payload.map((paper, index) => {
      if (
        !isRecord(paper) ||
        typeof paper.paperId !== 'string' ||
        typeof paper.title !== 'string' ||
        typeof paper.citationCount !== 'number' ||
        paper.citationCount < 0
      ) {
        throw new Error(`Semantic Scholar could not resolve ${paperIds[index]}`);
      }

      return {
        configuredId: paperIds[index] as string,
        paperId: paper.paperId,
        title: paper.title,
        citationCount: paper.citationCount,
      } satisfies CitationPaperMetric;
    });
    const citationCounts = papers.map((paper) => paper.citationCount);

    return {
      source: 'Semantic Scholar',
      citationCount: citationCounts.reduce((sum, count) => sum + count, 0),
      hIndex: calculateHIndex(citationCounts),
      i10Index: citationCounts.filter((count) => count >= 10).length,
      paperCount: papers.length,
      paperIds,
      papers,
      updatedAt: new Date().toISOString(),
    } satisfies CitationMetric;
  } catch (error) {
    console.warn(
      `[metrics] Citation data unavailable; preserving the previous verified-paper snapshot. ${error instanceof Error ? error.message : ''}`,
    );
    return existing.citations?.source === 'Semantic Scholar' &&
      samePaperSet(existing.citations.paperIds, paperIds)
      ? existing.citations
      : null;
  }
}

async function fetchCitations(existing: StoredMetrics) {
  const googleScholar = await fetchGoogleScholarCitations(existing);
  return googleScholar ?? fetchSemanticScholarCitations(existing);
}

async function main() {
  const existing = await readExisting();
  const [github, citations] = await Promise.all([
    fetchGitHub(existing),
    fetchCitations(existing),
  ]);
  const metrics = { github, citations } satisfies StoredMetrics;

  await mkdir(path.dirname(outputPath), { recursive: true });
  await writeFile(
    temporaryOutputPath,
    `${JSON.stringify(metrics, null, 2)}\n`,
    'utf8',
  );
  await rename(temporaryOutputPath, outputPath);

  const accountSummary = github.account
    ? `${github.account.totalStars} stars across ${github.account.originalRepositories} original repositories; ${github.account.publicRepositories} public repositories total`
    : 'GitHub account metrics unavailable';
  const citationSummary = citations
    ? `${citations.citationCount} citations from ${citations.source}`
    : 'citation metrics unavailable';
  console.log(`[metrics] Wrote ${accountSummary}; ${citationSummary}.`);
}

await main();
