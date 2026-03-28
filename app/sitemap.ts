import { MetadataRoute } from 'next';
import nichesData from '@/niches.json'; 

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://www.getlocalschema.com';

  // 1. Static Routes (The "Pillars")
  const staticRoutes: MetadataRoute.Sitemap = [
    '',
    '/niches',
    '/guides/wordpress',
    '/guides/service-area-business',
  ].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: route === '' ? 'weekly' : 'monthly', // Check homepage more often
    priority: route === '' ? 1.0 : 0.8,
  }));

  // 2. Dynamic Niche Routes
  const nicheRoutes: MetadataRoute.Sitemap = nichesData.map((niche: { id: string }) => ({
    url: `${baseUrl}/generator/${niche.id}`,
    lastModified: new Date(),
    changeFrequency: 'monthly', // These don't change often, 'monthly' is safer to avoid crawl budget waste
    priority: 0.7, // Bumped from 0.6 because these are your primary "landing pages" for search
  }));

  return [...staticRoutes, ...nicheRoutes];
}