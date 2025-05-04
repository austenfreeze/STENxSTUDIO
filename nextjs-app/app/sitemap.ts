import { MetadataRoute } from "next";
import { sanityFetch } from "@/sanity/lib/live";
import { sitemapData } from "@/sanity/lib/queries";
import { headers } from "next/headers";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const allPostsAndPages = await sanityFetch({
    query: sitemapData,
  });
const headersList = await headers();
const domain = headersList.get("host") || "localhost";


  const sitemap: MetadataRoute.Sitemap = [
    {
      url: `https://${domain}`,
      lastModified: new Date(),
      priority: 1,
      changeFrequency: "monthly",
    },
  ];

  if (allPostsAndPages?.data?.length) {
    for (const p of allPostsAndPages.data) {
      let entry: MetadataRoute.Sitemap[number] | null = null;

      if (p._type === "page" && p.slug) {
        entry = {
          url: `https://${domain}/${p.slug}`,
          lastModified: p._updatedAt || new Date(),
          priority: 0.8,
          changeFrequency: "monthly",
        };
      } else if (p._type === "post" && p.slug) {
        entry = {
          url: `https://${domain}/posts/${p.slug}`,
          lastModified: p._updatedAt || new Date(),
          priority: 0.5,
          changeFrequency: "never",
        };
      }

      if (entry) {
        sitemap.push(entry);
      }
    }
  }

  return sitemap;
}
