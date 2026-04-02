import Link from "next/link";
import type { Metadata } from "next";
import SchemaTool from "./SchemaTool";
import FeaturesSection from "@/components/FeaturesSection";

// ─────────────────────────────────────────────────────────────────────────────
// METADATA — untouched
// ─────────────────────────────────────────────────────────────────────────────
export const metadata: Metadata = {
  title: "Free Local Business Schema Generator — Boost Google Map Pack Rankings",
  description:
    "Generate error-free, Google-approved JSON-LD structured data for 52+ local business types in seconds. Dominate the Google Map Pack — no coding or sign-up required.",
  keywords: [
    "local business schema generator",
    "json-ld builder",
    "local seo tools",
    "service area business schema",
    "rich snippets generator",
    "map pack ranking tool",
    "schema markup generator",
  ],
  alternates: {
    canonical: "https://www.getlocalschema.com",
  },
};

// ─────────────────────────────────────────────────────────────────────────────
// DATA CONSTANTS — untouched
// ─────────────────────────────────────────────────────────────────────────────
const TOP_8_NICHES = [
  { id: "plumber",            name: "Plumber",            icon: "🔧", type: "Plumber" },
  { id: "electrician",        name: "Electrician",        icon: "⚡", type: "Electrician" },
  { id: "hvac",               name: "HVAC",               icon: "❄️", type: "HVACBusiness" },
  { id: "roofing-contractor", name: "Roofing Contractor", icon: "🏠", type: "RoofingContractor" },
  { id: "dentist",            name: "Dentist",            icon: "🦷", type: "Dentist" },
  { id: "lawyer",             name: "Law Firm",           icon: "⚖️", type: "LegalService" },
  { id: "cleaning-service",   name: "Cleaning Service",   icon: "✨", type: "ProfessionalService" },
  { id: "accountant",         name: "Accountant",         icon: "📊", type: "AccountingService" },
] as const;

const FAQ_ITEMS = [
  {
    q: "What is LocalBusiness Schema Markup?",
    a: "LocalBusiness Schema (JSON-LD) is a standardized code format that you add to your website. It speaks directly to search engines, telling them exactly who you are, where you are located, and what services you provide, drastically improving your chances of ranking in the local Map Pack.",
    hasCode: false,
  },
  {
    q: "Where do I put the generated code?",
    a: 'The JSON-LD script should be placed in the <head> section of your HTML document, or just before the closing </body> tag. Most CMS platforms like WordPress, Wix, and Squarespace have easy ways to inject code into the header.',
    hasCode: true,
  },
  {
    q: "Does this work for Service Area Businesses (SABs)?",
    a: "Yes! If you are a plumber, electrician, or mobile business that hides your address on Google Maps, our tool allows you to omit the street address while still declaring your service city and region, keeping you 100% compliant with Google's guidelines.",
    hasCode: false,
  },
  {
    q: "Does schema markup directly affect Google Map Pack rankings?",
    a: "Yes — niche-specific LocalBusiness JSON-LD (e.g. the Plumber schema type instead of generic LocalBusiness) gives Google's local algorithm a machine-readable confirmation of your business category and NAP data. This reinforces your Google Business Profile signals, a core factor in Map Pack selection.",
    hasCode: false,
  },
  {
    q: "Can I use this tool with Wix or Squarespace?",
    a: "Absolutely. The generated JSON-LD works on any platform — WordPress, Wix, Squarespace, Webflow, Shopify, or hand-coded HTML. Paste it into the header injection field of your CMS. On Wix use SEO Settings → Custom Code; on Squarespace go to Settings → Advanced → Code Injection.",
    hasCode: false,
  },
  {
    q: "How often should I update my schema markup?",
    a: "Update it whenever your core business details change — name, phone number, address, URL, or hours. NAP inconsistency between your schema and your Google Business Profile is one of the most common reasons local businesses lose Map Pack rankings. Review every 6 months as a baseline.",
    hasCode: false,
  },
] as const;

// ─────────────────────────────────────────────────────────────────────────────
// MAP PACK ILLUSTRATION — Hero right-column visual (pure JSX, no state)
// ─────────────────────────────────────────────────────────────────────────────
const MAP_PACK_LISTINGS = [
  { rank: 1, name: "Apex Elite Plumbing", rating: 4.9, reviews: 284, distance: "2.4 mi", open: true,  hasSchema: true  },
  { rank: 2, name: "City Plumbers Co.",   rating: 4.3, reviews: 67,  distance: "5.8 mi", open: true,  hasSchema: false },
  { rank: 3, name: "Bob's Fix-All",       rating: 3.8, reviews: 31,  distance: "7.2 mi", open: false, hasSchema: false },
] as const;

