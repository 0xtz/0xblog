import { ModeToggle } from "./mode-toggle"

export default function NavBar() {
  return (
    <nav className="fixed right-0 bottom-0 z-50 flex w-fit justify-end p-4">
      <ModeToggle />
    </nav>
  )
}
