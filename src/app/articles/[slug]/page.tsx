import { ChevronLeft } from "lucide-react"
import Link from "next/link"
import { notFound } from "next/navigation"
import { unstable_ViewTransition as ViewTransition } from "react"
import { Avatar, AvatarImage } from "@/components/ui/avatar"
import { getArticleBySlug } from "@/lib/articles"

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
    <section className="py-32">
      <div className="container">
        <div className="relative flex flex-col justify-between gap-10 lg:flex-row">
          <div className="order-2 flex w-full flex-col gap-6 lg:order-1">
            <Link
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
            <ViewTransition name="article-title">
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
                <p className="text-muted-foreground text-xs">{article?.date}</p>
              </div>
            </div>
          </aside>
        </div>
      </div>
    </section>
  )
}
