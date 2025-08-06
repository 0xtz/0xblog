import Link from "next/link"
import { Button } from "@/components/ui/button"

export default function NotFound() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-background">
      <div className="mx-auto max-w-md space-y-6 px-4 text-center">
        {/* 404 number */}
        <div className="space-y-2">
          <h1 className="font-bold text-9xl text-muted-foreground">404</h1>
          <h2 className="font-semibold text-2xl text-foreground">
            page not found
          </h2>
        </div>

        {/* description */}
        <p className="text-muted-foreground">
          sorry, the page you're looking for doesn't exist or has been moved.
        </p>

        {/* action buttons */}
        <div className="flex flex-col justify-center gap-3 sm:flex-row">
          <Button aria-label="Go to homepage" asChild>
            <Link aria-label="Go to homepage" href="/">
              go home
            </Link>
          </Button>

          <Button aria-label="Browse articles" asChild variant="outline">
            <Link aria-label="Browse articles" href="/articles">
              browse articles
            </Link>
          </Button>
        </div>
      </div>
    </div>
  )
}
