import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import Link from "next/link";
import "./globals.css";
import Navbar from "@/components/Navbar";
import { Analytics } from "@vercel/analytics/react";

// Optimize font loading with swap display for better performance (LCP)
const geistSans = Geist({ 
  variable: "--font-geist-sans", 
  subsets: ["latin"],
  display: "swap",
});

const geistMono = Geist_Mono({ 
  variable: "--font-geist-mono", 
  subsets: ["latin"],
  display: "swap",
});

export const viewport: Viewport = {
  themeColor: "#fafafa",
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
};

export const metadata: Metadata = {
  metadataBase: new URL("https://www.getlocalschema.com/"), // Update to your real domain
  title: {
    default: "LocalSchema | Free Local Business Schema Generator",
    template: "%s | LocalSchema",
  },
  description: "Rank higher in local Google searches. Generate perfectly formatted, error-free JSON-LD structured data for your local business in seconds. Built for plumbers, electricians, and HVAC.",
  keywords: ["local seo", "schema generator", "json-ld builder", "service business seo", "local business schema", "rich snippets"],
  authors: [{ name: "LocalSchema" }],
  creator: "LocalSchema",
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "/",
    title: "LocalSchema | Free Local Business Schema Generator",
    description: "Rank higher in local Google searches. Generate perfectly formatted, error-free JSON-LD structured data for your local business in seconds.",
    siteName: "LocalSchema",
    images: [
      {
        url: "/og-image.png", // Ensure this exists in /public
        width: 1200,
        height: 630,
        alt: "LocalSchema - Local Business Schema Generator",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "LocalSchema | Free Local Business Schema Generator",
    description: "Rank higher in local Google searches. Generate perfectly formatted, error-free JSON-LD structured data for your local business in seconds.",
    images: ["/og-image.png"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  verification: {
    google: "YOUR_GOOGLE_VERIFICATION_CODE", // Replace with your GSC code
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  // JSON-LD Structured Data: Organization & WebSite
  const structuredData = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebSite",
        "@id": "https://www.getlocalschema.com/#website",
        "url": "https://www.getlocalschema.com/",
        "name": "LocalSchema",
        "description": "Free Local Business Schema Generator",
        "potentialAction": [
          {
            "@type": "SearchAction",
            "target": {
              "@type": "EntryPoint",
              "urlTemplate": "https://www.getlocalschema.com/niches?q={search_term_string}"
            },
            "query-input": "required name=search_term_string"
          }
        ],
        "inLanguage": "en-US"
      },
      {
        "@type": "Organization",
        "@id": "https://www.getlocalschema.com/#organization",
        "name": "LocalSchema",
        "url": "https://www.getlocalschema.com/",
        "logo": {
          "@type": "ImageObject",
          "inLanguage": "en-US",
          "@id": "https://www.getlocalschema.com/#logo",
          "url": "https://www.getlocalschema.com/logo.png",
          "contentUrl": "https://www.getlocalschema.com/logo.png",
          "width": 512,
          "height": 512,
          "caption": "LocalSchema"
        },
        "image": {
          "@id": "https://www.getlocalschema.com/#logo"
        }
      }
    ]
  };

  return (
    <html lang="en" className={`${geistSans.variable} ${geistMono.variable} h-full antialiased scroll-smooth`}>
      <head>
        {/* Injecting Organization and WebSite Schema */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
        />
      </head>
      <body className="min-h-full flex flex-col bg-[#FAFAFA] text-slate-950 font-sans selection:bg-indigo-500/30 selection:text-indigo-900">
        
        {/* GLOBAL HEADER - Now powered by the Navbar Client Component */}
        <Navbar />

        {/* MAIN CONTENT */}
        <main className="flex-grow flex flex-col w-full relative z-10" id="main-content">
          {children}
        </main>

        {/* PREMIUM GLOBAL FOOTER */}
        <footer className="bg-[#0A0A0A] pt-24 pb-12 text-slate-400 text-sm border-t border-white/10 mt-auto relative overflow-hidden" aria-labelledby="footer-heading">
          {/* Subtle Deep Dark Gradient Glow */}
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[300px] bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-indigo-900/20 via-[#0A0A0A] to-[#0A0A0A] pointer-events-none z-0"></div>
          
          <h2 id="footer-heading" className="sr-only">Footer</h2>
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <div className="grid grid-cols-1 md:grid-cols-4 lg:grid-cols-12 gap-12 lg:gap-8 mb-16">
              
              {/* Brand Column */}
              <div className="md:col-span-2 lg:col-span-5 pr-0 lg:pr-12">
                <Link href="/" className="flex items-center gap-2 mb-6 outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 rounded w-fit" aria-label="LocalSchema Homepage">
                  <div className="w-6 h-6 bg-gradient-to-tr from-indigo-500 to-violet-500 rounded flex items-center justify-center text-white font-bold text-xs shadow-sm">
                    L
                  </div>
                  <span className="text-lg font-bold text-white tracking-tight">LocalSchema</span>
                </Link>
                <p className="max-w-sm text-slate-400 mb-8 leading-relaxed font-medium">
                  The fastest way to generate Google-approved JSON-LD structured data for your local business. Boost your Map Pack rankings with zero coding.
                </p>
                <Link 
                  href="/schema-tool" 
                  className="text-white font-medium hover:text-indigo-400 transition-colors inline-flex items-center gap-1.5 group outline-none focus-visible:ring-2 focus-visible:ring-white rounded-md"
                >
                  Start Building Now 
                  <span className="group-hover:translate-x-1 transition-transform">&rarr;</span>
                </Link>
              </div>

              {/* Spacer */}
              <div className="hidden lg:block lg:col-span-1"></div>
              
              {/* Free Tools Column */}
              <nav aria-label="Free Tools" className="md:col-span-1 lg:col-span-3">
                <h3 className="text-white font-semibold mb-6 tracking-tight">Free Tools</h3>
                <ul className="space-y-4">
                  <li><Link href="/generator/plumber" className="text-slate-400 hover:text-white transition-colors duration-300 outline-none focus-visible:ring-2 focus-visible:ring-white rounded px-1 -ml-1 inline-block w-fit">Plumber Schema</Link></li>
                  <li><Link href="/generator/hvac" className="text-slate-400 hover:text-white transition-colors duration-300 outline-none focus-visible:ring-2 focus-visible:ring-white rounded px-1 -ml-1 inline-block w-fit">HVAC Schema</Link></li>
                  <li><Link href="/generator/lawyer" className="text-slate-400 hover:text-white transition-colors duration-300 outline-none focus-visible:ring-2 focus-visible:ring-white rounded px-1 -ml-1 inline-block w-fit">Law Firm Schema</Link></li>
                  <li><Link href="/niches" className="text-indigo-400 hover:text-indigo-300 transition-colors duration-300 font-medium outline-none focus-visible:ring-2 focus-visible:ring-indigo-400 rounded px-1 -ml-1 mt-2 inline-block w-fit">View All 50+ Niches &rarr;</Link></li>
                </ul>
              </nav>
              
              {/* SEO Guides Column */}
              <nav aria-label="SEO Guides" className="md:col-span-1 lg:col-span-3">
                <h3 className="text-white font-semibold mb-6 tracking-tight">SEO Guides</h3>
                <ul className="space-y-4">
                  <li><Link href="/guides/wordpress" className="text-slate-400 hover:text-white transition-colors duration-300 outline-none focus-visible:ring-2 focus-visible:ring-white rounded px-1 -ml-1 inline-block w-fit">Add Schema to WordPress</Link></li>
                  <li><Link href="/guides/service-area-business" className="text-slate-400 hover:text-white transition-colors duration-300 outline-none focus-visible:ring-2 focus-visible:ring-white rounded px-1 -ml-1 inline-block w-fit">Service Area Business SEO</Link></li>
                </ul>
              </nav>
            </div>
            
            {/* Copyright & Legal */}
            <div className="border-t border-white/10 pt-8 flex flex-col md:flex-row items-center justify-between text-xs text-slate-500 font-medium">
              <p>&copy; {new Date().getFullYear()} LocalSchema. All rights reserved.</p>
              <p className="mt-2 md:mt-0">Built for Local SEO Dominance.</p>
            </div>
          </div>
        </footer>

        {/* Vercel Analytics */}
        <Analytics />
      </body>
    </html>
  );
}