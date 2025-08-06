import dynamic from "next/dynamic"
import HeroSection from "./_components/sections/hero-section"

const LatestBlogsSection = dynamic(() =>
  import("./_components/sections/latest-blogs-section").then(
    (mod) => mod.LatestBlogsSection
  )
)

export default function HomePage() {
  return (
    <>
      <HeroSection />

      <LatestBlogsSection />
    </>
  )
}
