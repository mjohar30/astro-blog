import rss from '@astrojs/rss';
import type { APIRoute } from "astro";
import { getCollection } from 'astro:content';

export const GET = (async ({ params, request, site }) => {

  const blogPosts = await getCollection('blog')

  return rss({
    stylesheet: '/styles/rss.xsl',
    // `<title>` field in output xml
    title: 'Mario Blog',
    // `<description>` field in output xml
    description: 'Un simple blog sobre astro',
    // Pull in your project "site" from the endpoint context
    // https://docs.astro.build/en/reference/api-reference/#site
    site: site ?? '',
    // Array of `<item>`s in output xml
    // See "Generating items" section for examples using content collections and glob imports
    items: blogPosts.map(({data, id}) => ({
      title: data.title,
      pubDate: data.date,
      description: data.description,
      link: `/posts/${id}`
    })),
    // (optional) inject custom xml
    customData: `<language>en-mx</language>`,
  });
}) satisfies APIRoute;