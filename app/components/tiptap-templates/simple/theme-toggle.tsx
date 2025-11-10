import { Button } from "~/components/tiptap-ui-primitive/button"
import { SunIcon } from "~/components/tiptap-icons/sun-icon"

export function ThemeToggle() {
  // Luôn xóa class 'dark' khỏi document
  if (typeof document !== "undefined") {
    document.documentElement.classList.remove("dark")
  }

  return (
    <Button aria-label="Theme is always light" data-style="ghost" disabled>
      <SunIcon className="tiptap-button-icon" />
      {/* Có thể thêm text: Light */}
    </Button>
  )
}
