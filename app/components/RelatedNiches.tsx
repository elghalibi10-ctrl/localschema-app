import Link from "next/link";
import nichesData from "../niches.json";

interface Niche {
  id: string;
  name: string;
  schemaType: string;
  icon: string;
}

interface RelatedNichesProps {
  currentNiche: string;
  relatedNiches?: Niche[];
}

export default function RelatedNiches({ currentNiche, relatedNiches }: RelatedNichesProps) {
  let displayNiches: Niche[];

  if (relatedNiches && relatedNiches.length > 0) {
    // Use the pre-resolved semantic list passed from the server
    displayNiches = relatedNiches;
  } else {
    // Fallback: seed-based slice of all niches excluding current
    const niches = nichesData as Niche[];
    const available = niches.filter((n) => n.id !== currentNiche);
    const seed = currentNiche.length + currentNiche.charCodeAt(0);
    const start = seed % Math.max(1, available.length - 6);
    displayNiches = available.slice(start, start + 6);
  }

  if (displayNiches.length === 0) return null;

  return (
    <nav aria-label="Related Schema Generators" className="relative z-10">
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-6">
        <div>
          <p className="font-mono text-[10px] font-semibold uppercase tracking-[0.16em] text-teal-400/60 mb-3">
            Related Tools
          </p>
          <h2 className="text-2xl md:text-3xl font-black tracking-tight text-white mb-2 leading-tight">
            Related Schema Generators
          </h2>
          <p className="text-white/35 font-light text-base max-w-xl">
            Explore other industry-specific structured data tools to boost local rankings.
          </p>
        </div>
        <Link
          href="/niches"
          className="inline-flex h-11 items-center justify-center rounded-xl
            bg-white/[0.05] border border-white/[0.10] px-5
            font-semibold text-sm text-white/65
            hover:text-white hover:bg-white/[0.09] hover:border-white/[0.18]
            transition-all duration-150 outline-none
            focus-visible:ring-2 focus-visible:ring-teal-500 group shrink-0"
        >
          View all 50+ niches
          <span className="ml-2 group-hover:translate-x-0.5 transition-transform">&rarr;</span>
        </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 md:gap-4">
        {displayNiches.map((niche) => (
          <Link
            key={niche.id}
            href={`/generator/${niche.id}`}
            className="group flex items-center p-4 rounded-xl
              bg-white/[0.04] border border-white/[0.07]
              hover:bg-white/[0.07] hover:border-teal-500/25
              hover:-translate-y-px
              transition-all duration-200 outline-none
              focus-visible:ring-2 focus-visible:ring-teal-500"
          >
            <div className="w-12 h-12 rounded-xl flex items-center justify-center text-2xl mr-4
              bg-white/[0.05] border border-white/[0.07]
              group-hover:bg-teal-500/[0.08] group-hover:border-teal-500/[0.20]
              transition-all duration-200 flex-shrink-0">
              {niche.icon}
            </div>
            <div className="text-left flex-grow overflow-hidden">
              <h3 className="font-bold tracking-tight text-white/80 text-[14px]
                group-hover:text-white transition-colors truncate">
                {niche.name} Schema
              </h3>
              <p className="text-[10px] text-white/25 font-mono mt-0.5 truncate uppercase tracking-wider"
                title={niche.schemaType}>
                {niche.schemaType}
              </p>
            </div>
          </Link>
        ))}
      </div>
    </nav>
  );
}
