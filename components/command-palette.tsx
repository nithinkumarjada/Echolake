"use client";

import { useEffect, useMemo, useState } from "react";
import { Search, X } from "lucide-react";
import { AnimatePresence, motion } from "@/components/motion";

const commands = [
  "About",
  "Skills",
  "Experience",
  "Projects",
  "Certifications",
  "Education",
  "GitHub",
  "Blog",
  "Resume",
  "Contact"
];

export function CommandPalette({ open, onClose }: { open: boolean; onClose: () => void }) {
  const [query, setQuery] = useState("");
  const filtered = useMemo(
    () => commands.filter((item) => item.toLowerCase().includes(query.toLowerCase())),
    [query]
  );

  useEffect(() => {
    const onKey = (event: KeyboardEvent) => {
      if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === "k") {
        event.preventDefault();
        if (open) onClose();
      }
      if (event.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [onClose, open]);

  return (
    <AnimatePresence>
      {open ? (
        <motion.div
          className="fixed inset-0 z-50 grid place-items-start bg-black/40 p-4 pt-28 backdrop-blur-sm"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
        >
          <motion.div
            role="dialog"
            aria-modal="true"
            aria-label="Search portfolio"
            className="glass mx-auto w-full max-w-2xl overflow-hidden rounded-3xl"
            initial={{ y: -20, scale: 0.98 }}
            animate={{ y: 0, scale: 1 }}
            exit={{ y: -20, scale: 0.98 }}
            onClick={(event) => event.stopPropagation()}
          >
            <div className="flex items-center gap-3 border-b border-[rgba(var(--line),0.8)] px-4 py-3">
              <Search size={20} aria-hidden="true" />
              <input
                autoFocus
                value={query}
                onChange={(event) => setQuery(event.target.value)}
                placeholder="Search sections, projects, skills..."
                className="w-full bg-transparent py-2 text-base outline-none"
              />
              <button type="button" onClick={onClose} aria-label="Close command palette">
                <X size={20} />
              </button>
            </div>
            <div className="max-h-80 overflow-auto p-2">
              {filtered.map((item) => (
                <a
                  key={item}
                  href={`#${item.toLowerCase()}`}
                  onClick={onClose}
                  className="block rounded-2xl px-4 py-3 font-semibold transition hover:bg-black/5 dark:hover:bg-white/10"
                >
                  {item}
                </a>
              ))}
            </div>
          </motion.div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}
