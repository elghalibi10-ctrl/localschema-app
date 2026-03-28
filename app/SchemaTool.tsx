"use client";

import React, { useState, useEffect } from "react";

interface SchemaToolProps {
  initialNiche?: string;
  placeholderName?: string;
}

export default function SchemaTool({ 
  initialNiche = "LocalBusiness", 
  placeholderName = "e.g. Apex Plumbing" 
}: SchemaToolProps) {
  // Underlying React State
  const [formData, setFormData] = useState({
    type: initialNiche,
    name: "",
    url: "",
    logo: "",
    description: "",
    phone: "",
    email: "",
    street: "",
    city: "",
    state: "",
    zip: "",
    country: "US",
    priceRange: "",
    socialLinks: "",
    serviceAreas: "",
  });

  const [isSAB, setIsSAB] = useState(false);
  const [showAdvanced, setShowAdvanced] = useState(false);
  const [copied, setCopied] = useState(false);
  const [jsonString, setJsonString] = useState("");

  // Validation Flags
  const isNameValid = formData.name.trim() !== "";
  const isUrlValid = formData.url.trim() !== "";
  const canCopy = isNameValid && isUrlValid;

  // Handle Input Changes
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // Generate JSON-LD Logic
  useEffect(() => {
    const schema: any = {
      "@context": "https://schema.org",
      "@type": formData.type,
      name: formData.name || "Your Business Name",
      image: formData.logo || undefined,
      "@id": formData.url || "https://yourwebsite.com",
      url: formData.url || "https://yourwebsite.com",
      telephone: formData.phone || undefined,
      priceRange: formData.priceRange || undefined,
      address: {
        "@type": "PostalAddress",
        streetAddress: formData.street || undefined,
        addressLocality: formData.city || undefined,
        addressRegion: formData.state || undefined,
        postalCode: formData.zip || undefined,
        addressCountry: formData.country || undefined,
      },
    };

    if (formData.description) {
      schema.description = formData.description;
    }

    if (formData.socialLinks) {
      const links = formData.socialLinks.split(",").map((link) => link.trim()).filter((l) => l);
      if (links.length > 0) schema.sameAs = links;
    }

    if (isSAB && formData.serviceAreas) {
      const areas = formData.serviceAreas.split(",").map((area) => area.trim()).filter((a) => a);
      if (areas.length > 0) {
        schema.areaServed = areas.map((area) => ({
          "@type": "City",
          name: area,
        }));
      }
    }

    // Clean up undefined properties for a clean output
    const cleanSchema = JSON.parse(JSON.stringify(schema));
    setJsonString(JSON.stringify(cleanSchema, null, 2));
  }, [formData, isSAB]);

  // Handle Copy to Clipboard
  const handleCopy = () => {
    if (!canCopy) return;
    const scriptTag = `<script type="application/ld+json">\n${jsonString}\n</script>`;
    navigator.clipboard.writeText(scriptTag);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  // Handle Example Data Loading
  const handleLoadExample = () => {
    setFormData({
      type: "Plumber",
      name: "Apex Elite Plumbing",
      url: "https://www.apexeliteplumbing.com",
      logo: "https://www.apexeliteplumbing.com/logo.png",
      description: "Award-winning 24/7 emergency plumbing and HVAC services for residential and commercial properties.",
      phone: "+1-555-123-4567",
      email: "service@apexeliteplumbing.com",
      street: "456 Industrial Way, Suite 200",
      city: "Austin",
      state: "TX",
      zip: "78701",
      country: "US",
      priceRange: "$$",
      socialLinks: "https://facebook.com/apexplumbing, https://twitter.com/apexplumbing",
      serviceAreas: "Austin, Round Rock, Cedar Park",
    });
    setIsSAB(true);
    setShowAdvanced(true);
  };

  // Handle Form Clear
  const handleClear = () => {
    setFormData({
      type: initialNiche,
      name: "",
      url: "",
      logo: "",
      description: "",
      phone: "",
      email: "",
      street: "",
      city: "",
      state: "",
      zip: "",
      country: "US",
      priceRange: "",
      socialLinks: "",
      serviceAreas: "",
    });
    setIsSAB(false);
    setShowAdvanced(false);
  };

  // Syntax Highlighting for the macOS Terminal
  const highlightJSON = (json: string) => {
    if (!json) return "";
    return json
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/("(\\u[a-zA-Z0-9]{4}|\\[^u]|[^\\"])*"(\s*:)?|\b(true|false|null)\b|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?)/g, (match) => {
        let cls = "text-indigo-300"; // Default (keys)
        if (/^"/.test(match)) {
          if (/:$/.test(match)) {
            cls = "text-blue-300 font-medium"; // Keys
          } else {
            cls = "text-emerald-400"; // Strings
          }
        } else if (/true|false/.test(match)) {
          cls = "text-amber-400"; // Booleans
        } else if (/null/.test(match)) {
          cls = "text-slate-500"; // Null
        } else {
          cls = "text-amber-400"; // Numbers
        }
        return `<span class="${cls}">${match}</span>`;
      });
  };

  return (
    <div className="w-full max-w-7xl mx-auto py-8 relative">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-start">
        
        {/* LEFT COLUMN: FORM */}
        <div className="col-span-1 lg:col-span-7 space-y-10">
          
          {/* Quick Actions */}
          <div className="flex items-center justify-end gap-3 -mb-4">
            <button 
              onClick={handleClear}
              className="text-sm font-medium text-slate-400 hover:text-slate-600 transition-colors px-2 py-1"
            >
              Clear
            </button>
            <button 
              onClick={handleLoadExample}
              className="text-sm font-bold text-indigo-600 bg-indigo-50 hover:bg-indigo-100 rounded-lg px-3 py-1.5 transition-colors border border-indigo-100"
            >
              ⚡ Load Example Data
            </button>
          </div>

          {/* Section 1: Business Details */}
          <div className="space-y-6">
            <div className="border-b border-slate-200 pb-4">
              <h2 className="text-xl font-bold text-slate-900 tracking-tight">Business Details</h2>
              <p className="text-sm text-slate-500 mt-1">The core information about your local business.</p>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              <div className="space-y-2">
                <label className="text-sm font-semibold text-slate-700 block">Business Name <span className="text-red-500">*</span></label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder={placeholderName}
                  className={`w-full bg-slate-50 border rounded-xl px-4 py-3 text-sm text-slate-900 focus:bg-white focus:outline-none focus:ring-2 transition-all duration-300 placeholder:text-slate-400 shadow-sm ${
                    !isNameValid 
                      ? "border-red-300 focus:ring-red-400 focus:border-transparent" 
                      : "border-slate-200/60 focus:ring-indigo-500 focus:border-transparent"
                  }`}
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-semibold text-slate-700 block">Business Type</label>
                <select
                  name="type"
                  value={formData.type}
                  onChange={handleChange}
                  className="w-full bg-slate-50 border border-slate-200/60 rounded-xl px-4 py-3 text-sm text-slate-900 focus:bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all duration-300 shadow-sm appearance-none"
                >
                  <option value="LocalBusiness">Local Business (Generic)</option>
                  <option value="Plumber">Plumber</option>
                  <option value="HVACBusiness">HVAC Business</option>
                  <option value="Electrician">Electrician</option>
                  <option value="LegalService">Law Firm / Legal Service</option>
                  <option value="Dentist">Dentist</option>
                  <option value="RoofingContractor">Roofing Contractor</option>
                </select>
              </div>
              <div className="space-y-2 sm:col-span-2">
                <label className="text-sm font-semibold text-slate-700 block">Website URL <span className="text-red-500">*</span></label>
                <input
                  type="url"
                  name="url"
                  value={formData.url}
                  onChange={handleChange}
                  placeholder="https://www.yourwebsite.com"
                  className={`w-full bg-slate-50 border rounded-xl px-4 py-3 text-sm text-slate-900 focus:bg-white focus:outline-none focus:ring-2 transition-all duration-300 placeholder:text-slate-400 shadow-sm ${
                    !isUrlValid 
                      ? "border-red-300 focus:ring-red-400 focus:border-transparent" 
                      : "border-slate-200/60 focus:ring-indigo-500 focus:border-transparent"
                  }`}
                />
              </div>
              <div className="space-y-2 sm:col-span-2">
                <label className="text-sm font-semibold text-slate-700 block">Logo URL</label>
                <input
                  type="url"
                  name="logo"
                  value={formData.logo}
                  onChange={handleChange}
                  placeholder="https://www.yourwebsite.com/logo.png"
                  className="w-full bg-slate-50 border border-slate-200/60 rounded-xl px-4 py-3 text-sm text-slate-900 focus:bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all duration-300 placeholder:text-slate-400 shadow-sm"
                />
              </div>
              <div className="space-y-2 sm:col-span-2">
                <label className="text-sm font-semibold text-slate-700 block">Brief Description</label>
                <textarea
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  rows={2}
                  placeholder="Top-rated services in the metro area..."
                  className="w-full bg-slate-50 border border-slate-200/60 rounded-xl px-4 py-3 text-sm text-slate-900 focus:bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all duration-300 placeholder:text-slate-400 shadow-sm resize-none"
                />
              </div>
            </div>
          </div>

          {/* Section 2: Contact & Location */}
          <div className="space-y-6">
            <div className="border-b border-slate-200 pb-4">
              <h2 className="text-xl font-bold text-slate-900 tracking-tight">Location & Contact</h2>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              <div className="space-y-2">
                <label className="text-sm font-semibold text-slate-700 block">Phone Number</label>
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  placeholder="+1-555-555-5555"
                  className="w-full bg-slate-50 border border-slate-200/60 rounded-xl px-4 py-3 text-sm text-slate-900 focus:bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all duration-300 placeholder:text-slate-400 shadow-sm"
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-semibold text-slate-700 block">Email Address</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="hello@yourbusiness.com"
                  className="w-full bg-slate-50 border border-slate-200/60 rounded-xl px-4 py-3 text-sm text-slate-900 focus:bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all duration-300 placeholder:text-slate-400 shadow-sm"
                />
              </div>
              <div className="space-y-2 sm:col-span-2">
                <label className="text-sm font-semibold text-slate-700 block">Street Address</label>
                <input
                  type="text"
                  name="street"
                  value={formData.street}
                  onChange={handleChange}
                  placeholder="123 Main St, Suite 100"
                  className="w-full bg-slate-50 border border-slate-200/60 rounded-xl px-4 py-3 text-sm text-slate-900 focus:bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all duration-300 placeholder:text-slate-400 shadow-sm"
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-semibold text-slate-700 block">City</label>
                <input
                  type="text"
                  name="city"
                  value={formData.city}
                  onChange={handleChange}
                  placeholder="New York"
                  className="w-full bg-slate-50 border border-slate-200/60 rounded-xl px-4 py-3 text-sm text-slate-900 focus:bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all duration-300 placeholder:text-slate-400 shadow-sm"
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-semibold text-slate-700 block">State / Province</label>
                <input
                  type="text"
                  name="state"
                  value={formData.state}
                  onChange={handleChange}
                  placeholder="NY"
                  className="w-full bg-slate-50 border border-slate-200/60 rounded-xl px-4 py-3 text-sm text-slate-900 focus:bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all duration-300 placeholder:text-slate-400 shadow-sm"
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-semibold text-slate-700 block">Zip / Postal Code</label>
                <input
                  type="text"
                  name="zip"
                  value={formData.zip}
                  onChange={handleChange}
                  placeholder="10001"
                  className="w-full bg-slate-50 border border-slate-200/60 rounded-xl px-4 py-3 text-sm text-slate-900 focus:bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all duration-300 placeholder:text-slate-400 shadow-sm"
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-semibold text-slate-700 block">Country Code</label>
                <input
                  type="text"
                  name="country"
                  value={formData.country}
                  onChange={handleChange}
                  placeholder="US"
                  className="w-full bg-slate-50 border border-slate-200/60 rounded-xl px-4 py-3 text-sm text-slate-900 focus:bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all duration-300 placeholder:text-slate-400 shadow-sm"
                />
              </div>
            </div>
          </div>

          {/* Section 3: Interactive SAB Toggle */}
          <div 
            onClick={() => setIsSAB(!isSAB)}
            className={`cursor-pointer rounded-2xl border p-5 transition-all duration-300 relative overflow-hidden group ${
              isSAB 
                ? 'bg-indigo-50/50 border-indigo-300 shadow-[0_4px_20px_-4px_rgba(99,102,241,0.15)]' 
                : 'bg-white border-slate-200/80 hover:border-indigo-200 hover:bg-slate-50/50 shadow-sm'
            }`}
          >
            <div className="flex items-center justify-between">
              <div>
                <h3 className={`font-bold text-base transition-colors ${isSAB ? 'text-indigo-900' : 'text-slate-900'}`}>
                  Service Area Business (SAB)
                </h3>
                <p className="text-sm text-slate-500 mt-1 max-w-sm">
                  Enable this if you travel to customers (e.g., plumbers, roofers). Hides your physical street address from public view.
                </p>
              </div>
              {/* Custom Toggle Switch */}
              <div className={`w-12 h-6 rounded-full flex items-center p-1 transition-colors duration-300 shrink-0 ${isSAB ? 'bg-indigo-600' : 'bg-slate-300'}`}>
                <div className={`w-4 h-4 rounded-full bg-white shadow-sm transition-transform duration-300 ${isSAB ? 'translate-x-6' : 'translate-x-0'}`} />
              </div>
            </div>
            
            {/* SAB Input Area (Expands) */}
            <div className={`transition-all duration-500 ease-in-out ${isSAB ? 'max-h-40 opacity-100 mt-5' : 'max-h-0 opacity-0 overflow-hidden'}`}>
              <div className="space-y-2" onClick={(e) => e.stopPropagation()}>
                <label className="text-sm font-semibold text-indigo-900 block">Service Areas (Comma Separated)</label>
                <input
                  type="text"
                  name="serviceAreas"
                  value={formData.serviceAreas}
                  onChange={handleChange}
                  placeholder="e.g. Brooklyn, Queens, Manhattan"
                  className="w-full bg-white border border-indigo-200/80 rounded-xl px-4 py-3 text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all shadow-sm placeholder:text-slate-400"
                />
              </div>
            </div>
          </div>

          {/* Section 4: Advanced Schema Accordion */}
          <div className="rounded-2xl border border-slate-200/80 bg-white shadow-sm overflow-hidden transition-all duration-300 hover:border-slate-300">
            <button 
              onClick={() => setShowAdvanced(!showAdvanced)}
              className="w-full px-5 py-4 flex items-center justify-between bg-white focus:outline-none group"
            >
              <div className="flex items-center gap-3">
                <div className={`w-8 h-8 rounded-lg flex items-center justify-center transition-colors ${showAdvanced ? 'bg-indigo-100 text-indigo-600' : 'bg-slate-100 text-slate-500 group-hover:bg-slate-200'}`}>
                  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 20h9"/><path d="M16.5 3.5a2.12 2.12 0 0 1 3 3L7 19l-4 1 1-4Z"/></svg>
                </div>
                <div className="text-left">
                  <h3 className="font-bold text-slate-900 text-base">Advanced Schema Settings</h3>
                  <p className="text-xs text-slate-500 mt-0.5">Price range, social profiles, etc.</p>
                </div>
              </div>
              <svg 
                className={`w-5 h-5 text-slate-400 transition-transform duration-300 ${showAdvanced ? 'rotate-180 text-indigo-500' : ''}`} 
                fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
              </svg>
            </button>
            
            <div className={`transition-all duration-500 ease-in-out border-t border-slate-100 ${showAdvanced ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0 overflow-hidden border-t-0'}`}>
              <div className="p-5 grid grid-cols-1 sm:grid-cols-2 gap-5 bg-slate-50/50">
                <div className="space-y-2">
                  <label className="text-sm font-semibold text-slate-700 block">Price Range</label>
                  <input
                    type="text"
                    name="priceRange"
                    value={formData.priceRange}
                    onChange={handleChange}
                    placeholder="e.g. $$, $$$, or $100-$500"
                    className="w-full bg-white border border-slate-200/60 rounded-xl px-4 py-3 text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all duration-300 placeholder:text-slate-400 shadow-sm"
                  />
                </div>
                <div className="space-y-2 sm:col-span-2">
                  <label className="text-sm font-semibold text-slate-700 block">Social Profiles (Comma Separated)</label>
                  <textarea
                    name="socialLinks"
                    value={formData.socialLinks}
                    onChange={handleChange}
                    rows={2}
                    placeholder="https://facebook.com/yourbiz, https://twitter.com/yourbiz"
                    className="w-full bg-white border border-slate-200/60 rounded-xl px-4 py-3 text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all duration-300 placeholder:text-slate-400 shadow-sm resize-none"
                  />
                </div>
              </div>
            </div>
          </div>

        </div>

        {/* RIGHT COLUMN: CODE OUTPUT (STICKY) */}
        <div className="col-span-1 lg:col-span-5 relative">
          <div className="sticky top-24">
            
            {/* The macOS Terminal Window */}
            <div className="bg-[#0A0A0A] rounded-2xl border border-white/10 shadow-[0_0_50px_-12px_rgba(99,102,241,0.25)] overflow-hidden flex flex-col w-full group transition-all duration-500 hover:shadow-[0_0_60px_-10px_rgba(99,102,241,0.35)]">
              
              {/* Terminal Header */}
              <div className="h-14 bg-white/5 border-b border-white/10 flex items-center justify-between px-4 backdrop-blur-md">
                <div className="flex items-center gap-2.5">
                  <div className="w-3.5 h-3.5 rounded-full bg-[#FF5F56] border border-[#E0443E]"></div>
                  <div className="w-3.5 h-3.5 rounded-full bg-[#FFBD2E] border border-[#DEA123]"></div>
                  <div className="w-3.5 h-3.5 rounded-full bg-[#27C93F] border border-[#1AAB29]"></div>
                  <span className="ml-2 text-xs font-medium text-slate-400 font-mono tracking-wide hidden sm:inline-block">schema.jsonld</span>
                </div>
                
                {/* Actions Group */}
                <div className="flex items-center gap-2">
                  <a 
                    href="https://search.google.com/test/rich-results" 
                    target="_blank" 
                    rel="noreferrer"
                    className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold text-slate-300 hover:bg-white/10 hover:text-white transition-colors border border-transparent hover:border-white/10"
                    title="Test Rich Results in Google"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h6"></path><polyline points="21 3 14 3 14 10"></polyline><line x1="21" y1="3" x2="14" y2="10"></line></svg>
                    Test
                  </a>

                  {/* SaaS CTA Copy Button */}
                  <button
                    onClick={handleCopy}
                    disabled={!canCopy}
                    className={`flex items-center gap-2 px-3 sm:px-4 py-2 rounded-xl font-bold text-sm transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-[#0A0A0A] ${
                      !canCopy 
                        ? 'bg-slate-800 text-slate-400 cursor-not-allowed opacity-50' 
                        : copied 
                          ? 'bg-emerald-500 text-white shadow-[0_0_20px_rgba(16,185,129,0.4)] focus:ring-emerald-500 hover:-translate-y-0.5' 
                          : 'bg-indigo-600 text-white hover:bg-indigo-500 shadow-[0_4px_14px_0_rgba(99,102,241,0.39)] hover:shadow-[0_6px_20px_rgba(99,102,241,0.23)] focus:ring-indigo-500 hover:-translate-y-0.5'
                    }`}
                  >
                    {copied ? (
                      <>
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>
                        Copied!
                      </>
                    ) : (
                      <>
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path></svg>
                        Copy Code
                      </>
                    )}
                  </button>
                </div>
              </div>

              {/* Terminal Body (Code Output) */}
              <div className="relative p-6 overflow-x-auto h-[600px] overflow-y-auto custom-scrollbar bg-[#050505]">
                <pre className="text-[13px] leading-relaxed font-mono">
                  <span className="text-slate-400">{"<"}</span><span className="text-pink-400">script</span> <span className="text-emerald-300">type</span><span className="text-slate-400">=</span><span className="text-amber-300">"application/ld+json"</span><span className="text-slate-400">{">"}</span>
                  <br />
                  <code 
                    dangerouslySetInnerHTML={{ __html: highlightJSON(jsonString) }}
                    className="block mt-2 mb-2"
                  />
                  <span className="text-slate-400">{"</"}</span><span className="text-pink-400">script</span><span className="text-slate-400">{">"}</span>
                </pre>
              </div>

            </div>
            
            {/* Validation Hint or Subtle floating hint */}
            {!canCopy ? (
              <p className="text-center text-sm text-red-400 font-medium mt-6 flex items-center justify-center gap-2">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"></circle><line x1="12" y1="8" x2="12" y2="12"></line><line x1="12" y1="16" x2="12.01" y2="16"></line></svg>
                Please fill in the required fields (*) to copy code
              </p>
            ) : (
              <p className="text-center text-sm text-slate-400 font-medium mt-6 flex items-center justify-center gap-2">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-amber-500"><circle cx="12" cy="12" r="10"></circle><line x1="12" y1="16" x2="12" y2="12"></line><line x1="12" y1="8" x2="12.01" y2="8"></line></svg>
                Updates automatically as you type
              </p>
            )}

          </div>
        </div>
      </div>

      {/* Global styles for the custom scrollbar in the terminal */}
      <style dangerouslySetInnerHTML={{__html: `
        .custom-scrollbar::-webkit-scrollbar {
          width: 8px;
          height: 8px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: transparent;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: #333;
          border-radius: 4px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: #444;
        }
      `}} />
    </div>
  );
}