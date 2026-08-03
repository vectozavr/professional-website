import { rm, writeFile } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

import { profile } from '../src/data/profile';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const siteUrl = new URL(profile.siteUrl);

if (
  siteUrl.protocol !== 'https:' ||
  siteUrl.search ||
  siteUrl.hash
) {
  throw new Error(
    'profile.siteUrl must be an HTTPS URL without a query or fragment.',
  );
}

const cnamePath = path.join(root, 'public/CNAME');
const usesCustomRootDomain =
  siteUrl.pathname === '/' && !siteUrl.hostname.endsWith('.github.io');

await writeFile(
  path.join(root, 'public/robots.txt'),
  `User-agent: *\nAllow: /\n\nSitemap: ${new URL('sitemap-index.xml', siteUrl)}\n`,
  'utf8',
);

if (usesCustomRootDomain) {
  await writeFile(cnamePath, `${siteUrl.hostname}\n`, 'utf8');
} else {
  await rm(cnamePath, { force: true });
}

console.log(
  `[domain] Synced Pages files for ${siteUrl.href}${
    usesCustomRootDomain ? ' with a custom-domain CNAME.' : ' without a CNAME.'
  }`,
);
