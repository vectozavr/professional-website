import { writeFile } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

import { profile } from '../src/data/profile';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const siteUrl = new URL(profile.siteUrl);

if (
  siteUrl.protocol !== 'https:' ||
  siteUrl.pathname !== '/' ||
  siteUrl.search ||
  siteUrl.hash
) {
  throw new Error(
    'profile.siteUrl must be an HTTPS origin without a path, query, or fragment.',
  );
}

await Promise.all([
  writeFile(path.join(root, 'public/CNAME'), `${siteUrl.hostname}\n`, 'utf8'),
  writeFile(
    path.join(root, 'public/robots.txt'),
    `User-agent: *\nAllow: /\n\nSitemap: ${siteUrl.origin}/sitemap-index.xml\n`,
    'utf8',
  ),
]);

console.log(`[domain] Synced GitHub Pages files for ${siteUrl.hostname}.`);
