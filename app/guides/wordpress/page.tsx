import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "How to Add Local Schema to WordPress Without Plugins (2026 Guide)",
  description: "Learn the safest, most effective ways to inject valid JSON-LD local business schema into your WordPress website header safely, without buying bloated premium SEO plugins.",
  keywords: ["wordpress schema", "add json-ld to wordpress", "local seo wordpress", "schema markup wordpress", "wordpress localbusiness schema"],
  alternates: {
    canonical: "https://getlocalschema.com/guides/wordpress",
  }
};

export default function WordPressGuide() {
  // Structured Data for the Article and FAQ
  const structuredData = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Article",
        "@id": "https://getlocalschema.com/guides/wordpress#article",
        "headline": "How to Add Local Schema to WordPress Without Premium Plugins",
        "description": "Learn how to inject valid JSON-LD local business schema into your WordPress website header safely, without buying premium SEO plugins.",
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
          "@id": "https://getlocalschema.com/guides/wordpress"
        }
      },
      {
        "@type": "FAQPage",
        "mainEntity": [
          {
            "@type": "Question",
            "name": "Do I need a premium SEO plugin to add schema?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "No. Premium plugins like Yoast or RankMath Pro charge yearly fees for local schema. You can generate it for free using localschema and inject it directly into your WordPress header using a free snippet plugin or your theme's settings."
            }
          },
          {
            "@type": "Question",
            "name": "Where should JSON-LD code be placed in WordPress?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Google recommends placing JSON-LD structured data in the <head> section of your website's HTML, though placing it just before the closing </body> tag is also perfectly valid and will be read correctly by search engines."
            }
          }
        ]
      }
    ]
  };

  return (
    <main className="w-full bg-white dark:bg-[#07090E] selection:bg-teal-500/25 selection:text-teal-700 dark:selection:text-teal-100" id="main-content">
      {/* Schema Injection */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />

      {/* PREMIUM HERO SECTION */}
      <section className="relative pt-32 pb-16 px-4 overflow-hidden border-b border-slate-200 dark:border-white/[0.08] bg-slate-50 dark:bg-[#0C1018]">
        <div className="absolute inset-0 z-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]"></div>
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[500px] opacity-30 pointer-events-none z-0">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-sky-500/12 via-teal-500/5 to-transparent blur-3xl"></div>
        </div>

        <div className="max-w-3xl mx-auto relative z-10">
          <nav className="flex mb-8 text-[13px] font-medium text-slate-500 dark:text-white/40" aria-label="Breadcrumb">
            <ol className="inline-flex items-center bg-slate-100 dark:bg-white/[0.04] border border-slate-200 dark:border-white/[0.08] shadow-sm rounded-full px-4 py-2 backdrop-blur-md">
              <li className="inline-flex items-center">
                <Link href="/" className="hover:text-teal-600 dark:hover:text-teal-400 transition-colors">Home</Link>
              </li>
              <li>
                <div className="flex items-center">
                  <svg className="w-3 h-3 text-slate-300 dark:text-white/20 mx-2" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 6 10"><path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 9 4-4-4-4"/></svg>
                  <span className="text-slate-700 dark:text-white/90 font-bold">WordPress Guide</span>
                </div>
              </li>
            </ol>
          </nav>

          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-sky-500/[0.08] border border-sky-500/30 text-sky-600 dark:text-sky-300 text-sm font-bold mb-6 shadow-sm">
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M12.158 12.786l-2.698 2.81c-.526.547-1.464.218-1.464-.536V8.657c0-.77 1.012-1.077 1.487-.45l2.675 3.535v1.044z"/><path d="M12 22C6.477 22 2 17.523 2 12S6.477 2 12 2s10 4.477 10 10-4.477 10-10 10zm-1.875-6.66l4.248-4.425c.656-.684-1.826-2.585-2.513-1.874L7.613 13.467c-.684.712 1.83 2.586 2.512 1.873z"/></svg>
            WordPress SEO Tutorial
          </div>
          
          <h1 className="text-4xl md:text-6xl font-extrabold text-slate-900 dark:text-white mb-8 leading-[1.05] tracking-tighter">
            How to Add Local Schema to WordPress <span className="text-transparent bg-clip-text bg-gradient-to-r from-teal-400 to-cyan-300 pb-2">Without Premium Plugins</span>
          </h1>
          
          <p className="text-xl md:text-2xl text-slate-500 dark:text-white/40 leading-relaxed font-medium">
            You do not need to pay $99/year for a premium SEO plugin just to add basic JSON-LD to your site. Learn the exact step-by-step process to inject perfectly formatted local business schema into your WordPress website manually and safely.
          </p>
        </div>
      </section>

      {/* ARTICLE CONTENT */}
      <article className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-24 lg:py-32">
        
        <h2 className="text-3xl md:text-4xl text-slate-900 dark:text-white font-extrabold tracking-tighter mt-0 mb-6">
          What is LocalBusiness Schema and Why Does it Matter?
        </h2>
        <p className="text-lg md:text-xl text-slate-600 dark:text-white/55 leading-relaxed font-medium mb-6">
          Before we dive into the technical implementation, let's understand why we're doing this. <strong className="text-slate-900 dark:text-white">LocalBusiness Schema</strong> (specifically in the JSON-LD format) is a standardized vocabulary of code that search engines like Google use to understand your business's core data.
        </p>
        <p className="text-lg md:text-xl text-slate-600 dark:text-white/55 leading-relaxed font-medium mb-10">
          Instead of forcing Google's crawlers to guess your phone number, business hours, and service areas by reading your paragraphs, JSON-LD feeds them this data directly. This is commonly referred to as your NAP data (Name, Address, Phone Number).
        </p>
        
        <h3 className="text-2xl md:text-3xl text-slate-900 dark:text-white font-extrabold tracking-tighter mt-16 mb-6">
          The Google Map Pack Connection
        </h3>
        <p className="text-lg md:text-xl text-slate-600 dark:text-white/55 leading-relaxed font-medium mb-12">
          If you want to rank in the highly coveted "Local 3-Pack" (the map results at the top of Google), consistency is key. By placing a valid, industry-specific schema tag (like <Link href="/generator/plumber" className="text-teal-600 dark:text-teal-400 hover:text-teal-500 dark:hover:text-teal-300 transition-colors border-b border-teal-500/30 hover:border-teal-400 pb-0.5">Plumber Schema</Link> or <Link href="/generator/hvac" className="text-teal-600 dark:text-teal-400 hover:text-teal-500 dark:hover:text-teal-300 transition-colors border-b border-teal-500/30 hover:border-teal-400 pb-0.5">HVAC Schema</Link>) in your WordPress header, you establish a massive trust signal with Google's local algorithm.
        </p>

        <hr className="border-slate-200 dark:border-white/[0.08] my-16" />

        <h2 className="text-3xl md:text-4xl text-slate-900 dark:text-white font-extrabold tracking-tighter mt-16 mb-6">
          Step 1: Generate Your Custom JSON-LD Code
        </h2>
        <p className="text-lg md:text-xl text-slate-600 dark:text-white/55 leading-relaxed font-medium mb-8">
          Writing JSON-LD from scratch is tedious and highly prone to syntax errors (a single missing comma will break the entire script). Instead, we will use a dedicated generator.
        </p>

        <ol className="list-decimal pl-6 space-y-5 text-lg md:text-xl text-slate-600 dark:text-white/55 font-medium mb-12 marker:text-teal-600 dark:marker:text-teal-400 marker:font-bold">
          <li className="pl-2">Go to our <Link href="/niches" className="text-teal-600 dark:text-teal-400 hover:text-teal-500 dark:hover:text-teal-300 transition-colors border-b border-teal-500/30 hover:border-teal-400 pb-0.5">Schema Generator Directory</Link>.</li>
          <li className="pl-2">Select your exact industry. <em className="text-slate-500 dark:text-white/40 italic">Do not settle for generic "LocalBusiness" if a more specific category like "Electrician" or "RoofingContractor" exists for your niche.</em></li>
          <li className="pl-2">Fill out the form with your exact Business Name, Phone Number, Website, and Address.</li>
          <li className="pl-2"><strong className="text-slate-900 dark:text-white">Crucial step for Mobile Businesses:</strong> If you travel to your customers and hide your address on your Google Business Profile, ensure you toggle the <em className="italic text-slate-900 dark:text-white">"Service Area Business"</em> option. This removes the street address from the code to keep you compliant. Read our full <Link href="/guides/service-area-business" className="text-teal-600 dark:text-teal-400 hover:text-teal-500 dark:hover:text-teal-300 transition-colors border-b border-teal-500/30 hover:border-teal-400 pb-0.5">Service Area Business guide</Link> for more on this.</li>
          <li className="pl-2">Click <strong className="text-slate-900 dark:text-white">Copy Code</strong>.</li>
        </ol>

        {/* Premium Terminal Block */}
        <div className="relative group my-10">
          <div className="absolute -inset-1 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 rounded-[2rem] blur opacity-20 transition duration-1000"></div>
          <div className="relative bg-[#0A0A0A] rounded-2xl shadow-2xl border border-white/10 overflow-hidden">
            <div className="flex items-center justify-between px-4 py-3 border-b border-white/5 bg-[#111111]">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-[#FF5F56] border border-[#E0443E]"></div>
                <div className="w-3 h-3 rounded-full bg-[#FFBD2E] border border-[#DEA123]"></div>
                <div className="w-3 h-3 rounded-full bg-[#27C93F] border border-[#1AAB29]"></div>
              </div>
              <span className="text-[11px] font-mono text-slate-500 tracking-wider uppercase font-medium">schema.json</span>
              <div className="w-12"></div>
            </div>
            <div className="p-8 overflow-x-auto text-[13px] sm:text-sm font-mono leading-relaxed bg-[#0A0A0A] text-[#e2e8f0]">
              <span className="text-slate-500 mb-4 block italic">// Your copied code will look something like this:</span>
              <span className="text-slate-500">&lt;script type="application/ld+json"&gt;</span><br/>
              {"{"}<br/>
              &nbsp;&nbsp;<span className="text-[#7dd3fc]">"@context"</span>: <span className="text-[#a3e635]">"https://schema.org"</span>,<br/>
              &nbsp;&nbsp;<span className="text-[#7dd3fc]">"@type"</span>: <span className="text-[#a3e635]">"Plumber"</span>,<br/>
              &nbsp;&nbsp;<span className="text-[#7dd3fc]">"name"</span>: <span className="text-[#a3e635]">"Elite City Plumbing"</span>,<br/>
              &nbsp;&nbsp;<span className="text-[#7dd3fc]">"telephone"</span>: <span className="text-[#a3e635]">"+1-555-0198"</span>,<br/>
              &nbsp;&nbsp;<span className="text-slate-500">...</span><br/>
              {"}"}<br/>
              <span className="text-slate-500">&lt;/script&gt;</span>
            </div>
          </div>
        </div>

        <hr className="border-slate-200 dark:border-white/[0.08] my-16" />

        <h2 className="text-3xl md:text-4xl text-slate-900 dark:text-white font-extrabold tracking-tighter mt-16 mb-6">
          Step 2: Choose Your Injection Method
        </h2>
        <p className="text-lg md:text-xl text-slate-600 dark:text-white/55 leading-relaxed font-medium mb-10">
          Now that you have your code copied to your clipboard, you need to paste it into your WordPress website. Google recommends placing this script in the <code className="bg-slate-100 dark:bg-white/[0.06] text-slate-700 dark:text-white/80 px-1.5 py-0.5 rounded-md text-sm border border-slate-200 dark:border-white/[0.08] font-mono">&lt;head&gt;</code> section of your site. Here are the three best ways to do this.
        </p>

        <h3 className="text-2xl md:text-3xl text-slate-900 dark:text-white font-extrabold tracking-tighter mt-16 mb-6">
          Method A: Using a Lightweight Header Plugin (Recommended for Beginners)
        </h3>
        <p className="text-lg md:text-xl text-slate-600 dark:text-white/55 leading-relaxed font-medium mb-8">
          While we aren't using an expensive SEO plugin, the safest way to add code to your header without breaking your theme when it updates is by using a dedicated, lightweight snippet plugin.
        </p>

        <ol className="list-decimal pl-6 space-y-4 text-lg md:text-xl text-slate-600 dark:text-white/55 font-medium mb-12 marker:text-teal-600 dark:marker:text-teal-400 marker:font-bold">
          <li className="pl-2">Log in to your WordPress Dashboard.</li>
          <li className="pl-2">Navigate to <strong className="text-slate-900 dark:text-white">Plugins &gt; Add New</strong> in the left sidebar.</li>
          <li className="pl-2">Search for <strong className="text-slate-900 dark:text-white">"WPCode"</strong> (previously Insert Headers and Footers).</li>
          <li className="pl-2">Click <strong className="text-slate-900 dark:text-white">Install Now</strong>, then <strong className="text-slate-900 dark:text-white">Activate</strong>.</li>
          <li className="pl-2">In your left sidebar, you will now see a menu item called <strong className="text-slate-900 dark:text-white">Code Snippets</strong>. Click on <strong className="text-slate-900 dark:text-white">Header &amp; Footer</strong>.</li>
          <li className="pl-2">In the "Global Header and Footer" settings, locate the <strong className="text-slate-900 dark:text-white">Header</strong> text area.</li>
          <li className="pl-2">Paste your copied JSON-LD script directly into this box.</li>
          <li className="pl-2">Click <strong className="text-slate-900 dark:text-white">Save Changes</strong>.</li>
        </ol>

        <h3 className="text-2xl md:text-3xl text-slate-900 dark:text-white font-extrabold tracking-tighter mt-16 mb-6">
          Method B: Using Elementor Pro or Theme Builders
        </h3>
        <p className="text-lg md:text-xl text-slate-600 dark:text-white/55 leading-relaxed font-medium mb-8">
          If you are using a visual builder like Elementor Pro, Divi, or GeneratePress Premium, you do not need to install an extra plugin.
        </p>
        <ul className="list-none space-y-5 text-lg md:text-xl text-slate-600 dark:text-white/55 font-medium mb-12 pl-0">
          <li className="flex items-start gap-4 p-5 bg-slate-50 dark:bg-[#0C1018] rounded-2xl border border-slate-200 dark:border-white/[0.08] shadow-sm">
            <div className="mt-1.5 flex-shrink-0 w-2 h-2 rounded-full bg-blue-500"></div>
            <div>
              <strong className="text-slate-900 dark:text-white tracking-tight block mb-1">Elementor Pro:</strong>
              Go to <em className="italic">Elementor &gt; Custom Code</em>. Click "Add New". Name it "Local Schema", set the location to <code className="bg-slate-100 dark:bg-white/[0.06] text-slate-700 dark:text-white/80 px-1.5 py-0.5 rounded-md text-sm border border-slate-200 dark:border-white/[0.08] font-mono">&lt;head&gt;</code>, paste your code, and set the condition to "Entire Site".
            </div>
          </li>
          <li className="flex items-start gap-4 p-5 bg-slate-50 dark:bg-[#0C1018] rounded-2xl border border-slate-200 dark:border-white/[0.08] shadow-sm">
            <div className="mt-1.5 flex-shrink-0 w-2 h-2 rounded-full bg-purple-500"></div>
            <div>
              <strong className="text-slate-900 dark:text-white tracking-tight block mb-1">Divi:</strong>
              Go to <em className="italic">Divi &gt; Theme Options &gt; Integration</em>. Paste the code into the "Add code to the &lt;head&gt; of your blog" box.
            </div>
          </li>
          <li className="flex items-start gap-4 p-5 bg-slate-50 dark:bg-[#0C1018] rounded-2xl border border-slate-200 dark:border-white/[0.08] shadow-sm">
            <div className="mt-1.5 flex-shrink-0 w-2 h-2 rounded-full bg-indigo-500"></div>
            <div>
              <strong className="text-slate-900 dark:text-white tracking-tight block mb-1">GeneratePress:</strong>
              Use the <em className="italic">Elements</em> module. Create a new "Hook", select the <code className="bg-slate-100 dark:bg-white/[0.06] text-slate-700 dark:text-white/80 px-1.5 py-0.5 rounded-md text-sm border border-slate-200 dark:border-white/[0.08] font-mono">wp_head</code> hook, paste your code, and apply the display rule to the Entire Site.
            </div>
          </li>
        </ul>

        <h3 className="text-2xl md:text-3xl text-slate-900 dark:text-white font-extrabold tracking-tighter mt-16 mb-6">
          Method C: Editing functions.php (Advanced)
        </h3>
        <p className="text-lg md:text-xl text-slate-600 dark:text-white/55 leading-relaxed font-medium mb-8">
          If you are a developer and prefer a plugin-free approach, you can inject the code directly via your child theme's <code className="bg-slate-100 dark:bg-white/[0.06] text-slate-700 dark:text-white/80 px-1.5 py-0.5 rounded-md text-sm border border-slate-200 dark:border-white/[0.08] font-mono">functions.php</code> file. <em className="italic text-slate-500 dark:text-white/40">Warning: Always back up your site before editing PHP files.</em>
        </p>

        {/* Premium Terminal Block for PHP */}
        <div className="relative group my-10">
          <div className="absolute -inset-1 bg-gradient-to-r from-teal-400 to-cyan-300 rounded-[2rem] blur opacity-20 transition duration-1000"></div>
          <div className="relative bg-[#0A0A0A] rounded-2xl shadow-2xl border border-white/10 overflow-hidden">
            <div className="flex items-center justify-between px-4 py-3 border-b border-white/5 bg-[#111111]">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-[#FF5F56] border border-[#E0443E]"></div>
                <div className="w-3 h-3 rounded-full bg-[#FFBD2E] border border-[#DEA123]"></div>
                <div className="w-3 h-3 rounded-full bg-[#27C93F] border border-[#1AAB29]"></div>
              </div>
              <span className="text-[11px] font-mono text-slate-500 tracking-wider uppercase font-medium">functions.php</span>
              <div className="w-12"></div>
            </div>
            <div className="p-8 overflow-x-auto text-[13px] sm:text-sm font-mono leading-relaxed bg-[#0A0A0A] text-[#e2e8f0]">
              <span className="text-[#cba6f7]">add_action</span>(<span className="text-[#a3e635]">'wp_head'</span>, <span className="text-[#a3e635]">'add_local_schema_to_header'</span>);<br/><br/>
              <span className="text-[#cba6f7]">function</span> <span className="text-[#89b4fa]">add_local_schema_to_header</span>() {"{"}<br/>
              &nbsp;&nbsp;&nbsp;&nbsp;?&gt;<br/>
              &nbsp;&nbsp;&nbsp;&nbsp;<span className="text-slate-500 italic">&lt;!-- Paste your LocalSchema JSON-LD code here --&gt;</span><br/>
              &nbsp;&nbsp;&nbsp;&nbsp;<span className="text-slate-500">&lt;script type="application/ld+json"&gt;</span><br/>
              &nbsp;&nbsp;&nbsp;&nbsp;{"{"}<br/>
              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span className="text-[#7dd3fc]">"@context"</span>: <span className="text-[#a3e635]">"https://schema.org"</span>,<br/>
              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span className="text-[#7dd3fc]">"@type"</span>: <span className="text-[#a3e635]">"LocalBusiness"</span>,<br/>
              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span className="text-[#7dd3fc]">"name"</span>: <span className="text-[#a3e635]">"Your Business"</span><br/>
              &nbsp;&nbsp;&nbsp;&nbsp;{"}"}<br/>
              &nbsp;&nbsp;&nbsp;&nbsp;<span className="text-slate-500">&lt;/script&gt;</span><br/>
              &nbsp;&nbsp;&nbsp;&nbsp;&lt;?php<br/>
              {"}"}
            </div>
          </div>
        </div>

        <hr className="border-slate-200 dark:border-white/[0.08] my-16" />

        <h2 className="text-3xl md:text-4xl text-slate-900 dark:text-white font-extrabold tracking-tighter mt-16 mb-6">
          Step 3: Test and Validate Your Schema
        </h2>
        <p className="text-lg md:text-xl text-slate-600 dark:text-white/55 leading-relaxed font-medium mb-8">
          Never assume your code is working perfectly just because you pasted it. You must validate it using Google's official tools.
        </p>

        <ol className="list-decimal pl-6 space-y-4 text-lg md:text-xl text-slate-600 dark:text-white/55 font-medium mb-12 marker:text-teal-600 dark:marker:text-teal-400 marker:font-bold">
          <li className="pl-2">Go to the <a href="https://search.google.com/test/rich-results" target="_blank" rel="noopener noreferrer" className="text-teal-600 dark:text-teal-400 hover:text-teal-500 dark:hover:text-teal-300 transition-colors border-b border-teal-500/30 hover:border-teal-400 pb-0.5">Google Rich Results Test</a>.</li>
          <li className="pl-2">Enter your website's URL (e.g., <code className="bg-slate-100 dark:bg-white/[0.06] text-slate-700 dark:text-white/80 px-1.5 py-0.5 rounded-md text-sm border border-slate-200 dark:border-white/[0.08] font-mono">https://yourwebsite.com</code>) and click <strong className="text-slate-900 dark:text-white">Test URL</strong>.</li>
          <li className="pl-2">Wait a minute or two for Google's bot to crawl your live page.</li>
          <li className="pl-2">Look for a green checkmark indicating <strong className="text-emerald-600">"1 valid item detected"</strong> under the LocalBusiness or specific industry tab.</li>
        </ol>

        {/* Premium Callout (Amber/Warning) */}
        <div className="bg-amber-50/50 dark:bg-amber-500/[0.08] border border-amber-200 dark:border-amber-500/25 p-6 rounded-2xl flex flex-col sm:flex-row gap-4 my-12 shadow-sm">
          <div className="flex-shrink-0 mt-1">
            <svg className="w-7 h-7 text-amber-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5"><path strokeLinecap="round" strokeLinejoin="round" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"></path></svg>
          </div>
          <div>
            <h4 className="text-amber-950 dark:text-amber-300 font-extrabold tracking-tight text-xl mb-2">
              Troubleshooting Errors
            </h4>
            <p className="text-amber-900/80 dark:text-amber-300 font-medium leading-relaxed text-lg mb-0">
              If the Rich Results Test throws a syntax error, it usually means a quotation mark was deleted or a comma is missing. Return to our <Link href="/schema-tool" className="text-amber-700 dark:text-amber-300 font-bold hover:text-amber-900 dark:hover:text-amber-200 transition-colors border-b border-amber-300 dark:border-amber-500/50 hover:border-amber-700 pb-0.5">Schema Tool</Link>, regenerate the code, and re-paste it carefully.
            </p>
          </div>
        </div>

        <hr className="border-slate-200 dark:border-white/[0.08] my-16" />

        <h2 className="text-3xl md:text-4xl text-slate-900 dark:text-white font-extrabold tracking-tighter mt-16 mb-8">
          Frequently Asked Questions
        </h2>

        <div className="space-y-10">
          <div className="bg-slate-50 dark:bg-[#0C1018] p-8 md:p-10 rounded-3xl border border-slate-200 dark:border-white/[0.08] shadow-sm">
            <h3 className="text-2xl font-extrabold tracking-tighter text-slate-900 dark:text-white mb-4">
              Do I need a premium SEO plugin to add schema?
            </h3>
            <p className="text-lg md:text-xl text-slate-600 dark:text-white/55 leading-relaxed font-medium mb-0">
              No. Premium plugins like Yoast or RankMath Pro charge yearly fees for advanced local schema features. You can generate the exact same JSON-LD structured data for free using our tools and inject it manually.
            </p>
          </div>

          <div className="bg-slate-50 dark:bg-[#0C1018] p-8 md:p-10 rounded-3xl border border-slate-200 dark:border-white/[0.08] shadow-sm">
            <h3 className="text-2xl font-extrabold tracking-tighter text-slate-900 dark:text-white mb-4">
              Should the schema be on every page?
            </h3>
            <p className="text-lg md:text-xl text-slate-600 dark:text-white/55 leading-relaxed font-medium mb-0">
              Yes, it is standard practice to place your core LocalBusiness or Organization schema in the global header so it populates across your entire site, reinforcing your local relevance on every page.
            </p>
          </div>
        </div>

      </article>

      {/* ULTRA PREMIUM BOTTOM CTA SECTION */}
      <section className="py-32 px-4 relative overflow-hidden bg-slate-900 dark:bg-[#0A0A0A] text-center border-t border-slate-200 dark:border-white/10 mt-12">
        <div className="absolute inset-0 z-0 flex items-center justify-center bg-slate-900 dark:bg-[#0A0A0A] [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)]"></div>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[500px] bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-blue-600/20 via-indigo-900/10 to-transparent blur-3xl pointer-events-none z-0"></div>
        <div className="absolute inset-0 z-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 brightness-100 contrast-150 mix-blend-overlay"></div>

        <div className="relative z-10 max-w-3xl mx-auto">
          <h2 className="text-4xl md:text-6xl font-extrabold tracking-tighter text-white mb-8">Ready to rank your WordPress site?</h2>
          <p className="text-xl md:text-2xl text-white/55 mb-12 font-medium max-w-2xl mx-auto">
            Now that you know how to add it, it's time to generate your perfectly formatted JSON-LD code. Choose from over 50 specific industries.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Link 
              href="/schema-tool" 
              className="group relative inline-flex h-16 w-full sm:w-auto items-center justify-center overflow-hidden rounded-full bg-white px-10 font-bold text-slate-950 shadow-[0_0_40px_-10px_rgba(255,255,255,0.3)] transition-all duration-300 hover:scale-105 hover:shadow-[0_0_60px_-15px_rgba(255,255,255,0.5)] focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-[#0A0A0A]"
            >
              <span className="flex items-center gap-2 text-lg">
                Generate Free Schema
                <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 group-hover:translate-x-1 transition-transform" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M5 12h14"></path>
                  <path d="m12 5 7 7-7 7"></path>
                </svg>
              </span>
            </Link>
            <Link
              href="/niches"
              className="group inline-flex h-16 w-full sm:w-auto items-center justify-center rounded-full bg-transparent border border-slate-300 dark:border-white/20 px-10 font-bold text-slate-600 dark:text-white transition-all duration-300 hover:bg-white/10 hover:border-white/30 focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-[#0A0A0A] text-lg"
            >
              Browse All Niches
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}