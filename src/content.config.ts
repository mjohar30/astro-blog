import { defineCollection, reference } from "astro:content";
import { glob, file } from 'astro/loaders';
import { z } from 'astro/zod';

// 4. Define a `loader` and `schema` for each collection
const blog = defineCollection({
  loader: glob({ base: './src/content/blog', pattern: '**/*.{md,mdx}' }),
  schema: ({image}) => z.object({
    title: z.string(),
    date: z.date(),
    description: z.string(),
    image: image(),

    //Relacion
    author: reference('author'),
    tags: z.array(z.string()),

    isDraft: z.boolean().default(false)
  }),
});

const author = defineCollection({
  loader: glob({ base: './src/content/author', pattern: '**/*.yml' }),
  schema: ({image}) => z.object({
    name: z.string(),
    avatar: image(),
    twitter: z.string(),
    linkedIn: z.string(),
    github: z.string(),
    bio: z.string(),
    subtitle: z.string(),
  })
})

// 5. Export a single `collections` object to register your collection(s)
export const collections = { blog, author};