"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { FaBars, FaChevronDown, FaTimes } from "react-icons/fa";

import ThemeToggle from "./ThemeToggle";

const navLinkClass = "transition hover:text-stone-900 dark:hover:text-white";

export default function SiteHeader({ employers = [] }) {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [workOpen, setWorkOpen] = useState(false);
  const [mobileWorkOpen, setMobileWorkOpen] = useState(false);
  const closeTimer = useRef(null);

  useEffect(() => {
    return () => {
      if (closeTimer.current) {
        clearTimeout(closeTimer.current);
      }
    };
  }, []);

  function openWork() {
    if (closeTimer.current) {
      clearTimeout(closeTimer.current);
    }
    setWorkOpen(true);
  }

  function scheduleCloseWork() {
    closeTimer.current = setTimeout(() => setWorkOpen(false), 150);
  }

  return (
    <header className="sticky top-0 z-20 border-b border-stone-900/10 bg-stone-50/80 backdrop-blur dark:border-white/10 dark:bg-stone-950/80">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4 lg:px-8">
        <Link href="/" className="text-lg font-semibold uppercase tracking-[0.2em] text-stone-900 dark:text-white">
          Ryan Hurd
        </Link>

        <div className="hidden items-center gap-4 text-sm text-stone-600 dark:text-stone-300 md:flex">
          <Link href="/#about" className={navLinkClass}>
            About
          </Link>
          <Link href="/#experience" className={navLinkClass}>
            Experience
          </Link>
          <Link href="/#education" className={navLinkClass}>
            Education
          </Link>

          <div className="relative" onMouseEnter={openWork} onMouseLeave={scheduleCloseWork}>
            <button
              type="button"
              className={`flex items-center gap-1 ${navLinkClass}`}
              aria-haspopup="menu"
              aria-expanded={workOpen}
              onClick={() => setWorkOpen((open) => !open)}
              onFocus={openWork}
            >
              Work
              <FaChevronDown className={`text-xs transition-transform ${workOpen ? "rotate-180" : ""}`} />
            </button>
            {workOpen && employers.length > 0 && (
              <div
                role="menu"
                className="absolute left-0 top-full mt-2 w-64 rounded-2xl border border-stone-900/10 bg-white/95 p-2 shadow-xl backdrop-blur dark:border-white/10 dark:bg-stone-900/95"
                onFocus={openWork}
                onBlur={scheduleCloseWork}
              >
                {employers.map((employer) => (
                  <Link
                    key={employer.slug}
                    href={`/experience/${employer.slug}`}
                    role="menuitem"
                    className="block rounded-xl px-3 py-2 text-sm text-stone-600 transition hover:bg-stone-900/5 hover:text-stone-900 dark:text-stone-300 dark:hover:bg-white/5 dark:hover:text-white"
                    onClick={() => setWorkOpen(false)}
                  >
                    {employer.name}
                  </Link>
                ))}
              </div>
            )}
          </div>

          <a href="https://blog.hurd.cc/blog/" target="_blank" rel="noreferrer" className={navLinkClass}>
            Blog
          </a>
          <a href="https://blog.hurd.cc/recipes/" target="_blank" rel="noreferrer" className={navLinkClass}>
            Recipes
          </a>
          <Link href="/volunteer" className={navLinkClass}>
            Volunteer
          </Link>
          <Link href="/#contact" className={navLinkClass}>
            Contact
          </Link>
        </div>

        <div className="flex items-center gap-2">
          <ThemeToggle />

          <button
            type="button"
            className="inline-flex items-center justify-center rounded-full border border-stone-900/10 p-2 text-stone-700 dark:border-white/10 dark:text-stone-200 md:hidden"
            onClick={() => setMobileOpen((open) => !open)}
            aria-label="Toggle menu"
          >
            {mobileOpen ? <FaTimes /> : <FaBars />}
          </button>
        </div>
      </div>

      {mobileOpen && (
        <div className="border-t border-stone-900/10 px-6 py-4 dark:border-white/10 md:hidden">
          <div className="flex flex-col gap-3 text-sm text-stone-600 dark:text-stone-300">
            <Link href="/#about" className={navLinkClass} onClick={() => setMobileOpen(false)}>
              About
            </Link>
            <Link href="/#experience" className={navLinkClass} onClick={() => setMobileOpen(false)}>
              Experience
            </Link>
            <Link href="/#education" className={navLinkClass} onClick={() => setMobileOpen(false)}>
              Education
            </Link>

            <div>
              <button
                type="button"
                className="flex w-full items-center justify-between text-left"
                aria-expanded={mobileWorkOpen}
                onClick={() => setMobileWorkOpen((open) => !open)}
              >
                Work
                <FaChevronDown className={`text-xs transition-transform ${mobileWorkOpen ? "rotate-180" : ""}`} />
              </button>
              {mobileWorkOpen && (
                <div className="mt-2 flex flex-col gap-2 border-l border-stone-900/10 pl-4 dark:border-white/10">
                  {employers.map((employer) => (
                    <Link
                      key={employer.slug}
                      href={`/experience/${employer.slug}`}
                      className="text-stone-500 transition hover:text-stone-900 dark:text-stone-400 dark:hover:text-white"
                      onClick={() => setMobileOpen(false)}
                    >
                      {employer.name}
                    </Link>
                  ))}
                </div>
              )}
            </div>

            <a
              href="https://blog.hurd.cc/blog/"
              target="_blank"
              rel="noreferrer"
              className={navLinkClass}
              onClick={() => setMobileOpen(false)}
            >
              Blog
            </a>
            <a
              href="https://blog.hurd.cc/recipes/"
              target="_blank"
              rel="noreferrer"
              className={navLinkClass}
              onClick={() => setMobileOpen(false)}
            >
              Recipes
            </a>
            <Link href="/volunteer" className={navLinkClass} onClick={() => setMobileOpen(false)}>
              Volunteer
            </Link>
            <Link href="/#contact" className={navLinkClass} onClick={() => setMobileOpen(false)}>
              Contact
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
