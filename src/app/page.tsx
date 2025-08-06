import dynamic from "next/dynamic"
import { Suspense } from "react"
import HeroSection from "./_components/sections/hero-section"

const LatestBlogsSection = dynamic(() =>
  import("./_components/sections/latest-blogs-section").then(
    (mod) => mod.LatestBlogsSection
  )
)

const LatestBlogsSectionSkeleton = dynamic(() =>
  import("./_components/sections/latest-blogs-section").then(
    (mod) => mod.LatestBlogsSectionSkeleton
  )
)

export default function HomePage() {
  return (
    <>
      <HeroSection />

      <Suspense fallback={<LatestBlogsSectionSkeleton />}>
        <LatestBlogsSection />
      </Suspense>
    </>
  )
}
