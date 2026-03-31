import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Service Area Business (SAB) Schema SEO Guide | Hide Your Address",
  description: "Learn how to format JSON-LD structured data for mobile businesses, plumbers, and contractors who do not have a physical storefront to stay compliant with Google.",
  keywords: ["service area business schema", "sab schema", "hide address local seo", "json-ld for contractors", "mobile business schema", "google map pack sab"],
  alternates: {
    canonical: "https://getlocalschema.com/guides/service-area-business",
  }
};

export default function SABGuide() {
  // Structured Data for the Article and FAQ
  const structuredData = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Article",
        "@id": "https://getlocalschema.com/guides/service-area-business#article",
        "headline": "How to Write Schema for a Service Area Business (SAB)",
        "description": "Learn how to format JSON-LD schema for mobile businesses, plumbers, and contractors who do not have a physical storefront.",
        "author": {
          "@type": "Organization",
          "name": "getlocalschema"
        },
        "publisher": {
          "@type": "Organization",
          "name": "getlocalschema",
          "logo": {
            "@type": "ImageObject",
            "url": "https://getlocalschema.com/logo.png"
          }
        },
        "mainEntityOfPage": {
          "@type": "WebPage",
          "@id": "https://getlocalschema.com/guides/service-area-business"
        }
      },
      {
        "@type": "FAQPage",
        "mainEntity": [
          {
            "@type": "Question",
            "name": "What is a Service Area Business (SAB)?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "A Service Area Business (SAB) is a business that travels to customers directly rather than having customers visit a physical storefront. Examples include plumbers, electricians, mobile detailers, and roofers."
            }
          },
          {
            "@type": "Question",
            "name": "Do I need to hide my address in my schema?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Yes. If your address is hidden on your Google Business Profile because you do not receive customers there, you must also omit your street address from your website's schema markup to stay compliant."
            }
          }
        ]
      }
    ]
  };

  return (
    <main className="w-full bg-[#07090E] selection:bg-teal-500/25 selection:text-teal-100" id="main-content">
      {/* Schema Injection */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />

      {/* PREMIUM HERO SECTION */}
      <section className="relative pt-32 pb-16 px-4 overflow-hidden border-b border-white/[0.08] bg-[#0C1018]">
        <div className="absolute inset-0 z-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]"></div>
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[500px] opacity-30 pointer-events-none z-0">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-orange-300/40 via-red-100/20 to-transparent blur-3xl"></div>
        </div>

        <div className="max-w-3xl mx-auto relative z-10">
          <nav className="flex mb-8 text-[13px] font-medium text-white/40" aria-label="Breadcrumb">
            <ol className="inline-flex items-center bg-white/[0.04] border border-white/[0.08] shadow-sm rounded-full px-4 py-2 backdrop-blur-md">
              <li className="inline-flex items-center">
                <Link href="/" className="hover:text-teal-400 transition-colors">Home</Link>
              </li>
              <li>
                <div className="flex items-center">
                  <svg className="w-3 h-3 text-white/20 mx-2" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 6 10"><path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 9 4-4-4-4"/></svg>
                  <span className="text-white/90 font-bold">SAB Guide</span>
                </div>
              </li>
            </ol>
          </nav>

          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-amber-500/[0.08] border border-amber-500/30 text-amber-300 text-sm font-bold mb-6 shadow-sm">
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5"><path strokeLinecap="round" strokeLinejoin="round" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.243-4.243a8 8 0 1111.314 0z"></path><path strokeLinecap="round" strokeLinejoin="round" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"></path></svg>
            Local SEO Tutorial
          </div>
          
          <h1 className="text-4xl md:text-6xl font-extrabold text-white mb-8 leading-[1.05] tracking-tighter">
            Service Area Business Schema: <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-500 to-red-500 pb-2">Hide Your Address Safely</span>
          </h1>
          
          <p className="text-xl md:text-2xl text-white/40 leading-relaxed font-medium">
            If you operate out of your home and travel to clients (like a roofer, plumber, or mobile detailer), Google requires you to hide your physical address. Here is how to handle your JSON-LD safely without losing local ranking power.
          </p>
        </div>
      </section>

      {/* ARTICLE CONTENT */}
      <article className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-24 lg:py-32">
        
        <h2 className="text-3xl md:text-4xl text-white font-extrabold tracking-tighter mt-0 mb-6">
          What is a Service Area Business (SAB)?
        </h2>
        <p className="text-lg md:text-xl text-white/55 leading-relaxed font-medium mb-6">
          In the world of local SEO, businesses are generally split into two categories:
        </p>
        <ul className="list-none space-y-4 text-lg md:text-xl text-white/55 font-medium mb-10 pl-0">
          <li className="flex items-start gap-4 p-5 bg-[#0C1018] rounded-2xl border border-white/[0.08] shadow-sm">
            <div className="mt-1 flex-shrink-0 w-2 h-2 rounded-full bg-teal-400"></div>
            <div>
              <strong className="text-white tracking-tight block mb-1">Storefront Businesses:</strong>
              Customers come to your physical location (e.g., a dental office, a restaurant, a retail shop).
            </div>
          </li>
          <li className="flex items-start gap-4 p-5 bg-[#0C1018] rounded-2xl border border-white/[0.08] shadow-sm">
            <div className="mt-1 flex-shrink-0 w-2 h-2 rounded-full bg-amber-400"></div>
            <div>
              <strong className="text-white tracking-tight block mb-1">Service Area Businesses (SABs):</strong>
              You travel to your customers' homes or businesses to deliver your service (e.g., plumbers, HVAC technicians, electricians, mobile car detailers, pest control).
            </div>
          </li>
        </ul>
        <p className="text-lg md:text-xl text-white/55 leading-relaxed font-medium mb-10">
          If you are an SAB running your business out of your home address, Google's guidelines explicitly state that you <strong className="text-white">cannot</strong> display your residential address on your Google Business Profile. You must hide your street address and set a "Service Area" (a radius or list of cities you cover).
        </p>
        
        <h3 className="text-2xl md:text-3xl text-white font-extrabold tracking-tighter mt-16 mb-6">
          The SEO Problem with Hidden Addresses
        </h3>
        <p className="text-lg md:text-xl text-white/55 leading-relaxed font-medium mb-12">
          When you hide your address on your Google Business Profile, you lose a massive relevance signal. To compensate, your website needs to aggressively signal its location to Google. However, if you put a hidden residential address into your website's JSON-LD schema markup, you create conflicting data that violates Google's guidelines and risks a profile suspension.
        </p>

        <hr className="border-white/[0.08] my-16" />

        <h2 className="text-3xl md:text-4xl text-white font-extrabold tracking-tighter mt-16 mb-6">
          The Rule: Omit the Street Address, Keep the City
        </h2>
        <p className="text-lg md:text-xl text-white/55 leading-relaxed font-medium mb-6">
          According to Google's strict structured data guidelines, if you do not receive customers at your physical address, you should not list a <code className="bg-white/[0.06] text-white/80 px-1.5 py-0.5 rounded-md text-sm border border-white/[0.08] font-mono">streetAddress</code> in your LocalBusiness schema.
        </p>
        <p className="text-lg md:text-xl text-white/55 leading-relaxed font-medium mb-10">
          Instead, your schema should omit the exact street line but <strong className="text-white">must retain the City, State, and Zip Code</strong>. This acts as the anchor point for your service area.
        </p>

        {/* Premium Split Code Block */}
        <div className="grid md:grid-cols-2 gap-6 my-12">
          <div className="relative group">
            <div className="relative bg-[#0A0A0A] rounded-2xl shadow-xl border border-white/10 overflow-hidden h-full">
              <div className="px-4 py-3 border-b border-white/5 bg-[#111111] flex items-center justify-between">
                <span className="text-[11px] font-mono text-red-400 tracking-wider uppercase font-bold flex items-center gap-2">
                  <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="3"><path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12"></path></svg>
                  Incorrect (Violates Rules)
                </span>
              </div>
              <div className="p-6 overflow-x-auto text-[13px] font-mono leading-relaxed bg-[#0A0A0A]">
                <span className="text-[#e2e8f0]">"address": {"{"}</span><br/>
                &nbsp;&nbsp;<span className="text-[#7dd3fc]">"@type"</span>: <span className="text-[#a3e635]">"PostalAddress"</span>,<br/>
                <div className="bg-red-500/20 -mx-6 px-6 py-0.5 border-l-2 border-red-500">
                  &nbsp;&nbsp;<span className="text-[#7dd3fc]">"streetAddress"</span>: <span className="text-[#a3e635]">"123 Residential Ave"</span>,
                </div>
                &nbsp;&nbsp;<span className="text-[#7dd3fc]">"addressLocality"</span>: <span className="text-[#a3e635]">"Austin"</span>,<br/>
                &nbsp;&nbsp;<span className="text-[#7dd3fc]">"addressRegion"</span>: <span className="text-[#a3e635]">"TX"</span>,<br/>
                &nbsp;&nbsp;<span className="text-[#7dd3fc]">"postalCode"</span>: <span className="text-[#a3e635]">"78701"</span><br/>
                <span className="text-[#e2e8f0]">{"}"}</span>
              </div>
            </div>
          </div>

          <div className="relative group">
            <div className="absolute -inset-1 bg-gradient-to-r from-emerald-500 to-teal-500 rounded-[1.5rem] blur opacity-20"></div>
            <div className="relative bg-[#0A0A0A] rounded-2xl shadow-xl border border-emerald-500/30 overflow-hidden h-full">
              <div className="px-4 py-3 border-b border-white/5 bg-[#111111] flex items-center justify-between">
                <span className="text-[11px] font-mono text-emerald-400 tracking-wider uppercase font-bold flex items-center gap-2">
                  <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="3"><path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7"></path></svg>
                  Correct (Google Safe)
                </span>
              </div>
              <div className="p-6 overflow-x-auto text-[13px] font-mono leading-relaxed bg-[#0A0A0A]">
                <span className="text-[#e2e8f0]">"address": {"{"}</span><br/>
                &nbsp;&nbsp;<span className="text-[#7dd3fc]">"@type"</span>: <span className="text-[#a3e635]">"PostalAddress"</span>,<br/>
                <div className="bg-emerald-500/10 -mx-6 px-6 py-0.5 border-l-2 border-emerald-500">
                  &nbsp;&nbsp;<span className="text-slate-500 italic">// Street line safely omitted</span>
                </div>
                &nbsp;&nbsp;<span className="text-[#7dd3fc]">"addressLocality"</span>: <span className="text-[#a3e635]">"Austin"</span>,<br/>
                &nbsp;&nbsp;<span className="text-[#7dd3fc]">"addressRegion"</span>: <span className="text-[#a3e635]">"TX"</span>,<br/>
                &nbsp;&nbsp;<span className="text-[#7dd3fc]">"postalCode"</span>: <span className="text-[#a3e635]">"78701"</span><br/>
                <span className="text-[#e2e8f0]">{"}"}</span>
              </div>
            </div>
          </div>
        </div>

        <hr className="border-white/[0.08] my-16" />

        <h2 className="text-3xl md:text-4xl text-white font-extrabold tracking-tighter mt-16 mb-6">
          How to Generate SAB Schema Automatically
        </h2>
        <p className="text-lg md:text-xl text-white/55 leading-relaxed font-medium mb-6">
          Deleting lines of code manually is risky and often results in syntax errors (like leaving a dangling comma) which invalidates the entire JSON-LD script. 
        </p>
        <p className="text-lg md:text-xl text-white/55 leading-relaxed font-medium mb-10">
          We built an SAB toggle directly into our tool so you don't have to worry about breaking your code.
        </p>
        
        <ol className="list-decimal pl-6 space-y-5 text-lg md:text-xl text-white/55 font-medium mb-12 marker:text-teal-400 marker:font-bold">
          <li className="pl-2">Find your specific industry on our <Link href="/niches" className="text-teal-400 hover:text-teal-300 transition-colors border-b border-teal-500/30 hover:border-teal-400 pb-0.5">Generators Directory</Link>. Always use a specific schema type (like <code className="bg-white/[0.06] text-white/80 px-1.5 py-0.5 rounded-md text-sm border border-white/[0.08] font-mono">Plumber</code> or <code className="bg-white/[0.06] text-white/80 px-1.5 py-0.5 rounded-md text-sm border border-white/[0.08] font-mono">RoofingContractor</code>) instead of generic <code className="bg-white/[0.06] text-white/80 px-1.5 py-0.5 rounded-md text-sm border border-white/[0.08] font-mono">LocalBusiness</code>.</li>
          <li className="pl-2">Begin filling out your Business Name, Phone Number, and Website.</li>
          <li className="pl-2">Under the Address section, click the toggle that says <strong className="text-white">"Service Area Business (SAB)"</strong>.</li>
          <li className="pl-2">The tool will instantly hide the street address field. Simply enter your primary service City, Region (State), and Postal Code.</li>
          <li className="pl-2">Click "Copy Code" and paste it into your website.</li>
        </ol>

        {/* Premium Callout */}
        <div className="bg-teal-500/[0.06] border border-teal-500/20 p-6 rounded-2xl flex flex-col sm:flex-row gap-4 my-12 shadow-sm">
          <div className="flex-shrink-0 mt-1">
            <svg className="w-7 h-7 text-teal-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5"><path strokeLinecap="round" strokeLinejoin="round" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
          </div>
          <div>
            <h4 className="text-white font-extrabold tracking-tight text-xl mb-2">
              Pro Tip for Service Areas
            </h4>
            <p className="text-white/70 font-medium leading-relaxed text-lg mb-0">
              Always ensure the City, State, and Zip Code you leave in your schema perfectly matches the primary verified location of your Google Business Profile, even if you travel 50 miles outside of it. Google uses this to anchor your trust profile.
            </p>
          </div>
        </div>

        <hr className="border-white/[0.08] my-16" />

        <h2 className="text-3xl md:text-4xl text-white font-extrabold tracking-tighter mt-16 mb-6">
          Advanced: Using the areaServed Property
        </h2>
        <p className="text-lg md:text-xl text-white/55 leading-relaxed font-medium mb-10">
          If you want to be extremely thorough, you can also define the <code className="bg-white/[0.06] text-white/80 px-1.5 py-0.5 rounded-md text-sm border border-white/[0.08] font-mono">areaServed</code> property within your JSON-LD to tell Google exactly which surrounding cities you cover. While our standard generator keeps things simple and lightweight, you can manually add this array to your code:
        </p>

        {/* Premium Terminal Block */}
        <div className="relative group my-10">
          <div className="absolute -inset-1 bg-gradient-to-r from-slate-400 to-slate-300 rounded-[2rem] blur opacity-20 transition duration-1000"></div>
          <div className="relative bg-[#0A0A0A] rounded-2xl shadow-2xl border border-white/10 overflow-hidden">
            <div className="flex items-center justify-between px-4 py-3 border-b border-white/5 bg-[#111111]">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-[#FF5F56] border border-[#E0443E]"></div>
                <div className="w-3 h-3 rounded-full bg-[#FFBD2E] border border-[#DEA123]"></div>
                <div className="w-3 h-3 rounded-full bg-[#27C93F] border border-[#1AAB29]"></div>
              </div>
              <span className="text-[11px] font-mono text-slate-500 tracking-wider uppercase font-medium">schema-addon.json</span>
              <div className="w-12"></div>
            </div>
            <div className="p-8 overflow-x-auto text-[13px] sm:text-sm font-mono leading-relaxed bg-[#0A0A0A] text-[#e2e8f0]">
              <span className="text-[#7dd3fc]">"areaServed"</span>: [<br/>
              &nbsp;&nbsp;{"{"}<br/>
              &nbsp;&nbsp;&nbsp;&nbsp;<span className="text-[#7dd3fc]">"@type"</span>: <span className="text-[#a3e635]">"City"</span>,<br/>
              &nbsp;&nbsp;&nbsp;&nbsp;<span className="text-[#7dd3fc]">"name"</span>: <span className="text-[#a3e635]">"Austin"</span>,<br/>
              &nbsp;&nbsp;&nbsp;&nbsp;<span className="text-[#7dd3fc]">"sameAs"</span>: <span className="text-[#a3e635]">"https://en.wikipedia.org/wiki/Austin,_Texas"</span><br/>
              &nbsp;&nbsp;{"}"},<br/>
              &nbsp;&nbsp;{"{"}<br/>
              &nbsp;&nbsp;&nbsp;&nbsp;<span className="text-[#7dd3fc]">"@type"</span>: <span className="text-[#a3e635]">"City"</span>,<br/>
              &nbsp;&nbsp;&nbsp;&nbsp;<span className="text-[#7dd3fc]">"name"</span>: <span className="text-[#a3e635]">"Round Rock"</span><br/>
              &nbsp;&nbsp;{"}"}<br/>
              ]
            </div>
          </div>
        </div>

        <p className="text-lg md:text-xl text-white/55 leading-relaxed font-medium mt-10 mb-12">
          This sends a strong signal to Google about your geographic relevance, helping you rank in those neighboring suburbs.
        </p>

      </article>

      {/* ULTRA PREMIUM BOTTOM CTA SECTION */}
      <section className="py-32 px-4 relative overflow-hidden bg-[#0A0A0A] text-center border-t border-white/10 mt-12">
        <div className="absolute inset-0 z-0 flex items-center justify-center bg-[#0A0A0A] [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)]"></div>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[500px] bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-orange-600/20 via-red-900/10 to-transparent blur-3xl pointer-events-none z-0"></div>
        <div className="absolute inset-0 z-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 brightness-100 contrast-150 mix-blend-overlay"></div>

        <div className="relative z-10 max-w-3xl mx-auto">
          <h2 className="text-4xl md:text-6xl font-extrabold tracking-tighter text-white mb-8">Build your SAB Schema in seconds</h2>
          <p className="text-xl md:text-2xl text-slate-400 mb-12 font-medium max-w-2xl mx-auto">
            Our generator is specifically designed to handle Service Area Businesses perfectly. Choose your niche, toggle the SAB switch, and you're done.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Link 
              href="/schema-tool" 
              className="group relative inline-flex h-16 w-full sm:w-auto items-center justify-center overflow-hidden rounded-full bg-white px-10 font-bold text-slate-950 shadow-[0_0_40px_-10px_rgba(255,255,255,0.3)] transition-all duration-300 hover:scale-105 hover:shadow-[0_0_60px_-15px_rgba(255,255,255,0.5)] focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-[#0A0A0A]"
            >
              <span className="flex items-center gap-2 text-lg">
                Start Building Schema
                <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 group-hover:translate-x-1 transition-transform" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M5 12h14"></path>
                  <path d="m12 5 7 7-7 7"></path>
                </svg>
              </span>
            </Link>
            <Link 
              href="/niches" 
              className="group inline-flex h-16 w-full sm:w-auto items-center justify-center rounded-full bg-transparent border border-white/20 px-10 font-bold text-white transition-all duration-300 hover:bg-white/10 hover:border-white/30 focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-[#0A0A0A] text-lg"
            >
              Browse All Niches
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}