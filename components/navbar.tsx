"use client";

import { useEffect, useState } from "react";
import { Command, Download, Menu, Moon, Search, Sun, X } from "lucide-react";
import { useTheme } from "next-themes";
import { motion, useScroll, useSpring } from "@/components/motion";
import { profile } from "@/lib/portfolio-data";

const links = ["About", "Skills", "Experience", "Projects", "GitHub", "Blog", "Contact"];

export function Navbar({ onCommand }: { onCommand: () => void }) {
  const [open, setOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const { theme, setTheme } = useTheme();
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 120, damping: 24 });

  useEffect(() => setMounted(true), []);

  return (
    <>
      <motion.div
        aria-hidden="true"
        className="fixed left-0 top-0 z-50 h-1 w-full origin-left bg-gradient-to-r from-cyanx via-mintx to-coralx"
        style={{ scaleX }}
      />
      <header className="fixed inset-x-0 top-3 z-40 px-4">
        <nav className="glass mx-auto flex max-w-7xl items-center justify-between rounded-full px-4 py-3">
          <a href="#home" className="flex items-center gap-3 font-display font-bold">
            <span className="grid size-10 place-items-center rounded-full bg-ink text-sm text-mintx dark:bg-white dark:text-ink">
              NJ
            </span>
            <span className="hidden sm:inline">{profile.name}</span>
          </a>

          <div className="hidden items-center gap-1 lg:flex">
            {links.map((link) => (
              <a
                key={link}
                href={`#${link.toLowerCase()}`}
                className="rounded-full px-4 py-2 text-sm font-semibold text-[rgb(var(--muted))] transition hover:bg-black/5 hover:text-[rgb(var(--foreground))] dark:hover:bg-white/10"
              >
                {link}
              </a>
            ))}
          </div>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={onCommand}
              className="hidden rounded-full border border-[rgba(var(--line),0.85)] p-2.5 transition hover:bg-black/5 dark:hover:bg-white/10 sm:grid"
              aria-label="Open command palette"
              title="Command palette"
            >
              <Command size={18} />
            </button>
            <button
              type="button"
              onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
              className="grid rounded-full border border-[rgba(var(--line),0.85)] p-2.5 transition hover:bg-black/5 dark:hover:bg-white/10"
              aria-label="Toggle color theme"
              title="Toggle theme"
            >
              {mounted && theme === "dark" ? <Sun size={18} /> : <Moon size={18} />}
            </button>
            <a
              href={profile.resume}
              download
              className="hidden items-center gap-2 rounded-full bg-ink px-4 py-2.5 text-sm font-bold text-white transition hover:-translate-y-0.5 hover:shadow-glow dark:bg-white dark:text-ink md:flex"
            >
              <Download size={17} />
              Resume
            </a>
            <button
              type="button"
              onClick={() => setOpen((value) => !value)}
              className="grid rounded-full border border-[rgba(var(--line),0.85)] p-2.5 lg:hidden"
              aria-label="Toggle menu"
              aria-expanded={open}
            >
              {open ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </nav>
        {open ? (
          <div className="glass mx-auto mt-2 grid max-w-7xl gap-1 rounded-3xl p-3 lg:hidden">
            {links.map((link) => (
              <a
                key={link}
                href={`#${link.toLowerCase()}`}
                onClick={() => setOpen(false)}
                className="rounded-2xl px-4 py-3 font-semibold"
              >
                {link}
              </a>
            ))}
            <button
              type="button"
              onClick={() => {
                setOpen(false);
                onCommand();
              }}
              className="flex items-center gap-2 rounded-2xl px-4 py-3 font-semibold"
            >
              <Search size={18} />
              Search portfolio
            </button>
          </div>
        ) : null}
      </header>
    </>
  );
}
