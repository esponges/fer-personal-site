export const generateSitemap = (urls: string[]) => {
  return `<?xml version="1.0" encoding="UTF-8"?>
   <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
     ${urls
    .map((u) => {
      return `
       <url>
           <loc>${u}</loc>
       </url>
     `;
    })
    .join("")}
   </urlset>
 `;
};
