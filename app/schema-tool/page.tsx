import type { Metadata } from "next";
import SchemaTool from "../SchemaTool";

export const metadata: Metadata = {
  title: "Free JSON-LD Schema Generator for Local Businesses",
  description:
    "Generate perfectly formatted, Google-compliant JSON-LD structured data for your local business in seconds. Supports 52+ niche types including Plumber, HVAC, Electrician, and more. No sign-up required.",
  keywords: [
    "json-ld schema generator",
    "local business schema",
    "structured data generator",
    "schema markup tool",
    "google rich results",
    "local seo schema",
    "free schema generator",
  ],
  alternates: {
    canonical: "https://www.getlocalschema.com/schema-tool",
  },
};

export default function SchemaToolPage() {
  return (
    <main className="w-full min-h-screen bg-[#FAFAFA] dark:bg-[#0A0A0A] selection:bg-indigo-500/20 selection:text-indigo-900 dark:selection:bg-teal-500/25 dark:selection:text-teal-100">

      {/* ══════════════════════════════════════════════════════════════
          HERO SECTION
      ══════════════════════════════════════════════════════════════ */}
      <section className="relative w-full pt-24 pb-12 px-4 sm:px-6 lg:px-8 text-center overflow-hidden">

        {/* Subtle radial glow — light and dark variants */}
        <div
          className="absolute inset-0 z-0 pointer-events-none"
          aria-hidden="true"
        >
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_55%_at_50%_0%,rgba(99,102,241,0.07),transparent)] dark:bg-[radial-gradient(ellipse_80%_55%_at_50%_0%,rgba(0,212,200,0.08),transparent)]" />
        </div>

        <div className="relative z-10 max-w-3xl mx-auto">

          {/* Eyebrow badge */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full mb-6
            bg-indigo-50 border border-indigo-200/60 text-indigo-600 text-xs font-bold uppercase tracking-widest
            dark:bg-teal-500/[0.08] dark:border-teal-500/20 dark:text-teal-400">
            <span className="w-1.5 h-1.5 rounded-full bg-indigo-400 dark:bg-teal-400 animate-pulse" />
            Free Tool — No Sign-up Required
          </div>

          {/* H1 */}
          <h1 className="text-5xl md:text-6xl font-extrabold tracking-tighter leading-[1.05] mb-6
            text-slate-950 dark:text-white">
            Free JSON-LD Schema
            <br />
            <span className="text-indigo-600 dark:text-teal-400">Generator</span>
          </h1>

          {/* Subheadline */}
          <p className="text-lg md:text-xl text-slate-500 dark:text-slate-400 max-w-2xl mx-auto leading-relaxed font-light">
            Generate perfectly formatted, Google-compliant structured data for your local business in seconds.
            No coding required. Supports 52+ business types.
          </p>

          {/* Trust bar */}
          <div className="flex flex-wrap items-center justify-center gap-6 mt-8">
            {[
              { icon: "✓", text: "Google-Approved Format" },
              { icon: "✓", text: "Zero Sign-up" },
              { icon: "✓", text: "52+ Business Types" },
              { icon: "✓", text: "Instant Download" },
            ].map(({ icon, text }) => (
              <div key={text} className="flex items-center gap-1.5 text-sm font-medium text-slate-500 dark:text-slate-500">
                <span className="text-emerald-500 font-bold">{icon}</span>
                {text}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════════
          SCHEMA TOOL
      ══════════════════════════════════════════════════════════════ */}
      <section className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 pb-20">
        <SchemaTool />
      </section>

      {/* ══════════════════════════════════════════════════════════════
          HOW IT WORKS
      ══════════════════════════════════════════════════════════════ */}
      <section className="w-full border-t border-slate-200/60 dark:border-white/10 bg-white dark:bg-[#111111]">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-20">

          {/* Section header */}
          <div className="text-center mb-14">
            <p className="text-xs font-bold uppercase tracking-[0.18em] text-indigo-500 dark:text-teal-400/70 font-mono mb-3">
              How It Works
            </p>
            <h2 className="text-3xl md:text-4xl font-extrabold tracking-tighter text-slate-900 dark:text-white">
              From zero to deployed in 3 steps
            </h2>
            <p className="text-slate-500 dark:text-slate-400 mt-3 max-w-xl mx-auto text-base font-light">
              No developer needed. Fill in your details, copy the code, and paste it into your site.
            </p>
          </div>

          {/* Steps grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {(
              [
                {
                  step: "01",
                  title: "Enter Business Details",
                  description:
                    "Fill in your business name, website URL, address, and phone number. Select your specific business type for a perfectly typed schema.",
                  icon: (
                    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" />
                      <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" />
                    </svg>
                  ),
                  color: "indigo",
                },
                {
                  step: "02",
                  title: "Add Advanced Info",
                  description:
                    "Optionally toggle Service Area Business mode to hide your address, and add price range and social profiles for a richer schema.",
                  icon: (
                    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                      <circle cx="12" cy="12" r="3" />
                      <path d="M19.07 4.93a10 10 0 0 1 0 14.14M4.93 4.93a10 10 0 0 0 0 14.14" />
                    </svg>
                  ),
                  color: "violet",
                },
                {
                  step: "03",
                  title: "Copy & Paste into <head>",
                  description:
                    "Click \"Copy Code\" to get the full <script> tag. Paste it inside the <head> of your website. For WordPress, see our step-by-step guide.",
                  icon: (
                    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                      <rect x="9" y="9" width="13" height="13" rx="2" ry="2" />
                      <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" />
                    </svg>
                  ),
                  color: "emerald",
                },
              ] as const
            ).map(({ step, title, description, icon, color }) => {
              const colorMap = {
                indigo: "bg-indigo-50 border-indigo-200/60 text-indigo-600 dark:bg-indigo-500/10 dark:border-indigo-500/20 dark:text-indigo-400",
                violet: "bg-violet-50 border-violet-200/60 text-violet-600 dark:bg-violet-500/10 dark:border-violet-500/20 dark:text-violet-400",
                emerald: "bg-emerald-50 border-emerald-200/60 text-emerald-600 dark:bg-emerald-500/10 dark:border-emerald-500/20 dark:text-emerald-400",
              } as const;
              const stepColorMap = {
                indigo: "text-indigo-400 dark:text-indigo-500",
                violet: "text-violet-400 dark:text-violet-500",
                emerald: "text-emerald-400 dark:text-emerald-500",
              } as const;
              return (
                <div
                  key={step}
                  className="group relative bg-[#FAFAFA] dark:bg-[#0A0A0A] border border-slate-200/60 dark:border-white/10
                    rounded-2xl p-7 shadow-sm transition-all duration-300
                    hover:-translate-y-0.5 hover:shadow-md hover:border-slate-300/80 dark:hover:border-white/[0.18]"
                >
                  <p className={`font-mono text-[11px] font-bold uppercase tracking-widest mb-4 ${stepColorMap[color]}`}>
                    Step {step}
                  </p>
                  <div className={`w-11 h-11 rounded-xl border flex items-center justify-center mb-5 ${colorMap[color]}`}>
                    {icon}
                  </div>
                  <h3 className="text-base font-bold text-slate-900 dark:text-white mb-2 tracking-tight">
                    {title}
                  </h3>
                  <p className="text-sm text-slate-500 dark:text-slate-400 leading-relaxed">
                    {description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════════
          FAQ SECTION
      ══════════════════════════════════════════════════════════════ */}
      <section className="w-full border-t border-slate-200/60 dark:border-white/10 bg-[#FAFAFA] dark:bg-[#0A0A0A]">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-20">

          <div className="text-center mb-12">
            <p className="text-xs font-bold uppercase tracking-[0.18em] text-indigo-500 dark:text-teal-400/70 font-mono mb-3">
              FAQ
            </p>
            <h2 className="text-3xl md:text-4xl font-extrabold tracking-tighter text-slate-900 dark:text-white">
              Frequently Asked Questions
            </h2>
          </div>

          <div className="divide-y divide-slate-200/60 dark:divide-white/10 border border-slate-200/60 dark:border-white/10 rounded-2xl overflow-hidden bg-white dark:bg-[#111111]">
            {[
              {
                q: "What is JSON-LD schema markup?",
                a: "JSON-LD (JavaScript Object Notation for Linked Data) is the format Google recommends for embedding structured data on your website. It tells search engines key details about your business — like your name, address, phone number, and business type — in a machine-readable format. Adding it correctly can unlock rich results in Google Search and improve your local rankings.",
              },
              {
                q: "Where do I paste the generated code?",
                a: 'Paste the <script type="application/ld+json"> block inside the <head> section of every page on your website. If you use WordPress, use a plugin like "Insert Headers and Footers" or add it via your theme\'s header.php file. See our full WordPress guide for step-by-step instructions.',
              },
              {
                q: "Does schema code guarantee a ranking boost?",
                a: "Structured data doesn't directly boost rankings, but it gives Google clearer signals about your business, which can improve click-through rates via rich results and strengthen your relevance for local searches. When combined with a complete Google Business Profile and consistent NAP information, schema is a critical pillar of local SEO.",
              },
              {
                q: "What is a Service Area Business (SAB)?",
                a: "A Service Area Business is any business that travels to customers rather than having them visit a fixed location — like plumbers, electricians, and landscapers. Enable the SAB toggle to remove your street address from the schema while keeping your city and state, fully compliant with Google's guidelines.",
              },
              {
                q: "Which business type (schema type) should I choose?",
                a: "Choose the most specific type that matches your business. For example, a plumber should use 'Plumber' rather than the generic 'LocalBusiness'. The more specific the type, the stronger the relevance signal to Google. Use the Business Type dropdown to browse all available schema types.",
              },
              {
                q: "Is this tool completely free?",
                a: "Yes. This schema generator is 100% free with no account required, no usage limits, and no watermarks on the generated code. Generate and copy schema for as many businesses or pages as you need.",
              },
            ].map(({ q, a }, i) => (
              <div
                key={i}
                className="px-7 py-6 hover:bg-slate-50 dark:hover:bg-white/[0.02] transition-colors duration-150"
              >
                <h3 className="text-base font-bold text-slate-900 dark:text-white mb-2 tracking-tight">
                  {q}
                </h3>
                <p className="text-sm text-slate-500 dark:text-slate-400 leading-relaxed">
                  {a}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════════
          BOTTOM CTA
      ══════════════════════════════════════════════════════════════ */}
      <section className="w-full border-t border-slate-200/60 dark:border-white/10 bg-white dark:bg-[#111111]">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-20 text-center">
          <h2 className="text-3xl md:text-4xl font-extrabold tracking-tighter text-slate-900 dark:text-white mb-4">
            Ready to boost your local rankings?
          </h2>
          <p className="text-slate-500 dark:text-slate-400 mb-8 text-lg font-light">
            Browse all 52+ industry-specific schema generators or read our implementation guides.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-4">
            <a
              href="/niches"
              className="inline-flex h-12 items-center justify-center rounded-xl px-7
                bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-sm
                shadow-sm transition-all duration-200 hover:-translate-y-px hover:shadow-md
                dark:bg-indigo-500 dark:hover:bg-indigo-600"
            >
              Browse All Niches
            </a>
            <a
              href="/guides/wordpress"
              className="inline-flex h-12 items-center justify-center rounded-xl px-7
                bg-slate-100 hover:bg-slate-200 text-slate-700 hover:text-slate-900 font-bold text-sm
                border border-slate-200/60 hover:border-slate-300
                shadow-sm transition-all duration-200 hover:-translate-y-px
                dark:bg-white/[0.05] dark:hover:bg-white/[0.09] dark:border-white/10 dark:hover:border-white/[0.18] dark:text-slate-300 dark:hover:text-white"
            >
              WordPress Guide
            </a>
          </div>
        </div>
      </section>

    </main>
  );
}
