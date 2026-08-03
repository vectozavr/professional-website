export interface Profile {
  name: string;
  professionalTitle: string;
  academicStatus: string;
  affiliation: string;
  shortBiography: string;
  siteUrl: string;
  portraitUrl: string;
  githubUsername: string;
  email: string;
  googleScholarUrl: string;
  googleScholarAuthorId: string;
  semanticScholarAuthorId: string;
  semanticScholarPaperIds: readonly string[];
  orcid: string;
  linkedInUrl: string;
  twitterUrl: string;
  youtubeUrl: string;
  telegramUrl: string;
  cvUrl: string;
  location: string;
  repositories: readonly string[];
}

export const profile = {
  name: 'Ivan Ilin',
  professionalTitle: 'Machine Learning Researcher',
  academicStatus: 'PhD Candidate',
  affiliation: 'PhD candidate in Computer Science at KAUST',
  shortBiography:
    'Ivan Ilin is a machine learning researcher and PhD candidate in Computer Science at KAUST. His work focuses on efficient optimization and compression methods for large language models, including pruning, sparse fine-tuning, quantization, and pipeline parallelism. He also develops open-source tools that apply machine learning to practical workflows.',
  siteUrl: 'https://ivanilin.org/',
  portraitUrl: '/images/ivan-ilin.webp',
  githubUsername: 'vectozavr',
  email: 'ivan.ilin@kaust.edu.sa',
  googleScholarUrl: 'https://scholar.google.com/citations?user=elw14gUAAAAJ',
  googleScholarAuthorId: 'elw14gUAAAAJ',
  semanticScholarAuthorId: '',
  semanticScholarPaperIds: [
    'ARXIV:2606.03498',
    'CorpusID:278775472',
    'DOI:10.1145/3630048.3630184',
    'ARXIV:2405.14852',
    'ARXIV:2605.18174',
    'ARXIV:2402.04785',
    'ARXIV:2607.09287',
    'ARXIV:2504.05346',
  ],
  orcid: 'https://orcid.org/0009-0005-6210-378X',
  linkedInUrl: 'https://www.linkedin.com/in/ivan-ilin-452045307/',
  twitterUrl: 'https://x.com/vectozavr',
  youtubeUrl: 'https://www.youtube.com/@ilin-ivan',
  telegramUrl: '',
  cvUrl: '/cv/ivan-ilin-cv.pdf',
  location: '',
  repositories: [
    'vectozavr/voicecut',
    'vectozavr/thanos',
    'vectozavr/randomized-pipedream',
    'vectozavr/SuperTuning',
    'vectozavr/3dzavr',
    'vectozavr/GameBoy_arduino',
    'vectozavr/pseudo3DEngine',
  ],
} as const satisfies Profile;

export const siteDescription =
  'Research, publications, projects, and writing by Ivan Ilin, a machine learning researcher at KAUST.';

export interface ProfessionalLink {
  label: string;
  href: string;
  icon?: string;
}

const compactLinks = (links: Array<ProfessionalLink | undefined>) =>
  links.filter((link): link is ProfessionalLink => link !== undefined);

export const researchProfileLinks = compactLinks([
  profile.googleScholarUrl
    ? {
        label: 'Google Scholar',
        href: profile.googleScholarUrl,
        icon: '/icons/google-scholar.svg',
      }
    : undefined,
  profile.orcid
    ? { label: 'ORCID', href: profile.orcid, icon: '/icons/orcid.svg' }
    : undefined,
  profile.githubUsername
    ? {
        label: 'GitHub',
        href: `https://github.com/${profile.githubUsername}`,
        icon: '/icons/github.svg',
      }
    : undefined,
]);

export const socialMediaLinks = compactLinks([
  profile.youtubeUrl
    ? {
        label: 'YouTube',
        href: profile.youtubeUrl,
        icon: '/icons/youtube.svg',
      }
    : undefined,
  profile.twitterUrl
    ? {
        label: 'X',
        href: profile.twitterUrl,
        icon: '/icons/x.svg',
      }
    : undefined,
  profile.linkedInUrl
    ? {
        label: 'LinkedIn',
        href: profile.linkedInUrl,
        icon: '/icons/linkedin.svg',
      }
    : undefined,
  profile.telegramUrl
    ? { label: 'Telegram', href: profile.telegramUrl }
    : undefined,
]);

export const professionalLinks = [
  ...researchProfileLinks,
  ...socialMediaLinks,
];