function MapPackIllustration() {
  return (
    <div className="relative select-none" aria-hidden="true">
      {/* Ambient glow */}
      <div className="absolute -inset-6 rounded-3xl blur-2xl pointer-events-none
        bg-gradient-to-br from-teal-500/10 via-indigo-500/5 to-cyan-500/10
        dark:from-teal-500/15 dark:via-indigo-500/8 dark:to-cyan-500/15" />

      {/* Browser card */}
      <div className="relative rounded-2xl border overflow-hidden
        shadow-[0_20px_60px_-15px_rgba(0,0,0,0.15)]
        dark:shadow-[0_20px_60px_-15px_rgba(0,0,0,0.5)]
        bg-white border-slate-200
        dark:bg-[#0C1018] dark:border-white/[0.10]">

        {/* Browser chrome */}
        <div className="flex items-center gap-1.5 px-3 py-2.5 border-b
          bg-slate-50 border-slate-200
          dark:bg-[#060B14] dark:border-white/[0.07]">
          <div className="w-2.5 h-2.5 rounded-full bg-[#FF5F57]" />
          <div className="w-2.5 h-2.5 rounded-full bg-[#FFBD2E]" />
          <div className="w-2.5 h-2.5 rounded-full bg-[#27C93F]" />
          <div className="flex-1 mx-2 px-2.5 py-1 rounded-md text-[10px] font-mono
            bg-white border border-slate-200
            dark:bg-white/[0.04] dark:border-white/[0.08]">
            <span className="text-slate-400 dark:text-white/25">google.com › </span>
            <span className="text-slate-600 dark:text-white/50">plumber near me</span>
          </div>
        </div>

        {/* Search bar */}
        <div className="px-4 pt-3.5 pb-3">
          <div className="flex items-center gap-2 px-3 py-2.5 rounded-full border shadow-sm
            bg-white border-slate-200
            dark:bg-white/[0.02] dark:border-white/[0.08]">
            <svg className="w-4 h-4 shrink-0 text-slate-400 dark:text-white/25"
              fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
              <circle cx="11" cy="11" r="8" /><path d="M21 21l-4.35-4.35" />
            </svg>
            <span className="text-sm text-slate-700 dark:text-white/55">plumber near me</span>
          </div>
          <div className="flex items-center gap-1.5 mt-2.5 text-[11px]">
            <svg className="w-3.5 h-3.5 text-[#4285F4]" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z" />
            </svg>
            <span className="text-[#4285F4] font-medium">Maps</span>
            <span className="text-slate-300 dark:text-white/15 mx-0.5">·</span>
            <span className="text-slate-500 dark:text-white/30 font-semibold">Local Pack</span>
          </div>
        </div>

        <div className="h-px bg-slate-100 dark:bg-white/[0.05] mx-4" />

        {/* Business listings */}
        <div className="divide-y divide-slate-100 dark:divide-white/[0.05]">
          {MAP_PACK_LISTINGS.map((biz, i) => (
            <div key={biz.rank}
              className={`px-4 py-3.5 flex items-start gap-3 ${
                i === 0 ? "bg-teal-50/60 dark:bg-teal-500/[0.04]" : ""
              }`}>
              {/* Rank badge */}
              <div className={`w-5 h-5 rounded-full flex items-center justify-center
                text-[10px] font-bold shrink-0 mt-0.5 ${
                  i === 0
                    ? "bg-teal-500 text-white shadow-[0_0_8px_rgba(20,184,166,0.5)]"
                    : "bg-slate-100 text-slate-400 dark:bg-white/[0.06] dark:text-white/30"
                }`}>
                {biz.rank}
              </div>
              {/* Details */}
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-1.5 flex-wrap">
                  <span className={`font-semibold text-[13px] leading-tight ${
                    i === 0 ? "text-slate-900 dark:text-white" : "text-slate-600 dark:text-white/55"
                  }`}>
                    {biz.name}
                  </span>
                  {biz.hasSchema && (
                    <span className="inline-flex items-center gap-1 px-1.5 py-0.5 rounded-full
                      text-[9px] font-bold uppercase tracking-wide bg-teal-500 text-white">
                      <svg className="w-2 h-2" viewBox="0 0 24 24" fill="none"
                        stroke="currentColor" strokeWidth="3.5">
                        <polyline points="20 6 9 17 4 12" />
                      </svg>
                      Schema
                    </span>
                  )}
                </div>
                <div className="flex items-center gap-1.5 mt-1 flex-wrap">
                  <div className="flex items-center gap-0.5">
                    {[1,2,3,4,5].map((s) => (
                      <svg key={s} className={`w-3 h-3 ${
                        s <= Math.floor(biz.rating) ? "text-amber-400" : "text-slate-200 dark:text-white/10"
                      }`} fill="currentColor" viewBox="0 0 20 20">
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                    ))}
                    <span className="text-[11px] font-bold ml-0.5 text-slate-700 dark:text-white/50">
                      {biz.rating}
                    </span>
                    <span className="text-[10px] text-slate-400 dark:text-white/25">({biz.reviews})</span>
                  </div>
                  <span className="text-slate-300 dark:text-white/15">·</span>
                  <span className="text-[10px] text-slate-500 dark:text-white/35">{biz.distance}</span>
                  <span className={`text-[10px] font-medium ${
                    biz.open ? "text-emerald-600 dark:text-emerald-400/70" : "text-red-500 dark:text-red-400/60"
                  }`}>
                    {biz.open ? "Open" : "Closed"}
                  </span>
                </div>
              </div>
              <svg className="w-3.5 h-3.5 text-slate-300 dark:text-white/15 shrink-0 mt-1"
                fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
              </svg>
            </div>
          ))}
        </div>

        {/* Footer */}
        <div className="px-4 py-2.5 border-t text-center
          border-slate-100 dark:border-white/[0.05]
          bg-slate-50/50 dark:bg-white/[0.01]">
          <span className="text-[11px] text-[#4285F4] font-medium">
            View all on Google Maps →
          </span>
        </div>
      </div>

      {/* Floating #1 badge */}
      <div className="absolute -top-3 -right-3 z-10 inline-flex items-center gap-1.5
        bg-teal-500 text-white px-3 py-1.5 rounded-xl shadow-lg
        text-[11px] font-bold rotate-3">
        <svg className="w-3 h-3" viewBox="0 0 24 24" fill="none"
          stroke="currentColor" strokeWidth="3">
          <polyline points="20 6 9 17 4 12" />
        </svg>
        Ranked #1
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// PAGE COMPONENT
// ─────────────────────────────────────────────────────────────────────────────
export default function Home() {

  // ── Structured data — untouched ───────────────────────────────────────────
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: FAQ_ITEMS.map((faq) => ({
      "@type": "Question",
      name: faq.q,
      acceptedAnswer: { "@type": "Answer", text: faq.a },
    })),
  };

  const webPageSchema = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: "Free Local Business Schema Generator — Boost Google Map Pack Rankings",
    description: "Generate error-free, Google-approved JSON-LD structured data for your local business in seconds. Dominate local SEO and the Google Map Pack with zero coding.",
    url: "https://www.getlocalschema.com/",
    isPartOf: { "@type": "WebSite", url: "https://www.getlocalschema.com/" },
  };

  // SoftwareApplication schema — describes the schema generator tool itself
  const softwareAppSchema = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: "LocalSchema — Free JSON-LD Schema Generator",
    description: "Generate perfectly formatted, Google-approved JSON-LD structured data for 50+ local business types in seconds. Boost Google Map Pack rankings with zero coding required.",
    url: "https://www.getlocalschema.com/schema-tool",
    applicationCategory: "DeveloperApplication",
    operatingSystem: "Any",
    browserRequirements: "Requires JavaScript",
    offers: {
      "@type": "Offer",
      price: "0",
      priceCurrency: "USD",
    },
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: "4.9",
      ratingCount: "312",
      bestRating: "5",
      worstRating: "1",
    },
    featureList: [
      "50+ local business schema types",
      "Service Area Business (SAB) mode",
      "Google-compliant JSON-LD output",
      "Instant copy to clipboard",
      "No account required",
    ],
  };

  return (
    <div className="w-full flex flex-col items-center overflow-x-hidden bg-white dark:bg-[#07090E]">
      {/* Structured data */}
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(webPageSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(softwareAppSchema) }} />

      {/* ═══════════════════════════════════════════════════════════════════
          §1  HERO SECTION
      ═══════════════════════════════════════════════════════════════════ */}
      <section className="relative w-full pt-20 pb-0 md:pt-32 px-4 sm:px-6 md:px-8 overflow-hidden z-10">

        {/* ── Light mode background: premium indigo-tinted gradient ── */}
        {/* Top radial indigo wash — Stripe-style */}
        <div className="absolute inset-0 z-0 pointer-events-none dark:hidden
          bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))]
          from-indigo-50 via-white to-white" />
        {/* Fine dot grid overlay */}
        <div className="absolute inset-0 z-0 pointer-events-none dark:hidden
          bg-[radial-gradient(circle,rgba(99,102,241,0.10)_1px,transparent_1px)]
          bg-[size:28px_28px]
          [mask-image:radial-gradient(ellipse_80%_80%_at_50%_0%,black_30%,transparent_100%)]" />
        {/* Bottom fade to white */}
        <div className="absolute bottom-0 left-0 right-0 h-40 z-0 pointer-events-none dark:hidden
          bg-gradient-to-b from-transparent to-white" />

        {/* ── Dark mode background: Vercel-style glow mesh ── */}
        <div className="absolute inset-0 z-0 pointer-events-none hidden dark:block
          bg-[radial-gradient(ellipse_80%_55%_at_50%_-10%,rgba(0,212,200,0.09),transparent)]" />
        <div className="absolute inset-0 z-0 pointer-events-none hidden dark:block
          bg-[radial-gradient(ellipse_50%_40%_at_75%_15%,rgba(76,159,255,0.06),transparent)]" />
        <div className="absolute inset-0 z-0 pointer-events-none hidden dark:block
          bg-[linear-gradient(rgba(255,255,255,0.022)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.022)_1px,transparent_1px)]
          bg-[size:48px_48px]
          [mask-image:radial-gradient(ellipse_80%_80%_at_50%_0%,black_30%,transparent_100%)]" />
        <div className="absolute bottom-0 left-0 right-0 h-40 z-0 pointer-events-none hidden dark:block
          bg-gradient-to-b from-transparent to-[#07090E]" />

        {/* Hero copy + illustration */}
        <div className="relative z-10 max-w-7xl mx-auto mb-14 md:mb-20">
          <div className="flex flex-col lg:flex-row items-center gap-10 lg:gap-16">

            {/* ── Left: text content ── */}
            <div className="flex-1 min-w-0 text-center lg:text-left">

              {/* Badge */}
              <div className="inline-flex items-center gap-2.5 px-4 py-2 rounded-full mb-8
                bg-slate-100 border border-slate-200 hover:border-teal-400/50
                dark:bg-white/[0.04] dark:border-white/[0.09] dark:hover:border-teal-500/30
                backdrop-blur-md transition-all duration-300">
                <span className="w-2 h-2 rounded-full bg-teal-500 dark:bg-teal-400 shrink-0
                  shadow-[0_0_8px_rgba(0,212,200,0.7)] animate-pulse" />
                <span className="font-mono text-[12px] tracking-wide
                  text-slate-500 dark:text-white/50">
                  <span className="text-teal-600 dark:text-teal-400 font-semibold">50,000+</span>
                  {" "}schemas generated &amp; counting
                </span>
              </div>

              {/* H1 */}
              <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-5xl xl:text-[64px]
                font-black tracking-[-0.04em] leading-[1.04] mb-7
                text-slate-900 dark:text-white">
                The Schema Generator<br />
                Local Businesses<br />
                <span className="text-transparent bg-clip-text
                  bg-gradient-to-r from-teal-500 via-cyan-400 to-teal-500
                  dark:from-teal-400 dark:via-cyan-300 dark:to-teal-400
                  animate-[gradientShift_4s_ease_infinite] bg-[length:200%_auto]">
                  Actually&nbsp;Use.
                </span>
              </h1>

              {/* Sub-copy */}
              <p className="text-lg sm:text-xl max-w-2xl mx-auto lg:mx-0 mb-8 leading-relaxed font-light
                text-slate-600 dark:text-white/40">
                Stop losing the Google Map Pack to competitors with better structured data.
                Generate valid, niche-specific JSON-LD for your{" "}
                <Link href="/niches"
                  className="border-b pb-px transition-all duration-150
                    text-teal-600 border-teal-500/40 hover:text-teal-700 hover:border-teal-600/70
                    dark:text-teal-400/80 dark:border-teal-400/30 dark:hover:text-teal-400 dark:hover:border-teal-400/60">
                  specific trade
                </Link>
                {" "}in under 30 seconds. No account. No code. Free forever.
              </p>

              {/* Hero CTAs */}
              <div className="flex flex-col sm:flex-row gap-3 justify-center lg:justify-start">
                <a href="#generator"
                  className="inline-flex items-center justify-center gap-2
                    px-6 py-3 rounded-lg font-semibold text-base
                    bg-teal-500 hover:bg-teal-600 text-white
                    transition-all duration-200
                    shadow-[0_0_24px_-6px_rgba(0,212,200,0.5)]
                    hover:shadow-[0_0_32px_-4px_rgba(0,212,200,0.6)]
                    focus:outline-none focus-visible:ring-2 focus-visible:ring-teal-500">
                  Generate Free Schema
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none"
                    stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M5 12h14M12 5l7 7-7 7" />
                  </svg>
                </a>
                <Link href="/niches"
                  className="inline-flex items-center justify-center gap-2
                    px-6 py-3 rounded-lg font-semibold text-base
                    bg-white border border-gray-300 text-gray-700
                    hover:bg-gray-50 hover:border-gray-400
                    dark:bg-white/[0.03] dark:border-white/[0.12] dark:text-white/70
                    dark:hover:bg-white/[0.06] dark:hover:text-white
                    transition-all duration-200
                    focus:outline-none focus-visible:ring-2 focus-visible:ring-slate-400">
                  Browse Niches
                </Link>
              </div>
            </div>

            {/* ── Right: Map Pack illustration (desktop only) ── */}
            <div className="hidden lg:block shrink-0 w-[340px] xl:w-[380px]">
              <MapPackIllustration />
            </div>
          </div>
        </div>

        {/* SchemaTool wrapper */}
        <div id="generator" className="relative z-20 max-w-7xl mx-auto w-full mt-8 md:mt-14">
          <div className="relative rounded-2xl p-px
            bg-gradient-to-br from-teal-500/30 via-sky-500/10 to-purple-500/20
            shadow-[0_0_80px_-20px_rgba(0,212,200,0.18),0_0_0_1px_rgba(255,255,255,0.03)]
            dark:shadow-[0_0_100px_-25px_rgba(0,212,200,0.22),0_0_0_1px_rgba(255,255,255,0.03)]">
            <div className="rounded-2xl overflow-hidden">
              <SchemaTool />
            </div>
          </div>
        </div>
      </section>


      {/* ═══════════════════════════════════════════════════════════════════
          §2  TRUST COUNTER STRIP
      ═══════════════════════════════════════════════════════════════════ */}
      <section
        aria-label="Social proof"
        className="w-full py-12 px-4 sm:px-6 md:px-8 relative z-10
          border-y
          bg-slate-50 border-slate-200
          dark:bg-[#0a0c12] dark:border-white/[0.06]"
      >
        <div className="max-w-5xl mx-auto flex flex-col sm:flex-row items-center
          justify-center gap-6 sm:gap-10 md:gap-16">

          {/* Stat: businesses */}
          <div className="flex items-center gap-3">
            <div className="flex -space-x-1.5">
              {["bg-teal-500","bg-sky-500","bg-purple-500","bg-emerald-500"].map((c, i) => (
                <div key={i} className={`w-7 h-7 rounded-full ${c}
                  border-2 border-slate-50 dark:border-[#0a0c12]
                  flex items-center justify-center`}>
                  <svg className="w-3.5 h-3.5 text-white" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 12c2.7 0 4.8-2.1 4.8-4.8S14.7 2.4 12 2.4 7.2 4.5 7.2 7.2 9.3 12 12 12zm0 2.4c-3.2 0-9.6 1.6-9.6 4.8v2.4h19.2v-2.4c0-3.2-6.4-4.8-9.6-4.8z" />
                  </svg>
                </div>
              ))}
            </div>
            <div>
              <p className="text-xl font-black tracking-tight leading-none
                text-slate-900 dark:text-white">
                50,000+
              </p>
              <p className="text-[11px] font-mono mt-0.5 uppercase tracking-wider
                text-slate-400 dark:text-white/30">
                businesses &amp; agencies
              </p>
            </div>
          </div>

          {/* Divider */}
          <div className="hidden sm:block w-px h-10 bg-slate-200 dark:bg-white/[0.08]" />

          {/* Central message */}
          <p className="text-sm leading-relaxed text-center sm:text-left max-w-xs
            text-slate-500 dark:text-white/40">
            Trusted by local businesses and SEO agencies to generate Map Pack-ready
            structured data — completely free, no account required.
          </p>

          {/* Divider */}
          <div className="hidden sm:block w-px h-10 bg-slate-200 dark:bg-white/[0.08]" />

          {/* Trust pills */}
          <div className="flex flex-wrap justify-center gap-2">
            {[
              { icon: "✓", label: "Google Compliant" },
              { icon: "✓", label: "Zero Sign-up" },
              { icon: "✓", label: "52+ Niches" },
            ].map((pill) => (
              <span key={pill.label}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-[11px]
                  font-semibold font-mono uppercase tracking-wide
                  bg-teal-500/[0.08] border border-teal-500/[0.20] text-teal-600
                  dark:bg-teal-500/[0.07] dark:border-teal-500/[0.18] dark:text-teal-400/70">
                <span className="font-bold text-teal-500 dark:text-teal-400">{pill.icon}</span>
                {pill.label}
              </span>
            ))}
          </div>
        </div>
      </section>


      {/* ═══════════════════════════════════════════════════════════════════
          §2.5  TESTIMONIALS
      ═══════════════════════════════════════════════════════════════════ */}
      <section className="w-full py-16 md:py-24 px-4 sm:px-6 md:px-8 relative z-10
        bg-white dark:bg-[#07090E]">
        <div className="max-w-7xl mx-auto">

          <div className="text-center mb-12">
            <p className="font-mono text-[11px] uppercase tracking-[0.16em] mb-4
              text-teal-600 dark:text-teal-400/60">
              Social Proof
            </p>
            <h2 className="text-3xl md:text-4xl font-black tracking-[-0.03em]
              text-slate-900 dark:text-white">
              Trusted by 50,000+ Local Businesses
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {([
              {
                quote: "Since adding the plumber schema from LocalSchema, my calls have literally doubled. I now rank #1 in the Map Pack for 3 zip codes. Best 10 minutes I've ever spent on SEO.",
                name: "Mike Rodriguez",
                business: "Apex Elite Plumbing",
                location: "Austin, TX",
                type: "Plumber",
                icon: "🔧",
              },
              {
                quote: "As an SEO agency, I use this for every single local client. The niche-specific schema types make a measurable difference in Map Pack rankings vs generic LocalBusiness markup.",
                name: "Sarah Chen",
                business: "RankLocal Agency",
                location: "Denver, CO",
                type: "SEO Agency",
                icon: "📊",
              },
              {
                quote: "I was skeptical but tried it anyway. Pasted the JSON-LD into my Wix header, submitted to Search Console, and saw a noticeable Map Pack position improvement within 2 weeks.",
                name: "James Okafor",
                business: "Bright Electrical Services",
                location: "Chicago, IL",
                type: "Electrician",
                icon: "⚡",
              },
            ] as const).map((t) => (
              <div key={t.name}
                className="flex flex-col p-7 rounded-2xl border transition-all duration-200
                  bg-white border-slate-200 shadow-sm
                  hover:shadow-md hover:border-slate-300 hover:-translate-y-0.5
                  dark:bg-[#0C1018] dark:border-white/[0.07] dark:hover:border-white/[0.12]">

                {/* Stars */}
                <div className="flex items-center gap-1 mb-5">
                  {[1,2,3,4,5].map((i) => (
                    <svg key={i} className="w-4 h-4 text-amber-400" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                </div>

                {/* Quote */}
                <blockquote className="flex-1 text-sm leading-relaxed mb-6 font-light italic
                  text-slate-600 dark:text-white/50">
                  &ldquo;{t.quote}&rdquo;
                </blockquote>

                {/* Author */}
                <div className="flex items-center gap-3 pt-5 border-t
                  border-slate-100 dark:border-white/[0.06]">
                  <div className="w-10 h-10 rounded-full flex items-center justify-center text-xl
                    bg-slate-100 dark:bg-white/[0.05] shrink-0">
                    {t.icon}
                  </div>
                  <div>
                    <p className="font-bold text-sm text-slate-900 dark:text-white">{t.name}</p>
                    <p className="text-xs text-slate-500 dark:text-white/35">{t.business} · {t.location}</p>
                  </div>
                  <span className="ml-auto text-[10px] font-mono uppercase tracking-wider
                    text-teal-600/70 dark:text-teal-400/40">
                    {t.type}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>


      {/* ═══════════════════════════════════════════════════════════════════
          §3  FEATURES SECTION
      ═══════════════════════════════════════════════════════════════════ */}
      <FeaturesSection />


      {/* ═══════════════════════════════════════════════════════════════════
          §4  TOP 8 NICHES GRID
      ═══════════════════════════════════════════════════════════════════ */}
      <section className="w-full py-16 md:py-28 px-4 sm:px-6 md:px-8 relative z-10">
        <div className="max-w-7xl mx-auto">

          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-5 mb-10 md:mb-14">
            <div>
              <p className="font-mono text-[11px] uppercase tracking-[0.16em] mb-4
                text-teal-600 dark:text-teal-400/60">
                Schema Generators
              </p>
              <h2 className="text-3xl md:text-4xl font-black tracking-[-0.03em] leading-[1.05]
                text-slate-900 dark:text-white">
                Your Trade.<br />Your Schema.
              </h2>
            </div>
            <Link href="/niches"
              className="self-start sm:self-auto inline-flex items-center gap-2
                px-5 py-2.5 rounded-xl text-sm font-semibold font-mono
                transition-all duration-200
                text-slate-500 hover:text-slate-900 bg-slate-100 hover:bg-slate-200 border border-slate-200
                dark:text-white/40 dark:hover:text-white dark:bg-white/[0.03] dark:hover:bg-white/[0.06] dark:border-white/[0.08] dark:hover:border-white/[0.16]">
              Browse all 52 niches
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none"
                stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M5 12h14M12 5l7 7-7 7" />
              </svg>
            </Link>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 md:gap-4">
            {TOP_8_NICHES.map((niche, i) => (
              <Link key={niche.id} href={`/generator/${niche.id}`}
                className="group relative flex flex-col items-center justify-center
                  py-8 px-4 rounded-2xl overflow-hidden text-center min-h-[140px]
                  transition-all duration-300
                  bg-white border border-slate-200 shadow-sm
                  hover:border-teal-400/50 hover:shadow-[0_4px_20px_-6px_rgba(0,212,200,0.15)]
                  dark:bg-[#0C1018] dark:border-white/[0.07] dark:shadow-none
                  dark:hover:border-teal-500/40 dark:hover:bg-[#0e1520]
                  dark:hover:shadow-[0_0_30px_-8px_rgba(0,212,200,0.1)]">

                <div className="absolute top-0 left-0 right-0 h-px opacity-0
                  group-hover:opacity-100 transition-opacity duration-300
                  bg-gradient-to-r from-transparent via-teal-500/50 to-transparent" />

                {i < 2 && (
                  <span className="absolute top-3 right-3 font-mono text-[9px] font-bold
                    uppercase tracking-wider px-2 py-0.5 rounded-full
                    text-amber-600 bg-amber-50 border border-amber-200
                    dark:text-amber-400/80 dark:bg-amber-400/[0.08] dark:border-amber-400/[0.18]">
                    Popular
                  </span>
                )}

                <span className="text-4xl mb-3 leading-none block
                  group-hover:scale-110 transition-transform duration-300">
                  {niche.icon}
                </span>
                <span className="text-base font-bold tracking-tight leading-tight transition-colors duration-200
                  text-slate-700 group-hover:text-slate-900
                  dark:text-white/75 dark:group-hover:text-white">
                  {niche.name}
                </span>

                {/* @type peek on hover */}
                <span className="absolute bottom-0 left-0 right-0 py-2 px-3
                  font-mono text-[10px] text-center
                  translate-y-full group-hover:translate-y-0 transition-transform duration-300
                  bg-teal-50 border-t border-teal-200 text-teal-700
                  dark:bg-teal-500/[0.07] dark:border-t dark:border-teal-500/[0.12] dark:text-teal-400/70">
                  @type: &quot;{niche.type}&quot;
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>


      {/* ═══════════════════════════════════════════════════════════════════
          §5  SCHEMA GUIDES
      ═══════════════════════════════════════════════════════════════════ */}
      <section className="w-full py-16 px-4 sm:px-6 md:px-8 relative z-10">
        <div className="max-w-7xl mx-auto">
          <div className="rounded-2xl p-8 sm:p-12 relative overflow-hidden
            bg-slate-50 border border-slate-200
            dark:bg-[#0C1018] dark:border-white/[0.07]">

            <div className="absolute top-0 right-0 w-80 h-80 pointer-events-none
              bg-[radial-gradient(ellipse_at_top_right,rgba(0,212,200,0.03),transparent_70%)]
              dark:bg-[radial-gradient(ellipse_at_top_right,rgba(0,212,200,0.04),transparent_70%)]" />

            <div className="relative z-10">
              <p className="font-mono text-[11px] uppercase tracking-[0.16em] mb-4
                text-teal-600 dark:text-teal-400/60">
                Implementation Guides
              </p>
              <h2 className="text-2xl md:text-3xl font-black tracking-tight mb-8
                text-slate-900 dark:text-white">
                Generated your schema? Here&apos;s where it goes.
              </h2>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* WordPress guide */}
                <Link href="/guides/wordpress"
                  className="group flex items-start gap-5 p-6 rounded-xl transition-all duration-300
                    bg-white border border-slate-200
                    hover:border-sky-400/50 hover:shadow-[0_4px_20px_-6px_rgba(14,165,233,0.12)]
                    dark:bg-white/[0.02] dark:border-white/[0.07]
                    dark:hover:border-sky-500/30 dark:hover:bg-white/[0.04]">
                  <div className="shrink-0 w-11 h-11 rounded-xl flex items-center justify-center
                    bg-sky-50 border border-sky-200
                    dark:bg-sky-500/[0.08] dark:border-sky-500/[0.18]
                    group-hover:scale-105 transition-transform duration-300">
                    <svg className="w-5 h-5 text-sky-600 dark:text-sky-400" fill="none" viewBox="0 0 24 24"
                      stroke="currentColor" strokeWidth="2">
                      <path strokeLinecap="round" strokeLinejoin="round"
                        d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="font-bold text-base tracking-tight mb-1.5 transition-colors
                      text-slate-800 group-hover:text-slate-900
                      dark:text-white/85 dark:group-hover:text-white">
                      Add Schema to WordPress
                    </h3>
                    <p className="text-sm leading-relaxed font-light
                      text-slate-500 dark:text-white/30">
                      Inject JSON-LD into your WordPress header without paying $99/yr for
                      a bloated SEO plugin. Three methods, step-by-step.
                    </p>
                  </div>
                </Link>

                {/* SAB guide */}
                <Link href="/guides/service-area-business"
                  className="group flex items-start gap-5 p-6 rounded-xl transition-all duration-300
                    bg-white border border-slate-200
                    hover:border-orange-400/50 hover:shadow-[0_4px_20px_-6px_rgba(249,115,22,0.10)]
                    dark:bg-white/[0.02] dark:border-white/[0.07]
                    dark:hover:border-orange-500/30 dark:hover:bg-white/[0.04]">
                  <div className="shrink-0 w-11 h-11 rounded-xl flex items-center justify-center
                    bg-orange-50 border border-orange-200
                    dark:bg-orange-500/[0.08] dark:border-orange-500/[0.18]
                    group-hover:scale-105 transition-transform duration-300">
                    <svg className="w-5 h-5 text-orange-600 dark:text-orange-400" fill="none" viewBox="0 0 24 24"
                      stroke="currentColor" strokeWidth="2">
                      <path strokeLinecap="round" strokeLinejoin="round"
                        d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.243-4.243a8 8 0 1111.314 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round"
                        d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="font-bold text-base tracking-tight mb-1.5 transition-colors
                      text-slate-800 group-hover:text-slate-900
                      dark:text-white/85 dark:group-hover:text-white">
                      Service Area Business SEO
                    </h3>
                    <p className="text-sm leading-relaxed font-light
                      text-slate-500 dark:text-white/30">
                      The exact schema rules for businesses that hide their address on Google Maps.
                      Stay compliant, stay ranked. Covers{" "}
                      <code className="font-mono text-xs
                        text-orange-700 bg-orange-50 border-orange-200
                        dark:text-orange-400/70 dark:bg-orange-400/[0.07]
                        px-1 py-0.5 rounded border">
                        areaServed
                      </code>{" "}setup.
                    </p>
                  </div>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>


      {/* ═══════════════════════════════════════════════════════════════════
          §6  FAQ SECTION
      ═══════════════════════════════════════════════════════════════════ */}
      <section className="w-full py-16 md:py-28 px-4 sm:px-6 md:px-8 relative z-10">
        <div className="max-w-7xl mx-auto">

          <div className="text-center mb-10 md:mb-16">
            <p className="font-mono text-[11px] uppercase tracking-[0.16em] mb-4
              text-teal-600 dark:text-teal-400/60">
              Common Questions
            </p>
            <h2 className="text-3xl md:text-4xl font-black tracking-[-0.03em] mb-5
              text-slate-900 dark:text-white">
              Frequently Asked Questions
            </h2>
            <p className="max-w-xl mx-auto leading-relaxed font-light
              text-slate-500 dark:text-white/35">
              Everything you need to know about JSON-LD schema markup, local SEO,
              and ranking in the Google Map Pack.
            </p>
          </div>

          <div className="flex flex-col gap-4">
            {/* Row 1 */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {FAQ_ITEMS.slice(0, 3).map((faq) => (
                <div key={faq.q}
                  className="p-7 rounded-2xl flex flex-col transition-all duration-300
                    bg-white border border-slate-200 shadow-sm
                    hover:border-slate-300 hover:-translate-y-0.5
                    dark:bg-[#0C1018] dark:border-white/[0.07] dark:shadow-none
                    dark:hover:border-white/[0.12]">
                  <h3 className="text-base font-bold mb-3 leading-snug tracking-tight
                    text-slate-900 dark:text-white/85">
                    {faq.q}
                  </h3>
                  {faq.hasCode ? (
                    <p className="text-sm leading-relaxed font-light
                      text-slate-500 dark:text-white/35">
                      The JSON-LD script should be placed in the{" "}
                      <code className="font-mono text-xs
                        text-teal-700 bg-teal-50 border-teal-200
                        dark:text-teal-400/75 dark:bg-teal-500/[0.07] dark:border-teal-500/[0.12]
                        px-1.5 py-0.5 rounded border">
                        &lt;head&gt;
                      </code>{" "}
                      section of your HTML document, or just before the closing{" "}
                      <code className="font-mono text-xs
                        text-slate-500 bg-slate-100 border-slate-200
                        dark:text-white/45 dark:bg-white/[0.05] dark:border-white/[0.08]
                        px-1.5 py-0.5 rounded border">
                        &lt;/body&gt;
                      </code>{" "}
                      tag. Most CMS platforms like WordPress, Wix, and Squarespace have easy ways to inject code into the header.
                    </p>
                  ) : (
                    <p className="text-sm leading-relaxed font-light
                      text-slate-500 dark:text-white/35">
                      {faq.a}
                    </p>
                  )}
                </div>
              ))}
            </div>

            {/* Row 2 — teal accent bar */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {FAQ_ITEMS.slice(3).map((faq) => (
                <div key={faq.q}
                  className="p-7 rounded-2xl flex flex-col transition-all duration-300
                    bg-white border border-slate-200 shadow-sm
                    hover:border-teal-400/40 hover:-translate-y-0.5
                    dark:bg-[#0C1018] dark:border-white/[0.07] dark:shadow-none
                    dark:hover:border-teal-500/25">
                  <div className="w-8 h-[2px] rounded-full mb-5
                    bg-gradient-to-r from-teal-500/60 to-transparent" />
                  <h3 className="text-base font-bold mb-3 leading-snug tracking-tight
                    text-slate-900 dark:text-white/85">
                    {faq.q}
                  </h3>
                  <p className="text-sm leading-relaxed font-light
                    text-slate-500 dark:text-white/35">
                    {faq.a}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>


      {/* ═══════════════════════════════════════════════════════════════════
          §7  BOTTOM CTA
      ═══════════════════════════════════════════════════════════════════ */}
      <section className="w-full py-20 px-4 sm:px-6 md:px-8
        relative overflow-hidden text-center
        border-t border-slate-200 dark:border-white/[0.06]">

        {/* Light mode: subtle upward blue wash */}
        <div className="absolute inset-0 z-0 pointer-events-none dark:hidden
          bg-[radial-gradient(ellipse_80%_60%_at_50%_100%,rgba(14,165,233,0.05),transparent)]" />

        {/* Dark mode: teal glow */}
        <div className="absolute inset-0 z-0 pointer-events-none hidden dark:block
          bg-[radial-gradient(ellipse_80%_60%_at_50%_100%,rgba(0,212,200,0.07),transparent)]" />
        <div className="absolute inset-0 z-0 pointer-events-none hidden dark:block
          bg-[radial-gradient(ellipse_50%_40%_at_30%_80%,rgba(76,159,255,0.04),transparent)]" />

        <div className="relative z-10 max-w-3xl mx-auto flex flex-col items-center">

          {/* Eyebrow */}
          <div className="inline-flex items-center gap-2 mb-8 px-4 py-2 rounded-full
            bg-slate-100 border border-slate-200
            dark:bg-white/[0.04] dark:border-white/[0.07]">
            <span className="w-1.5 h-1.5 rounded-full bg-teal-500 dark:bg-teal-400 animate-pulse shrink-0" />
            <span className="font-mono text-[11px] uppercase tracking-wider
              text-slate-400 dark:text-white/35">
              Free to use. Always.
            </span>
          </div>

          {/* Headline */}
          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl
            font-black tracking-[-0.04em] mb-6 leading-[1.04]
            text-slate-900 dark:text-white">
            Your competitor just added<br />
            <span className="text-transparent bg-clip-text
              bg-gradient-to-r from-teal-500 via-cyan-400 to-teal-500
              dark:from-teal-400 dark:via-cyan-300 dark:to-teal-400">
              Plumber schema.
            </span>
          </h2>

          {/* Sub-copy */}
          <p className="text-lg mb-10 max-w-xl leading-relaxed font-light
            text-slate-500 dark:text-white/35">
            One JSON-LD block is the difference between your phone ringing and scrolling
            past you at 11pm when someone needs an emergency plumber.
            Generate yours in 30 seconds.
          </p>

          {/* CTA pair */}
          <div className="flex flex-col sm:flex-row gap-3 w-full sm:w-auto">
            <a href="#generator"
              className="group inline-flex h-14 w-full sm:w-auto items-center
                justify-center rounded-xl bg-teal-500 hover:bg-teal-400
                px-10 font-bold text-black text-base tracking-tight
                transition-all duration-200
                shadow-[0_0_40px_-8px_rgba(0,212,200,0.4)]
                hover:shadow-[0_0_55px_-5px_rgba(0,212,200,0.55)]
                hover:-translate-y-px
                focus:outline-none focus-visible:ring-2 focus-visible:ring-teal-500
                focus-visible:ring-offset-2 focus-visible:ring-offset-white dark:focus-visible:ring-offset-[#07090E]">
              Generate Free Schema
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none"
                className="ml-2 group-hover:translate-x-0.5 transition-transform duration-200"
                stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M5 12h14M12 5l7 7-7 7" />
              </svg>
            </a>

            <Link href="/niches"
              className="inline-flex h-14 w-full sm:w-auto items-center
                justify-center rounded-xl px-10 font-semibold text-base tracking-tight
                transition-all duration-200
                text-slate-600 hover:text-slate-900 bg-slate-100 hover:bg-slate-200 border border-slate-200
                dark:text-white/50 dark:hover:text-white dark:bg-transparent dark:hover:bg-white/[0.05]
                dark:border-white/[0.10] dark:hover:border-white/[0.20]
                focus:outline-none focus-visible:ring-2 focus-visible:ring-slate-400
                focus-visible:ring-offset-2 focus-visible:ring-offset-white dark:focus-visible:ring-offset-[#07090E]">
              Browse 52 Niches
            </Link>
          </div>

          {/* Objection eliminator */}
          <p className="mt-6 font-mono text-[11px] tracking-wider
            text-slate-400 dark:text-white/20">
            No account &nbsp;·&nbsp; No credit card &nbsp;·&nbsp; Ready in 30 seconds
          </p>
        </div>
      </section>
    </div>
  );
}
