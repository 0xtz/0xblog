import { ChevronLeft } from "lucide-react"
import type { Metadata } from "next"
import Link from "next/link"
import { notFound } from "next/navigation"
import { unstable_ViewTransition as ViewTransition } from "react"
import {
  ArticleStructuredData,
  BreadcrumbStructuredData,
} from "@/components/structured-data"
import { Avatar, AvatarImage } from "@/components/ui/avatar"
import { getArticleBySlug } from "@/lib/articles"
import { generateArticleSEO } from "@/lib/seo"

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

      <section className="py-32">
        <div className="container">
          <div className="relative flex flex-col justify-between gap-10 lg:flex-row">
            <div className="order-2 flex w-full flex-col gap-6 lg:order-1">
              <Link
                aria-label="Return to home"
                className="group mb-5 flex items-center gap-1 text-muted-foreground hover:text-primary"
                href=".."
              >
                <ChevronLeft className="group-hover:-translate-x-1 h-full w-4 transition-transform duration-300" />
                Return to home
              </Link>

              <article
                className="prose dark:prose-invert"
                // biome-ignore lint/security/noDangerouslySetInnerHtml: it's safe
                dangerouslySetInnerHTML={{ __html: article?.content || "" }}
              />
            </div>

            <aside className="top-10 order-1 h-fit flex-shrink-0 lg:sticky lg:order-2 lg:w-[300px] xl:w-[400px]">
              <ViewTransition name={`article-detail-title-${article.id}`}>
                <h1 className="mb-5 text-balance font-bold text-3xl lg:text-4xl">
                  {article?.title}
                </h1>
              </ViewTransition>

              <div className="flex items-center gap-3">
                <Avatar className="size-7 rounded-full">
                  <AvatarImage
                    alt="placeholder"
                    src="https://deifkwefumgah.cloudfront.net/shadcnblocks/block/avatar-1.webp"
                  />
                </Avatar>

                <div>
                  <h2 className="font-semibold">0xtz</h2>
                  <p className="text-muted-foreground text-xs">
                    {article?.date}
                  </p>
                </div>
              </div>
            </aside>
          </div>
        </div>
      </section>
    </>
  )
}
