import { ArrowRight } from "lucide-react"

import Link from "next/link"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Skeleton } from "@/components/ui/skeleton"
import { getLatestArticles } from "@/lib/articles"
import ArticleListItem from "../article-list"

// blog8 ?!?
export async function LatestBlogsSection() {
  const articles = await getLatestArticles()

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
            <Link aria-label="View all articles" href="/articles">
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

export function LatestBlogsSectionSkeleton() {
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
            <Link aria-label="View all articles" href="/articles">
              View all articles
              <ArrowRight className="ml-2 size-4" />
            </Link>
          </Button>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 lg:gap-8">
          {Array.from({ length: 3 }).map((_, index) => (
            <div
              className="grid grid-rows-[auto_auto_1fr_auto] pt-0"
              key={index}
            >
              <Skeleton className="aspect-16/9 w-full" />

              <div className="p-6">
                <Skeleton className="mb-2 h-6 w-full" />
                <Skeleton className="mb-2 h-6 w-3/4" />
              </div>

              <div className="px-6">
                <Skeleton className="mb-2 h-4 w-full" />
                <Skeleton className="mb-2 h-4 w-full" />
                <Skeleton className="h-4 w-2/3" />
              </div>

              <div className="p-6">
                <Skeleton className="h-4 w-24" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
