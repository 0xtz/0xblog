import type { Metadata } from "next"
import type { TArticle } from "./types"
import { BASE_URL } from "./utils"

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
  const articleDescription = article.content
    ? `${article.content
        .replace(/<[^>]*>/g, "")
        .replace(/\s+/g, " ")
        .trim()
        .slice(0, 160)}...`
    : `Read about ${article.title} on 0xBlog`

  return {
    title: article.title,
    description: articleDescription,
    keywords: [article.category, "web development", "tech", "blog"],
    authors: [{ name: "0xtz" }],
    alternates: {
      canonical: articleUrl,
    },
    openGraph: {
      type: "article",
      url: articleUrl,
      title: article.title,
      description: articleDescription,
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
      description: articleDescription,
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
  return {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: article.title,
    description: article.content
      ? `${article.content
          .replace(/<[^>]*>/g, "")
          .replace(/\s+/g, " ")
          .trim()
          .slice(0, 160)}...`
      : `Read about ${article.title} on 0xBlog`,
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
