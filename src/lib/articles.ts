import fs from "node:fs/promises"
import path from "node:path"

import { isAfter, isBefore, parse } from "date-fns"
import matter from "gray-matter"
import type { TArticle } from "./types"
import { stripMarkdown } from "./utils"

// path to articles folder
const articlesDirectory = path.join(process.cwd(), "articles")
const mdExtensionRegex = /\.(md|mdx)$/

// get all articles sorted by date (newest first)
// preview: if true, removes markdown formatting from content
export async function getSortedArticles({
  preview = false,
  limit,
  category,
}: {
  preview?: boolean
  limit?: number
  category?: string
}): Promise<TArticle[]> {
  const fileNames = await fs.readdir(articlesDirectory)

  const allArticlesData = await Promise.all(
    fileNames.map(async (fileName) => {
      // remove .md extension to get article id
      const id = fileName.replace(mdExtensionRegex, "")

      const fullPath = path.join(articlesDirectory, fileName)
      const fileContents = await fs.readFile(fullPath, "utf-8")

      const matterResult = matter(fileContents)

      return {
        id,
        title: matterResult.data.title,
        date: matterResult.data.date,
        category: matterResult.data.category,
        // strip markdown if preview is true
        content: preview
          ? stripMarkdown(matterResult.content?.slice(0, 100))
          : matterResult.content,
      }
    })
  )

  const sorted = allArticlesData.sort((a, b) => {
    const dateOne = parse(a.date, "dd-MM-yyyy", new Date())
    const dateTwo = parse(b.date, "dd-MM-yyyy", new Date())

    // sort newest first (descending order)
    if (isAfter(dateOne, dateTwo)) {
      return -1
    }

    if (isBefore(dateOne, dateTwo)) {
      return 1
    }

    return 0
  })

  const filtered = category
    ? sorted.filter((article) => article.category === category)
    : sorted

  return typeof limit === "number" ? filtered.slice(0, limit) : filtered
}

// group articles by category
// preview: if true, removes markdown formatting from content
export async function getCategorizedArticles(
  preview = false
): Promise<Record<string, TArticle[]>> {
  const sortedArticles = await getSortedArticles({ preview })
  const categorizedArticles: Record<string, TArticle[]> = {}

  for (const article of sortedArticles) {
    if (!categorizedArticles[article.category]) {
      categorizedArticles[article.category] = []
    }
    categorizedArticles[article.category].push(article)
  }

  return categorizedArticles
}

// get a single article by its slug/id
// converts markdown content to html
export async function getArticleBySlug(
  slug: string
): Promise<TArticle | undefined> {
  const candidates = [
    path.join(articlesDirectory, `${slug}.mdx`),
    path.join(articlesDirectory, `${slug}.md`),
  ]

  const exists = async (p: string) =>
    fs
      .access(p)
      .then(() => true)
      .catch(() => false)

  let fullPath = ""
  if (await exists(candidates[0])) {
    fullPath = candidates[0]
  } else if (await exists(candidates[1])) {
    fullPath = candidates[1]
  } else {
    return
  }

  try {
    const fileContents = await fs.readFile(fullPath, "utf-8")

    const matterResult = matter(fileContents)

    return {
      id: slug,
      title: matterResult.data.title,
      content: matterResult.content,
      date: matterResult.data.date,
      category: matterResult.data.category,
    }
  } catch {
    // File doesn't exist or other error
    return
  }
}

// get the most recent articles with clean text (no markdown)
export async function getLatestArticles(limit = 6): Promise<TArticle[]> {
  const sortedArticles = await getSortedArticles({
    preview: true,
  })
  return sortedArticles.slice(0, limit)
}
