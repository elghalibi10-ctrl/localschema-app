import Link from "next/link";
import nichesData from "../niches.json";

interface Niche {
  id: string;
  name: string;
  schemaType: string;
  icon: string;
  placeholderName?: string;
  seoParagraph?: string;
  faqAnswer?: string;
}

interface RelatedNichesProps {
  currentNiche: string;
}

export default function RelatedNiches({ currentNiche }: RelatedNichesProps) {
  const niches = nichesData as Niche[];

  const availableNiches = niches.filter((niche) => niche.id !== currentNiche);
  
  const seed = currentNiche.length + currentNiche.charCodeAt(0);
  const startIndex = seed % Math.max(1, availableNiches.length - 6);
  const displayNiches = availableNiches.slice(startIndex, startIndex + 6);

  if (displayNiches.length === 0) return null;

  return (
    <nav aria-label="Related Schema Generators" className="mt-16 pt-16 border-t border-slate-200/60 relative z-10">
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-6">
        <div>
          <h2 className="text-2xl md:text-3xl font-extrabold tracking-tighter text-slate-950 mb-3">
            Related Schema Generators
          </h2>
          <p className="text-slate-500 font-medium text-lg max-w-xl">
            Explore other industry-specific structured data tools to boost local rankings.
          </p>
        </div>
        <Link 
          href="/niches" 
          className="inline-flex h-12 items-center justify-center rounded-full bg-white border border-slate-200/80 px-6 font-medium text-slate-700 shadow-sm transition-all duration-300 hover:scale-[1.02] hover:bg-slate-50 hover:shadow-md focus:outline-none focus:ring-2 focus:ring-slate-200 focus:ring-offset-2 group"
        >
          View all 50+ niches 
          <span className="ml-2 group-hover:translate-x-1 transition-transform">&rarr;</span>
        </Link>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-5">
        {displayNiches.map((niche) => (
          <Link 
            key={niche.id} 
            href={`/generator/${niche.id}`}
            className="group flex items-center p-5 bg-white rounded-2xl border border-slate-200/50 shadow-[0_2px_10px_-3px_rgba(0,0,0,0.05)] hover:-translate-y-1 hover:border-indigo-300 hover:shadow-lg transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:ring-offset-[#FAFAFA]"
          >
            <div className="w-14 h-14 bg-slate-50 text-slate-600 rounded-xl flex items-center justify-center text-2xl mr-4 group-hover:bg-indigo-50 group-hover:text-indigo-600 transition-colors duration-300 flex-shrink-0 shadow-sm border border-slate-100">
              {niche.icon}
            </div>
            <div className="text-left flex-grow overflow-hidden">
              <h3 className="font-bold tracking-tight text-slate-950 text-[15px] group-hover:text-indigo-600 transition-colors truncate">
                {niche.name} Schema
              </h3>
              <p className="text-[11px] text-slate-400 font-mono mt-1 truncate uppercase tracking-wide" title={niche.schemaType}>
                {niche.schemaType}
              </p>
            </div>
          </Link>
        ))}
      </div>
    </nav>
  );
}