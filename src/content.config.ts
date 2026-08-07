import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';

const optionalUrl = z.url().or(z.literal('')).optional();
const optionalLink = z
  .string()
  .refine(
    (value) =>
      value === '' ||
      value.startsWith('/') ||
      URL.canParse(value),
    'Expected an absolute URL or a root-relative path',
  )
  .optional();

const blog = defineCollection({
  loader: glob({ pattern: '**/*.{md,mdx}', base: './src/content/blog' }),
  schema: ({ image }) =>
    z.object({
      title: z.string(),
      description: z.string(),
      publishDate: z.coerce.date(),
      updatedDate: z.coerce.date().optional(),
      tags: z.array(z.string()).default([]),
      draft: z.boolean().default(false),
      featured: z.boolean().default(false),
      cover: image().optional(),
    }),
});

const projects = defineCollection({
  loader: glob({ pattern: '**/*.{md,mdx}', base: './src/content/projects' }),
  schema: ({ image }) =>
    z.object({
      title: z.string(),
      shortSummary: z.string(),
      publishDate: z.coerce.date().optional(),
      year: z.number().int().optional(),
      status: z.string(),
      category: z.string(),
      topics: z.array(z.string()).default([]),
      featured: z.boolean().default(false),
      githubUrl: optionalUrl,
      paperUrl: optionalUrl,
      demoUrl: optionalUrl,
      demoLabel: z.string().optional(),
      image: image().optional(),
      imageAlt: z.string().optional(),
      imageFit: z.enum(['cover', 'contain']).default('cover'),
      visual: z.enum(['audio', 'matrix', 'pipeline', 'sparse']).optional(),
      youtubeVideoId: z.string().regex(/^[A-Za-z0-9_-]{11}$/).optional(),
      metricsRepository: z.string().optional(),
      relatedPublications: z.array(z.string()).default([]),
    }),
});

const publications = defineCollection({
  loader: glob({ pattern: '**/*.{md,mdx}', base: './src/content/publications' }),
  schema: z.object({
    title: z.string(),
    authors: z.array(z.string()).default([]),
    publishDate: z.coerce.date().optional(),
    year: z.number().int().optional(),
    venue: z.string().optional(),
    publicationType: z.string(),
    status: z.string().optional(),
    summary: z.string(),
    featured: z.boolean().default(false),
    paperUrl: optionalUrl,
    arxivUrl: optionalUrl,
    codeUrl: optionalUrl,
    projectUrl: optionalLink,
    bibtex: z.string().optional(),
    tags: z.array(z.string()).default([]),
  }),
});

export const collections = { blog, projects, publications };
