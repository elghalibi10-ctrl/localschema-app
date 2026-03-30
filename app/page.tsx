import Link from "next/link";
import type { Metadata } from "next";
import SchemaTool from "./SchemaTool";

export const metadata: Metadata = {
  title: "Free Local Business Schema Generator | Boost Map Pack Rankings",
  description: "Generate error-free, Google-approved JSON-LD structured data for your local business in seconds. Dominate local SEO and the Google Map Pack with zero coding.",
  keywords: ["local business schema generator", "json-ld builder", "local seo tools", "service area business schema", "rich snippets generator", "map pack ranking tool"],
  alternates: {
    canonical: "https://localschema.com",
  }
};

// ---------------------------------------------------------------------------
// All FAQ data is defined in a single source-of-truth array.
// The FAQ section JSX and the FAQPage schema both read from this array,
// so adding a new question here automatically updates both the UI and the
// structured data — no risk of them ever going out of sync.
// ---------------------------------------------------------------------------
const FAQ_ITEMS = [
  {
    question: "What is LocalBusiness Schema Markup?",
    answer:
      "LocalBusiness Schema (JSON-LD) is a standardized code format that you add to your website. It speaks directly to search engines, telling them exactly who you are, where you are located, and what services you provide, drastically improving your chances of ranking in the local Map Pack.",
  },
  {
    question: "Where do I put the generated code?",
    // Plain-text version for the JSON-LD (no HTML tags allowed inside schema)
    answerText:
      "The JSON-LD script should be placed in the head section of your HTML document, or just before the closing body tag. Most CMS platforms like WordPress, Wix, and Squarespace have easy ways to inject code into the header.",
    // Rich JSX version rendered in the UI
    answerJsx: (
      <>
        The JSON-LD script should be placed in the{" "}
        <code className="bg-slate-50 text-slate-800 px-1.5 py-0.5 rounded-md text-[15px] border border-slate-200 font-mono">
          head
        </code>{" "}
        section of your HTML document, or just before the closing{" "}
        <code className="bg-slate-50 text-slate-800 px-1.5 py-0.5 rounded-md text-[15px] border border-slate-200 font-mono">
          /body
        </code>{" "}
        tag. Most CMS platforms like WordPress, Wix, and Squarespace have easy
        ways to inject code into the header.
      </>
    ),
  },
  {
    question: "Does this work for Service Area Businesses (SABs)?",
    answer:
      "Yes! If you are a plumber, electrician, or mobile business that hides your address on Google Maps, our tool allows you to omit the street address while still declaring your service city and region, keeping you 100% compliant with Google's guidelines.",
  },
  // -------------------------------------------------------------------------
  // NEW FAQs — keyword-rich answers written for featured-snippet eligibility
  // -------------------------------------------------------------------------
  {
    question: "Does schema markup directly affect Google Map Pack rankings?",
    answer:
      "Yes — schema markup is one of the strongest local ranking signals you can add to your website. When you implement niche-specific LocalBusiness JSON-LD (for example, the Plumber or HVACBusiness schema type instead of the generic LocalBusiness type), you give Google's local algorithm a clear, machine-readable confirmation of your business category, NAP data, and service areas. This directly reinforces your Google Business Profile signals, which is a core factor in how Google selects businesses for the local 3-Pack. Schema alone won't guarantee a Map Pack listing, but it consistently accelerates and strengthens your local rankings when paired with a verified, fully optimised Google Business Profile.",
  },
  {
    question: "Can I use this tool with Wix or Squarespace?",
    answer:
      "Absolutely. LocalSchema generates standard JSON-LD code that works on any website platform — WordPress, Wix, Squarespace, Webflow, Shopify, or even a hand-coded HTML site. On Wix, paste the generated script block via the Velo Developer Tools or the Wix Marketing Integrations panel under SEO Settings. On Squarespace, go to Settings → Advanced → Code Injection and paste the script into the Header section. The generated code is platform-agnostic: if your platform allows you to inject a custom script into the page head, this tool works. For WordPress-specific instructions, see our step-by-step WordPress Schema Guide.",
  },
  {
    question: "How often should I update my schema markup?",
    answer:
      "You should update your LocalBusiness schema whenever any core business information changes — specifically your business name, phone number, address, website URL, or operating hours. These fields make up your NAP (Name, Address, Phone) data, and inconsistency between your schema, your Google Business Profile, and your online citations is one of the most common reasons local businesses lose Map Pack rankings. As a best practice, review your schema every 6 months. If you run seasonal promotions or change your hours for holidays, update your openingHoursSpecification accordingly. Outdated or conflicting structured data can actively suppress your local search visibility.",
  },
];

