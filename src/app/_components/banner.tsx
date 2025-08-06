"use client"

import { X } from "lucide-react"
import { type ReactElement, useState } from "react"
import { Button } from "@/components/ui/button"

export function Banner({
  title = "V0 is now available!",
  description = "We'll release moreeee soooon",
  defaultVisible = true,
  children,
}: Readonly<
  Partial<{
    title: string
    description: string
    defaultVisible?: boolean
    children: ReactElement
  }>
>) {
  // localStorag | cookies soon
  const [isVisible, setIsVisible] = useState(defaultVisible)

  if (!isVisible) {
    return null
  }

  return (
    <section className="w-full border-b bg-background px-4 py-3">
      <div className="flex items-center justify-between gap-2">
        <div className="flex-1 text-center">
          <span className="text-sm">
            <span className="font-medium">{title}</span>{" "}
            <span className="text-muted-foreground">
              {description} {children}.
            </span>
          </span>
        </div>

        <Button
          aria-label="Close banner"
          className="-mr-2 h-8 w-8 flex-none"
          onClick={() => {
            setIsVisible(false)
          }}
          size="icon"
          variant="ghost"
        >
          <X className="h-4 w-4" />
        </Button>
      </div>
    </section>
  )
}
