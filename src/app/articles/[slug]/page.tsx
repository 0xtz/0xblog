import { ChevronLeft } from "lucide-react"
import type { Metadata } from "next"
import Link from "next/link"
import { notFound } from "next/navigation"
import { MDXRemote } from "next-mdx-remote/rsc"
import { Suspense, unstable_ViewTransition as ViewTransition } from "react"
import rehypePrettyCode from "rehype-pretty-code"
import rehypeSlug from "rehype-slug"
import gfm from "remark-gfm"
import toc from "remark-toc"
import ArticleListItem from "@/app/_components/article-list"
import {
  ArticleStructuredData,
  BreadcrumbStructuredData,
} from "@/components/structured-data"
import { Avatar, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Skeleton } from "@/components/ui/skeleton"
import { getArticleBySlug, getSortedArticles } from "@/lib/articles"
import { generateArticleSEO } from "@/lib/seo"

// Custom link component for MDX content
function MDXLink({ href, children, ...props }: React.ComponentProps<"a">) {
  const isExternal = href?.startsWith("http") || href?.startsWith("//")

  if (isExternal) {
    return (
      <a href={href} rel="noopener noreferrer" target="_blank" {...props}>
        {children}
      </a>
    )
  }

  return (
    <a href={href} {...props}>
      {children}
    </a>
  )
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>
}): Promise<Metadata> {
  const slug = (await params).slug
  const article = await getArticleBySlug(slug)

  if (!article) {
    return {
      title: "Article Not Found",
      description: "The requested article could not be found.",
    }
  }

  return generateArticleSEO(article)
}

export default async function ArticlePage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const slug = (await params).slug
  const article = await getArticleBySlug(slug)

  if (!article) {
    notFound()
  }

  return (
    <>
      <ArticleStructuredData article={article} />

      <BreadcrumbStructuredData article={article} />

      <section className="container py-16 lg:py-24">
        <div className="relative flex flex-col justify-between gap-10 lg:flex-row">
          <div className="order-2 flex w-full flex-col gap-6 lg:order-1">
            <Link
              aria-label="Return to articles"
              className="group mb-5 flex items-center gap-1 text-muted-foreground hover:text-primary"
              href="/articles"
            >
              <ChevronLeft className="group-hover:-translate-x-1 h-full w-4 transition-transform duration-300" />
              Return to articles
            </Link>

            <article className="prose dark:prose-invert [&_table]:!block [&_table]:!w-full [&_table]:!overflow-x-auto [&_table]:!max-w-none">
              <MDXRemote
                components={{
                  a: MDXLink,
                }}
                options={{
                  mdxOptions: {
                    remarkPlugins: [gfm, toc],
                    rehypePlugins: [
                      rehypeSlug,
                      [
                        rehypePrettyCode,
                        { theme: "everforest-dark", defaultLang: "typescript" },
                      ],
                    ],
                  },
                }}
                source={article?.content || ""}
              />
            </article>
          </div>

          <aside className="top-10 order-1 h-fit flex-shrink-0 lg:sticky lg:order-2 lg:w-[350px] xl:w-[500px]">
            <ViewTransition name={`article-detail-title-${article.id}`}>
              <h1 className="mb-5 text-balance font-bold text-3xl lg:text-4xl">
                {article?.title}
              </h1>
            </ViewTransition>

            <Badge variant="secondary">{article.category}</Badge>

            <div className="flex items-center gap-3">
              <Avatar className="size-7 rounded-full">
                <AvatarImage
                  alt="placeholder"
                  src="https://deifkwefumgah.cloudfront.net/shadcnblocks/block/avatar-1.webp"
                />
              </Avatar>

              <div>
                <h2 className="font-semibold">0xtz</h2>
                <p className="text-muted-foreground text-xs">{article?.date}</p>
              </div>
            </div>
          </aside>
        </div>
      </section>

      {/* related articles */}
      <Suspense fallback={<RelatedArticlesSkeleton />}>
        <RelatedArticles category={article.category} currentId={article.id} />
      </Suspense>
    </>
  )
}

async function RelatedArticles({
  category,
  currentId,
  limit = 3,
}: {
  category: string
  currentId: string
  limit?: number
}) {
  const articles = await getSortedArticles({
    preview: true,
    category,
    limit: limit + 2,
  })
  const related = articles.filter((a) => a.id !== currentId).slice(0, limit)

  if (related.length === 0) {
    return null
  }

  return (
    <section className="container pb-16 lg:pb-24">
      <div className="flex items-center justify-between gap-4 pb-6">
        <h2 className="text-pretty font-semibold text-2xl md:text-3xl">
          Related Articles
        </h2>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 lg:gap-8">
        {related.map((article) => (
          <ArticleListItem article={article} key={article.id} />
        ))}
      </div>
    </section>
  )
}

function RelatedArticlesSkeleton() {
  return (
    <section className="container pb-16 lg:pb-24">
      <div className="flex items-center justify-between gap-4 pb-6">
        <Skeleton className="h-7 w-48 max-w-full" />
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 lg:gap-8">
        {Array.from({ length: 3 }).map((_, index) => (
          <div className="grid grid-rows-[auto_auto_1fr_auto] pt-0" key={index}>
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
    </section>
  )
}
