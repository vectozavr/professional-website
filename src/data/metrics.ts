import rawMetrics from './generated/metrics.json';

export interface RepositoryMetric {
  repository: string;
  stars: number;
  forks: number;
  language: string | null;
  updatedAt: string;
  url: string;
}

export interface GitHubAccountMetric {
  username: string;
  url: string;
  totalStars: number;
  followers: number;
  publicRepositories: number;
  originalRepositories: number;
  updatedAt: string;
}

export interface CitationPaperMetric {
  configuredId: string;
  paperId: string;
  title: string;
  citationCount: number;
}

export interface GoogleScholarCitationMetric {
  source: 'Google Scholar';
  authorId: string;
  url: string;
  citationCount: number;
  hIndex: number;
  i10Index: number;
  updatedAt: string;
}

export interface SemanticScholarCitationMetric {
  source: 'Semantic Scholar';
  citationCount: number;
  hIndex: number;
  i10Index: number;
  paperCount: number;
  paperIds: string[];
  papers: CitationPaperMetric[];
  updatedAt: string;
}

export type CitationMetric =
  | GoogleScholarCitationMetric
  | SemanticScholarCitationMetric;

export interface Metrics {
  github: {
    account: GitHubAccountMetric | null;
    repositories: Record<string, RepositoryMetric>;
    repositoriesUpdatedAt: string | null;
  };
  citations: CitationMetric | null;
}

export const metrics = rawMetrics as Metrics;

export function getRepositoryMetric(repository?: string) {
  if (!repository) return undefined;
  return metrics.github.repositories[repository.toLowerCase()];
}
