import { MetadataRoute } from 'next';
import fs from 'fs';
import path from 'path';

export const dynamic = "force-static";

function getRoutes(dir: string, currentRoute: string = ''): string[] {
  let routes: string[] = [];
  try {
    const entries = fs.readdirSync(dir, { withFileTypes: true });

    for (const entry of entries) {
      if (entry.isDirectory()) {
        // Ignore API routes and private folders
        if (entry.name === 'api' || entry.name.startsWith('_')) {
          continue;
        }
        
        let nextRoute = currentRoute;
        // Ignore route groups like (marketing)
        if (!(entry.name.startsWith('(') && entry.name.endsWith(')'))) {
          nextRoute = `${currentRoute}/${entry.name}`;
        }
        
        routes = routes.concat(getRoutes(path.join(dir, entry.name), nextRoute));
      } else if (entry.name.match(/^page\.(tsx|ts|jsx|js)$/)) {
        // Avoid adding dynamic routes like [id] automatically
        if (!currentRoute.includes('[')) {
          routes.push(currentRoute === '' ? '' : currentRoute);
        }
      }
    }
  } catch (err) {
    console.error('Error reading directory:', err);
  }
  return routes;
}

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://ananthorix.com';
  
  const appDir = path.join(process.cwd(), 'app');
  const routes = getRoutes(appDir);

  return routes.map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: 'weekly',
    priority: route === '' ? 1 : 0.8,
  }));
}
