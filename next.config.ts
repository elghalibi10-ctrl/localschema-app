import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // ---------------------------------------------------------------------------
  // 301 REDIRECTS — Underscore → Hyphen URL Migration
  //
  // WHY: Google treats underscores as word-joiners, so "roofing_contractor" is
  // indexed as a single token "roofingcontractor". Hyphens create two separate
  // indexable terms ("roofing" + "contractor"), which is the correct behaviour
  // for SEO. These 301 redirects permanently transfer all ranking signals
  // (PageRank, backlinks, index status) from the old underscore URLs to the
  // new canonical hyphenated URLs.
  //
  // IMPLEMENTATION NOTES:
  //  - `permanent: true` emits a 301 (Moved Permanently). This is correct for
  //    a URL structure change — never use 302 for a permanent SEO migration.
  //  - Next.js evaluates redirects BEFORE the filesystem and rendering pipeline,
  //    so there is zero performance cost: the old URLs never reach page.tsx.
  //  - After deploying, verify each redirect in Google Search Console under
  //    Coverage → Excluded → "Redirect error" to confirm clean signal transfer.
  //  - Once Google has re-crawled all 21 old URLs (typically 2–8 weeks), you
  //    can optionally remove these entries — but keeping them is harmless and
  //    protects against any existing backlinks or bookmarks using underscores.
  //
  // WHAT TO DO IN YOUR CODEBASE ALONGSIDE THIS FILE:
  //  1. Rename every `id` field in niches.json from underscore to hyphen.
  //     e.g. "roofing_contractor" → "roofing-contractor"
  //  2. Update semanticRelatedIds arrays in the enriched niches to use the
  //     new hyphenated IDs (e.g. "cleaning_service" → "cleaning-service").
  //  3. Update any hardcoded `/generator/[underscore_id]` strings in your
  //     codebase (footer links, sitemap.ts, etc.).
  //  4. generateStaticParams() in /app/generator/[niche]/page.tsx will
  //     automatically pick up the new IDs from the updated niches.json —
  //     no changes needed there.
  // ---------------------------------------------------------------------------
  async redirects() {
    return [
      // -----------------------------------------------------------------------
      // HOME SERVICES CLUSTER
      // -----------------------------------------------------------------------
      {
        source: "/generator/roofing_contractor",
        destination: "/generator/roofing-contractor",
        permanent: true,
      },
      {
        source: "/generator/cleaning_service",
        destination: "/generator/cleaning-service",
        permanent: true,
      },
      {
        source: "/generator/pest_control",
        destination: "/generator/pest-control",
        permanent: true,
      },
      {
        source: "/generator/moving_company",
        destination: "/generator/moving-company",
        permanent: true,
      },
      {
        source: "/generator/waste_management",
        destination: "/generator/waste-management",
        permanent: true,
      },

      // -----------------------------------------------------------------------
      // LEGAL / FINANCE CLUSTER
      // -----------------------------------------------------------------------
      {
        source: "/generator/real_estate_agent",
        destination: "/generator/real-estate-agent",
        permanent: true,
      },

      // -----------------------------------------------------------------------
      // AUTOMOTIVE CLUSTER
      // -----------------------------------------------------------------------
      {
        source: "/generator/auto_repair",
        destination: "/generator/auto-repair",
        permanent: true,
      },
      {
        source: "/generator/car_wash",
        destination: "/generator/car-wash",
        permanent: true,
      },

      // -----------------------------------------------------------------------
      // BEAUTY & WELLNESS CLUSTER
      // -----------------------------------------------------------------------
      {
        source: "/generator/hair_salon",
        destination: "/generator/hair-salon",
        permanent: true,
      },
      {
        source: "/generator/nail_salon",
        destination: "/generator/nail-salon",
        permanent: true,
      },
      {
        source: "/generator/yoga_studio",
        destination: "/generator/yoga-studio",
        permanent: true,
      },
      {
        source: "/generator/martial_arts",
        destination: "/generator/martial-arts",
        permanent: true,
      },
      {
        source: "/generator/shoe_repair",
        destination: "/generator/shoe-repair",
        permanent: true,
      },
      {
        source: "/generator/dry_cleaner",
        destination: "/generator/dry-cleaner",
        permanent: true,
      },

      // -----------------------------------------------------------------------
      // FOOD & HOSPITALITY CLUSTER
      // -----------------------------------------------------------------------
      {
        source: "/generator/ice_cream",
        destination: "/generator/ice-cream",
        permanent: true,
      },

      // -----------------------------------------------------------------------
      // EVENTS & CREATIVE CLUSTER
      // -----------------------------------------------------------------------
      {
        source: "/generator/event_planner",
        destination: "/generator/event-planner",
        permanent: true,
      },

      // -----------------------------------------------------------------------
      // PETS CLUSTER
      // -----------------------------------------------------------------------
      {
        source: "/generator/pet_grooming",
        destination: "/generator/pet-grooming",
        permanent: true,
      },
      {
        source: "/generator/dog_walker",
        destination: "/generator/dog-walker",
        permanent: true,
      },

      // -----------------------------------------------------------------------
      // EDUCATION CLUSTER
      // -----------------------------------------------------------------------
      {
        source: "/generator/driving_school",
        destination: "/generator/driving-school",
        permanent: true,
      },

      // -----------------------------------------------------------------------
      // TECHNOLOGY CLUSTER
      // -----------------------------------------------------------------------
      {
        source: "/generator/web_design",
        destination: "/generator/web-design",
        permanent: true,
      },
      {
        source: "/generator/it_support",
        destination: "/generator/it-support",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;