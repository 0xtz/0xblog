import { type NextRequest, NextResponse } from "next/server"

const allowedOrigins = [
  "http://localhost:9990",
  "https://0xtz.me",
  "https://blog.0xtz.me",
  "https://0xblog-rose.vercel.app",
]

export function middleware(request: NextRequest) {
  const requestHeaders = new Headers(request.headers)
  const origin = requestHeaders.get("origin") ?? ""

  // Handle CORS preflight OPTIONS requests
  if (request.method === "OPTIONS") {
    const response = new NextResponse(null, { status: 200 })

    // Set CORS headers for preflight
    if (allowedOrigins.includes(origin)) {
      response.headers.set("Access-Control-Allow-Origin", origin)
    }

    response.headers.set(
      "Access-Control-Allow-Methods",
      "GET, POST, PUT, DELETE, OPTIONS"
    )
    response.headers.set(
      "Access-Control-Allow-Headers",
      "Content-Type, Authorization"
    )
    response.headers.set("Access-Control-Max-Age", "86400")

    return response
  }

  const response = NextResponse.next({
    request: {
      headers: requestHeaders,
    },
  })

  // Set CORS headers for all requests
  if (allowedOrigins.includes(origin)) {
    response.headers.set("Access-Control-Allow-Origin", origin)
  }

  response.headers.set("Access-Control-Allow-Methods", "GET, POST, OPTIONS")
  response.headers.set("Access-Control-Allow-Headers", "*")

  return response
}
