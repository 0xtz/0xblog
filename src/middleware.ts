import { type NextRequest, NextResponse } from "next/server"

const allowedOrigins = [
  "https://0xtz.me",
  "https://blog.0xtz.me",
  "0xblog-rose.vercel.app",
]

export function middleware(request: NextRequest) {
  const requestHeaders = new Headers(request.headers)
  const origin = requestHeaders.get("origin") ?? ""

  const response = NextResponse.next({
    request: {
      headers: requestHeaders,
    },
  })

  if (allowedOrigins.includes(origin)) {
    requestHeaders.set("Access-Control-Allow-Origin", origin)
  }

  response.headers.set("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE")
  response.headers.set("Access-Control-Allow-Headers", "Content-Type")

  return response
}
