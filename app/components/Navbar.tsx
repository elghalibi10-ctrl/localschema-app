"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useTheme } from "next-themes";
import {
  Sun, Moon,
  Wrench, Zap, Snowflake, Home, Stethoscope, Scale,
  Sparkles, Calculator, Store, Car, TreePine, Bug,
  Paintbrush, Truck, Utensils, Dog, Scissors, Dumbbell,
  Flower2, Camera, Baby, BookOpen, Briefcase, Landmark,
  ShieldCheck, Sun as SunIcon, Fence, Wind, Trash2,
  Droplets, Plug, Hammer, Waves, Bomb, type LucideIcon,
} from "lucide-react";

// ─────────────────────────────────────────────────────────────────────────────
// NICHE ICON MAP — covers every ID in niches.json
// ─────────────────────────────────────────────────────────────────────────────
interface NicheStyle {
  Icon: LucideIcon;
  /** Tailwind text color for the icon */
  color: string;
  /** Tailwind bg color for the icon box (light mode) */
  bg: string;
  /** Tailwind bg color for the icon box (dark mode) */
  bgDark: string;
}

const NICHE_STYLES: Record<string, NicheStyle> = {
  // ── Home services ──────────────────────────────────────────────────────────
  "plumber":           { Icon: Wrench,     color: "text-blue-600 dark:text-blue-400",    bg: "bg-blue-100",    bgDark: "dark:bg-blue-500/15" },
  "electrician":       { Icon: Zap,        color: "text-amber-500 dark:text-amber-400",  bg: "bg-amber-100",   bgDark: "dark:bg-amber-500/15" },
  "hvac":              { Icon: Snowflake,  color: "text-cyan-500 dark:text-cyan-400",    bg: "bg-cyan-100",    bgDark: "dark:bg-cyan-500/15" },
  "roofing-contractor":{ Icon: Home,       color: "text-red-500 dark:text-red-400",      bg: "bg-red-100",     bgDark: "dark:bg-red-500/15" },
  "cleaning-service":  { Icon: Sparkles,   color: "text-purple-500 dark:text-purple-400",bg: "bg-purple-100",  bgDark: "dark:bg-purple-500/15" },
  "painter":           { Icon: Paintbrush, color: "text-pink-500 dark:text-pink-400",    bg: "bg-pink-100",    bgDark: "dark:bg-pink-500/15" },
  "pest-control":      { Icon: Bug,        color: "text-green-600 dark:text-green-400",  bg: "bg-green-100",   bgDark: "dark:bg-green-500/15" },
  "tree-service":      { Icon: TreePine,   color: "text-emerald-600 dark:text-emerald-400",bg:"bg-emerald-100",bgDark: "dark:bg-emerald-500/15" },
  "locksmith":         { Icon: ShieldCheck,color: "text-yellow-600 dark:text-yellow-400",bg: "bg-yellow-100",  bgDark: "dark:bg-yellow-500/15" },
  "moving-company":    { Icon: Truck,      color: "text-orange-500 dark:text-orange-400",bg: "bg-orange-100",  bgDark: "dark:bg-orange-500/15" },
  "handyman":          { Icon: Hammer,     color: "text-stone-600 dark:text-stone-400",  bg: "bg-stone-100",   bgDark: "dark:bg-stone-500/15" },
  "landscaper":        { Icon: Flower2,    color: "text-lime-600 dark:text-lime-400",    bg: "bg-lime-100",    bgDark: "dark:bg-lime-500/15" },
  "fence-contractor":  { Icon: Fence,      color: "text-amber-700 dark:text-amber-400",  bg: "bg-amber-100",   bgDark: "dark:bg-amber-500/15" },
  "window-cleaning":   { Icon: Wind,       color: "text-sky-500 dark:text-sky-400",      bg: "bg-sky-100",     bgDark: "dark:bg-sky-500/15" },
  "pool-service":      { Icon: Waves,      color: "text-blue-500 dark:text-blue-400",    bg: "bg-blue-100",    bgDark: "dark:bg-blue-500/15" },
  "solar-installation":{ Icon: SunIcon,    color: "text-yellow-500 dark:text-yellow-400",bg: "bg-yellow-100",  bgDark: "dark:bg-yellow-500/15" },
  "garage-door-repair":{ Icon: Home,       color: "text-slate-600 dark:text-slate-400",  bg: "bg-slate-100",   bgDark: "dark:bg-slate-500/15" },
  "junk-removal":      { Icon: Trash2,     color: "text-gray-600 dark:text-gray-400",    bg: "bg-gray-100",    bgDark: "dark:bg-gray-500/15" },
  "pressure-washing":  { Icon: Droplets,   color: "text-cyan-600 dark:text-cyan-400",    bg: "bg-cyan-100",    bgDark: "dark:bg-cyan-500/15" },
  "carpet-cleaning":   { Icon: Sparkles,   color: "text-violet-500 dark:text-violet-400",bg: "bg-violet-100",  bgDark: "dark:bg-violet-500/15" },
  "appliance-repair":  { Icon: Plug,       color: "text-slate-600 dark:text-slate-400",  bg: "bg-slate-100",   bgDark: "dark:bg-slate-500/15" },
  "dumpster-rental":   { Icon: Bomb,       color: "text-orange-600 dark:text-orange-400",bg: "bg-orange-100",  bgDark: "dark:bg-orange-500/15" },
  "security-systems":  { Icon: ShieldCheck,color: "text-indigo-600 dark:text-indigo-400",bg: "bg-indigo-100",  bgDark: "dark:bg-indigo-500/15" },

  // ── Professional services ──────────────────────────────────────────────────
  "dentist":           { Icon: Stethoscope,color: "text-rose-500 dark:text-rose-400",    bg: "bg-rose-100",    bgDark: "dark:bg-rose-500/15" },
  "lawyer":            { Icon: Scale,      color: "text-indigo-600 dark:text-indigo-400",bg: "bg-indigo-100",  bgDark: "dark:bg-indigo-500/15" },
  "accountant":        { Icon: Calculator, color: "text-green-500 dark:text-green-400",  bg: "bg-green-100",   bgDark: "dark:bg-green-500/15" },
  "financial-advisor": { Icon: Landmark,   color: "text-emerald-600 dark:text-emerald-400",bg:"bg-emerald-100",bgDark: "dark:bg-emerald-500/15" },
  "insurance-agent":   { Icon: ShieldCheck,color: "text-blue-600 dark:text-blue-400",    bg: "bg-blue-100",    bgDark: "dark:bg-blue-500/15" },
  "notary":            { Icon: Briefcase,  color: "text-slate-600 dark:text-slate-400",  bg: "bg-slate-100",   bgDark: "dark:bg-slate-500/15" },
  "real-estate-agent": { Icon: Home,       color: "text-teal-600 dark:text-teal-400",    bg: "bg-teal-100",    bgDark: "dark:bg-teal-500/15" },
  "wedding-planner":   { Icon: Sparkles,   color: "text-pink-500 dark:text-pink-400",    bg: "bg-pink-100",    bgDark: "dark:bg-pink-500/15" },

  // ── Food & hospitality ─────────────────────────────────────────────────────
  "restaurant":        { Icon: Utensils,   color: "text-orange-600 dark:text-orange-400",bg: "bg-orange-100",  bgDark: "dark:bg-orange-500/15" },
  "bakery":            { Icon: Store,      color: "text-yellow-600 dark:text-yellow-400",bg: "bg-yellow-100",  bgDark: "dark:bg-yellow-500/15" },
  "catering":          { Icon: Utensils,   color: "text-amber-600 dark:text-amber-400",  bg: "bg-amber-100",   bgDark: "dark:bg-amber-500/15" },

  // ── Personal services ──────────────────────────────────────────────────────
  "hair-salon":        { Icon: Scissors,   color: "text-pink-600 dark:text-pink-400",    bg: "bg-pink-100",    bgDark: "dark:bg-pink-500/15" },
  "spa":               { Icon: Sparkles,   color: "text-teal-500 dark:text-teal-400",    bg: "bg-teal-100",    bgDark: "dark:bg-teal-500/15" },
  "gym":               { Icon: Dumbbell,   color: "text-red-600 dark:text-red-400",      bg: "bg-red-100",     bgDark: "dark:bg-red-500/15" },
  "florist":           { Icon: Flower2,    color: "text-pink-500 dark:text-pink-400",    bg: "bg-pink-100",    bgDark: "dark:bg-pink-500/15" },
  "tattoo-shop":       { Icon: Paintbrush, color: "text-slate-700 dark:text-slate-300",  bg: "bg-slate-200",   bgDark: "dark:bg-slate-500/20" },
  "massage-therapy":   { Icon: Sparkles,   color: "text-violet-500 dark:text-violet-400",bg: "bg-violet-100",  bgDark: "dark:bg-violet-500/15" },
  "chiropractor":      { Icon: Stethoscope,color: "text-blue-500 dark:text-blue-400",    bg: "bg-blue-100",    bgDark: "dark:bg-blue-500/15" },
  "personal-trainer":  { Icon: Dumbbell,   color: "text-orange-500 dark:text-orange-400",bg: "bg-orange-100",  bgDark: "dark:bg-orange-500/15" },

  // ── Pets ──────────────────────────────────────────────────────────────────
  "dog-groomer":       { Icon: Dog,        color: "text-amber-600 dark:text-amber-400",  bg: "bg-amber-100",   bgDark: "dark:bg-amber-500/15" },
  "pet-store":         { Icon: Dog,        color: "text-green-600 dark:text-green-400",  bg: "bg-green-100",   bgDark: "dark:bg-green-500/15" },
  "veterinarian":      { Icon: Stethoscope,color: "text-rose-600 dark:text-rose-400",    bg: "bg-rose-100",    bgDark: "dark:bg-rose-500/15" },

  // ── Auto ──────────────────────────────────────────────────────────────────
  "auto-repair":       { Icon: Car,        color: "text-red-600 dark:text-red-400",      bg: "bg-red-100",     bgDark: "dark:bg-red-500/15" },
  "car-wash":          { Icon: Droplets,   color: "text-blue-500 dark:text-blue-400",    bg: "bg-blue-100",    bgDark: "dark:bg-blue-500/15" },

  // ── Education & childcare ──────────────────────────────────────────────────
  "tutor":             { Icon: BookOpen,   color: "text-emerald-600 dark:text-emerald-400",bg:"bg-emerald-100",bgDark: "dark:bg-emerald-500/15" },
  "daycare":           { Icon: Baby,       color: "text-pink-500 dark:text-pink-400",    bg: "bg-pink-100",    bgDark: "dark:bg-pink-500/15" },

  // ── Creative / tech ───────────────────────────────────────────────────────
  "photographer":      { Icon: Camera,     color: "text-pink-600 dark:text-pink-400",    bg: "bg-pink-100",    bgDark: "dark:bg-pink-500/15" },
};

