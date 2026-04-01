import niches from "../../niches.json";
import SchemaTool from "../../SchemaTool";
import RelatedNiches from "../../components/RelatedNiches";
import Link from "next/link";
import type { Metadata } from "next";

// ---------------------------------------------------------------------------
// Type guard helpers
// ---------------------------------------------------------------------------
// The niches.json file has two generations of data:
//   - First 10 niches: fully enriched with all new fields
//   - Remaining niches: legacy shape with only the original fields
// Rather than casting everywhere, we define typed accessors that safely read
// optional fields and return undefined when they're absent. This lets the page
// render perfectly for all 52 niches while showing the enriched UI only where
// the data exists.
// ---------------------------------------------------------------------------

type NicheBase = {
  id: string;
  name: string;
  schemaType: string;
  icon: string;
  placeholderName: string;
  seoParagraph: string;
  faqAnswer: string;
  exampleCodeSnippet?: string;
};

type NicheEnriched = NicheBase & {
  semanticRelatedIds: string[];
  gbpCategories: string;
  mapPackTips: string;
  metaDescription: string;
};

// Narrows a raw niche entry to the enriched shape.
function isEnriched(niche: unknown): niche is NicheEnriched {
  return (
    typeof niche === "object" &&
    niche !== null &&
    "semanticRelatedIds" in niche &&
    "gbpCategories" in niche &&
    "mapPackTips" in niche &&
    "metaDescription" in niche
  );
}

// ---------------------------------------------------------------------------
// Summary type for RelatedNiches — the pre-resolved array we pass as a prop.
// Update your RelatedNiches component to accept `relatedNiches?: NicheSummary[]`
// in addition to (or instead of) the `currentNiche` string prop.
// ---------------------------------------------------------------------------
export type NicheSummary = {
  id: string;
  name: string;
  icon: string;
  schemaType: string;
};

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

/**
 * Resolves the related niche data for a given niche entry.
 *
 * Priority order:
 *  1. If the niche has `semanticRelatedIds`, filter the master list to those
 *     IDs in the declared order (preserves the deliberate cluster ordering).
 *  2. Fallback: return up to 6 niches that aren't the current one — used for
 *     the ~42 niches that haven't been enriched yet so the UI never breaks.
 */
function resolveRelatedNiches(
  nicheId: string,
  allNiches: NicheBase[]
): NicheSummary[] {
  const current = allNiches.find((n) => n.id === nicheId);

  if (current && isEnriched(current) && current.semanticRelatedIds.length > 0) {
    // Build a lookup map for O(1) access
    const nicheMap = new Map(allNiches.map((n) => [n.id, n]));
    const resolved = current.semanticRelatedIds
      .map((relId) => nicheMap.get(relId))
      .filter((n): n is NicheBase => n !== undefined)
      .map(({ id, name, icon, schemaType }) => ({ id, name, icon, schemaType }));

    // Only use semantic results if at least one ID resolved.
    // If all referenced IDs are absent from the dataset (e.g. when testing with
    // a partial niches slice), fall through to the generic fallback below so
    // the RelatedNiches component never receives an empty array.
    if (resolved.length > 0) return resolved;
  }

  // Graceful fallback: any 6 niches that aren't the current one.
  // Used for (a) legacy non-enriched niches, and (b) enriched niches whose
  // semanticRelatedIds couldn't be resolved against the current dataset.
  return allNiches
    .filter((n) => n.id !== nicheId)
    .slice(0, 6)
    .map(({ id, name, icon, schemaType }) => ({ id, name, icon, schemaType }));
}

/**
 * Splits a mapPackTips paragraph into its 3 individual sentences.
 * The field is always exactly 3 sentences separated by ". ".
 * Returns an array of clean strings with trailing punctuation restored.
 */
function parseMapPackTips(tips: string): string[] {
  // Split on sentence boundaries, being careful not to split on abbreviations
  // like "NAP" or URLs. The content is author-controlled so a simple period +
  // space split is reliable here — each sentence ends with a period.
  const raw = tips
    .split(/(?<=\.)\s+(?=[A-Z])/)
    .map((s) => s.trim())
    .filter(Boolean);

  // Ensure each sentence ends with a period
  return raw.map((s) => (s.endsWith(".") ? s : s + "."));
}

