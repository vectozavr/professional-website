import rss, { type RSSFeedItem } from '@astrojs/rss';
import { getCollection } from 'astro:content';
import { profile } from '../data/profile';
import { absoluteSiteUrl } from '../utils/urls';

interface FeedItem extends RSSFeedItem {
  sortDate: number;
}

const yearSortDate = (year?: number) =>
  year ? Date.UTC(year, 0, 1) : Number.NEGATIVE_INFINITY;

export async function GET() {
  const [posts, publications, projects] = await Promise.all([
    getCollection('blog', ({ data }) => !data.draft),
    getCollection('publications'),
    getCollection('projects'),
  ]);

  const items: FeedItem[] = [
    ...posts.map((post) => ({
      title: post.data.title,
      description: post.data.description,
      pubDate: post.data.publishDate,
      link: absoluteSiteUrl(`/blog/${post.id}/`),
      categories: ['Blog post', ...post.data.tags],
      customData: '<language>en</language>',
      sortDate: post.data.publishDate.valueOf(),
    })),
    ...publications.map((publication) => ({
      title: publication.data.title,
      description: `Publication — ${publication.data.summary ?? publication.data.publicationType}`,
      pubDate: publication.data.publishDate,
      link: absoluteSiteUrl(`/publications/#${encodeURIComponent(publication.id)}`),
      categories: [
        'Publication',
        publication.data.publicationType,
        ...publication.data.tags,
      ],
      customData: '<language>en</language>',
      sortDate:
        publication.data.publishDate?.valueOf() ??
        yearSortDate(publication.data.year),
    })),
    ...projects.map((project) => ({
      title: project.data.title,
      description: `Project — ${project.data.shortSummary}`,
      pubDate: project.data.publishDate,
      link: absoluteSiteUrl(`/projects/${project.id}/`),
      categories: ['Project', project.data.category, ...project.data.topics],
      customData: '<language>en</language>',
      sortDate:
        project.data.publishDate?.valueOf() ?? yearSortDate(project.data.year),
    })),
  ].sort(
    (a, b) =>
      b.sortDate - a.sortDate ||
      (a.title ?? '').localeCompare(b.title ?? ''),
  );

  return rss({
    title: `${profile.name} — Updates`,
    description:
      'New blog posts, publications, and projects from Ivan Ilin.',
    site: new URL(profile.siteUrl),
    items: items.map(({ sortDate: _sortDate, ...item }) => item),
  });
}
