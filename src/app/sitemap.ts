import type { MetadataRoute } from "next"
import { getSortedArticles } from "@/lib/articles"
import { BASE_URL } from "@/lib/utils"

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  // Get all articles
  const articles = await getSortedArticles({
    preview: true,
    limit: 1000,
  })

  // Static pages
  const staticPages = [
    {
      url: BASE_URL,
      lastModified: new Date(),
      changeFrequency: "daily" as const,
      priority: 1,
    },
    {
      url: `${BASE_URL}/articles`,
      lastModified: new Date(),
      changeFrequency: "daily" as const,
      priority: 0.8,
    },
  ]

  // Article pages
  const articlePages = articles.map((article) => ({
    url: `${BASE_URL}/articles/${article.id}`,
    lastModified: new Date(article.date.split("-").reverse().join("-")), // Convert DD-MM-YYYY to YYYY-MM-DD
    changeFrequency: "monthly" as const,
    priority: 0.6,
  }))

  return [...staticPages, ...articlePages]
}