// ---------------------------------------------------------------------------
// Static params — tells Next.js which dynamic routes to pre-render at build time
// ---------------------------------------------------------------------------
export function generateStaticParams() {
  return niches.map((niche) => ({ niche: niche.id }));
}

// ---------------------------------------------------------------------------
// Metadata
// ---------------------------------------------------------------------------
type Props = {
  params: Promise<{ niche: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { niche } = await params;
  const nicheId = niche.toLowerCase();
  const nicheData = (niches as NicheBase[]).find((n) => n.id === nicheId);

  if (!nicheData) return { title: "Generator Not Found | LocalSchema" };

  // Use the hand-crafted metaDescription from enriched niches (highly clickable,
  // keyword-dense, under 160 chars). Fall back to a generated description for
  // legacy niches so no page is left with an empty meta description.
  const description = isEnriched(nicheData)
    ? nicheData.metaDescription
    : `Generate perfectly formatted, Google-approved ${nicheData.schemaType} JSON-LD schema markup for your ${nicheData.name.toLowerCase()} business in seconds. Boost your Google Map Pack rankings — free, no sign-up required.`;

  // Title follows the audit recommendation: lead with benefit keyword, then
  // niche + schema type, brand at end. Pattern: "Free [Niche] Schema Generator
  // — Boost Google Map Pack Rankings (JSON-LD)"
  const title = `Free ${nicheData.name} Schema Generator — Boost Google Map Pack Rankings`;

  return {
    title,
    description,
    keywords: [
      `${nicheData.name.toLowerCase()} schema generator`,
      `${nicheData.name.toLowerCase()} json-ld`,
      `${nicheData.name.toLowerCase()} local seo`,
      `${nicheData.schemaType} schema markup`,
      `${nicheData.name.toLowerCase()} google map pack`,
      "local business schema generator",
      "json-ld structured data",
      "google map pack ranking",
    ],
    alternates: {
      // Canonical uses www to match the WebSite schema entity on the homepage
      canonical: `https://www.getlocalschema.com/generator/${nicheId}`,
    },
  };
}

// ---------------------------------------------------------------------------
// Page component
// ---------------------------------------------------------------------------
export default async function NicheGeneratorPage({ params }: Props) {
  const { niche } = await params;
  const nicheId = niche.toLowerCase();
  const nicheData = niches.find((n) => n.id === nicheId);

  // 404 state — graceful, internal-linking preserved
  if (!nicheData) {
    return (
      <div className="flex-grow flex flex-col items-center justify-center p-8 text-center min-h-[60vh] bg-white dark:bg-[#0A0A0A]">
        <div className="bg-slate-50 dark:bg-[#111111] p-12 rounded-[2rem] border border-slate-200 dark:border-white/[0.08] shadow-sm dark:shadow-[0_8px_40px_rgba(0,0,0,0.4)] max-w-xl w-full">
          <h1 className="text-3xl font-black tracking-tight text-slate-900 dark:text-white mb-4">
            Schema Generator Not Found
          </h1>
          <p className="text-slate-500 dark:text-slate-400 mb-8">
            We couldn&apos;t find a specialized generator for that industry.
          </p>
          <Link
            href="/niches"
            className="inline-flex h-12 items-center justify-center rounded-xl
              bg-teal-500/[0.12] border border-teal-500/[0.25] px-8
              font-semibold text-white hover:bg-teal-500/[0.22] transition-all duration-150
              focus:outline-none focus:ring-2 focus:ring-teal-500"
          >
            View All 50+ Niches
          </Link>
        </div>
      </div>
    );
  }

  // ---------------------------------------------------------------------------
  // Pre-resolve related niches on the server — no client-side filtering needed
  // ---------------------------------------------------------------------------
  const relatedNiches = resolveRelatedNiches(nicheId, niches as NicheBase[]);

  // ---------------------------------------------------------------------------
  // Enrich-aware derived data
  // ---------------------------------------------------------------------------
  const enriched = isEnriched(nicheData) ? nicheData : null;
  const mapPackTipSentences = enriched
    ? parseMapPackTips(enriched.mapPackTips)
    : [];
  const gbpCategoryList = enriched
    ? enriched.gbpCategories.split(",").map((c) => c.trim())
    : [];

  // ---------------------------------------------------------------------------
  // STRUCTURED DATA
  //
  // Single @graph block keeps everything in one HTTP request and allows Google
  // to understand relationships between the entities (SoftwareApplication is
  // described-by the FAQPage, BreadcrumbList locates it in the site hierarchy).
  //
  // FAQPage now has 3 questions:
  //   Q1 — niche-specific "why not generic" → faqAnswer (unique per niche)
  //   Q2 — SAB address hiding              → static, applies to all niches
  //   Q3 — Map Pack ranking tips           → first sentence of mapPackTips
  //        (for enriched niches only; omitted for legacy niches to avoid
  //         exposing the fallback stub text as schema content)
  // ---------------------------------------------------------------------------
  const mapPackFaqAnswer =
    mapPackTipSentences.length > 0
      ? mapPackTipSentences[0] +
        " For a full breakdown of how to use structured data to dominate local search for your specific trade, see the Map Pack Strategy section on this page."
      : null;

  const faqEntities = [
    {
      "@type": "Question",
      name: `Why not just use generic LocalBusiness schema for a ${nicheData.name.toLowerCase()}?`,
      acceptedAnswer: {
        "@type": "Answer",
        text: nicheData.faqAnswer,
      },
    },
    {
      "@type": "Question",
      name: "Can I hide my address if I travel to clients?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes. Enable the Service Area Business (SAB) toggle in the generator above to remove your street address while retaining your city, state, and zip code. This keeps you fully compliant with Google's guidelines for mobile businesses and eliminates the risk of a Google Business Profile suspension. Read the full SAB SEO Guide at getlocalschema.com/guides/service-area-business for implementation details.",
      },
    },
    // Third FAQ is only injected for enriched niches that have real mapPackTips content
    ...(mapPackFaqAnswer
      ? [
          {
            "@type": "Question",
            name: `How can ${nicheData.name.toLowerCase()} businesses rank higher in the Google Map Pack?`,
            acceptedAnswer: {
              "@type": "Answer",
              text: mapPackFaqAnswer,
            },
          },
        ]
      : []),
  ];

  const structuredData = {
    "@context": "https://schema.org",
    "@graph": [
      // Entity 1: The generator itself as a free web application
      {
        "@type": "SoftwareApplication",
        "@id": `https://www.getlocalschema.com/generator/${nicheId}#software`,
        name: `Free ${nicheData.name} Schema Generator`,
        applicationCategory: "BusinessApplication",
        operatingSystem: "All",
        offers: {
          "@type": "Offer",
          price: "0",
          priceCurrency: "USD",
        },
        description: `Free JSON-LD schema markup generator built specifically for ${nicheData.name.toLowerCase()} businesses. Generates valid ${nicheData.schemaType} structured data in seconds with no sign-up required.`,
        url: `https://www.getlocalschema.com/generator/${nicheId}`,
      },
      // Entity 2: FAQPage — dynamically built, 2-3 questions per niche
      {
        "@type": "FAQPage",
        "@id": `https://www.getlocalschema.com/generator/${nicheId}#faq`,
        mainEntity: faqEntities,
      },
      // Entity 3: BreadcrumbList — enables breadcrumb rich results in SERPs
      {
        "@type": "BreadcrumbList",
        "@id": `https://www.getlocalschema.com/generator/${nicheId}#breadcrumb`,
        itemListElement: [
          {
            "@type": "ListItem",
            position: 1,
            name: "Home",
            item: "https://www.getlocalschema.com/",
          },
          {
            "@type": "ListItem",
            position: 2,
            name: "Schema Generators",
            item: "https://www.getlocalschema.com/niches",
          },
          {
            "@type": "ListItem",
            position: 3,
            name: `${nicheData.name} Schema Generator`,
            item: `https://www.getlocalschema.com/generator/${nicheId}`,
          },
        ],
      },
    ],
  };

  // ---------------------------------------------------------------------------
  // Map Pack tip card icons — each of the 3 tips maps to a semantic icon that
  // reflects its strategic focus (urgency/timing, geographic targeting, trust).
  // ---------------------------------------------------------------------------
  const tipIcons = ["⚡", "📍", "⭐"];
  const tipTitles = ["Timing & Urgency", "Geographic Targeting", "Trust Signals"];

  // ---------------------------------------------------------------------------
  // Render
  // ---------------------------------------------------------------------------
  return (
    <main
      className="w-full bg-white dark:bg-[#0A0A0A] selection:bg-teal-500/25 selection:text-teal-700 dark:selection:text-teal-100"
      id="main-content"
    >
      {/* Schema injection — single @graph per page, no duplicate @context */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />

      {/* ================================================================
          HERO & TOOL SECTION
      ================================================================ */}
      <section className="bg-transparent pt-24 pb-32 relative overflow-hidden">
        <div className="absolute inset-0 z-0 pointer-events-none
          bg-[radial-gradient(ellipse_70%_50%_at_50%_-5%,rgba(0,212,200,0.08),transparent)]" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">

          {/* Breadcrumb nav — mirrors BreadcrumbList schema above */}
          <nav
            className="flex mb-12 text-[13px] font-medium text-slate-500 justify-center"
            aria-label="Breadcrumb"
          >
            <ol className="inline-flex items-center
              bg-slate-100 border border-slate-200 text-slate-500
              dark:bg-white/[0.04] dark:border-white/[0.08] dark:text-slate-400
              rounded-full px-4 py-2 backdrop-blur-md">
              <li className="inline-flex items-center">
                <Link href="/" className="hover:text-slate-900 dark:hover:text-white transition-colors">Home</Link>
              </li>
              <li>
                <div className="flex items-center">
                  <svg className="w-3 h-3 text-slate-300 dark:text-white/15 mx-2" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 6 10">
                    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 9 4-4-4-4" />
                  </svg>
                  <Link href="/niches" className="hover:text-slate-900 dark:hover:text-white transition-colors">Generators</Link>
                </div>
              </li>
              <li aria-current="page">
                <div className="flex items-center">
                  <svg className="w-3 h-3 text-slate-300 dark:text-white/15 mx-2" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 6 10">
                    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 9 4-4-4-4" />
                  </svg>
                  <span className="text-slate-800 dark:text-white/80 font-semibold">{nicheData.name}</span>
                </div>
              </li>
            </ol>
          </nav>

          {/* Hero copy */}
          <div className="text-center max-w-3xl mx-auto mb-16">
            <div className="inline-flex items-center justify-center w-20 h-20 rounded-2xl
              bg-slate-100 border border-slate-200
              dark:bg-white/[0.05] dark:border-white/[0.09]
              text-4xl mb-8
              hover:scale-105 hover:bg-teal-500/[0.08] hover:border-teal-500/[0.20]
              transition-all duration-300 shadow-[0_0_40px_-10px_rgba(0,212,200,0.15)]">
              {nicheData.icon}
            </div>
            <h1 className="text-5xl md:text-6xl font-black tracking-[-0.04em] mb-6 text-slate-900 dark:text-white leading-[1.04]">
              {nicheData.name} Schema Generator
            </h1>
            <p className="text-lg md:text-xl text-slate-500 dark:text-slate-400 leading-relaxed font-light">
              {nicheData.seoParagraph} Fill out the form below to generate your
              highly-optimized, valid{" "}
              <strong className="text-teal-600 dark:text-teal-400 bg-teal-500/[0.08] px-1.5 py-0.5 rounded-md text-sm border border-teal-500/[0.16] font-mono not-italic">
                {nicheData.schemaType}
              </strong>{" "}
              JSON-LD code instantly.
            </p>
          </div>

          {/* Live generator tool — client component */}
          <SchemaTool
            initialNiche={nicheData.schemaType}
            placeholderName={nicheData.placeholderName}
          />
        </div>
      </section>

      {/* ================================================================
          SEO CONTENT SECTION
          This entire section is the thin-content fix. Every subsection
          below is rendered from unique, niche-specific JSON data — making
          each of the 52 generator pages substantively different from one
          another in Google's eyes.
      ================================================================ */}
      <section className="py-24 bg-white dark:bg-[#0A0A0A] border-t border-slate-200 dark:border-white/10 relative">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 space-y-28">

          {/* ----------------------------------------------------------
              BLOCK 1: How-to steps + FAQ (original content, preserved)
          ---------------------------------------------------------- */}
          <div className="grid md:grid-cols-2 gap-16 lg:gap-24">

            {/* How-to */}
            <div>
              <h2 className="text-3xl md:text-4xl font-black tracking-tight text-slate-900 dark:text-white mb-10 leading-tight">
                How to Add Schema to your {nicheData.name} Website
              </h2>
              <div className="space-y-4">
                <div className="group flex gap-5 items-start
                  bg-white border border-slate-200 shadow-sm
                  dark:bg-[#111111] dark:border-white/10 dark:shadow-none
                  p-7 rounded-2xl
                  hover:-translate-y-px hover:border-teal-500/20
                  hover:shadow-[0_8px_30px_rgba(0,0,0,0.08)] dark:hover:shadow-[0_8px_30px_rgba(0,0,0,0.3)]
                  transition-all duration-300">
                  <div className="bg-slate-100 text-slate-500 dark:bg-white/[0.05] dark:text-white/60
                    font-black w-11 h-11 rounded-xl border border-slate-200 dark:border-white/10
                    flex items-center justify-center flex-shrink-0
                    group-hover:bg-teal-500/[0.10] group-hover:text-teal-600 dark:group-hover:text-teal-400
                    group-hover:border-teal-500/[0.20] transition-all duration-300 text-base">
                    1
                  </div>
                  <div>
                    <h3 className="text-lg font-bold tracking-tight text-slate-900 dark:text-white">
                      Generate the Code
                    </h3>
                    <p className="text-slate-500 dark:text-slate-400 mt-2 leading-relaxed text-sm">
                      Fill out the tool above with your exact NAP (Name, Address,
                      Phone) details, ensuring they perfectly match your Google
                      Business Profile. Click &ldquo;Copy Code&rdquo;.
                    </p>
                  </div>
                </div>
                <div className="group flex gap-5 items-start
                  bg-white border border-slate-200 shadow-sm
                  dark:bg-[#111111] dark:border-white/10 dark:shadow-none
                  p-7 rounded-2xl
                  hover:-translate-y-px hover:border-teal-500/20
                  hover:shadow-[0_8px_30px_rgba(0,0,0,0.08)] dark:hover:shadow-[0_8px_30px_rgba(0,0,0,0.3)]
                  transition-all duration-300">
                  <div className="bg-slate-100 text-slate-500 dark:bg-white/[0.05] dark:text-white/60
                    font-black w-11 h-11 rounded-xl border border-slate-200 dark:border-white/10
                    flex items-center justify-center flex-shrink-0
                    group-hover:bg-teal-500/[0.10] group-hover:text-teal-600 dark:group-hover:text-teal-400
                    group-hover:border-teal-500/[0.20] transition-all duration-300 text-base">
                    2
                  </div>
                  <div>
                    <h3 className="text-lg font-bold tracking-tight text-slate-900 dark:text-white">
                      Paste into your Website
                    </h3>
                    <p className="text-slate-500 dark:text-slate-400 mt-2 leading-relaxed text-sm">
                      Insert the copied code into the{" "}
                      <code className="bg-slate-100 text-slate-700 border border-slate-200 dark:bg-white/[0.06] dark:text-slate-300 dark:border-white/[0.08] px-1.5 py-0.5 rounded-md text-sm font-mono">
                        &lt;head&gt;
                      </code>{" "}
                      section of your website. If you use WordPress, check out our
                      step-by-step{" "}
                      <Link
                        href="/guides/wordpress"
                        className="text-teal-400/80 hover:text-teal-400 transition-colors border-b border-teal-500/30 hover:border-teal-400/60 pb-px"
                      >
                        WordPress Schema Guide
                      </Link>
                      .
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* FAQ block — renders all 2-3 questions from the schema */}
            <div>
              <h2 className="text-3xl md:text-4xl font-black tracking-tight text-slate-900 dark:text-white mb-10 leading-tight">
                {nicheData.name} SEO FAQ
              </h2>
              <div className="bg-white dark:bg-[#111111] rounded-2xl border border-slate-200 dark:border-white/10 overflow-hidden divide-y divide-slate-100 dark:divide-white/[0.08]">

                {/* Q1 — unique per niche */}
                <div className="p-7 hover:bg-slate-50 dark:hover:bg-white/[0.03] transition-colors duration-200">
                  <h3 className="text-base font-bold tracking-tight text-slate-900 dark:text-white mb-3">
                    Why not just use generic LocalBusiness schema?
                  </h3>
                  <p className="text-slate-500 dark:text-slate-400 leading-relaxed text-sm">
                    {nicheData.faqAnswer}
                  </p>
                </div>

                {/* Q2 — static, applies to all trades */}
                <div className="p-7 hover:bg-slate-50 dark:hover:bg-white/[0.03] transition-colors duration-200">
                  <h3 className="text-base font-bold tracking-tight text-slate-900 dark:text-white mb-3">
                    Can I hide my address if I travel to clients?
                  </h3>
                  <p className="text-slate-500 dark:text-slate-400 leading-relaxed text-sm">
                    Yes. Enable the &ldquo;Service Area Business&rdquo; toggle in the
                    generator above to remove your street address while keeping
                    your city and state — staying 100% compliant with Google&apos;s
                    guidelines. Read our full{" "}
                    <Link
                      href="/guides/service-area-business"
                      className="text-teal-600 dark:text-teal-400/80 hover:text-teal-700 dark:hover:text-teal-400 transition-colors border-b border-teal-500/30 hover:border-teal-400/60 pb-px"
                    >
                      SAB SEO Guide
                    </Link>{" "}
                    for details.
                  </p>
                </div>

                {/* Q3 — only rendered for enriched niches with real mapPackTips */}
                {mapPackFaqAnswer && (
                  <div className="p-7 hover:bg-slate-50 dark:hover:bg-white/[0.03] transition-colors duration-200">
                    <h3 className="text-base font-bold tracking-tight text-slate-900 dark:text-white mb-3">
                      How can {nicheData.name.toLowerCase()} businesses rank
                      higher in the Google Map Pack?
                    </h3>
                    <p className="text-slate-500 dark:text-slate-400 leading-relaxed text-sm">
                      {mapPackFaqAnswer}
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* ----------------------------------------------------------
              BLOCK 2: MAP PACK STRATEGY
              Rendered only for enriched niches. Parses the 3-sentence
              mapPackTips field into 3 discrete, scannable tip cards.
              Each card has a semantic icon, a category label, and the
              full sentence as body copy. This is the primary thin-content
              fix — ~300 words of completely unique, niche-specific content.
          ---------------------------------------------------------- */}
          {mapPackTipSentences.length === 3 && (
            <div>
              {/* Section header */}
              <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-12">
                <div>
                  <p className="font-mono text-[10px] font-semibold uppercase tracking-[0.16em] text-teal-600 dark:text-teal-400/60 mb-3">
                    Local SEO Strategy
                  </p>
                  <h2 className="text-3xl md:text-4xl font-black tracking-tight text-slate-900 dark:text-white leading-tight">
                    {nicheData.name} Map Pack Strategy
                  </h2>
                  <p className="text-slate-500 dark:text-slate-400 mt-3 max-w-xl leading-relaxed text-sm font-light">
                    Three specific tactics that move{" "}
                    {nicheData.name.toLowerCase()} businesses into the Google
                    local 3-Pack — drawn from how the{" "}
                    <code className="text-teal-600 dark:text-teal-400 font-mono text-sm bg-teal-500/[0.08] px-1.5 py-0.5 rounded-md border border-teal-500/[0.16]">
                      {nicheData.schemaType}
                    </code>{" "}
                    schema type interacts with Google&apos;s local ranking algorithm.
                  </p>
                </div>
              </div>

              {/* 3 tip cards — one per sentence */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {mapPackTipSentences.map((tip, index) => (
                  <div
                    key={index}
                    className="group relative
                      bg-white border border-slate-200 shadow-sm
                      dark:bg-[#111111] dark:border-white/10 dark:shadow-none
                      p-7 rounded-2xl
                      hover:-translate-y-px hover:border-teal-500/20
                      hover:shadow-[0_8px_30px_rgba(0,0,0,0.08)] dark:hover:shadow-[0_8px_30px_rgba(0,0,0,0.3)]
                      transition-all duration-300 flex flex-col"
                  >
                    <div className="flex items-center gap-3 mb-5">
                      <div className="w-10 h-10 rounded-xl bg-teal-500/[0.08] border border-teal-500/[0.16]
                        flex items-center justify-center text-lg
                        group-hover:scale-105 group-hover:bg-teal-500/[0.14]
                        transition-all duration-300">
                        {tipIcons[index]}
                      </div>
                      <div>
                        <p className="text-[10px] font-bold uppercase tracking-[0.14em] text-teal-600 dark:text-teal-400/60 font-mono">
                          Tip {index + 1} of 3
                        </p>
                        <p className="text-sm font-bold text-slate-700 dark:text-slate-300">
                          {tipTitles[index]}
                        </p>
                      </div>
                    </div>
                    <p className="text-slate-500 dark:text-slate-400 leading-relaxed text-sm flex-1">
                      {tip}
                    </p>
                    <div className="mt-5 h-px w-10 rounded-full bg-gradient-to-r from-teal-400 to-cyan-400
                      opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* ----------------------------------------------------------
              BLOCK 3: GBP CATEGORY CHEAT SHEET
              Rendered only for enriched niches. Turns the comma-separated
              gbpCategories string into a scannable, copy-friendly panel.
              This directly answers "which GBP category should I use?" —
              the most searched question after "how do I rank locally?" —
              and adds another ~80 words of unique, immediately actionable
              content that competitors' pages don't have.
          ---------------------------------------------------------- */}
          {gbpCategoryList.length > 0 && (
            <div className="
              bg-slate-50 border border-slate-200
              dark:bg-gradient-to-br dark:from-slate-950 dark:to-slate-900 dark:border-transparent
              rounded-[2.5rem] p-10 md:p-14 relative overflow-hidden">
              {/* Decorative glow (dark only) */}
              <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-indigo-600/10 rounded-full blur-3xl -mr-48 -mt-48 pointer-events-none hidden dark:block" />
              <div className="absolute bottom-0 left-0 w-[300px] h-[300px] bg-purple-600/10 rounded-full blur-3xl -ml-32 -mb-32 pointer-events-none hidden dark:block" />

              <div className="relative z-10 flex flex-col lg:flex-row lg:items-center gap-10">
                {/* Left: explanatory copy */}
                <div className="flex-1">
                  <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full
                    bg-slate-200 border border-slate-300 text-slate-700
                    dark:bg-white/10 dark:border-white/20 dark:text-white/80
                    text-xs font-bold uppercase tracking-wider mb-5">
                    <span>📋</span> GBP Category Cheat Sheet
                  </div>
                  <h2 className="text-2xl md:text-3xl font-extrabold tracking-tighter text-slate-900 dark:text-white mb-4 leading-tight">
                    Top Google Business Profile Categories for{" "}
                    {nicheData.name} Businesses
                  </h2>
                  <p className="text-slate-500 dark:text-slate-400 leading-relaxed max-w-lg text-sm font-light">
                    Your GBP primary category is the #1 local ranking factor —
                    more influential than reviews or proximity alone. Use the
                    first category as your primary GBP category, and add the
                    rest as additional categories in your Google Business Profile
                    settings. Pair these with your{" "}
                    <code className="text-teal-600 dark:text-teal-400 font-mono text-sm bg-teal-500/[0.08] dark:bg-teal-500/[0.12] px-1.5 py-0.5 rounded-md border border-teal-500/20 dark:border-teal-500/[0.20]">
                      {nicheData.schemaType}
                    </code>{" "}
                    schema for maximum local ranking signal.
                  </p>
                </div>

                {/* Right: category pills */}
                <div className="flex flex-col gap-3 min-w-[260px]">
                  {gbpCategoryList.map((category, index) => (
                    <div
                      key={category}
                      className="group flex items-center gap-4
                        bg-white border border-slate-200 hover:border-teal-400/50
                        dark:bg-white/[0.05] dark:border-white/[0.10] dark:hover:bg-white/[0.09] dark:hover:border-teal-500/40
                        rounded-2xl px-5 py-4 transition-all duration-300 cursor-default"
                    >
                      <div className="flex-shrink-0 w-7 h-7 rounded-full bg-teal-500/[0.15] border border-teal-400/30 flex items-center justify-center">
                        <span className="text-teal-600 dark:text-teal-300 text-xs font-bold">
                          {index + 1}
                        </span>
                      </div>
                      <span className="text-slate-800 dark:text-white font-semibold text-sm flex-1">
                        {category}
                      </span>
                      {index === 0 && (
                        <span className="text-[10px] font-bold uppercase tracking-wider
                          text-emerald-700 bg-emerald-50 border border-emerald-200
                          dark:text-emerald-400 dark:bg-emerald-400/10 dark:border-emerald-400/20
                          px-2 py-0.5 rounded-full flex-shrink-0">
                          Primary
                        </span>
                      )}
                    </div>
                  ))}

                  {/* CTA to GBP */}
                  <a
                    href="https://business.google.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group flex items-center justify-center gap-2 mt-1
                      bg-teal-600 hover:bg-teal-700 text-white
                      dark:bg-teal-500/[0.15] dark:hover:bg-teal-500/[0.25] dark:border dark:border-teal-500/[0.30] dark:hover:border-teal-500/[0.55]
                      font-bold rounded-2xl px-5 py-3.5 text-sm transition-all duration-300 hover:scale-[1.01]
                      dark:shadow-none hover:shadow-[0_0_30px_rgba(0,212,200,0.2)]"
                  >
                    Open Google Business Profile
                    <svg className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                    </svg>
                  </a>
                </div>
              </div>
            </div>
          )}

          {/* ----------------------------------------------------------
              BLOCK 4: RELATED NICHES
              Now driven by semanticRelatedIds — pre-resolved on the server
              into a typed NicheSummary[] array and passed as a prop.

              ⚠️  COMPONENT UPDATE REQUIRED:
              Your RelatedNiches component at /app/components/RelatedNiches.tsx
              needs to accept a `relatedNiches` prop of type NicheSummary[]
              (defined and exported from this file) in addition to the existing
              `currentNiche` string prop.

              When `relatedNiches` is provided, the component should render
              that array directly instead of filtering niches.json internally.
              The `currentNiche` prop is kept for backward compatibility and
              for the component's "exclude self" logic.

              Example updated prop interface:
              ```tsx
              type Props = {
                currentNiche: string;
                relatedNiches?: NicheSummary[];
              };
              ```
          ---------------------------------------------------------- */}
          <div className="bg-white dark:bg-[#111111] p-8 md:p-12 rounded-2xl border border-slate-200 dark:border-white/10 relative overflow-hidden shadow-sm dark:shadow-none">
            <div className="absolute top-0 right-0 w-64 h-64 pointer-events-none
              bg-[radial-gradient(circle_at_top_right,rgba(0,212,200,0.05),transparent_70%)]" />
            <RelatedNiches
              currentNiche={nicheId}
              relatedNiches={relatedNiches}
            />
          </div>

        </div>
      </section>
    </main>
  );
}