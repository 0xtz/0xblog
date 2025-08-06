import { ArrowRight } from "lucide-react"

import Link from "next/link"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { getLatestArticles } from "@/lib/articles"
import ArticleListItem from "../article-list"

// blog8 ?!?
export function LatestBlogsSection() {
  const articles = getLatestArticles()

  return (
    <section className="py-32">
      <div className="container mx-auto flex flex-col items-center gap-16 lg:px-16">
        <div className="text-center">
          <Badge className="mb-6" variant="secondary">
            Latest Blog Posts
          </Badge>

          <h2 className="mb-3 text-pretty font-semibold text-3xl md:mb-4 md:text-4xl lg:mb-6 lg:max-w-3xl lg:text-5xl">
            Blog Posts
          </h2>

          <Button asChild className="w-full sm:w-auto" variant="link">
            <Link href="/articles">
              View all articles
              <ArrowRight className="ml-2 size-4" />
            </Link>
          </Button>
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
