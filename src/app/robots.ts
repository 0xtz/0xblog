import type { MetadataRoute } from "next"
import { BASE_URL } from "@/lib/utils"

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: ["/private/", "/admin/"],
    },
    sitemap: `${BASE_URL}/sitemap.xml`,
  }
}
