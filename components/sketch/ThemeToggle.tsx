"use client";

import { useTheme } from "next-themes";
import { Moon, Sun } from "lucide-react";
import { useMounted } from "@/lib/useMounted";

export default function ThemeToggle() {
  const { theme, setTheme } = useTheme();
  const mounted = useMounted();

  return (
    <button
      type="button"
      onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
      aria-label="Toggle theme"
      className="inline-flex h-11 w-11 items-center justify-center border-2 border-[var(--sk-ink)] text-[var(--sk-ink)] transition-colors duration-200 hover:bg-[var(--sk-ink)] hover:text-[var(--sk-bg)] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--sk-accent-ink)]"
    >
      {mounted ? (
        theme === "dark" ? (
          <Sun className="h-4 w-4" strokeWidth={2} />
        ) : (
          <Moon className="h-4 w-4" strokeWidth={2} />
        )
      ) : null}
    </button>
  );
}
