import { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: '/private/', // Example: block private folders if you have them
    },
    sitemap: 'https://www.getlocalschema.com/sitemap.xml',
  };
}