import { ImageResponse } from "next/og"
import type { NextRequest } from "next/server"

// Route segment config
export const runtime = "edge"

// Define a function to handle GET requests
export function GET(req: NextRequest) {
  // Extract title from query parameters
  const { searchParams } = req.nextUrl
  const postTitle = searchParams.get("title") || "0xBlog"

  // Create an ImageResponse with dynamic content
  return new ImageResponse(
    <div
      style={{
        height: "100%",
        display: "flex",
        width: "100%",
        textAlign: "center",
        alignItems: "center",
        justifyContent: "center",
        flexDirection: "column",
        flexWrap: "nowrap",
        background: "linear-gradient(135deg, #1f2937 0%, #374151 100%)",
        padding: "40px",
      }}
    >
      {/* Background decorative elements */}
      <div
        style={{
          position: "absolute",
          top: "20px",
          right: "20px",
          width: "100px",
          height: "100px",
          borderRadius: "50%",
          background: "linear-gradient(45deg, #3b82f6, #8b5cf6)",
          opacity: "0.1",
        }}
      />
      <div
        style={{
          position: "absolute",
          bottom: "20px",
          left: "20px",
          width: "80px",
          height: "80px",
          borderRadius: "50%",
          background: "linear-gradient(45deg, #10b981, #3b82f6)",
          opacity: "0.1",
        }}
      />

      {/* Main content */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontSize: 72,
          fontWeight: "bold",
          lineHeight: "1",
          marginBottom: "20px",
        }}
      >
        <span
          style={{
            color: "#3b82f6",
          }}
        >
          0
        </span>
        <span
          style={{
            color: "#f3f4f6",
          }}
        >
          xBlog
        </span>
      </div>

      <div
        style={{
          display: "flex",
          fontSize: 48,
          fontStyle: "normal",
          lineHeight: "1.2",
          whiteSpace: "pre-wrap",
          maxWidth: "1000px",
          textAlign: "center",
          marginBottom: "20px",
        }}
      >
        <span
          style={{
            color: "#f3f4f6",
            fontWeight: "600",
          }}
        >
          {postTitle}
        </span>
      </div>

      <div
        style={{
          display: "flex",
          fontSize: 24,
          color: "#9ca3af",
          marginTop: "20px",
        }}
      >
        Tech & Development Blog
      </div>
    </div>,
    // ImageResponse options
    {
      width: 1200,
      height: 630,
    }
  )
}
