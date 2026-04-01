import Link from "next/link";
import niches from "../niches.json";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Local Business Schema Generators by Industry | 50+ Niches",
  description:
    "Find the perfect JSON-LD schema generator for your specific local business niche. Boost your local SEO and Map Pack rankings with highly targeted structured data.",
  keywords: [
    "schema generator for local business",
    "json-ld builder",
    "local seo niches",
    "industry specific schema",
    "plumber schema generator",
    "electrician schema generator",
    "hvac schema generator",
    "local business structured data",
  ],
  alternates: {
    canonical: "https://www.getlocalschema.com/niches",
  },
};

export default function NichesPage() {
  // SEO: ItemList Schema for the directory of generators
  const itemListSchema = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: "Local Business Schema Generators",
    description:
      "A comprehensive directory of specialized schema generators for local businesses.",
    itemListElement: niches.map((niche, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: `${niche.name} Schema Generator`,
      url: `https://www.getlocalschema.com/generator/${niche.id}`,
    })),
  };

  // Featured spotlight — uses hyphenated IDs (matches niches.json after the ID fix)
  const popularIds = [
    "plumber",
    "electrician",
    "hvac",
    "lawyer",
    "dentist",
    "roofing-contractor",
  ];
  const popularNiches = niches.filter((n) => popularIds.includes(n.id));

  return (
    <main
      className="w-full min-h-screen bg-white dark:bg-[#0A0A0A]
        selection:bg-teal-500/25 selection:text-teal-700 dark:selection:text-teal-100"
      id="main-content"
    >
      {/* Inject Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(itemListSchema) }}
      />

      {/* ── HERO ──────────────────────────────────────────────────────────── */}
      <section className="relative overflow-hidden pt-20 pb-16 md:pt-32 md:pb-24 px-4 border-b
        border-slate-200 dark:border-white/[0.08]
        bg-white dark:bg-[#0A0A0A]">

        {/* Background grid (dark only) */}
        <div className="absolute inset-0 z-0 pointer-events-none hidden dark:block
          bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)]
          bg-[size:24px_24px]" />

        {/* Background grid (light only) */}
        <div className="absolute inset-0 z-0 pointer-events-none dark:hidden
          bg-[radial-gradient(circle,rgba(100,116,139,0.10)_1px,transparent_1px)]
          bg-[size:24px_24px]" />

        {/* Teal glow (dark only) */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[500px]
          opacity-40 pointer-events-none z-0 hidden dark:block">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))]
            from-teal-500/12 via-cyan-500/5 to-transparent blur-3xl" />
        </div>

        <div className="max-w-5xl mx-auto text-center relative z-10">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full
            bg-slate-100 border border-slate-200 text-slate-600 text-sm font-medium
            dark:bg-[#111111] dark:border-white/10 dark:text-white/55
            mb-8 backdrop-blur-md transition-transform hover:scale-105 shadow-sm">
            <span className="flex h-2 w-2 rounded-full bg-teal-400
              shadow-[0_0_8px_rgba(45,212,191,0.8)]" />
            {niches.length}+ Industries Supported
          </div>

          <h1 className="text-4xl md:text-5xl lg:text-7xl font-extrabold tracking-tighter mb-6 leading-[1.05]
            text-slate-900 dark:text-white">
            Local Business Schema{" "}
            <br className="hidden md:block" />
            <span className="text-transparent bg-clip-text bg-gradient-to-r
              from-teal-500 via-cyan-400 to-teal-500 pb-2">
              by Industry
            </span>
          </h1>

          <p className="text-lg md:text-xl max-w-3xl mx-auto leading-relaxed font-medium
            text-slate-500 dark:text-slate-400">
            Generic{" "}
            <code className="bg-slate-100 border border-slate-200 text-slate-700 px-1.5 py-0.5 rounded-md text-sm
              dark:bg-white/[0.06] dark:border-white/[0.08] dark:text-white/80 font-mono">
              LocalBusiness
            </code>{" "}
            schema is no longer enough to win the Google Map Pack. Select your
            specific industry below to generate highly targeted, valid JSON-LD
            structured data in seconds.
          </p>
        </div>
      </section>

      {/* ── MAIN DIRECTORY ────────────────────────────────────────────────── */}
      <section className="py-14 md:py-24 px-4 relative z-10">
        <div className="max-w-7xl mx-auto">

          {/* Popular spotlight */}
          {popularNiches.length > 0 && (
            <div className="mb-12 md:mb-20">
              <h2 className="text-2xl md:text-3xl font-extrabold tracking-tighter mb-8
                flex items-center gap-3 text-slate-900 dark:text-white">
                <span className="drop-shadow-sm">🔥</span> Most Popular Generators
              </h2>

              <div className="grid grid-cols-3 md:grid-cols-6 gap-3 md:gap-5">
                {popularNiches.map((niche) => (
                  <Link
                    key={niche.id}
                    href={`/generator/${niche.id}`}
                    className="group flex flex-col items-center justify-center p-4 md:p-7 text-center
                      rounded-2xl border transition-all duration-300
                      bg-white border-slate-200 shadow-sm
                      hover:-translate-y-1 hover:border-teal-400/60 hover:shadow-[0_8px_30px_rgba(0,0,0,0.1)]
                      dark:bg-[#111111] dark:border-white/10 dark:shadow-none
                      dark:hover:border-teal-500/40 dark:hover:shadow-[0_8px_30px_rgba(0,0,0,0.4)]
                      focus:outline-none focus:ring-2 focus:ring-teal-500
                      focus:ring-offset-2 focus:ring-offset-white dark:focus:ring-offset-[#0A0A0A]"
                  >
                    <div className="w-12 h-12 md:w-14 md:h-14 rounded-xl flex items-center justify-center
                      text-2xl md:text-3xl mb-3 border transition-all duration-300
                      bg-slate-100 border-slate-200
                      group-hover:bg-teal-50 group-hover:border-teal-200 group-hover:scale-110
                      dark:bg-white/[0.04] dark:border-white/[0.06]
                      dark:group-hover:bg-teal-500/[0.10] dark:group-hover:border-teal-500/20">
                      {niche.icon}
                    </div>
                    <span className="font-bold text-sm tracking-tight transition-colors
                      text-slate-900 group-hover:text-teal-600
                      dark:text-white dark:group-hover:text-teal-400">
                      {niche.name}
                    </span>
                  </Link>
                ))}
              </div>
            </div>
          )}

          {/* All niches — every entry from niches.json, no exclusions */}
          <div>
            <h2 className="text-2xl md:text-3xl font-extrabold tracking-tighter mb-8
              text-slate-900 dark:text-white">
              All Industry Niches (A–Z)
            </h2>

            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3 md:gap-4">
              {niches.map((niche) => (
                <Link
                  key={niche.id}
                  href={`/generator/${niche.id}`}
                  className="group flex flex-col sm:flex-row items-center sm:items-center
                    p-3 sm:p-4 rounded-2xl border transition-all duration-300 text-center sm:text-left
                    bg-white border-slate-200 shadow-sm
                    hover:-translate-y-px hover:border-teal-400/60
                    hover:shadow-[0_6px_20px_rgba(0,0,0,0.08)]
                    dark:bg-[#111111] dark:border-white/10 dark:shadow-none
                    dark:hover:border-indigo-500/50
                    dark:hover:shadow-[0_8px_20px_rgba(0,0,0,0.4)]
                    focus:outline-none focus:ring-2 focus:ring-teal-500
                    focus:ring-offset-2 focus:ring-offset-white dark:focus:ring-offset-[#0A0A0A]"
                >
                  <div className="w-10 h-10 rounded-xl flex items-center justify-center
                    text-xl mb-2 sm:mb-0 sm:mr-3 flex-shrink-0 border transition-colors duration-300
                    bg-slate-100 border-slate-200
                    group-hover:bg-teal-50 group-hover:border-teal-200
                    dark:bg-white/[0.04] dark:border-white/[0.06]
                    dark:group-hover:bg-teal-500/[0.08] dark:group-hover:border-teal-500/20">
                    {niche.icon}
                  </div>
                  <div className="min-w-0 w-full sm:w-auto">
                    <span className="font-bold text-sm tracking-tight block truncate transition-colors
                      text-slate-900 group-hover:text-teal-600
                      dark:text-white dark:group-hover:text-teal-400">
                      {niche.name}
                    </span>
                    <span
                      className="text-[10px] font-mono mt-0.5 block truncate tracking-wide uppercase
                        text-slate-400 dark:text-slate-500"
                      title={niche.schemaType}
                    >
                      {niche.schemaType}
                    </span>
                  </div>
                </Link>
              ))}
            </div>
          </div>

          {/* Don't see your niche? */}
          <div className="mt-12 md:mt-20 rounded-[2rem] border p-8 md:p-12 text-center
            max-w-3xl mx-auto relative overflow-hidden
            bg-slate-50 border-slate-200 shadow-sm
            dark:bg-[#111111] dark:border-white/10 dark:shadow-[0_8px_30px_rgba(0,0,0,0.3)]">
            {/* Decorative glow (dark only) */}
            <div className="absolute top-0 right-0 w-64 h-64 rounded-full blur-3xl
              -mr-32 -mt-32 pointer-events-none hidden dark:block
              bg-teal-500/[0.06]" />

            <h3 className="text-2xl font-extrabold tracking-tighter mb-3 relative z-10
              text-slate-900 dark:text-white">
              Don&apos;t see your specific industry?
            </h3>
            <p className="text-lg mb-8 font-medium relative z-10
              text-slate-500 dark:text-slate-400">
              You can still generate perfectly valid schema using our general{" "}
              <Link
                href="/schema-tool"
                className="font-bold border-b pb-0.5 transition-colors
                  text-teal-600 border-teal-500/40 hover:text-teal-700 hover:border-teal-600
                  dark:text-teal-400 dark:border-teal-500/30 dark:hover:text-teal-300 dark:hover:border-teal-400"
              >
                Local Business Schema Generator
              </Link>
              .
            </p>
          </div>

        </div>
      </section>

      {/* ── BOTTOM CTA ────────────────────────────────────────────────────── */}
      <section className="py-14 md:py-24 px-4 relative border-t
        bg-slate-50 border-slate-200
        dark:bg-[#0A0A0A] dark:border-white/[0.08]">
        <div className="max-w-5xl mx-auto text-center">
          <h2 className="text-3xl md:text-5xl font-extrabold tracking-tighter mb-6
            text-slate-900 dark:text-white">
            Need help adding schema to your site?
          </h2>
          <p className="mb-10 md:mb-14 text-lg md:text-xl font-medium max-w-2xl mx-auto
            text-slate-500 dark:text-slate-400">
            Check out our free, step-by-step guides for implementing your
            generated JSON-LD code correctly to boost your local rankings.
          </p>

          <div className="grid md:grid-cols-2 gap-6 text-left relative z-10">

            {/* WordPress guide */}
            <Link
              href="/guides/wordpress"
              className="group flex flex-col sm:flex-row items-start gap-6 p-8 rounded-3xl
                border transition-all duration-300
                bg-white border-slate-200
                hover:border-sky-400/60 hover:shadow-[0_8px_30px_rgba(0,0,0,0.08)]
                dark:bg-white/[0.04] dark:border-white/[0.07]
                dark:hover:bg-white/[0.06] dark:hover:border-sky-500/30
                dark:hover:shadow-[0_8px_30px_rgba(0,0,0,0.3)]"
            >
              <div className="w-16 h-16 rounded-2xl flex items-center justify-center
                flex-shrink-0 border transition-all duration-300
                bg-slate-100 border-slate-200 text-sky-500
                group-hover:scale-110 group-hover:bg-sky-50 group-hover:border-sky-200
                dark:bg-[#111111] dark:border-white/[0.06] dark:text-sky-400
                dark:group-hover:bg-sky-500/[0.08] dark:group-hover:border-sky-500/20">
                <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24"
                  stroke="currentColor" strokeWidth="2.5">
                  <path strokeLinecap="round" strokeLinejoin="round"
                    d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
                </svg>
              </div>
              <div>
                <h3 className="font-bold text-2xl tracking-tight mb-3 transition-colors
                  text-slate-900 group-hover:text-sky-600
                  dark:text-white dark:group-hover:text-teal-400">
                  WordPress Schema Guide
                </h3>
                <p className="font-medium leading-relaxed
                  text-slate-500 dark:text-slate-400">
                  Learn how to cleanly inject schema code into your WordPress
                  header safely without buying bloated premium SEO plugins.
                </p>
              </div>
            </Link>

            {/* SAB guide */}
            <Link
              href="/guides/service-area-business"
              className="group flex flex-col sm:flex-row items-start gap-6 p-8 rounded-3xl
                border transition-all duration-300
                bg-white border-slate-200
                hover:border-amber-400/60 hover:shadow-[0_8px_30px_rgba(0,0,0,0.08)]
                dark:bg-white/[0.04] dark:border-white/[0.07]
                dark:hover:bg-white/[0.06] dark:hover:border-amber-500/30
                dark:hover:shadow-[0_8px_30px_rgba(0,0,0,0.3)]"
            >
              <div className="w-16 h-16 rounded-2xl flex items-center justify-center
                flex-shrink-0 border transition-all duration-300
                bg-slate-100 border-slate-200 text-amber-500
                group-hover:scale-110 group-hover:bg-amber-50 group-hover:border-amber-200
                dark:bg-[#111111] dark:border-white/[0.06] dark:text-amber-300
                dark:group-hover:bg-amber-500/[0.08] dark:group-hover:border-amber-500/20">
                <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24"
                  stroke="currentColor" strokeWidth="2.5">
                  <path strokeLinecap="round" strokeLinejoin="round"
                    d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.243-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round"
                    d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
              </div>
              <div>
                <h3 className="font-bold text-2xl tracking-tight mb-3 transition-colors
                  text-slate-900 group-hover:text-amber-600
                  dark:text-white dark:group-hover:text-teal-400">
                  SAB Optimization Guide
                </h3>
                <p className="font-medium leading-relaxed
                  text-slate-500 dark:text-slate-400">
                  Discover the exact schema requirements and address rules to
                  stay compliant if you hide your location on Google Maps.
                </p>
              </div>
            </Link>

          </div>
        </div>
      </section>
    </main>
  );
}
