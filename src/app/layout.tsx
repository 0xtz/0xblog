import type { Metadata } from "next"
import { Geist_Mono, Martian_Mono } from "next/font/google"

import "./globals.css"
import dynamic from "next/dynamic"
import NavBar from "@/components/nav-bar"
import { ThemeProvider } from "@/providers/theme-provider"
import { Banner } from "./_components/banner"

const AppFooter = dynamic(() =>
  import("@/components/footer").then((mod) => mod.default)
)

const martianMono = Martian_Mono({
  variable: "--font-mono",
  subsets: ["latin"],
})

const geistMono = Geist_Mono({
  variable: "--font-sans",
  subsets: ["latin"],
})

export const metadata: Metadata = {
  title: "0xBlog",
  description: "0xBlog is a blog about tech & things.",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${martianMono.variable} ${geistMono.variable} relative antialiased`}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          disableTransitionOnChange
          enableSystem
        >
          <Banner />

          <NavBar />

          {children}

          <AppFooter />
        </ThemeProvider>
      </body>
    </html>
  )
}
