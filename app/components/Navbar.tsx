"use client";

import { useState } from "react";
import Link from "next/link";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className="bg-white/80 backdrop-blur-md border-b border-slate-200 sticky top-0 z-50 transition-all duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        
        {/* Logo area */}
        <Link href="/" className="flex items-center gap-2 group outline-none focus-visible:ring-2 focus-visible:ring-indigo-600 rounded-lg" aria-label="LocalSchema Homepage">
          <div className="w-8 h-8 bg-indigo-600 rounded-lg flex items-center justify-center text-white font-bold text-xl shadow-md group-hover:bg-indigo-700 group-hover:shadow-lg transition-all duration-300">
            L
          </div>
          <span className="text-xl font-bold tracking-tight text-slate-900 group-hover:text-indigo-900 transition-colors">LocalSchema</span>
        </Link>
        
        {/* Desktop Navigation (Hidden on Mobile) */}
        <nav className="hidden md:flex items-center gap-8 text-sm font-semibold text-slate-600" aria-label="Main Navigation">
          <Link href="/niches" className="hover:text-indigo-600 transition-colors">Generators</Link>
          <Link href="/guides/wordpress" className="hover:text-indigo-600 transition-colors">WordPress Guide</Link>
          <Link href="/guides/service-area-business" className="hover:text-indigo-600 transition-colors">SAB Guide</Link>
          
          <Link 
            href="/schema-tool" 
            className="group flex items-center gap-2 bg-slate-950 text-white px-5 py-2.5 rounded-full text-sm font-bold hover:bg-slate-800 hover:shadow-lg transition-all duration-300"
          >
            Generate Free Schema
            <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4 group-hover:translate-x-1 transition-transform" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M5 12h14"></path>
              <path d="m12 5 7 7-7 7"></path>
            </svg>
          </Link>
        </nav>

        {/* Mobile Hamburger Toggle */}
        <button 
          className="md:hidden p-2 text-slate-600 focus:outline-none focus:ring-2 focus:ring-indigo-500 rounded-lg"
          onClick={() => setIsOpen(!isOpen)}
          aria-label="Toggle mobile menu"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            {isOpen ? (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            ) : (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            )}
          </svg>
        </button>
      </div>

      {/* Mobile Menu Dropdown */}
      {isOpen && (
        <div className="md:hidden absolute top-16 left-0 w-full bg-white border-b border-slate-200 shadow-xl py-4 px-4 flex flex-col gap-2 z-50">
          <Link href="/niches" onClick={() => setIsOpen(false)} className="block px-4 py-3 text-base font-semibold text-slate-700 hover:bg-slate-50 hover:text-indigo-600 rounded-xl transition-colors">
            Generators
          </Link>
          <Link href="/guides/wordpress" onClick={() => setIsOpen(false)} className="block px-4 py-3 text-base font-semibold text-slate-700 hover:bg-slate-50 hover:text-indigo-600 rounded-xl transition-colors">
            WordPress Guide
          </Link>
          <Link href="/guides/service-area-business" onClick={() => setIsOpen(false)} className="block px-4 py-3 text-base font-semibold text-slate-700 hover:bg-slate-50 hover:text-indigo-600 rounded-xl transition-colors">
            SAB Guide
          </Link>
          <div className="pt-2 mt-2 border-t border-slate-100">
            <Link 
              href="/schema-tool" 
              onClick={() => setIsOpen(false)}
              className="flex justify-center items-center w-full bg-slate-950 text-white px-5 py-3.5 rounded-xl text-base font-bold hover:bg-slate-800 transition-colors"
            >
              Generate Free Schema
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}