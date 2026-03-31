"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useTheme } from "next-themes";
import { Sun, Moon } from "lucide-react";

export default function Navbar() {
  const [isOpen, setIsOpen]     = useState(false);
  const [scrolled, setScrolled] = useState(false);
  // `mounted` guard: prevents SSR/hydration mismatch for the theme toggle icon.
  // On the server, theme is unknown — we only render the icon after mount.
  const [mounted, setMounted]   = useState(false);

  const { theme, resolvedTheme, setTheme } = useTheme();

  useEffect(() => { setMounted(true); }, []);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const isDark = resolvedTheme === "dark";

  const toggleTheme = () => setTheme(isDark ? "light" : "dark");

  return (
    <header className="sticky top-0 z-50 w-full flex justify-center px-4 pt-3.5 pb-0 pointer-events-none">

      {/* ── Glass pill ──────────────────────────────────────────────────────── */}
      <nav
        className={`
          pointer-events-auto w-full max-w-5xl
          flex items-center justify-between
          px-3 py-2 rounded-2xl border
          transition-all duration-300 ease-out
          ${scrolled
            ? "shadow-[0_8px_40px_-4px_rgba(0,0,0,0.12)] dark:shadow-[0_8px_40px_-4px_rgba(0,0,0,0.55)] backdrop-blur-xl bg-white/90 border-slate-200/80 dark:bg-[#07090E]/80 dark:border-white/[0.10]"
            : "backdrop-blur-md bg-white/70 border-slate-200/60 dark:bg-[#07090E]/50 dark:border-white/[0.07]"
          }
        `}
        aria-label="Main navigation"
      >

        {/* ── Logo ──────────────────────────────────────────────────────────── */}
        <Link
          href="/"
          className="flex items-center gap-2 rounded-xl px-1 py-1 outline-none
            focus-visible:ring-2 focus-visible:ring-teal-500"
          aria-label="LocalSchema homepage"
        >
          <div
            className="w-7 h-7 rounded-lg flex items-center justify-center
              text-white font-black text-sm
              bg-gradient-to-tr from-teal-500 to-cyan-400
              shadow-[0_0_14px_rgba(0,212,200,0.35)]"
          >
            L
          </div>
          <span className="text-[15px] font-bold tracking-tight
            text-slate-900 dark:text-white">
            LocalSchema
          </span>
        </Link>

        {/* ── Desktop nav links ──────────────────────────────────────────────── */}
        <div className="hidden md:flex items-center gap-0.5" role="menubar">
          {[
            { href: "/niches",                       label: "Generators" },
            { href: "/guides/wordpress",             label: "WordPress" },
            { href: "/guides/service-area-business", label: "SAB Guide" },
          ].map(({ href, label }) => (
            <Link
              key={href}
              href={href}
              role="menuitem"
              className="px-3.5 py-2 text-sm font-medium rounded-xl
                transition-all duration-150 outline-none
                focus-visible:ring-2 focus-visible:ring-teal-500
                text-slate-500 hover:text-slate-900 hover:bg-slate-100
                dark:text-white/50 dark:hover:text-white dark:hover:bg-white/[0.06]"
            >
              {label}
            </Link>
          ))}
        </div>

        {/* ── Right cluster: CTA + Theme Toggle + Hamburger ──────────────────── */}
        <div className="flex items-center gap-1.5">

          {/* CTA */}
          <Link
            href="/schema-tool"
            className="hidden sm:inline-flex items-center gap-1.5
              px-4 py-2 rounded-xl text-sm font-semibold
              transition-all duration-150 outline-none
              focus-visible:ring-2 focus-visible:ring-teal-500
              text-white bg-slate-900 hover:bg-slate-700
              dark:text-white dark:bg-teal-500/[0.12] dark:border dark:border-teal-500/[0.25]
              dark:hover:bg-teal-500/[0.22] dark:hover:border-teal-500/[0.45]
              dark:shadow-[0_0_16px_-4px_rgba(0,212,200,0.2)]
              dark:hover:shadow-[0_0_20px_-4px_rgba(0,212,200,0.35)]"
          >
            Generate Free
            <svg xmlns="http://www.w3.org/2000/svg" className="w-3.5 h-3.5" viewBox="0 0 24 24"
              fill="none" stroke="currentColor" strokeWidth="2.5"
              strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <path d="M5 12h14" /><path d="m12 5 7 7-7 7" />
            </svg>
          </Link>

          {/* Theme toggle — only renders icon after mount to avoid hydration flash */}
          <button
            onClick={toggleTheme}
            aria-label={isDark ? "Switch to light mode" : "Switch to dark mode"}
            className="p-2 rounded-xl transition-all duration-150 outline-none
              focus-visible:ring-2 focus-visible:ring-teal-500
              text-slate-500 hover:text-slate-900 hover:bg-slate-100
              dark:text-white/45 dark:hover:text-white dark:hover:bg-white/[0.06]"
          >
            {mounted ? (
              isDark
                ? <Sun  size={16} strokeWidth={2} aria-hidden="true" />
                : <Moon size={16} strokeWidth={2} aria-hidden="true" />
            ) : (
              /* Placeholder with same size to prevent layout shift */
              <span className="block w-4 h-4" aria-hidden="true" />
            )}
          </button>

          {/* Hamburger */}
          <button
            className="md:hidden p-2 rounded-xl transition-all duration-150 outline-none
              focus-visible:ring-2 focus-visible:ring-teal-500
              text-slate-500 hover:text-slate-900 hover:bg-slate-100
              dark:text-white/45 dark:hover:text-white dark:hover:bg-white/[0.06]"
            onClick={() => setIsOpen((o) => !o)}
            aria-label={isOpen ? "Close menu" : "Open menu"}
            aria-expanded={isOpen}
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              {isOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>
      </nav>

      {/* ── Mobile menu ───────────────────────────────────────────────────────── */}
      {isOpen && (
        <div
          className="pointer-events-auto absolute top-[68px] left-4 right-4
            rounded-2xl border p-2.5 flex flex-col gap-0.5 md:hidden
            backdrop-blur-xl shadow-[0_16px_64px_-8px_rgba(0,0,0,0.15)]
            bg-white/95 border-slate-200/80
            dark:bg-[#07090E]/90 dark:border-white/[0.10]
            dark:shadow-[0_16px_64px_-8px_rgba(0,0,0,0.7)]"
          role="menu"
        >
          {[
            { href: "/niches",                       label: "Generators" },
            { href: "/guides/wordpress",             label: "WordPress Guide" },
            { href: "/guides/service-area-business", label: "SAB Guide" },
          ].map(({ href, label }) => (
            <Link
              key={href}
              href={href}
              role="menuitem"
              onClick={() => setIsOpen(false)}
              className="px-4 py-3 text-sm font-semibold rounded-xl
                transition-all duration-150 outline-none
                focus-visible:ring-2 focus-visible:ring-teal-500
                text-slate-600 hover:text-slate-900 hover:bg-slate-100
                dark:text-white/65 dark:hover:text-white dark:hover:bg-white/[0.06]"
            >
              {label}
            </Link>
          ))}

          <div className="pt-2 mt-1 border-t border-slate-100 dark:border-white/[0.07]">
            <Link
              href="/schema-tool"
              role="menuitem"
              onClick={() => setIsOpen(false)}
              className="flex justify-center items-center gap-2 w-full px-4 py-3
                rounded-xl text-sm font-bold transition-all duration-150
                text-white bg-slate-900 hover:bg-slate-700
                dark:bg-teal-500/[0.12] dark:border dark:border-teal-500/[0.25]
                dark:hover:bg-teal-500/[0.22] dark:text-white"
            >
              Generate Free Schema →
            </Link>
          </div>

          {/* Mobile theme toggle */}
          <div className="pt-1 mt-0.5 border-t border-slate-100 dark:border-white/[0.07]">
            <button
              onClick={() => { toggleTheme(); setIsOpen(false); }}
              className="flex items-center gap-3 w-full px-4 py-3 rounded-xl
                text-sm font-semibold transition-all duration-150
                text-slate-600 hover:text-slate-900 hover:bg-slate-100
                dark:text-white/65 dark:hover:text-white dark:hover:bg-white/[0.06]"
            >
              {mounted ? (
                isDark ? (
                  <><Sun size={15} aria-hidden="true" /><span>Switch to Light Mode</span></>
                ) : (
                  <><Moon size={15} aria-hidden="true" /><span>Switch to Dark Mode</span></>
                )
              ) : (
                <span className="block w-4 h-4" aria-hidden="true" />
              )}
            </button>
          </div>
        </div>
      )}
    </header>
  );
}
