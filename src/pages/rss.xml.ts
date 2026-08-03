import rss from '@astrojs/rss';
import { getCollection } from 'astro:content';
import { profile } from '../data/profile';
import { absoluteSiteUrl } from '../utils/urls';

export async function GET() {
  const posts = (await getCollection('blog', ({ data }) => !data.draft)).sort(
    (a, b) => b.data.publishDate.valueOf() - a.data.publishDate.valueOf(),
  );

  return rss({
    title: `${profile.name} — Blog`,
    description:
      'Notes on machine learning research, efficient models, and open-source engineering.',
    site: new URL(profile.siteUrl),
    items: posts.map((post) => ({
      title: post.data.title,
      description: post.data.description,
      pubDate: post.data.publishDate,
      link: absoluteSiteUrl(`/blog/${post.id}/`),
      categories: post.data.tags,
      customData: '<language>en</language>',
    })),
  });
}
