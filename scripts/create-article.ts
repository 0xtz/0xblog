#!/usr/bin/env node

import { existsSync, mkdirSync, writeFileSync } from "node:fs"
import { join } from "node:path"

function createArticle(articleTitle: string) {
  // Get current date in DD-MM-YYYY format
  const now = new Date()
  const date = now
    .toLocaleDateString("en-GB", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    })
    .split("/")
    .join("-")

  // Convert title to filename
  const filename = articleTitle
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, "") // Remove special characters except spaces and hyphens
    .replace(/\s+/g, "-") // Replace spaces with hyphens
    .replace(/-+/g, "-") // Replace multiple hyphens with single
    .trim()

  // Create frontmatter
  const frontmatter = `---
title: "${articleTitle}"
category: "tech"
date: "${date}"
---

# ${articleTitle}

Write your article content here...

## Introduction

Start with an introduction to your topic.

## Main Content

Add your main content here with proper markdown formatting.

## Conclusion

Wrap up your article with a conclusion.

`

  // Ensure articles directory exists
  const articlesDir = join(process.cwd(), "articles")
  if (!existsSync(articlesDir)) {
    mkdirSync(articlesDir, { recursive: true })
  }

  // Create file path
  const filePath = join(articlesDir, `${filename}.md`)

  // Check if file already exists
  if (existsSync(filePath)) {
    console.error(`❌ Article "${filename}.md" already exists!`)
    process.exit(1)
  }

  // Write the file
  writeFileSync(filePath, frontmatter, "utf8")

  console.log(`✅ Created article: articles/${filename}.md`)
  console.log(`📝 Title: "${articleTitle}"`)
  console.log(`📅 Date: ${date}`)
  console.log(
    "\n🚀 Ready to write! Open the file and start writing your article."
  )
}

// Get title from command line arguments
const title = process.argv[2]

if (!title) {
  console.error("❌ Please provide a title for the article!")
  console.log('Usage: npm run create-article "Your Article Title"')
  console.log('   or: npx tsx scripts/create-article.ts "Your Article Title"')
  process.exit(1)
}

createArticle(title)
