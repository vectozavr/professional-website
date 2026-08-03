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
