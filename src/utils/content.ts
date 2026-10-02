import type { CollectionEntry } from 'astro:content';

const projectOrder = [
  'qk-wanda',
  'pipeline-parallelism-theory',
  'thanos',
  'sparse-fine-tuning',
];

export function compareProjectPriority(
  a: CollectionEntry<'projects'>,
  b: CollectionEntry<'projects'>,
) {
  const priority = (project: CollectionEntry<'projects'>) => {
    const index = projectOrder.indexOf(project.id);
    return index >= 0 ? index : projectOrder.length;
  };

  return priority(a) - priority(b);
}

export function comparePublications(
  a: CollectionEntry<'publications'>,
  b: CollectionEntry<'publications'>,
) {
  const publicationDate = (publication: CollectionEntry<'publications'>) =>
    publication.data.publishDate?.valueOf() ??
    (publication.data.year
      ? Date.UTC(publication.data.year, 0, 1)
      : Number.NEGATIVE_INFINITY);

  return publicationDate(b) - publicationDate(a) ||
    a.data.title.localeCompare(b.data.title);
}

export function formatDate(date: Date, style: 'long' | 'short' = 'long') {
  return new Intl.DateTimeFormat('en', {
    year: 'numeric',
    month: style === 'long' ? 'long' : 'short',
    day: 'numeric',
    timeZone: 'UTC',
  }).format(date);
}

export function formatMetricDate(value: string | null) {
  if (!value) return undefined;
  return new Intl.DateTimeFormat('en', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    timeZone: 'UTC',
  }).format(new Date(value));
}

export function readingTime(body?: string) {
  const words = body
    ? body
        .replace(/```[\s\S]*?```/g, ' ')
        .replace(/<[^>]+>/g, ' ')
        .trim()
        .split(/\s+/)
        .filter(Boolean).length
    : 0;

  return Math.max(1, Math.ceil(words / 220));
}

export function tagSlug(tag: string) {
  return tag
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '');
}