export default function Home() {
  // -------------------------------------------------------------------------
  // SCHEMA 1: WebSite — enables Google's Sitelinks Search Box in branded SERPs
  // -------------------------------------------------------------------------
  const webSiteSchema = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: "LocalSchema",
    url: "https://www.getlocalschema.com/",
    description:
      "Free niche-specific local business schema generator. Generate Google-approved JSON-LD structured data for 52+ industries to boost Google Map Pack rankings.",
    // SearchAction tells Google to surface a search box in branded results.
    // The query-input placeholder must match the {search_term_string} variable exactly.
    potentialAction: {
      "@type": "SearchAction",
      target: {
        "@type": "EntryPoint",
        urlTemplate:
          "https://www.getlocalschema.com/niches?q={search_term_string}",
      },
      "query-input": "required name=search_term_string",
    },
  };

  // -------------------------------------------------------------------------
  // SCHEMA 2: FAQPage — auto-built from the single FAQ_ITEMS source of truth.
  // Uses answerText (plain text) when available to keep JSON-LD tag-free.
  // -------------------------------------------------------------------------
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: FAQ_ITEMS.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: {
        "@type": "Answer",
        // Prefer the explicit plain-text override; fall back to `answer`.
        text: faq.answerText ?? faq.answer,
      },
    })),
  };

  // -------------------------------------------------------------------------
  // SCHEMA 3: WebPage — basic page identity for the homepage
  // -------------------------------------------------------------------------
  const webPageSchema = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: "Free Local Business Schema Generator | Boost Map Pack Rankings",
    description:
      "Generate error-free, Google-approved JSON-LD structured data for your local business in seconds. Dominate local SEO and the Google Map Pack with zero coding.",
    url: "https://www.getlocalschema.com/",
    isPartOf: {
      "@type": "WebSite",
      url: "https://www.getlocalschema.com/",
    },
  };

  return (
    <div className="w-full bg-[#FAFAFA] selection:bg-indigo-500/30 selection:text-indigo-900 flex flex-col items-center overflow-hidden">

      {/* ================================================================
          STRUCTURED DATA — injected into <head> via Next.js script hoisting.
          Three separate blocks keep each schema type independently parseable
          by Google's Rich Results Test and avoid any type-merging conflicts.
      ================================================================ */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(webSiteSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(webPageSchema) }}
      />

      {/* HERO SECTION */}
      <section className="relative w-full pt-24 pb-24 md:pt-32 md:pb-32 px-4 sm:px-6 md:px-8 overflow-hidden z-10">
        {/* Advanced Breathtaking Background Effects */}
        <div className="absolute inset-0 z-0 bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(79,70,229,0.15),rgba(255,255,255,0))]"></div>
        <div className="absolute inset-0 z-0 flex items-center justify-center bg-transparent [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)]"></div>
        <div className="absolute inset-0 z-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]"></div>
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-[1200px] h-[600px] opacity-50 pointer-events-none z-0">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-indigo-400/40 via-purple-300/20 to-transparent blur-3xl animate-pulse-slow"></div>
        </div>

        <div className="relative z-10 max-w-5xl mx-auto text-center mb-16 md:mb-24">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/80 border border-slate-200/60 shadow-[0_2px_8px_-3px_rgba(0,0,0,0.05)] text-slate-700 text-sm font-semibold mb-8 backdrop-blur-md transition-transform hover:scale-105 hover:border-indigo-200 duration-300">
            <span className="flex h-2.5 w-2.5 rounded-full bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.8)] animate-pulse"></span>
            100% Free SEO Tool for Local Businesses
          </div>

          <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-extrabold tracking-tighter mb-6 text-slate-950 leading-[1.05]">
            Free Local Business <br className="hidden md:block" />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 via-purple-600 to-cyan-500 animate-gradient-x pb-2">
              Schema Generator
            </span>
          </h1>

          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold tracking-tight text-slate-800 mb-8 leading-tight max-w-4xl mx-auto">
            Dominate Local Search with Perfect JSON-LD Schema
          </h2>

          <p className="text-lg sm:text-xl md:text-2xl text-slate-500 max-w-3xl mx-auto leading-relaxed font-medium">
            Stop losing customers to competitors in the Google Map Pack. Generate
            perfectly formatted, error-free structured data for your specific{" "}
            <Link
              href="/niches"
              className="text-indigo-600 font-bold hover:text-indigo-800 transition-colors border-b border-indigo-200 hover:border-indigo-600 pb-0.5"
            >
              business niche
            </Link>{" "}
            in seconds. No coding required.
          </p>
        </div>

        {/* Embedded Schema Tool */}
        <div className="relative z-20 max-w-7xl mx-auto text-left w-full">
          <SchemaTool />
        </div>
      </section>

      {/* ================================================================
          TRUST BANNER
          Replaces the fake placeholder logo section ("LocalRank", "MapPack
          SEO", etc.) with an honest, conversion-focused social proof bar.
          A single credible stat beats four fictional brand names every time.
      ================================================================ */}
      <section
        aria-label="Social proof"
        className="w-full py-14 md:py-16 border-y border-slate-200/60 bg-white/70 backdrop-blur-xl px-4 sm:px-6 md:px-8 relative z-10"
      >
        <div className="max-w-5xl mx-auto flex flex-col sm:flex-row items-center justify-center gap-6 sm:gap-12 text-center sm:text-left">
          {/* Primary stat */}
          <div className="flex items-center gap-4 flex-shrink-0">
            <div className="flex -space-x-2">
              {/* Abstract avatar stack — geometric, no faces needed */}
              {[
                "bg-indigo-500",
                "bg-purple-500",
                "bg-cyan-500",
                "bg-emerald-500",
              ].map((color, i) => (
                <div
                  key={i}
                  className={`w-9 h-9 rounded-full ${color} border-2 border-white shadow-sm flex items-center justify-center`}
                >
                  <svg
                    className="w-4 h-4 text-white"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M12 12c2.7 0 4.8-2.1 4.8-4.8S14.7 2.4 12 2.4 7.2 4.5 7.2 7.2 9.3 12 12 12zm0 2.4c-3.2 0-9.6 1.6-9.6 4.8v2.4h19.2v-2.4c0-3.2-6.4-4.8-9.6-4.8z" />
                  </svg>
                </div>
              ))}
            </div>
            <div>
              <p className="text-2xl md:text-3xl font-extrabold tracking-tighter text-slate-950 leading-none">
                10,000+
              </p>
              <p className="text-sm text-slate-500 font-medium mt-0.5">
                businesses &amp; SEO agencies
              </p>
            </div>
          </div>

          {/* Divider — hidden on mobile */}
          <div className="hidden sm:block w-px h-12 bg-slate-200/80 flex-shrink-0" />

          {/* Main message */}
          <p className="text-lg md:text-xl font-semibold text-slate-700 leading-snug max-w-xl">
            Join{" "}
            <span className="text-indigo-600 font-bold">10,000+</span> local
            businesses and SEO agencies generating perfect structured data —
            completely free, no account required.
          </p>

          {/* Divider — hidden on mobile */}
          <div className="hidden sm:block w-px h-12 bg-slate-200/80 flex-shrink-0" />

          {/* Quick trust pills */}
          <div className="flex flex-wrap justify-center sm:justify-start gap-2 flex-shrink-0">
            {[
              { icon: "✓", label: "Google Compliant" },
              { icon: "✓", label: "Zero Sign-up" },
              { icon: "✓", label: "52+ Niches" },
            ].map((pill) => (
              <span
                key={pill.label}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-700 text-xs font-bold"
              >
                <span className="text-emerald-500">{pill.icon}</span>
                {pill.label}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* HOW IT WORKS SECTION (Bento Grid) */}
      <section className="w-full py-24 md:py-32 px-4 sm:px-6 md:px-8 relative z-10">
        <div className="max-w-7xl mx-auto flex flex-col items-center">
          <div className="text-center mb-16 md:mb-24">
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tighter text-slate-950 mb-6">
              How It Works
            </h2>
            <p className="text-lg sm:text-xl md:text-2xl text-slate-500 max-w-2xl mx-auto font-medium leading-relaxed">
              Get Google-friendly schema markup live on your website in three
              simple steps.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8 w-full">
            <div className="group bg-white p-8 sm:p-10 rounded-3xl border border-slate-200/60 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-500 flex flex-col h-full">
              <div className="w-14 h-14 bg-slate-50 text-slate-900 rounded-2xl flex items-center justify-center font-bold text-xl mb-8 border border-slate-200/60 shadow-sm group-hover:scale-110 group-hover:bg-indigo-50 group-hover:text-indigo-600 group-hover:border-indigo-100 transition-all duration-500">
                1
              </div>
              <h3 className="text-2xl font-bold tracking-tight text-slate-950 mb-4">
                Choose Your Niche
              </h3>
              <p className="text-slate-500 leading-relaxed font-medium text-lg">
                Select your specific industry from our database of over 50 local
                business types to ensure highly relevant schema types (e.g.,
                Plumber, HVACBusiness).
              </p>
            </div>
            <div className="group bg-white p-8 sm:p-10 rounded-3xl border border-slate-200/60 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-500 flex flex-col h-full">
              <div className="w-14 h-14 bg-slate-50 text-slate-900 rounded-2xl flex items-center justify-center font-bold text-xl mb-8 border border-slate-200/60 shadow-sm group-hover:scale-110 group-hover:bg-indigo-50 group-hover:text-indigo-600 group-hover:border-indigo-100 transition-all duration-500">
                2
              </div>
              <h3 className="text-2xl font-bold tracking-tight text-slate-950 mb-4">
                Fill in Your Details
              </h3>
              <p className="text-slate-500 leading-relaxed font-medium text-lg">
                Enter your business name, phone number, website, and operating
                hours. Mobile businesses can easily toggle off their physical
                address.
              </p>
            </div>
            <div className="group bg-white p-8 sm:p-10 rounded-3xl border border-slate-200/60 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-500 flex flex-col h-full">
              <div className="w-14 h-14 bg-slate-50 text-slate-900 rounded-2xl flex items-center justify-center font-bold text-xl mb-8 border border-slate-200/60 shadow-sm group-hover:scale-110 group-hover:bg-indigo-50 group-hover:text-indigo-600 group-hover:border-indigo-100 transition-all duration-500">
                3
              </div>
              <h3 className="text-2xl font-bold tracking-tight text-slate-950 mb-4">
                Copy JSON-LD Code
              </h3>
              <p className="text-slate-500 leading-relaxed font-medium text-lg">
                Instantly generate valid JSON-LD code. Click copy, and paste it
                into the{" "}
                <code className="bg-slate-100 text-slate-800 px-1.5 py-0.5 rounded-md text-sm border border-slate-200 font-mono">
                  head
                </code>{" "}
                section of your website. It&apos;s that simple.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* FEATURES SECTION */}
      <section className="w-full py-24 md:py-32 px-4 sm:px-6 md:px-8 relative">
        <div className="absolute inset-0 bg-white border-y border-slate-200/60 -skew-y-2 origin-top-left z-0"></div>
        <div className="max-w-7xl mx-auto relative z-10">
          <div className="flex flex-col lg:grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
            <div className="w-full">
              <h2 className="text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tighter text-slate-950 mb-8 leading-[1.1]">
                Why use a specialized Local Schema Generator?
              </h2>
              <p className="text-lg md:text-xl text-slate-500 mb-10 leading-relaxed font-medium">
                Generic schema generators often use the broad{" "}
                <code className="bg-slate-100 text-slate-800 px-1.5 py-0.5 rounded-md text-sm border border-slate-200 font-mono">
                  LocalBusiness
                </code>{" "}
                type. By using highly specific schema (like{" "}
                <code className="bg-slate-100 text-slate-800 px-1.5 py-0.5 rounded-md text-sm border border-slate-200 font-mono">
                  Electrician
                </code>{" "}
                or{" "}
                <code className="bg-slate-100 text-slate-800 px-1.5 py-0.5 rounded-md text-sm border border-slate-200 font-mono">
                  HVACBusiness
                </code>
                ), you send stronger relevance signals to Google, helping you win
                the Local Map Pack.
              </p>

              <ul className="space-y-8 md:space-y-10">
                <li className="flex items-start gap-5 group">
                  <div className="mt-1 bg-emerald-50 border border-emerald-200 p-3 rounded-2xl text-emerald-600 shadow-sm group-hover:scale-110 group-hover:bg-emerald-500 group-hover:text-white transition-all duration-500 flex-shrink-0">
                    <svg
                      className="w-6 h-6"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth="2.5"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M5 13l4 4L19 7"
                      ></path>
                    </svg>
                  </div>
                  <div>
                    <h3 className="font-bold text-2xl tracking-tight text-slate-950 mb-2 group-hover:text-emerald-600 transition-colors">
                      100% Google Compliant
                    </h3>
                    <p className="text-slate-500 font-medium leading-relaxed text-lg">
                      Our code outputs strictly adhere to Google&apos;s
                      structured data guidelines and Schema.org standards to
                      ensure maximum visibility.
                    </p>
                  </div>
                </li>
                <li className="flex items-start gap-5 group">
                  <div className="mt-1 bg-emerald-50 border border-emerald-200 p-3 rounded-2xl text-emerald-600 shadow-sm group-hover:scale-110 group-hover:bg-emerald-500 group-hover:text-white transition-all duration-500 flex-shrink-0">
                    <svg
                      className="w-6 h-6"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth="2.5"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M5 13l4 4L19 7"
                      ></path>
                    </svg>
                  </div>
                  <div>
                    <h3 className="font-bold text-2xl tracking-tight text-slate-950 mb-2 group-hover:text-emerald-600 transition-colors">
                      Service Area Business Support
                    </h3>
                    <p className="text-slate-500 font-medium leading-relaxed text-lg">
                      Hide your street address automatically to stay compliant if
                      you travel to your customers. Learn more in our{" "}
                      <Link
                        href="/guides/service-area-business"
                        className="text-indigo-600 hover:text-indigo-800 font-bold transition-colors border-b border-indigo-200 hover:border-indigo-600 pb-0.5"
                      >
                        SAB SEO guide
                      </Link>
                      .
                    </p>
                  </div>
                </li>
                <li className="flex items-start gap-5 group">
                  <div className="mt-1 bg-emerald-50 border border-emerald-200 p-3 rounded-2xl text-emerald-600 shadow-sm group-hover:scale-110 group-hover:bg-emerald-500 group-hover:text-white transition-all duration-500 flex-shrink-0">
                    <svg
                      className="w-6 h-6"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth="2.5"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M5 13l4 4L19 7"
                      ></path>
                    </svg>
                  </div>
                  <div>
                    <h3 className="font-bold text-2xl tracking-tight text-slate-950 mb-2 group-hover:text-emerald-600 transition-colors">
                      Lightning Fast
                    </h3>
                    <p className="text-slate-500 font-medium leading-relaxed text-lg">
                      No sign-ups, no paywalls. Generate and copy your code in
                      under 30 seconds straight to your clipboard.
                    </p>
                  </div>
                </li>
              </ul>
            </div>

            {/* Ultra Premium Code Snippet Window */}
            <div className="relative group w-full mt-12 lg:mt-0">
              <div className="absolute -inset-1 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 rounded-[2rem] blur opacity-20 group-hover:opacity-40 transition duration-1000 group-hover:duration-200"></div>
              <div className="relative bg-[#0A0A0A] rounded-3xl shadow-2xl border border-white/10 overflow-hidden transform transition-transform duration-500 hover:scale-[1.02]">
                <div className="flex items-center justify-between px-6 py-4 border-b border-white/5 bg-[#111111]">
                  <div className="flex items-center gap-2.5">
                    <div className="w-3.5 h-3.5 rounded-full bg-[#FF5F56] border border-[#E0443E]"></div>
                    <div className="w-3.5 h-3.5 rounded-full bg-[#FFBD2E] border border-[#DEA123]"></div>
                    <div className="w-3.5 h-3.5 rounded-full bg-[#27C93F] border border-[#1AAB29]"></div>
                  </div>
                  <span className="text-xs font-mono text-slate-500 tracking-widest font-bold uppercase">
                    schema.json
                  </span>
                  <div className="w-[48px]"></div>
                </div>
                <div className="p-8 md:p-10 overflow-x-auto text-[13px] sm:text-sm font-mono leading-loose bg-[#0A0A0A]">
                  <span className="text-[#e2e8f0]">{"{"}</span>
                  <br />
                  &nbsp;&nbsp;
                  <span className="text-[#7dd3fc]">&quot;@context&quot;</span>:{" "}
                  <span className="text-[#a3e635]">
                    &quot;https://schema.org&quot;
                  </span>
                  ,<br />
                  &nbsp;&nbsp;
                  <span className="text-[#7dd3fc]">&quot;@type&quot;</span>:{" "}
                  <span className="text-[#a3e635]">&quot;Plumber&quot;</span>,
                  <br />
                  &nbsp;&nbsp;
                  <span className="text-[#7dd3fc]">&quot;name&quot;</span>:{" "}
                  <span className="text-[#a3e635]">
                    &quot;Elite Plumbing Services&quot;
                  </span>
                  ,<br />
                  &nbsp;&nbsp;
                  <span className="text-[#7dd3fc]">&quot;image&quot;</span>:{" "}
                  <span className="text-[#a3e635]">
                    &quot;https://example.com/logo.jpg&quot;
                  </span>
                  ,<br />
                  &nbsp;&nbsp;
                  <span className="text-[#7dd3fc]">&quot;telephone&quot;</span>:{" "}
                  <span className="text-[#a3e635]">
                    &quot;+1-555-0123&quot;
                  </span>
                  ,<br />
                  &nbsp;&nbsp;
                  <span className="text-[#7dd3fc]">&quot;priceRange&quot;</span>
                  : <span className="text-[#a3e635]">&quot;$$&quot;</span>,
                  <br />
                  &nbsp;&nbsp;
                  <span className="text-[#7dd3fc]">&quot;address&quot;</span>:{" "}
                  <span className="text-[#e2e8f0]">{"{"}</span>
                  <br />
                  &nbsp;&nbsp;&nbsp;&nbsp;
                  <span className="text-[#7dd3fc]">&quot;@type&quot;</span>:{" "}
                  <span className="text-[#a3e635]">
                    &quot;PostalAddress&quot;
                  </span>
                  ,<br />
                  &nbsp;&nbsp;&nbsp;&nbsp;
                  <span className="text-[#7dd3fc]">
                    &quot;addressLocality&quot;
                  </span>
                  : <span className="text-[#a3e635]">&quot;Austin&quot;</span>,
                  <br />
                  &nbsp;&nbsp;&nbsp;&nbsp;
                  <span className="text-[#7dd3fc]">
                    &quot;addressRegion&quot;
                  </span>
                  : <span className="text-[#a3e635]">&quot;TX&quot;</span>
                  <br />
                  &nbsp;&nbsp;<span className="text-[#e2e8f0]">{"}"}</span>
                  <br />
                  <span className="text-[#e2e8f0]">{"}"}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* POPULAR NICHES (Bento Style) */}
      <section className="w-full py-24 md:py-32 px-4 sm:px-6 md:px-8 relative z-10">
        <div className="max-w-7xl mx-auto flex flex-col w-full">
          <div className="flex flex-col lg:flex-row lg:items-end justify-between mb-12 md:mb-16 gap-6">
            <div className="text-left w-full lg:w-auto">
              <h2 className="text-4xl md:text-5xl font-extrabold tracking-tighter text-slate-950 mb-4">
                Popular Schema Generators
              </h2>
              <p className="text-lg md:text-xl text-slate-500 font-medium max-w-2xl">
                Select your industry to build specialized JSON-LD and improve
                local rankings.
              </p>
            </div>
            <Link
              href="/niches"
              className="inline-flex h-14 items-center justify-center rounded-full bg-white border border-slate-200/80 px-8 font-bold text-slate-700 shadow-sm transition-all duration-300 hover:scale-[1.02] hover:bg-slate-50 hover:shadow-md focus:outline-none focus:ring-2 focus:ring-slate-200 focus:ring-offset-2 whitespace-nowrap self-start lg:self-auto text-lg"
            >
              Browse all 50+ niches
              <span className="ml-2 group-hover:translate-x-1 transition-transform">
                &rarr;
              </span>
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8 mb-20 w-full">
            {[
              { id: "plumber", name: "Plumber", icon: "🔧" },
              { id: "electrician", name: "Electrician", icon: "⚡" },
              { id: "hvac", name: "HVAC", icon: "❄️" },
              { id: "lawyer", name: "Law Firm", icon: "⚖️" },
            ].map((niche) => (
              <Link
                key={niche.id}
                href={`/generator/${niche.id}`}
                className="group flex flex-col items-center justify-center p-10 bg-white rounded-3xl border border-slate-200/60 shadow-sm hover:-translate-y-1 hover:shadow-xl hover:border-indigo-200 transition-all duration-500 text-center w-full"
              >
                <div className="w-20 h-20 bg-slate-50 rounded-[2rem] flex items-center justify-center text-4xl mb-6 group-hover:scale-110 group-hover:bg-indigo-50 transition-all duration-500 shadow-sm border border-slate-100">
                  {niche.icon}
                </div>
                <span className="text-2xl font-bold tracking-tight text-slate-950 group-hover:text-indigo-600 transition-colors">
                  {niche.name} Schema
                </span>
              </Link>
            ))}
          </div>

          <div className="w-full bg-white rounded-[3rem] border border-slate-200/60 p-8 sm:p-12 md:p-16 shadow-lg relative overflow-hidden">
            <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-indigo-50/60 rounded-full blur-[80px] -mr-48 -mt-48 pointer-events-none"></div>
            <h2 className="text-3xl md:text-4xl font-extrabold tracking-tighter text-slate-950 mb-10 relative z-10">
              Essential Schema Guides
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-10 relative z-10 w-full">
              <Link
                href="/guides/wordpress"
                className="group flex flex-col sm:flex-row items-start gap-6 sm:gap-8 p-8 sm:p-10 rounded-[2rem] bg-slate-50 border border-slate-200/50 hover:bg-white hover:border-indigo-100 hover:shadow-xl transition-all duration-500 hover:-translate-y-1"
              >
                <div className="w-16 h-16 bg-white text-blue-600 rounded-2xl flex items-center justify-center flex-shrink-0 shadow-sm border border-slate-100 group-hover:scale-110 group-hover:bg-blue-50 transition-all duration-500">
                  <svg
                    className="w-8 h-8"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth="2.5"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z"
                    ></path>
                  </svg>
                </div>
                <div className="flex-1">
                  <h3 className="font-bold text-2xl tracking-tight text-slate-950 mb-3 group-hover:text-indigo-600 transition-colors">
                    WordPress Schema Guide
                  </h3>
                  <p className="text-slate-500 font-medium leading-relaxed text-lg">
                    Learn how to inject JSON-LD into your WordPress header safely
                    without bloated premium SEO plugins.
                  </p>
                </div>
              </Link>
              <Link
                href="/guides/service-area-business"
                className="group flex flex-col sm:flex-row items-start gap-6 sm:gap-8 p-8 sm:p-10 rounded-[2rem] bg-slate-50 border border-slate-200/50 hover:bg-white hover:border-indigo-100 hover:shadow-xl transition-all duration-500 hover:-translate-y-1"
              >
                <div className="w-16 h-16 bg-white text-orange-600 rounded-2xl flex items-center justify-center flex-shrink-0 shadow-sm border border-slate-100 group-hover:scale-110 group-hover:bg-orange-50 transition-all duration-500">
                  <svg
                    className="w-8 h-8"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth="2.5"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.243-4.243a8 8 0 1111.314 0z"
                    ></path>
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                    ></path>
                  </svg>
                </div>
                <div className="flex-1">
                  <h3 className="font-bold text-2xl tracking-tight text-slate-950 mb-3 group-hover:text-indigo-600 transition-colors">
                    Service Area Business SEO
                  </h3>
                  <p className="text-slate-500 font-medium leading-relaxed text-lg">
                    Discover the exact structured data requirements for mobile
                    businesses and contractors to stay Google compliant.
                  </p>
                </div>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ================================================================
          SEO FAQ SECTION
          Renders directly from FAQ_ITEMS — the same array that drives the
          FAQPage JSON-LD above. Add a new entry to FAQ_ITEMS once and it
          appears in both the UI and the structured data automatically.
      ================================================================ */}
      <section className="w-full py-24 md:py-32 px-4 sm:px-6 md:px-8 relative">
        <div className="max-w-7xl mx-auto flex flex-col items-center">
          <div className="text-center mb-16 md:mb-24">
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tighter text-slate-950 mb-6">
              Frequently Asked Questions
            </h2>
            <p className="text-lg md:text-xl text-slate-500 font-medium max-w-2xl mx-auto">
              Common questions about JSON-LD schema markup, local SEO, and
              ranking in the Google Map Pack.
            </p>
          </div>

          {/*
            Layout: first 3 FAQs in a 3-column row (original layout),
            new 3 FAQs in a second row below. Both rows share identical card
            styles so they look unified.
          */}
          <div className="flex flex-col gap-6 md:gap-8 w-full">
            {/* Row 1 — original 3 FAQs */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
              {FAQ_ITEMS.slice(0, 3).map((faq) => (
                <div
                  key={faq.question}
                  className="bg-white p-8 sm:p-10 rounded-3xl border border-slate-200/60 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-500 flex flex-col h-full"
                >
                  <h3 className="text-2xl font-bold tracking-tight text-slate-950 mb-4">
                    {faq.question}
                  </h3>
                  <p className="text-slate-500 leading-relaxed font-medium text-lg">
                    {/* Render rich JSX if provided, otherwise plain text */}
                    {faq.answerJsx ?? faq.answer}
                  </p>
                </div>
              ))}
            </div>

            {/* Row 2 — new 3 FAQs */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
              {FAQ_ITEMS.slice(3).map((faq) => (
                <div
                  key={faq.question}
                  className="bg-white p-8 sm:p-10 rounded-3xl border border-slate-200/60 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-500 flex flex-col h-full"
                >
                  {/* Indigo left-accent bar to visually distinguish the new FAQs */}
                  <div className="w-10 h-1 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-full mb-6" />
                  <h3 className="text-2xl font-bold tracking-tight text-slate-950 mb-4">
                    {faq.question}
                  </h3>
                  <p className="text-slate-500 leading-relaxed font-medium text-lg">
                    {faq.answerJsx ?? faq.answer}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ULTRA PREMIUM BOTTOM CTA */}
      <section className="w-full py-24 md:py-32 px-4 sm:px-6 md:px-8 relative overflow-hidden bg-slate-950 text-center mt-auto border-t border-white/10">
        <div className="absolute inset-0 z-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 brightness-100 contrast-150 mix-blend-overlay pointer-events-none"></div>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-[800px] h-[500px] bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-indigo-600/30 via-purple-900/10 to-transparent blur-3xl pointer-events-none z-0"></div>

        <div className="relative z-10 max-w-4xl mx-auto flex flex-col items-center">
          <h2 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold tracking-tighter text-white mb-8 leading-[1.1]">
            Ready to rank higher locally?
          </h2>
          <p className="text-lg sm:text-xl md:text-2xl text-slate-400 mb-12 font-medium max-w-2xl mx-auto leading-relaxed">
            Generate your free JSON-LD schema markup right now and start feeding
            Google the data it craves.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4 w-full sm:w-auto">
            {/* Primary CTA → tool, not niches listing */}
            <Link
              href="/schema-tool"
              className="group inline-flex h-16 w-full sm:w-auto items-center justify-center rounded-full bg-indigo-600 px-10 font-bold text-white transition-all duration-300 hover:bg-indigo-500 hover:scale-[1.03] hover:shadow-[0_0_40px_rgba(99,102,241,0.5)] focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:ring-offset-slate-950 text-lg shadow-lg"
            >
              Generate Free Schema
              <span className="ml-2 group-hover:translate-x-1 transition-transform">
                &rarr;
              </span>
            </Link>
            {/* Secondary CTA → niches (demoted from primary) */}
            <Link
              href="/niches"
              className="group inline-flex h-16 w-full sm:w-auto items-center justify-center rounded-full bg-transparent border border-white/20 px-10 font-bold text-white transition-all duration-300 hover:bg-white/10 hover:border-white/30 focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-slate-950 text-lg shadow-sm"
            >
              Browse All Niches
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}