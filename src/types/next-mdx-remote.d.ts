declare module "next-mdx-remote/rsc" {
  import type { ComponentType } from "react"

  export function MDXRemote(props: {
    source: string
    options?: {
      mdxOptions?: {
        remarkPlugins?: unknown[]
        rehypePlugins?: unknown[]
      }
    }
    // biome-ignore lint/suspicious/noExplicitAny: MDX component mapping requires permissive prop typing
    components?: Record<string, ComponentType<any>>
  }): JSX.Element
}
