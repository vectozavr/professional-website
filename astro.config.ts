import { defineConfig } from 'astro/config';
import mdx from '@astrojs/mdx';
import { unified } from '@astrojs/markdown-remark';
import sitemap from '@astrojs/sitemap';
import rehypeKatex from 'rehype-katex';
import remarkMath from 'remark-math';

import { profile } from './src/data/profile';

const siteUrl = new URL(profile.siteUrl);
const base = siteUrl.pathname.replace(/\/$/, '') || '/';

export default defineConfig({
  site: siteUrl.origin,
  base,
  output: 'static',
  integrations: [mdx(), sitemap()],
  markdown: {
    processor: unified({
      remarkPlugins: [remarkMath],
      rehypePlugins: [rehypeKatex],
    }),
    shikiConfig: {
      theme: 'github-light',
      wrap: true,
    },
  },
});
