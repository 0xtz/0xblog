import { ExternalLink } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { Button, buttonVariants } from "@/components/ui/button"
import { cn } from "@/lib/utils"

export default function HeroSection() {
  return (
    <section className="relative overflow-hidden py-32">
      <div className="absolute inset-x-0 top-0 flex h-full w-full items-center justify-center opacity-100">
        <Image
          alt="background"
          className="opacity-90 [mask-image:radial-gradient(75%_75%_at_center,white,transparent)]"
          fill
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
            <Link href="/articles">Read more ...</Link>
          </Button>

          <Button asChild className="group" variant="outline">
            <Link
              href="https://0xtz.me"
              rel="noopener noreferrer"
              target="_blank"
            >
              About me
              <ExternalLink className="ml-2 h-4 transition-transform group-hover:translate-x-0.5" />
            </Link>
          </Button>
        </div>

        <div className="flex flex-col items-center gap-5">
          <p className="font-medium text-muted-foreground text-sm lg:text-left">
            Built with open-source technologies
          </p>

          <div className="flex flex-wrap items-center justify-center gap-4">
            <a
              className={cn(
                buttonVariants({ variant: "outline" }),
                "group flex aspect-square h-12 items-center justify-center p-0"
              )}
              href="#"
            >
              <Image
                alt="shadcn/ui logo"
                className="h-6 saturate-0 transition-all group-hover:saturate-100"
                height={100}
                src="https://deifkwefumgah.cloudfront.net/shadcnblocks/block/logos/shadcn-ui-icon.svg"
                width={100}
              />
            </a>
            <a
              className={cn(
                buttonVariants({ variant: "outline" }),
                "group flex aspect-square h-12 items-center justify-center p-0"
              )}
              href="#"
            >
              <Image
                alt="TypeScript logo"
                className="h-6 saturate-0 transition-all group-hover:saturate-100"
                height={100}
                src="https://deifkwefumgah.cloudfront.net/shadcnblocks/block/logos/typescript-icon.svg"
                width={100}
              />
            </a>

            <a
              className={cn(
                buttonVariants({ variant: "outline" }),
                "group flex aspect-square h-12 items-center justify-center p-0"
              )}
              href="#"
            >
              <Image
                alt="React logo"
                className="h-6 saturate-0 transition-all group-hover:saturate-100"
                height={100}
                src="https://deifkwefumgah.cloudfront.net/shadcnblocks/block/logos/react-icon.svg"
                width={100}
              />
            </a>
            <a
              className={cn(
                buttonVariants({ variant: "outline" }),
                "group flex aspect-square h-12 items-center justify-center p-0"
              )}
              href="#"
            >
              <Image
                alt="Tailwind CSS logo"
                className="h-6 saturate-0 transition-all group-hover:saturate-100"
                height={100}
                src="https://deifkwefumgah.cloudfront.net/shadcnblocks/block/logos/tailwind-icon.svg"
                width={100}
              />
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}
