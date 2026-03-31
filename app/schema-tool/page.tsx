import type { Metadata } from "next";
import SchemaTool from "../SchemaTool";

export const metadata: Metadata = {
  title: "Free Local Business Schema Generator",
  description:
    "Generate perfectly formatted, error-free JSON-LD structured data for your local business in seconds. Supports 52+ niche types including Plumber, HVAC, Electrician, and more.",
  alternates: {
    canonical: "https://www.getlocalschema.com/schema-tool",
  },
};

export default function SchemaToolPage() {
  return (
    <div className="w-full flex flex-col items-center bg-[#07090E] min-h-screen selection:bg-teal-500/25 selection:text-teal-100">
      {/* Page header */}
      <section className="relative w-full pt-20 pb-8 px-4 sm:px-6 md:px-8 text-center overflow-hidden">
        {/* Background radial glow */}
        <div className="absolute inset-0 z-0 pointer-events-none bg-[radial-gradient(ellipse_70%_50%_at_50%_0%,rgba(0,212,200,0.08),transparent)]" />

        <div className="relative z-10 max-w-3xl mx-auto">
          <p className="text-xs font-mono font-semibold uppercase tracking-[0.18em] text-teal-400/70 mb-4">
            Free Tool
          </p>
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-black tracking-[-0.04em] leading-[1.06] text-white mb-5">
            Local Business
            <br />
            Schema Generator
          </h1>
          <p className="text-base sm:text-lg text-white/40 max-w-xl mx-auto leading-relaxed font-light">
            Fill in your details and get a Google-approved JSON-LD snippet in seconds.
            No sign-up. No code. Free forever.
          </p>
        </div>
      </section>

      {/* Tool */}
      <section className="w-full max-w-7xl mx-auto px-4 sm:px-6 md:px-8 pb-24">
        <div className="relative rounded-2xl p-px bg-gradient-to-br from-teal-500/30 via-sky-500/10 to-purple-500/20 shadow-[0_0_100px_-25px_rgba(0,212,200,0.22)]">
          <div className="rounded-2xl overflow-hidden">
            <SchemaTool />
          </div>
        </div>
      </section>
    </div>
  );
}
