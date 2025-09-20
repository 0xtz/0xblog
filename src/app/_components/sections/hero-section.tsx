import { ExternalLink } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

export default function HeroSection() {
  return (
    <section className="relative overflow-hidden py-32">
      <div className="absolute inset-x-0 top-0 flex h-full w-full items-center justify-center opacity-100">
        <Image
          alt="background"
          className="opacity-90 [mask-image:radial-gradient(75%_75%_at_center,white,transparent)]"
          fill
          priority
          // spacial thanks to ShadcnBlocks 🙏🙏🙏
          src="https://deifkwefumgah.cloudfront.net/shadcnblocks/block/patterns/square-alt-grid.svg"
        />
      </div>

      <div
        className={cn(
          "flex flex-col items-center gap-12 pt-12 text-center xl:gap-24 xl:pt-24",
          "container relative z-10 mx-auto max-w-5xl"
        )}
      >
        <div>
          <h1 className="mb-6 text-pretty font-bold text-2xl tracking-tight lg:text-5xl">
            Thoughts, Code & <span className="text-primary">Chaos.</span>
          </h1>
          <p className="mx-auto max-w-3xl text-muted-foreground text-sm lg:text-base">
            Writing about the things I build, break, fix, and figure out. one
            commit at a time. and the path to learning new things.
          </p>
        </div>

        <div className="flex justify-center gap-3">
          <Button asChild className="shadow-sm transition-shadow hover:shadow">
            <Link aria-label="Read more articles" href="/articles">
              Read more ...
            </Link>
          </Button>

          <Button asChild className="group" variant="outline">
            <Link
              aria-label="About me"
              href="https://0xtz.me"
              rel="noopener noreferrer"
              target="_blank"
            >
              About me
              <ExternalLink className="ml-2 h-4 transition-transform group-hover:translate-x-0.5" />
            </Link>
          </Button>
        </div>
      </div>
    </section>
  )
}
