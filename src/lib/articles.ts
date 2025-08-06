import fs from "node:fs/promises"
import path from "node:path"

import { isAfter, isBefore, parse } from "date-fns"
import matter from "gray-matter"
import rehypeHighlight from "rehype-highlight"
import rehypeSlug from "rehype-slug"
import { remark } from "remark"
import gfm from "remark-gfm"
import html from "remark-html"
import toc from "remark-toc"
import type { TArticle } from "./types"
import { stripMarkdown } from "./utils"

// path to articles folder
const articlesDirectory = path.join(process.cwd(), "articles")
const mdExtensionRegex = /\.md$/

// get all articles sorted by date (newest first)
// preview: if true, removes markdown formatting from content
export async function getSortedArticles(preview = false): Promise<TArticle[]> {
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
          ? stripMarkdown(matterResult.content)
          : matterResult.content,
      }
    })
  )

  return allArticlesData.sort((a, b) => {
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
}

// group articles by category
// preview: if true, removes markdown formatting from content
export async function getCategorizedArticles(
  preview = false
): Promise<Record<string, TArticle[]>> {
  const sortedArticles = await getSortedArticles(preview)
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
  const fullPath = path.join(articlesDirectory, `${slug}.md`)

  // check if file exists
  if (
    !(await fs
      .access(fullPath)
      .then(() => true)
      .catch(() => false))
  ) {
    return
  }

  try {
    const fileContents = await fs.readFile(fullPath, "utf-8")

    const matterResult = matter(fileContents)

    // convert markdown to html
    const processedContent = await remark()
      .use(gfm)
      .use(toc)
      .use(html)
      .use(rehypeSlug)
      .use(rehypeHighlight)
      .process(matterResult.content)

    const contentHtml = processedContent.toString()

    return {
      id: slug,
      title: matterResult.data.title,
      content: contentHtml,
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
  const sortedArticles = await getSortedArticles(true)
  return sortedArticles.slice(0, limit)
}
