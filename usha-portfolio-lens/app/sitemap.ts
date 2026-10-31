import type { MetadataRoute } from "next";
import { projects } from "@/data/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://ushasahu.netlify.app";
  const now = new Date();

  const caseStudyUrls: MetadataRoute.Sitemap = projects.map((p) => ({
    url: `${baseUrl}/work/${p.id}`,
    lastModified: now,
    changeFrequency: "monthly",
    priority: 0.8,
  }));

  return [
    {
      url: baseUrl,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 1.0,
    },
    ...caseStudyUrls,
  ];
}
