import { META_SITE_URL, SITE_MAP_URL } from '@/lib/metadata';
import type { MetadataRoute } from 'next';

// https://nextjs.org/docs/app/api-reference/file-conventions/metadata/robots
export default function robots(): MetadataRoute.Robots {
  return {
    host: META_SITE_URL,
    sitemap: SITE_MAP_URL,
    rules: [
      {
        allow: '/',
        userAgent: '*',
        disallow: [],
      },
    ],
  };
}
