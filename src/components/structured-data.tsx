import type { TArticle } from "@/lib/types"
import { BASE_URL } from "@/lib/utils"

interface ArticleStructuredDataProps {
  article: TArticle
}

export function ArticleStructuredData({ article }: ArticleStructuredDataProps) {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: article.title,
    description: article.content
      ? `${article.content.replace(/<[^>]*>/g, "").slice(0, 160)}...`
      : `Read about ${article.title} on 0xBlog`,
    image: `${BASE_URL}/articles/${article.id}/og-image.jpg`,
    author: {
      "@type": "Person",
      name: "0xtz",
      url: BASE_URL,
    },
    publisher: {
      "@type": "Organization",
      name: "0xBlog",
      logo: {
        "@type": "ImageObject",
        url: `${BASE_URL}/logo.png`,
      },
    },
    datePublished: article.date,
    dateModified: article.date,
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": `${BASE_URL}/articles/${article.id}`,
    },
    articleSection: article.category,
  }

  return (
    <script
      // biome-ignore lint/security/noDangerouslySetInnerHtml: JSON-LD structured data
      dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      type="application/ld+json"
    />
  )
}

export function BreadcrumbStructuredData({
  article,
}: ArticleStructuredDataProps) {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Home",
        item: BASE_URL,
      },
      {
        "@type": "ListItem",
        position: 2,
        name: "Articles",
        item: `${BASE_URL}/articles`,
      },
      {
        "@type": "ListItem",
        position: 3,
        name: article.title,
        item: `${BASE_URL}/articles/${article.id}`,
      },
    ],
  }

  return (
    <script
      // biome-ignore lint/security/noDangerouslySetInnerHtml: JSON-LD structured data
      dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      type="application/ld+json"
    />
  )
}
