import { defineCollection } from "astro:content";
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
    author: z.string(),
    tags: z.array(z.string()),
  }),
});

// 5. Export a single `collections` object to register your collection(s)
export const collections = { blog };