"use client";

import { useState, useEffect } from "react";
import Link from "next/link";

export default function Navbar() {
  const [isOpen, setIsOpen]     = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    /* Full-width sticky container — transparent so the pill "floats" */
    <header className="sticky top-0 z-50 w-full flex justify-center px-4 pt-3.5 pb-0 pointer-events-none">

      {/* Glass pill */}
      <nav
        className={`
          pointer-events-auto w-full max-w-5xl
          flex items-center justify-between
          px-3 py-2 rounded-2xl border
          transition-all duration-300 ease-out
          ${scrolled
            ? "bg-[#07090E]/80 border-white/[0.10] shadow-[0_8px_40px_-4px_rgba(0,0,0,0.55)] backdrop-blur-xl"
            : "bg-[#07090E]/50 border-white/[0.07] backdrop-blur-md"
          }
        `}
        aria-label="Main navigation"
      >

        {/* ── Logo ─────────────────────────────────────────────────────── */}
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
          <span className="text-[15px] font-bold tracking-tight text-white">
            LocalSchema
          </span>
        </Link>

        {/* ── Desktop links ─────────────────────────────────────────────── */}
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
              className="px-3.5 py-2 text-sm font-medium text-white/50
                hover:text-white rounded-xl hover:bg-white/[0.06]
                transition-all duration-150 outline-none
                focus-visible:ring-2 focus-visible:ring-teal-500"
            >
              {label}
            </Link>
          ))}
        </div>

        {/* ── CTA + mobile toggle ──────────────────────────────────────── */}
        <div className="flex items-center gap-2">
          <Link
            href="/schema-tool"
            className="hidden sm:inline-flex items-center gap-1.5
              px-4 py-2 rounded-xl text-sm font-semibold text-white
              bg-teal-500/[0.12] border border-teal-500/[0.25]
              hover:bg-teal-500/[0.22] hover:border-teal-500/[0.45]
              shadow-[0_0_16px_-4px_rgba(0,212,200,0.2)]
              hover:shadow-[0_0_20px_-4px_rgba(0,212,200,0.35)]
              transition-all duration-150 outline-none
              focus-visible:ring-2 focus-visible:ring-teal-500"
          >
            Generate Free
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="w-3.5 h-3.5"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
            >
              <path d="M5 12h14" />
              <path d="m12 5 7 7-7 7" />
            </svg>
          </Link>

          {/* Hamburger */}
          <button
            className="md:hidden p-2 rounded-xl text-white/45 hover:text-white
              hover:bg-white/[0.06] transition-all duration-150
              outline-none focus-visible:ring-2 focus-visible:ring-teal-500"
            onClick={() => setIsOpen((o) => !o)}
            aria-label={isOpen ? "Close menu" : "Open menu"}
            aria-expanded={isOpen}
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              {isOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>
      </nav>

      {/* ── Mobile menu ────────────────────────────────────────────────────── */}
      {isOpen && (
        <div
          className="pointer-events-auto absolute top-[68px] left-4 right-4
            rounded-2xl border border-white/[0.10]
            bg-[#07090E]/90 backdrop-blur-xl
            shadow-[0_16px_64px_-8px_rgba(0,0,0,0.7)]
            p-2.5 flex flex-col gap-0.5 md:hidden"
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
              className="px-4 py-3 text-sm font-semibold text-white/65
                hover:text-white hover:bg-white/[0.06] rounded-xl
                transition-all duration-150 outline-none
                focus-visible:ring-2 focus-visible:ring-teal-500"
            >
              {label}
            </Link>
          ))}

          <div className="pt-2 mt-1 border-t border-white/[0.07]">
            <Link
              href="/schema-tool"
              role="menuitem"
              onClick={() => setIsOpen(false)}
              className="flex justify-center items-center gap-2 w-full px-4 py-3
                rounded-xl text-sm font-bold text-white
                bg-teal-500/[0.12] border border-teal-500/[0.25]
                hover:bg-teal-500/[0.22] transition-all duration-150"
            >
              Generate Free Schema →
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
