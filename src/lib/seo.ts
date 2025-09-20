import type { Metadata } from "next"
import type { TArticle } from "./types"
import { BASE_URL } from "./utils"

// Pre-compiled regex patterns for better performance
const FRONTMATTER_REGEX = /^---[\s\S]*?---\n/
const HEADER_REGEX = /^#{1,6}\s+.*/gm
const CODE_BLOCK_REGEX = /```[\s\S]*?```/g
const INLINE_CODE_REGEX = /`[^`]+`/g
const LINK_REGEX = /\[([^\]]+)\]\([^)]+\)/g
const IMAGE_REGEX = /!\[([^\]]*)\]\([^)]+\)/g
const BOLD_REGEX = /\*\*([^*]+)\*\*/g
const ITALIC_REGEX = /\*([^*]+)\*/g
const UNDERLINE_BOLD_REGEX = /__([^_]+)__/g
const UNDERLINE_ITALIC_REGEX = /_([^_]+)_/g
const WHITESPACE_REGEX = /\s+/g

// Default SEO configuration
export const defaultSEO: Metadata = {
  title: {
    default: "0xBlog - Tech & Development Blog",
    template: "%s | 0xBlog",
  },
  description:
    "Discover the latest trends, tips, and best practices in modern web development. From UI components to design systems, stay updated with our expert insights.",
  keywords: [
    "web development",
    "React",
    "Next.js",
    "TypeScript",
    "UI/UX",
    "frontend",
    "programming",
    "tech blog",
  ],
  authors: [{ name: "0xtz" }],
  creator: "0xtz",
  publisher: "0xBlog",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL(BASE_URL),
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: BASE_URL,
    siteName: "0xBlog",
    title: "0xBlog - Tech & Development Blog",
    description:
      "Discover the latest trends, tips, and best practices in modern web development. From UI components to design systems, stay updated with our expert insights.",
    images: [
      {
        url: `${BASE_URL}/api/og`,
        width: 1200,
        height: 630,
        alt: "0xBlog - Tech & Development Blog",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "0xBlog - Tech & Development Blog",
    description:
      "Discover the latest trends, tips, and best practices in modern web development.",
    images: [`${BASE_URL}/api/og`],
    creator: "@0xtz_",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  verification: {
    google: "TwLfRIEl8pn3Go06i05mJTvDHICAln4LzM9bqSAAHuU",
  },
  category: "technology",
}

// Generate SEO metadata for individual articles
export function generateArticleSEO(article: TArticle): Metadata {
  const articleUrl = `${BASE_URL}/articles/${article.id}`
  const finalDescription = generateSEOFriendlyDescription(
    article.content,
    article.title,
    article.category
  )

  return {
    title: article.title,
    description: finalDescription,
    keywords: [
      article.category,
      "web development",
      "programming",
      "tech blog",
      "tutorials",
      article.title.toLowerCase().split(" ").slice(0, 3).join(" "),
    ].filter(Boolean),
    authors: [{ name: "0xtz" }],
    alternates: {
      canonical: articleUrl,
    },
    openGraph: {
      type: "article",
      url: articleUrl,
      title: article.title,
      description: finalDescription,
      siteName: "0xBlog",
      publishedTime: article.date,
      authors: ["0xtz"],
      section: article.category,
      images: [
        {
          url: `${BASE_URL}/api/og?title=${encodeURIComponent(article.title)}`,
          width: 1200,
          height: 630,
          alt: article.title,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: article.title,
      description: finalDescription,
      images: [`${BASE_URL}/api/og?title=${encodeURIComponent(article.title)}`],
      creator: "@0xtz_",
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        "max-video-preview": -1,
        "max-image-preview": "large",
        "max-snippet": -1,
      },
    },
  }
}

// Generate SEO metadata for the articles listing page
export function generateArticlesListSEO(): Metadata {
  return {
    title: "All Articles",
    description:
      "Browse all articles about web development, React, Next.js, TypeScript, and modern frontend technologies.",
    keywords: [
      "articles",
      "blog posts",
      "web development",
      "React",
      "Next.js",
      "TypeScript",
    ],
    alternates: {
      canonical: `${BASE_URL}/articles`,
    },
    openGraph: {
      type: "website",
      url: `${BASE_URL}/articles`,
      title: "All Articles - 0xBlog",
      description:
        "Browse all articles about web development, React, Next.js, TypeScript, and modern frontend technologies.",
      siteName: "0xBlog",
    },
    twitter: {
      card: "summary_large_image",
      title: "All Articles - 0xBlog",
      description:
        "Browse all articles about web development, React, Next.js, TypeScript, and modern frontend technologies.",
    },
  }
}

// Generate structured data for articles
export function generateArticleStructuredData(article: TArticle) {
  const finalDescription = generateSEOFriendlyDescription(
    article.content,
    article.title,
    article.category
  )

  return {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: article.title,
    description: finalDescription,
    image: `${BASE_URL}/api/og?title=${encodeURIComponent(article.title)}`,
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
        url: `${BASE_URL}/api/og`,
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
}

// Generate structured data for the blog
export function generateBlogStructuredData() {
  return {
    "@context": "https://schema.org",
    "@type": "Blog",
    name: "0xBlog",
    description:
      "Discover the latest trends, tips, and best practices in modern web development. From UI components to design systems, stay updated with our expert insights.",
    url: BASE_URL,
    publisher: {
      "@type": "Organization",
      name: "0xBlog",
      logo: {
        "@type": "ImageObject",
        url: `${BASE_URL}/api/og`,
      },
    },
    author: {
      "@type": "Person",
      name: "0xtz",
      url: BASE_URL,
    },
  }
}

// Generate breadcrumb structured data
export function generateBreadcrumbStructuredData(article?: TArticle) {
  const baseBreadcrumbs = [
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
  ]

  if (article) {
    baseBreadcrumbs.push({
      "@type": "ListItem",
      position: 3,
      name: article.title,
      item: `${BASE_URL}/articles/${article.id}`,
    })
  }

  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: baseBreadcrumbs,
  }
}

// Utility function to extract clean content for SEO descriptions
function extractCleanContent(
  content: string | undefined,
  maxLength = 155
): string {
  if (!content) {
    return ""
  }

  const cleanContent = content
    // Remove frontmatter if present
    .replace(FRONTMATTER_REGEX, "")
    // Remove markdown headers
    .replace(HEADER_REGEX, "")
    // Remove code blocks
    .replace(CODE_BLOCK_REGEX, "")
    // Remove inline code
    .replace(INLINE_CODE_REGEX, "")
    // Remove links but keep text
    .replace(LINK_REGEX, "$1")
    // Remove images
    .replace(IMAGE_REGEX, "")
    // Remove emphasis markers
    .replace(BOLD_REGEX, "$1")
    .replace(ITALIC_REGEX, "$1")
    .replace(UNDERLINE_BOLD_REGEX, "$1")
    .replace(UNDERLINE_ITALIC_REGEX, "$1")
    // Clean up extra whitespace
    .replace(WHITESPACE_REGEX, " ")
    .trim()

  // Return truncated content if too long
  if (cleanContent.length > maxLength) {
    return `${cleanContent.slice(0, maxLength).trim()}...`
  }

  return cleanContent
}

// Utility function to generate SEO-friendly description with fallbacks
function generateSEOFriendlyDescription(
  content: string | undefined,
  title: string,
  category: string
): string {
  const cleanContent = extractCleanContent(content)

  // Try to use clean content first
  if (cleanContent && cleanContent.length >= 30) {
    return cleanContent
  }

  // Fallback descriptions based on category
  const categoryDescriptions: Record<string, string> = {
    tech: "Discover the latest trends, tips, and best practices in modern web development and technology.",
    database:
      "Learn about database design, optimization, and best practices for modern applications.",
    programming:
      "Explore programming concepts, algorithms, and development techniques.",
    tutorial:
      "Follow step-by-step tutorials and guides for web development and programming.",
  }

  const categoryDesc =
    categoryDescriptions[category.toLowerCase()] ||
    "Discover insights and best practices in modern web development and technology."

  // If we have minimal clean content, combine it with category description
  if (cleanContent && cleanContent.length > 10) {
    return `${cleanContent} ${categoryDesc.toLowerCase()}`
  }

  // Final fallback
  return `${title} - ${categoryDesc}`
}
