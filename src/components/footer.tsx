import Link from "next/link"

export default function AppFooter() {
  const links = [
    {
      href: "/",
      name: "Home",
    },
    {
      href: "/articles",
      name: "Articles",
    },
  ]

  return (
    <div className="container mx-auto mt-32">
      <div className="flex flex-col justify-between gap-4 border-t py-8 font-medium text-muted-foreground text-xs md:flex-row md:items-center md:text-left">
        <p className="order-2 lg:order-1">
          &copy; {new Date().getFullYear()} 0xBlog. All rights reserved. |
          created by{" "}
          <Link
            aria-label="0xtz's website"
            className="bg-gradient-to-r from-sky-400 via-violet-600 to-fuchsia-500 bg-clip-text text-transparent"
            href="https://0xtz.me"
            rel="noopener noreferrer"
            target="_blank"
          >
            0xtz
          </Link>
        </p>

        <ul className="order-1 flex flex-col gap-4 md:order-2 md:flex-row md:gap-8">
          {links.map((link) => (
            <li className="hover:text-primary" key={link.href}>
              <Link aria-label={link.name} href={link.href}>
                {link.name}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}
