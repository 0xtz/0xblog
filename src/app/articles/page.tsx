import type { Metadata } from "next"
import { Badge } from "@/components/ui/badge"
import { getSortedArticles } from "@/lib/articles"
import { generateArticlesListSEO } from "@/lib/seo"
import ArticleListItem from "../_components/article-list"

export const metadata: Metadata = generateArticlesListSEO()

export default async function ArticlesPage() {
  const articles = await getSortedArticles(true)

  return (
    <section className="py-32">
      <div className="container mx-auto flex flex-col items-center gap-16 lg:px-16">
        <div className="text-center">
          <Badge className="mb-6" variant="secondary">
            Latest Updates
          </Badge>

          <h2 className="mb-3 text-pretty font-semibold text-3xl md:mb-4 md:text-4xl lg:mb-6 lg:max-w-3xl lg:text-5xl">
            Blog Posts
          </h2>

          <p className="mb-8 text-muted-foreground md:text-base lg:max-w-2xl lg:text-lg">
            Discover the latest trends, tips, and best practices in modern web
            development. From UI components to design systems, stay updated with
            our expert insights.
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 lg:gap-8">
          {articles.map((article) => (
            <ArticleListItem article={article} key={article.id} />
          ))}
        </div>
      </div>
    </section>
  )
}
