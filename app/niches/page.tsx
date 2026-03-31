import Link from "next/link";
import niches from "../niches.json";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Local Business Schema Generators by Industry | 50+ Niches",
  description: "Find the perfect JSON-LD schema generator for your specific local business niche. Boost your local SEO and Map Pack rankings with highly targeted structured data.",
  keywords: [
    "schema generator for local business",
    "json-ld builder",
    "local seo niches",
    "industry specific schema",
    "plumber schema generator",
    "electrician schema generator",
    "hvac schema generator",
    "local business structured data"
  ],
  alternates: {
    canonical: "https://localschema.com/niches",
  }
};

export default function NichesPage() {
  // SEO: ItemList Schema for the directory of generators
  const itemListSchema = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    "name": "Local Business Schema Generators",
    "description": "A comprehensive directory of specialized schema generators for local businesses.",
    "itemListElement": niches.map((niche, index) => ({
      "@type": "ListItem",
      "position": index + 1,
      "name": `${niche.name} Schema Generator`,
      "url": `https://localschema.com/generator/${niche.id}`
    }))
  };

  // Extract a few highly popular niches to feature at the top
  const popularIds = ["plumber", "electrician", "hvac", "lawyer", "dentist", "roofing_contractor"];
  const popularNiches = niches.filter(n => popularIds.includes(n.id));
  const otherNiches = niches.filter(n => !popularIds.includes(n.id));

  return (
    <main className="w-full bg-[#07090E] min-h-screen selection:bg-teal-500/25 selection:text-teal-100" id="main-content">
      {/* Inject Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(itemListSchema) }}
      />

      {/* HERO SECTION */}
      <section className="bg-transparent pt-32 pb-24 px-4 relative overflow-hidden border-b border-white/[0.08]">
        {/* Advanced Vercel/Linear style background effects */}
        <div className="absolute inset-0 z-0 flex items-center justify-center bg-[#07090E] [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)]"></div>
        <div className="absolute inset-0 z-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]"></div>
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[500px] opacity-40 pointer-events-none z-0">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-teal-500/12 via-cyan-500/5 to-transparent blur-3xl"></div>
        </div>

        <div className="max-w-5xl mx-auto text-center relative z-10">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#0C1018] border border-white/[0.08] shadow-[0_2px_8px_-3px_rgba(0,0,0,0.05)] text-white/55 text-sm font-medium mb-8 backdrop-blur-md transition-transform hover:scale-105">
            <span className="flex h-2 w-2 rounded-full bg-teal-400 shadow-[0_0_8px_rgba(45,212,191,0.8)]"></span>
            {niches.length}+ Industries Supported
          </div>
          <h1 className="text-5xl md:text-7xl font-extrabold tracking-tighter mb-8 text-white leading-[1.05]">
            Local Business Schema <br className="hidden md:block" />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-teal-400 via-cyan-300 to-teal-400 animate-gradient-x pb-2">by Industry</span>
          </h1>
          <p className="text-lg md:text-xl text-white/40 max-w-3xl mx-auto leading-relaxed font-medium">
            Generic <code className="bg-white/[0.06] text-white/80 px-1.5 py-0.5 rounded-md text-sm border border-white/[0.08]">LocalBusiness</code> schema is no longer enough to win the Google Map Pack. Select your specific industry below to generate highly targeted, valid JSON-LD structured data in seconds.
          </p>
        </div>
      </section>

      {/* MAIN DIRECTORY GRID */}
      <section className="py-32 px-4 relative z-10">
        <div className="max-w-7xl mx-auto">
          
          {/* Popular Niches Highlight */}
          {popularNiches.length > 0 && (
            <div className="mb-24">
              <h2 className="text-2xl md:text-3xl font-extrabold tracking-tighter text-white mb-8 flex items-center gap-3">
                <span className="text-orange-500 drop-shadow-sm">🔥</span> Most Popular Generators
              </h2>
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-4 md:gap-6">
                {popularNiches.map((niche) => (
                  <Link 
                    key={niche.id} 
                    href={`/generator/${niche.id}`}
                    className="group flex flex-col items-center justify-center p-8 bg-[#0C1018] rounded-3xl border border-white/[0.08] shadow-[0_2px_10px_-3px_rgba(6,81,237,0.05)] hover:-translate-y-1 hover:shadow-[0_8px_30px_rgba(0,0,0,0.35)] hover:border-teal-500/30 transition-all duration-300 text-center focus:outline-none focus:ring-2 focus:ring-teal-500 focus:ring-offset-2 focus:ring-offset-[#07090E]"
                  >
                    <div className="w-16 h-16 bg-white/[0.04] rounded-2xl flex items-center justify-center text-3xl mb-5 group-hover:scale-110 group-hover:bg-teal-500/[0.08] transition-all duration-300 shadow-sm border border-white/[0.06]">{niche.icon}</div>
                    <span className="font-bold tracking-tight text-white group-hover:text-teal-400 transition-colors">{niche.name}</span>
                  </Link>
                ))}
              </div>
            </div>
          )}

          {/* All Niches */}
          <div>
            <h2 className="text-2xl md:text-3xl font-extrabold tracking-tighter text-white mb-8">All Industry Niches (A-Z)</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-5">
              {otherNiches.map((niche) => (
                <Link 
                  key={niche.id} 
                  href={`/generator/${niche.id}`}
                  className="group flex items-center p-5 bg-[#0C1018] rounded-2xl border border-white/[0.08] shadow-[0_2px_10px_-3px_rgba(6,81,237,0.05)] hover:-translate-y-1 hover:shadow-[0_8px_20px_rgba(0,0,0,0.3)] hover:border-teal-500/30 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:ring-offset-2 focus:ring-offset-[#07090E]"
                >
                  <div className="w-12 h-12 bg-white/[0.04] rounded-xl flex items-center justify-center text-2xl mr-4 group-hover:bg-teal-500/[0.08] transition-colors duration-300 flex-shrink-0 shadow-sm border border-white/[0.06]">
                    {niche.icon}
                  </div>
                  <div className="text-left flex-grow overflow-hidden">
                    <span className="font-bold tracking-tight text-white block group-hover:text-teal-400 transition-colors truncate">{niche.name}</span>
                    <span className="text-[11px] text-white/35 font-mono mt-1 block truncate tracking-wide uppercase" title={niche.schemaType}>{niche.schemaType}</span>
                  </div>
                </Link>
              ))}
            </div>
          </div>

          {/* Cannot find niche? */}
          <div className="mt-24 bg-[#0C1018] rounded-[2rem] border border-white/[0.08] p-10 md:p-12 text-center max-w-3xl mx-auto shadow-[0_8px_30px_rgba(0,0,0,0.3)] relative overflow-hidden">
            <div className="absolute top-0 right-0 w-64 h-64 bg-teal-500/[0.06] rounded-full blur-3xl -mr-32 -mt-32 pointer-events-none"></div>
            <h3 className="text-2xl font-extrabold tracking-tighter text-white mb-3 relative z-10">Don't see your specific industry?</h3>
            <p className="text-lg text-white/40 mb-8 font-medium relative z-10">
              You can still generate perfectly valid schema using our general <Link href="/generator/local-business" className="text-teal-400 font-bold hover:text-teal-300 transition-colors border-b border-teal-500/30 hover:border-teal-400 pb-0.5">Local Business Schema Generator</Link>.
            </p>
          </div>

        </div>
      </section>

      {/* BOTTOM CTA & INTERNAL LINKS */}
      <section className="py-32 bg-[#07090E] border-t border-white/[0.08] px-4 relative">
        <div className="max-w-5xl mx-auto text-center">
          <h2 className="text-3xl md:text-5xl font-extrabold tracking-tighter text-white mb-6">Need help adding schema to your site?</h2>
          <p className="text-white/40 mb-16 text-lg md:text-xl font-medium max-w-2xl mx-auto">Check out our free, step-by-step guides for implementing your generated JSON-LD code correctly to boost your local rankings.</p>
          
          <div className="grid md:grid-cols-2 gap-6 text-left relative z-10">
            <Link href="/guides/wordpress" className="group flex flex-col sm:flex-row items-start gap-6 p-8 rounded-3xl bg-white/[0.04] border border-white/[0.07] hover:bg-white/[0.06] hover:border-teal-500/20 hover:shadow-[0_8px_30px_rgba(0,0,0,0.3)] transition-all duration-300">
              <div className="w-16 h-16 bg-[#0C1018] text-sky-400 rounded-2xl flex items-center justify-center flex-shrink-0 shadow-sm border border-white/[0.06] group-hover:scale-110 group-hover:bg-sky-500/[0.08] transition-all duration-300">
                <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5"><path strokeLinecap="round" strokeLinejoin="round" d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z"></path></svg>
              </div>
              <div>
                <h3 className="font-bold text-2xl tracking-tight text-white mb-3 group-hover:text-teal-400 transition-colors">WordPress Schema Guide</h3>
                <p className="text-white/40 font-medium leading-relaxed">Learn how to cleanly inject schema code into your WordPress header safely without buying bloated premium SEO plugins.</p>
              </div>
            </Link>
            
            <Link href="/guides/service-area-business" className="group flex flex-col sm:flex-row items-start gap-6 p-8 rounded-3xl bg-white/[0.04] border border-white/[0.07] hover:bg-white/[0.06] hover:border-teal-500/20 hover:shadow-[0_8px_30px_rgba(0,0,0,0.3)] transition-all duration-300">
              <div className="w-16 h-16 bg-[#0C1018] text-amber-300 rounded-2xl flex items-center justify-center flex-shrink-0 shadow-sm border border-white/[0.06] group-hover:scale-110 group-hover:bg-amber-500/[0.08] transition-all duration-300">
                <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5"><path strokeLinecap="round" strokeLinejoin="round" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.243-4.243a8 8 0 1111.314 0z"></path><path strokeLinecap="round" strokeLinejoin="round" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"></path></svg>
              </div>
              <div>
                <h3 className="font-bold text-2xl tracking-tight text-white mb-3 group-hover:text-teal-400 transition-colors">SAB Optimization Guide</h3>
                <p className="text-white/40 font-medium leading-relaxed">Discover the exact schema requirements and address rules to stay compliant if you hide your location on Google Maps.</p>
              </div>
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}