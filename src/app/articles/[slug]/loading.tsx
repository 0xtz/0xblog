import { ChevronLeft } from "lucide-react"
import Link from "next/link"
import { Avatar, AvatarImage } from "@/components/ui/avatar"
import { Skeleton } from "@/components/ui/skeleton"

export default function Loading() {
  return (
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
            <Skeleton className="h-[1000px] w-full" />
          </article>
        </div>

        <aside className="top-10 order-1 h-fit flex-shrink-0 lg:sticky lg:order-2 lg:w-[300px] xl:w-[400px]">
          <Skeleton className="h-10 w-full" />

          <Skeleton className="h-10 w-full" />

          <div className="flex items-center gap-3">
            <Avatar className="size-7 rounded-full">
              <AvatarImage
                alt="placeholder"
                src="https://deifkwefumgah.cloudfront.net/shadcnblocks/block/avatar-1.webp"
              />
            </Avatar>

            <div>
              <h2 className="font-semibold">0xtz</h2>
              <p className="text-muted-foreground text-xs">...</p>
            </div>
          </div>
        </aside>
      </div>
    </section>
  )
}
