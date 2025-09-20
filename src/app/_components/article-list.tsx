import { ArrowRight } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { unstable_ViewTransition as ViewTransition } from "react"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card"
import type { TArticle } from "@/lib/types"

export default function ArticleListItem({ article }: { article: TArticle }) {
  return (
    <Card className="grid grid-rows-[auto_auto_1fr_auto] pt-0">
      <div className="relative aspect-16/9 w-full">
        <Badge
          className="pointer-events-none absolute top-4 left-4 z-10"
          variant="secondary"
        >
          {article.category}
        </Badge>

        <Link
          aria-label={`Read the full article ${article.title}`}
          className="fade-in transition-opacity duration-200 hover:opacity-70"
          href={`/articles/${article.id}`}
        >
          <Image
            alt={article.title}
            className="h-full w-full object-cover object-center"
            height={100}
            src="https://ui.shadcn.com/placeholder.svg"
            width={100}
          />
        </Link>
      </div>

      <CardHeader className="flex-shrink-0">
        <ViewTransition exit="auto" name={`article-list-title-${article.id}`}>
          <h3 className="text-balance font-semibold text-lg hover:underline md:text-xl">
            <Link
              aria-label={`Read the full article ${article.title}`}
              href={`/articles/${article.id}`}
            >
              {article.title}
            </Link>
          </h3>
        </ViewTransition>
      </CardHeader>

      <CardContent className="min-h-0 w-full flex-1 space-y-4">
        <p className="line-clamp-3 text-pretty text-muted-foreground">
          {article.content}
        </p>
      </CardContent>

      <CardFooter className="flex-shrink-0">
        <Link
          aria-label={`Read the full article ${article.title}`}
          className="flex items-center text-foreground hover:underline"
          href={`/articles/${article.id}`}
        >
          Read full article
          <ArrowRight className="ml-2 size-4" />
        </Link>
      </CardFooter>
    </Card>
  )
}