// Default for unknown / non-generator pages
const DEFAULT_STYLE: NicheStyle = {
  Icon: Store,
  color: "text-teal-600 dark:text-teal-400",
  bg: "bg-teal-100",
  bgDark: "dark:bg-teal-500/15",
};

// ─────────────────────────────────────────────────────────────────────────────
// COMPONENT
// ─────────────────────────────────────────────────────────────────────────────
export default function Navbar() {
  const [isOpen,   setIsOpen]   = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [mounted,  setMounted]  = useState(false);

  const { resolvedTheme, setTheme } = useTheme();
  const pathname = usePathname();

  useEffect(() => { setMounted(true); }, []);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const isDark = resolvedTheme === "dark";
  const toggleTheme = () => setTheme(isDark ? "light" : "dark");

  // ── Niche detection ──────────────────────────────────────────────────────
  const nicheMatch = pathname.match(/^\/generator\/([^/]+)/);
  const nicheSlug  = nicheMatch ? nicheMatch[1] : null;
  const style      = nicheSlug ? (NICHE_STYLES[nicheSlug] ?? DEFAULT_STYLE) : null;
  // Human-readable label for the niche, e.g. "roofing-contractor" → "Roofing Contractor"
  const nicheLabel = nicheSlug
    ? nicheSlug.split("-").map((w) => w.charAt(0).toUpperCase() + w.slice(1)).join(" ")
    : null;

  return (
    <header className="sticky top-0 z-50 w-full flex justify-center px-4 pt-3.5 pb-0 pointer-events-none">

      {/* ── Glass pill ────────────────────────────────────────────────────── */}
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

        {/* ── Logo / dynamic niche icon ──────────────────────────────────── */}
        <Link
          href="/"
          className="flex items-center gap-2.5 rounded-xl px-1 py-1 outline-none
            focus-visible:ring-2 focus-visible:ring-teal-500 group"
          aria-label="LocalSchema homepage"
        >
          {style ? (
            /* On a generator page — show niche-specific icon */
            <div
              className={`
                w-7 h-7 rounded-lg flex items-center justify-center shrink-0
                transition-transform duration-300 group-hover:scale-110
                ${style.bg} ${style.bgDark}
              `}
            >
              <style.Icon
                className={`w-3.5 h-3.5 ${style.color}`}
                strokeWidth={2}
                aria-hidden="true"
              />
            </div>
          ) : (
            /* Default — teal "L" box */
            <div
              className="w-7 h-7 rounded-lg flex items-center justify-center shrink-0
                text-white font-black text-sm
                bg-gradient-to-tr from-teal-500 to-cyan-400
                shadow-[0_0_14px_rgba(0,212,200,0.35)]
                transition-transform duration-300 group-hover:scale-110"
            >
              L
            </div>
          )}

          <div className="flex flex-col leading-none">
            <span className="text-[15px] font-bold tracking-tight
              text-slate-900 dark:text-white">
              LocalSchema
            </span>
            {/* Niche sub-label — only on generator pages */}
            {nicheLabel && (
              <span className="text-[10px] font-mono text-slate-400 dark:text-white/30
                mt-px leading-none truncate max-w-[120px]">
                {nicheLabel}
              </span>
            )}
          </div>
        </Link>

        {/* ── Desktop nav links ─────────────────────────────────────────────── */}
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

        {/* ── Right cluster: CTA + Theme Toggle + Hamburger ─────────────────── */}
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

          {/* Theme toggle */}
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
