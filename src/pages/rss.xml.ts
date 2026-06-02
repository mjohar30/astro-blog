import rss from '@astrojs/rss';
import type { APIRoute } from "astro";
import { getCollection } from 'astro:content';
import MarkdownIt from 'markdown-it';
import sanitize from 'sanitize-html';

const parser = new MarkdownIt();

export const GET = (async ({ params, request, site }) => {

  const blogPosts = await getCollection('blog')

  return rss({
    stylesheet: '/styles/rss.xsl',
    // `<title>` field in output xml
    title: 'Mario Blog',
    // `<description>` field in output xml
    description: 'Un simple blog sobre astro',
    xmlns: {
      media: 'http://search.yahoo.com/mrss/',
    },
    // Pull in your project "site" from the endpoint context
    // https://docs.astro.build/en/reference/api-reference/#site
    site: site ?? '',
    // Array of `<item>`s in output xml
    // See "Generating items" section for examples using content collections and glob imports
    items: blogPosts.map(({ data, id, body }) => ({
      title: data.title,
      pubDate: data.date,
      description: data.description,
      link: `/posts/${id}`,

      content: sanitize(parser.render(body ?? ''), {
        allowedTags: sanitize.defaults.allowedTags.concat(['img']),
      }),

      customData: `<media:content
          type="image/${data.image.format === 'jpg' ? 'jpeg' : 'png'}"
          width="${data.image.width}"
          height="${data.image.height}"
          medium="image"
          url="${site + data.image.src}" />
      `,
    })),
    // (optional) inject custom xml
    customData: `<language>en-mx</language>`,
  });
}) satisfies APIRoute;