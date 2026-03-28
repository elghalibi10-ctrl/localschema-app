import SchemaTool from "@/SchemaTool"; // Adjust this import path to wherever your SchemaTool.tsx file is saved
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Generate Local Schema | LocalSchema",
  description: "Generate your free JSON-LD structured data in seconds.",
};

export default function SchemaToolPage() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-20">
      <div className="text-center mb-12">
        <h1 className="text-3xl md:text-5xl font-extrabold tracking-tight text-slate-900 mb-4">
          Schema Generator
        </h1>
        <p className="text-lg text-slate-500 font-medium">
          Fill out your business details below to instantly generate your JSON-LD code.
        </p>
      </div>
      
      {/* Renders your tool here */}
      <SchemaTool /> 
    </div>
  );
}