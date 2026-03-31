import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import Link from "next/link";
import "./globals.css";
import Navbar from "@/components/Navbar";
import { ThemeProvider } from "@/components/ThemeProvider";
import { Analytics } from "@vercel/analytics/react";

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
  // Dual themeColor: browser chrome matches the active mode
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#ffffff" },
    { media: "(prefers-color-scheme: dark)",  color: "#07090E" },
  ],
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
};

export const metadata: Metadata = {
  metadataBase: new URL("https://www.getlocalschema.com/"),
  title: {
    default: "LocalSchema | Free Local Business Schema Generator",
    template: "%s | LocalSchema",
  },
  description: "Rank higher in local Google searches. Generate perfectly formatted, error-free JSON-LD structured data for your local business in seconds. Built for plumbers, electricians, and HVAC.",
  keywords: ["local seo", "schema generator", "json-ld builder", "service business seo", "local business schema", "rich snippets"],
  authors: [{ name: "LocalSchema" }],
  creator: "LocalSchema",
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "/",
    title: "LocalSchema | Free Local Business Schema Generator",
    description: "Rank higher in local Google searches. Generate perfectly formatted, error-free JSON-LD structured data for your local business in seconds.",
    siteName: "LocalSchema",
    images: [{ url: "/og-image.png", width: 1200, height: 630, alt: "LocalSchema - Local Business Schema Generator" }],
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
    google: "YOUR_GOOGLE_VERIFICATION_CODE",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const structuredData = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebSite",
        "@id": "https://www.getlocalschema.com/#website",
        "url": "https://www.getlocalschema.com/",
        "name": "LocalSchema",
        "description": "Free Local Business Schema Generator",
        "potentialAction": [{
          "@type": "SearchAction",
          "target": { "@type": "EntryPoint", "urlTemplate": "https://www.getlocalschema.com/niches?q={search_term_string}" },
          "query-input": "required name=search_term_string",
        }],
        "inLanguage": "en-US",
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
          "caption": "LocalSchema",
        },
        "image": { "@id": "https://www.getlocalschema.com/#logo" },
      },
    ],
  };

  return (
    // suppressHydrationWarning is required — next-themes injects class="dark"
    // client-side which would otherwise cause a React hydration mismatch.
    <html
      lang="en"
      suppressHydrationWarning
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased scroll-smooth`}
    >
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
        />
      </head>
      <body className="min-h-full flex flex-col font-sans
        bg-white dark:bg-[#07090E]
        text-slate-900 dark:text-white
        selection:bg-teal-500/25 selection:text-teal-700 dark:selection:text-teal-100
        transition-colors duration-300">

        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <Navbar />

          <main className="flex-grow flex flex-col w-full relative z-10" id="main-content">
            {children}
          </main>

          {/* ── GLOBAL FOOTER ─────────────────────────────────────────────── */}
          <footer
            className="
              bg-slate-50 dark:bg-[#0A0A0A]
              pt-24 pb-12 text-sm
              text-slate-500 dark:text-slate-400
              border-t border-slate-200 dark:border-white/10
              mt-auto relative overflow-hidden
            "
            aria-labelledby="footer-heading"
          >
            {/* Subtle glow (dark only) */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[300px]
              bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))]
              from-indigo-900/20 via-transparent to-transparent
              pointer-events-none z-0 hidden dark:block" />

            <h2 id="footer-heading" className="sr-only">Footer</h2>
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
              <div className="grid grid-cols-1 md:grid-cols-4 lg:grid-cols-12 gap-12 lg:gap-8 mb-16">

                {/* Brand */}
                <div className="md:col-span-2 lg:col-span-5 pr-0 lg:pr-12">
                  <Link
                    href="/"
                    className="flex items-center gap-2 mb-6 outline-none
                      focus-visible:ring-2 focus-visible:ring-teal-500 rounded w-fit"
                    aria-label="LocalSchema Homepage"
                  >
                    <div className="w-6 h-6 bg-gradient-to-tr from-teal-500 to-cyan-400 rounded
                      flex items-center justify-center text-white font-bold text-xs
                      shadow-[0_0_10px_rgba(0,212,200,0.3)]">
                      L
                    </div>
                    <span className="text-lg font-bold tracking-tight
                      text-slate-900 dark:text-white">
                      LocalSchema
                    </span>
                  </Link>
                  <p className="max-w-sm mb-8 leading-relaxed
                    text-slate-500 dark:text-slate-400">
                    The fastest way to generate Google-approved JSON-LD structured data for your local business. Boost your Map Pack rankings with zero coding.
                  </p>
                  <Link
                    href="/schema-tool"
                    className="font-medium inline-flex items-center gap-1.5 group outline-none
                      focus-visible:ring-2 focus-visible:ring-teal-500 rounded-md
                      text-slate-700 dark:text-white
                      hover:text-teal-600 dark:hover:text-teal-400
                      transition-colors"
                  >
                    Start Building Now
                    <span className="group-hover:translate-x-1 transition-transform">&rarr;</span>
                  </Link>
                </div>

                {/* Spacer */}
                <div className="hidden lg:block lg:col-span-1" />

                {/* Free Tools */}
                <nav aria-label="Free Tools" className="md:col-span-1 lg:col-span-3">
                  <h3 className="font-semibold mb-6 tracking-tight
                    text-slate-900 dark:text-white">
                    Free Tools
                  </h3>
                  <ul className="space-y-4">
                    {[
                      { href: "/generator/plumber",  label: "Plumber Schema" },
                      { href: "/generator/hvac",     label: "HVAC Schema" },
                      { href: "/generator/lawyer",   label: "Law Firm Schema" },
                    ].map(({ href, label }) => (
                      <li key={href}>
                        <Link
                          href={href}
                          className="transition-colors duration-300 outline-none
                            focus-visible:ring-2 focus-visible:ring-teal-500 rounded
                            px-1 -ml-1 inline-block w-fit
                            text-slate-500 dark:text-slate-400
                            hover:text-slate-900 dark:hover:text-white"
                        >
                          {label}
                        </Link>
                      </li>
                    ))}
                    <li>
                      <Link
                        href="/niches"
                        className="font-medium mt-2 inline-block transition-colors duration-300
                          outline-none focus-visible:ring-2 focus-visible:ring-teal-500 rounded
                          px-1 -ml-1 w-fit
                          text-teal-600 dark:text-teal-400
                          hover:text-teal-700 dark:hover:text-teal-300"
                      >
                        View All 50+ Niches &rarr;
                      </Link>
                    </li>
                  </ul>
                </nav>

                {/* SEO Guides */}
                <nav aria-label="SEO Guides" className="md:col-span-1 lg:col-span-3">
                  <h3 className="font-semibold mb-6 tracking-tight
                    text-slate-900 dark:text-white">
                    SEO Guides
                  </h3>
                  <ul className="space-y-4">
                    {[
                      { href: "/guides/wordpress",             label: "Add Schema to WordPress" },
                      { href: "/guides/service-area-business", label: "Service Area Business SEO" },
                    ].map(({ href, label }) => (
                      <li key={href}>
                        <Link
                          href={href}
                          className="transition-colors duration-300 outline-none
                            focus-visible:ring-2 focus-visible:ring-teal-500 rounded
                            px-1 -ml-1 inline-block w-fit
                            text-slate-500 dark:text-slate-400
                            hover:text-slate-900 dark:hover:text-white"
                        >
                          {label}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </nav>
              </div>

              {/* Copyright */}
              <div className="border-t pt-8 flex flex-col md:flex-row items-center
                justify-between text-xs font-medium
                border-slate-200 dark:border-white/10
                text-slate-400 dark:text-slate-500">
                <p>&copy; {new Date().getFullYear()} LocalSchema. All rights reserved.</p>
                <p className="mt-2 md:mt-0">Built for Local SEO Dominance.</p>
              </div>
            </div>
          </footer>
        </ThemeProvider>

        <Analytics />
      </body>
    </html>
  );
}
