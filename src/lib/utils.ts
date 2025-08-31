import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function stripMarkdown(text: string): string {
  return (
    text
      // Remove headers (# ## ### etc.)
      .replace(/^#{1,6}\s+/gm, "")
      // Remove bold (**text** or __text__)
      .replace(/\*\*(.*?)\*\*/g, "$1")
      .replace(/__(.*?)__/g, "$1")
      // Remove italic (*text* or _text_)
      .replace(/\*(.*?)\*/g, "$1")
      .replace(/_(.*?)_/g, "$1")
      // Remove code blocks (```text```)
      .replace(/```[\s\S]*?```/g, "")
      // Remove inline code (`text`)
      .replace(/`([^`]+)`/g, "$1")
      // Remove links [text](url)
      .replace(/\[([^\]]+)\]\([^)]+\)/g, "$1")
      // Remove images ![alt](url)
      .replace(/!\[([^\]]*)\]\([^)]+\)/g, "")
      // Remove blockquotes (> text)
      .replace(/^>\s+/gm, "")
      // Remove horizontal rules (--- or ***)
      .replace(/^[-*_]{3,}$/gm, "")
      // Remove list markers (- * + 1. 2. etc.)
      .replace(/^[\s]*[-*+]\s+/gm, "")
      .replace(/^[\s]*\d+\.\s+/gm, "")
      // Remove strikethrough (~~text~~)
      .replace(/~~(.*?)~~/g, "$1")
      // Clean up extra whitespace
      .replace(/\n\s*\n/g, "\n")
      .trim()
  )
}

export const BASE_URL = "https://blog.0xtz.me"
