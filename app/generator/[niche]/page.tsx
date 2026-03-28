import niches from "../../niches.json";
import SchemaTool from "../../SchemaTool";
import RelatedNiches from "../../components/RelatedNiches";
import Link from "next/link";
import type { Metadata } from "next";

type Props = {
  params: Promise<{ niche: string }>;
};

export function generateStaticParams() {
  return niches.map((niche) => ({ niche: niche.id }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const resolvedParams = await params; 
  const nicheId = resolvedParams.niche.toLowerCase();
  const nicheData = niches.find((n) => n.id === nicheId);
  
  if (!nicheData) return { title: "Generator Not Found | LocalSchema" };

  return {
    title: `Free ${nicheData.name} Schema Generator | JSON-LD Tool`,
    description: `Generate perfectly formatted, Google-approved JSON-LD structured data for your ${nicheData.name.toLowerCase()} business in seconds. Boost local SEO in the Map Pack.`,
    keywords: [
      `${nicheData.name.toLowerCase()} schema generator`, 
      `json-ld for ${nicheData.name.toLowerCase()}`, 
      `${nicheData.name.toLowerCase()} local seo tool`, 
      `${nicheData.schemaType} schema builder`,
      "local business schema markup",
      "google map pack ranking"
    ],
    alternates: {
      canonical: `https://localschema.com/generator/${nicheId}`
    }
  };
}

export default async function NicheGeneratorPage({ params }: Props) {
  const resolvedParams = await params; 
  const nicheId = resolvedParams.niche.toLowerCase();
  const nicheData = niches.find((n) => n.id === nicheId);

  if (!nicheData) {
    return (
      <div className="flex-grow flex flex-col items-center justify-center p-8 text-center min-h-[60vh] bg-[#FAFAFA]">
        <div className="bg-white p-12 rounded-[2rem] border border-slate-200/60 shadow-[0_8px_30px_rgb(0,0,0,0.04)] max-w-xl w-full">
          <h1 className="text-3xl font-extrabold tracking-tighter text-slate-950 mb-4">Schema Generator Not Found</h1>
          <p className="text-slate-500 font-medium mb-8">We couldn't find a specialized generator for that industry.</p>
          <Link href="/niches" className="inline-flex h-12 items-center justify-center rounded-full bg-slate-950 px-8 font-medium text-white shadow-sm transition-all duration-300 hover:scale-[1.02] hover:shadow-md hover:bg-slate-900 focus:outline-none focus:ring-2 focus:ring-slate-950 focus:ring-offset-2">
            View All 50+ Niches
          </Link>
        </div>
      </div>
    );
  }

  // Elite SEO: Injecting SoftwareApplication, FAQPage, and BreadcrumbList Schema
  const structuredData = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "SoftwareApplication",
        "@id": `https://localschema.com/generator/${nicheId}#software`,
        "name": `${nicheData.name} Schema Generator`,
        "applicationCategory": "BusinessApplication",
        "operatingSystem": "All",
        "offers": {
          "@type": "Offer",
          "price": "0",
          "priceCurrency": "USD"
        },
        "description": `Free JSON-LD schema markup generator specifically built for ${nicheData.name.toLowerCase()}s.`
      },
      {
        "@type": "FAQPage",
        "@id": `https://localschema.com/generator/${nicheId}#faq`,
        "mainEntity": [
          {
            "@type": "Question",
            "name": `Why not just use generic LocalBusiness schema for a ${nicheData.name.toLowerCase()}?`,
            "acceptedAnswer": {
              "@type": "Answer",
              "text": nicheData.faqAnswer
            }
          },
          {
            "@type": "Question",
            "name": "Can I hide my address if I travel to clients?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Yes. Check the 'Service Area Business' toggle in the generator above to remove your street address while retaining your city and state data. Read our SAB SEO Guide for more details."
            }
          }
        ]
      },
      {
        "@type": "BreadcrumbList",
        "@id": `https://localschema.com/generator/${nicheId}#breadcrumb`,
        "itemListElement": [
          {
            "@type": "ListItem",
            "position": 1,
            "name": "Home",
            "item": "https://localschema.com/"
          },
          {
            "@type": "ListItem",
            "position": 2,
            "name": "Generators",
            "item": "https://localschema.com/niches"
          },
          {
            "@type": "ListItem",
            "position": 3,
            "name": `${nicheData.name} Schema`
          }
        ]
      }
    ]
  };

  return (
    <main className="w-full bg-[#FAFAFA] selection:bg-indigo-500/30 selection:text-indigo-900" id="main-content">
      {/* Schema Injection */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />

      {/* HERO & TOOL SECTION */}
      <section className="bg-transparent pt-24 pb-32 relative overflow-hidden">
        {/* Subtle background gradient */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[500px] opacity-40 pointer-events-none z-0">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-indigo-200/50 via-purple-100/20 to-transparent blur-3xl"></div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          
          {/* Breadcrumbs */}
          <nav className="flex mb-12 text-[13px] font-medium text-slate-500 justify-center" aria-label="Breadcrumb">
            <ol className="inline-flex items-center bg-white border border-slate-200/60 shadow-sm rounded-full px-4 py-2 backdrop-blur-md">
              <li className="inline-flex items-center">
                <Link href="/" className="hover:text-indigo-600 transition-colors">Home</Link>
              </li>
              <li>
                <div className="flex items-center">
                  <svg className="w-3 h-3 text-slate-300 mx-2" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 6 10"><path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 9 4-4-4-4"/></svg>
                  <Link href="/niches" className="hover:text-indigo-600 transition-colors">Generators</Link>
                </div>
              </li>
              <li aria-current="page">
                <div className="flex items-center">
                  <svg className="w-3 h-3 text-slate-300 mx-2" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 6 10"><path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 9 4-4-4-4"/></svg>
                  <span className="text-slate-900 font-bold">{nicheData.name}</span>
                </div>
              </li>
            </ol>
          </nav>

          <div className="text-center max-w-3xl mx-auto mb-16">
            <div className="inline-flex items-center justify-center w-24 h-24 rounded-[2rem] bg-white border border-slate-200/60 text-5xl mb-8 shadow-[0_8px_30px_rgb(0,0,0,0.04)] transform hover:scale-105 transition-transform duration-300">
              {nicheData.icon}
            </div>
            {/* Exactly ONE H1 tag for perfect SEO */}
            <h1 className="text-5xl md:text-6xl font-extrabold tracking-tighter mb-6 text-slate-950 leading-[1.05]">
              {nicheData.name} Schema Generator
            </h1>
            <p className="text-lg md:text-xl text-slate-500 leading-relaxed font-medium">
              {nicheData.seoParagraph} Fill out the form below to generate your highly-optimized, valid <strong className="text-slate-900 bg-slate-100 px-1.5 py-0.5 rounded-md text-sm border border-slate-200">{nicheData.schemaType}</strong> JSON-LD code instantly.
            </p>
          </div>
          
          {/* Client Component handling the live dynamic form & preview */}
          <SchemaTool 
            initialNiche={nicheData.schemaType} 
            placeholderName={nicheData.placeholderName} 
          />
        </div>
      </section>

      {/* SEO CONTENT EXPANSION (How-to & FAQ) */}
      <section className="py-32 bg-white border-t border-slate-200/60 relative">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="grid md:grid-cols-2 gap-16 lg:gap-24 mb-32">
            <div>
              <h2 className="text-3xl md:text-4xl font-extrabold tracking-tighter text-slate-950 mb-10 leading-tight">
                How to Add Schema to your {nicheData.name} Website
              </h2>
              <div className="space-y-6">
                <div className="group flex gap-5 items-start bg-white p-8 rounded-3xl border border-slate-200/60 shadow-[0_2px_10px_-3px_rgba(6,81,237,0.03)] hover:-translate-y-1 hover:shadow-[0_8px_30px_rgb(0,0,0,0.06)] transition-all duration-300">
                  <div className="bg-slate-50 text-slate-900 font-bold w-12 h-12 rounded-2xl flex items-center justify-center flex-shrink-0 border border-slate-100 shadow-sm group-hover:scale-110 group-hover:bg-indigo-50 group-hover:text-indigo-600 transition-all duration-300 text-lg">1</div>
                  <div>
                    <h3 className="text-xl font-bold tracking-tight text-slate-950">Generate the Code</h3>
                    <p className="text-slate-500 font-medium mt-3 leading-relaxed">Fill out the tool above with your exact NAP (Name, Address, Phone) details, ensuring they perfectly match your Google Business Profile. Click "Copy Code".</p>
                  </div>
                </div>
                <div className="group flex gap-5 items-start bg-white p-8 rounded-3xl border border-slate-200/60 shadow-[0_2px_10px_-3px_rgba(6,81,237,0.03)] hover:-translate-y-1 hover:shadow-[0_8px_30px_rgb(0,0,0,0.06)] transition-all duration-300">
                  <div className="bg-slate-50 text-slate-900 font-bold w-12 h-12 rounded-2xl flex items-center justify-center flex-shrink-0 border border-slate-100 shadow-sm group-hover:scale-110 group-hover:bg-indigo-50 group-hover:text-indigo-600 transition-all duration-300 text-lg">2</div>
                  <div>
                    <h3 className="text-xl font-bold tracking-tight text-slate-950">Paste into your Website</h3>
                    <p className="text-slate-500 font-medium mt-3 leading-relaxed">
                      Insert the copied code into the <code className="bg-slate-50 text-slate-800 px-1.5 py-0.5 rounded-md text-sm border border-slate-200">&lt;head&gt;</code> section of your website. If you use WordPress, check out our step-by-step <Link href="/guides/wordpress" className="text-indigo-600 hover:text-indigo-800 font-bold transition-colors border-b border-indigo-200 hover:border-indigo-600 pb-0.5">WordPress Schema Guide</Link>.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div>
              <h2 className="text-3xl md:text-4xl font-extrabold tracking-tighter text-slate-950 mb-10 leading-tight">
                {nicheData.name} SEO FAQ
              </h2>
              <div className="bg-white rounded-3xl border border-slate-200/60 overflow-hidden shadow-[0_2px_10px_-3px_rgba(6,81,237,0.03)] divide-y divide-slate-100">
                <div className="p-8 md:p-10 hover:bg-slate-50 transition-colors duration-300">
                  <h3 className="text-xl font-bold tracking-tight text-slate-950 mb-4">
                    Why not just use generic LocalBusiness schema?
                  </h3>
                  <p className="text-slate-500 font-medium leading-relaxed">
                    {nicheData.faqAnswer}
                  </p>
                </div>
                <div className="p-8 md:p-10 hover:bg-slate-50 transition-colors duration-300">
                  <h3 className="text-xl font-bold tracking-tight text-slate-950 mb-4">
                    Can I hide my address if I travel to clients?
                  </h3>
                  <p className="text-slate-500 font-medium leading-relaxed">
                    Yes. Check the "Service Area Business" toggle in the generator above to remove your street address while retaining your city and state data to stay compliant with Google. Read our full <Link href="/guides/service-area-business" className="text-indigo-600 hover:text-indigo-800 font-bold transition-colors border-b border-indigo-200 hover:border-indigo-600 pb-0.5">SAB SEO Guide</Link> for more details.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Related Niches Section */}
          <div className="bg-[#FAFAFA] p-8 md:p-14 rounded-[2.5rem] border border-slate-200/60 shadow-inner relative overflow-hidden">
             <div className="absolute top-0 right-0 w-64 h-64 bg-indigo-50/50 rounded-full blur-3xl -mr-32 -mt-32 pointer-events-none"></div>
            <RelatedNiches currentNiche={nicheId} />
          </div>
          
        </div>
      </section>
    </main>
  );
}