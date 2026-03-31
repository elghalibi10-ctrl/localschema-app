"use client";

import React, { useState, useEffect, useRef, useCallback } from "react";
import { useTheme } from "next-themes";
import nichesData from "@/niches.json";
import { Input }  from "@/components/ui/input";
import { Label }  from "@/components/ui/label";

// ─────────────────────────────────────────────────────────────────────────────
// DYNAMIC SCHEMA OPTIONS — derived from niches.json so all types are supported
// ─────────────────────────────────────────────────────────────────────────────
const NICHE_ID_TO_SCHEMA_TYPE: Record<string, string> = {};
for (const n of nichesData) {
  NICHE_ID_TO_SCHEMA_TYPE[n.id] = n.schemaType;
}

const seen = new Set<string>(["LocalBusiness"]);
const SCHEMA_OPTIONS: { value: string; label: string }[] = [
  { value: "LocalBusiness", label: "Local Business (Generic)" },
];
for (const n of nichesData) {
  if (!seen.has(n.schemaType)) {
    seen.add(n.schemaType);
    SCHEMA_OPTIONS.push({ value: n.schemaType, label: n.name });
  }
}

// ─────────────────────────────────────────────────────────────────────────────
// COUNTRY OPTIONS
// ─────────────────────────────────────────────────────────────────────────────
const COUNTRY_OPTIONS: { value: string; label: string }[] = [
  { value: "US", label: "US — United States" },
  { value: "CA", label: "CA — Canada" },
  { value: "GB", label: "GB — United Kingdom" },
  { value: "AU", label: "AU — Australia" },
  { value: "NZ", label: "NZ — New Zealand" },
  { value: "IE", label: "IE — Ireland" },
  { value: "ZA", label: "ZA — South Africa" },
  { value: "DE", label: "DE — Germany" },
  { value: "FR", label: "FR — France" },
  { value: "IT", label: "IT — Italy" },
  { value: "ES", label: "ES — Spain" },
  { value: "PT", label: "PT — Portugal" },
  { value: "NL", label: "NL — Netherlands" },
  { value: "BE", label: "BE — Belgium" },
  { value: "CH", label: "CH — Switzerland" },
  { value: "AT", label: "AT — Austria" },
  { value: "SE", label: "SE — Sweden" },
  { value: "NO", label: "NO — Norway" },
  { value: "DK", label: "DK — Denmark" },
  { value: "FI", label: "FI — Finland" },
  { value: "PL", label: "PL — Poland" },
  { value: "CZ", label: "CZ — Czech Republic" },
  { value: "MX", label: "MX — Mexico" },
  { value: "BR", label: "BR — Brazil" },
  { value: "AR", label: "AR — Argentina" },
  { value: "CL", label: "CL — Chile" },
  { value: "CO", label: "CO — Colombia" },
  { value: "IN", label: "IN — India" },
  { value: "JP", label: "JP — Japan" },
  { value: "CN", label: "CN — China" },
  { value: "KR", label: "KR — South Korea" },
  { value: "SG", label: "SG — Singapore" },
  { value: "HK", label: "HK — Hong Kong" },
  { value: "AE", label: "AE — United Arab Emirates" },
  { value: "SA", label: "SA — Saudi Arabia" },
  { value: "IL", label: "IL — Israel" },
  { value: "PH", label: "PH — Philippines" },
  { value: "MY", label: "MY — Malaysia" },
  { value: "TH", label: "TH — Thailand" },
  { value: "NG", label: "NG — Nigeria" },
  { value: "KE", label: "KE — Kenya" },
];

function resolveSchemaType(initialNiche: string): string {
  const knownTypes = new Set(SCHEMA_OPTIONS.map((o) => o.value));
  if (knownTypes.has(initialNiche)) return initialNiche;
  const byId = NICHE_ID_TO_SCHEMA_TYPE[initialNiche.toLowerCase().trim()];
  if (byId) return byId;
  return "LocalBusiness";
}

// ─────────────────────────────────────────────────────────────────────────────
// CUSTOM SELECT COMPONENT
// Fully self-contained dropdown: trigger + floating menu, click-outside close,
// keyboard-accessible, premium hover states in both light and dark modes.
// ─────────────────────────────────────────────────────────────────────────────
interface CustomSelectProps {
  id?: string;
  value: string;
  options: { value: string; label: string }[];
  onValueChange: (value: string) => void;
  placeholder?: string;
}

function CustomSelect({ id, value, options, onValueChange, placeholder = "Select…" }: CustomSelectProps) {
  const [open, setOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const listRef      = useRef<HTMLUListElement>(null);

  // Close on outside click
  useEffect(() => {
    if (!open) return;
    const handler = (e: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, [open]);

  // Close on Escape
  useEffect(() => {
    if (!open) return;
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    document.addEventListener("keydown", handler);
    return () => document.removeEventListener("keydown", handler);
  }, [open]);

  // Scroll selected item into view when menu opens
  useEffect(() => {
    if (!open || !listRef.current) return;
    const selected = listRef.current.querySelector("[data-selected='true']") as HTMLElement | null;
    if (selected) selected.scrollIntoView({ block: "nearest" });
  }, [open]);

  const selectedLabel = options.find((o) => o.value === value)?.label ?? placeholder;

  const handleSelect = useCallback((val: string) => {
    onValueChange(val);
    setOpen(false);
  }, [onValueChange]);

  return (
    <div ref={containerRef} className="relative">
      {/* ── Trigger button ── */}
      <button
        id={id}
        type="button"
        onClick={() => setOpen((o) => !o)}
        aria-haspopup="listbox"
        aria-expanded={open}
        className="w-full flex items-center justify-between gap-2
          h-[52px] px-4 rounded-xl border text-sm text-left shadow-sm
          transition-all duration-200 outline-none
          bg-white border-slate-200/80 text-slate-900
          focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/15
          dark:bg-[#111111] dark:border-white/10 dark:text-white
          dark:focus:border-indigo-500 dark:focus:ring-indigo-500/20"
      >
        <span className="truncate text-slate-700 dark:text-white/85">{selectedLabel}</span>
        {/* Chevron — rotates 180° when open */}
        <svg
          width="14" height="14" viewBox="0 0 24 24" fill="none"
          stroke="currentColor" strokeWidth="2.5"
          strokeLinecap="round" strokeLinejoin="round"
          className={`shrink-0 transition-transform duration-200 text-slate-400 dark:text-white/30
            ${open ? "rotate-180" : "rotate-0"}`}
        >
          <path d="M6 9l6 6 6-6" />
        </svg>
      </button>

      {/* ── Floating menu ── */}
      {open && (
        <div
          className="absolute z-50 w-full mt-1.5
            rounded-xl border shadow-2xl overflow-hidden
            bg-white border-slate-200
            dark:bg-[#111620] dark:border-white/[0.10]
            dark:shadow-[0_24px_60px_-10px_rgba(0,0,0,0.7)]"
        >
          <ul
            ref={listRef}
            role="listbox"
            className="max-h-60 overflow-y-auto custom-scrollbar py-1.5"
          >
            {options.map((opt) => {
              const isSelected = opt.value === value;
              return (
                <li
                  key={opt.value}
                  role="option"
                  aria-selected={isSelected}
                  data-selected={isSelected}
                  onClick={() => handleSelect(opt.value)}
                  className={`flex items-center gap-2.5 px-3 py-2.5 cursor-pointer
                    text-sm font-mono transition-colors duration-100 select-none
                    ${isSelected
                      ? "bg-indigo-50 text-indigo-700 dark:bg-indigo-500/20 dark:text-indigo-300"
                      : "text-slate-700 hover:bg-indigo-50 hover:text-slate-900 dark:text-white/70 dark:hover:bg-indigo-500/20 dark:hover:text-white"
                    }`}
                >
                  {isSelected && (
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none"
                      stroke="currentColor" strokeWidth="3"
                      strokeLinecap="round" strokeLinejoin="round"
                      className="shrink-0 text-indigo-500 dark:text-indigo-400">
                      <polyline points="20 6 9 17 4 12" />
                    </svg>
                  )}
                  {!isSelected && <span className="w-3 shrink-0" />}
                  <span className="truncate">{opt.label}</span>
                </li>
              );
            })}
          </ul>
        </div>
      )}
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// PROPS
// ─────────────────────────────────────────────────────────────────────────────
interface SchemaToolProps {
  initialNiche?:    string;
  placeholderName?: string;
}

// ─────────────────────────────────────────────────────────────────────────────
// COMPONENT
// ─────────────────────────────────────────────────────────────────────────────
export default function SchemaTool({
  initialNiche    = "LocalBusiness",
  placeholderName = "e.g., Acme Plumbing Corp",
}: SchemaToolProps) {

  const resolvedType = resolveSchemaType(initialNiche);

  const [formData, setFormData] = useState({
    type:         resolvedType,
    name:         "",
    url:          "",
    logo:         "",
    description:  "",
    phone:        "",
    email:        "",
    street:       "",
    city:         "",
    state:        "",
    zip:          "",
    country:      "US",
    priceRange:   "",
    socialLinks:  "",
    serviceAreas: "",
  });

  const [isSAB,           setIsSAB]           = useState(false);
  const [showAdvanced,    setShowAdvanced]    = useState(false);
  const [copied,          setCopied]          = useState(false);
  const [jsonString,      setJsonString]      = useState("");
  const [showCopiedModal, setShowCopiedModal] = useState(false);
  const modalRef = useRef<HTMLDivElement>(null);

  // Theme detection — mounted guard prevents SSR/hydration mismatch
  const { resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  useEffect(() => { setMounted(true); }, []);
  const isDark = mounted ? resolvedTheme === "dark" : true;

  // Sync schemaType on initialNiche prop change (client-side navigation)
  useEffect(() => {
    setFormData((prev) => ({ ...prev, type: resolveSchemaType(initialNiche) }));
  }, [initialNiche]);

  const isNameValid = formData.name.trim() !== "";
  const isUrlValid  = formData.url.trim()  !== "";
  const canCopy     = isNameValid && isUrlValid;

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  useEffect(() => {
    const schema: Record<string, unknown> = {
      "@context": "https://schema.org",
      "@type":    formData.type,
      name:       formData.name || "Your Business Name",
      image:      formData.logo || undefined,
      "@id":      formData.url  || "https://yourwebsite.com",
      url:        formData.url  || "https://yourwebsite.com",
      telephone:  formData.phone || undefined,
      priceRange: formData.priceRange || undefined,
      address: {
        "@type":         "PostalAddress",
        streetAddress:   isSAB ? undefined : (formData.street || undefined),
        addressLocality: formData.city    || undefined,
        addressRegion:   formData.state   || undefined,
        postalCode:      formData.zip     || undefined,
        addressCountry:  formData.country || undefined,
      },
    };

    if (formData.description) schema.description = formData.description;

    if (formData.socialLinks) {
      const links = formData.socialLinks
        .split(",").map((l) => l.trim()).filter(Boolean);
      if (links.length) schema.sameAs = links;
    }

    if (isSAB && formData.serviceAreas) {
      const areas = formData.serviceAreas
        .split(",").map((a) => a.trim()).filter(Boolean);
      if (areas.length) {
        schema.areaServed = areas.map((area) => ({
          "@type": "City",
          name:    area,
        }));
      }
    }

    setJsonString(JSON.stringify(JSON.parse(JSON.stringify(schema)), null, 2));
  }, [formData, isSAB]);

  const handleCopy = () => {
    if (!canCopy) return;
    const scriptTag = `<script type="application/ld+json">\n${jsonString}\n</script>`;
    navigator.clipboard.writeText(scriptTag);
    setCopied(true);
    setShowCopiedModal(true);
    setTimeout(() => setCopied(false), 2500);
  };

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setShowCopiedModal(false);
    };
    if (showCopiedModal) document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [showCopiedModal]);

  const handleBackdropClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (modalRef.current && !modalRef.current.contains(e.target as Node)) {
      setShowCopiedModal(false);
    }
  };

  const handleLoadExample = () => {
    setFormData({
      type:        "Plumber",
      name:        "Apex Elite Plumbing",
      url:         "https://www.apexeliteplumbing.com",
      logo:        "https://www.apexeliteplumbing.com/logo.png",
      description: "Award-winning 24/7 emergency plumbing and HVAC services for residential and commercial properties.",
      phone:       "+1-555-123-4567",
      email:       "service@apexeliteplumbing.com",
      street:      "456 Industrial Way, Suite 200",
      city:        "Austin",
      state:       "TX",
      zip:         "78701",
      country:     "US",
      priceRange:  "$$",
      socialLinks: "https://facebook.com/apexplumbing, https://twitter.com/apexplumbing",
      serviceAreas:"Austin, Round Rock, Cedar Park",
    });
    setIsSAB(true);
    setShowAdvanced(true);
  };

  const handleClear = () => {
    setFormData({
      type:        resolvedType,
      name:        "",
      url:         "",
      logo:        "",
      description: "",
      phone:       "",
      email:       "",
      street:      "",
      city:        "",
      state:       "",
      zip:         "",
      country:     "US",
      priceRange:  "",
      socialLinks: "",
      serviceAreas:"",
    });
    setIsSAB(false);
    setShowAdvanced(false);
  };

  // Syntax highlighting — separate color sets for light / dark
  const highlightJSON = (json: string, dark: boolean): string => {
    if (!json) return "";
    const clsKey  = dark ? "text-sky-300 font-medium"  : "text-[#005CC5] font-medium";
    const clsStr  = dark ? "text-emerald-400"           : "text-[#22863A]";
    const clsBool = dark ? "text-amber-400"             : "text-[#E36209]";
    const clsNull = dark ? "text-white/30"              : "text-slate-400";
    const clsNum  = dark ? "text-amber-400"             : "text-[#E36209]";
    return json
      .replace(/&/g,  "&amp;")
      .replace(/</g,  "&lt;")
      .replace(/>/g,  "&gt;")
      .replace(
        /("(\\u[a-zA-Z0-9]{4}|\\[^u]|[^\\"])*"(\s*:)?|\b(true|false|null)\b|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?)/g,
        (match) => {
          let cls = clsNum;
          if (/^"/.test(match)) {
            cls = /:$/.test(match) ? clsKey : clsStr;
          } else if (/true|false/.test(match)) {
            cls = clsBool;
          } else if (/null/.test(match)) {
            cls = clsNull;
          }
          return `<span class="${cls}">${match}</span>`;
        }
      );
  };

  const lines = jsonString ? jsonString.split("\n") : [];

  const handleDownload = () => {
    if (!canCopy) return;
    const content = `<script type="application/ld+json">\n${jsonString}\n</script>`;
    const blob = new Blob([content], { type: "application/json" });
    const url  = URL.createObjectURL(blob);
    const a    = document.createElement("a");
    a.href     = url;
    a.download = "schema.jsonld";
    a.click();
    URL.revokeObjectURL(url);
  };

  const terminalLineH = "1.75rem";

  // ── Shared input classes ───────────────────────────────────────────────────
  const inputCls =
    "w-full h-[52px] rounded-xl border border-slate-200/80 bg-white px-4 text-sm text-slate-900 shadow-sm " +
    "transition-all duration-200 placeholder:text-slate-400 " +
    "focus:border-indigo-500 focus:outline-none focus:ring-4 focus:ring-indigo-500/15 " +
    "dark:bg-[#111111] dark:border-white/10 dark:text-white dark:placeholder:text-slate-600 " +
    "dark:focus:border-indigo-500 dark:focus:ring-indigo-500/20";

  const inputErrCls =
    "w-full h-[52px] rounded-xl border border-red-300 bg-white px-4 text-sm text-slate-900 shadow-sm " +
    "transition-all duration-200 placeholder:text-slate-400 " +
    "focus:border-red-400 focus:outline-none focus:ring-4 focus:ring-red-500/15 " +
    "dark:bg-[#111111] dark:border-red-500/40 dark:text-white dark:placeholder:text-slate-600 " +
    "dark:focus:border-red-400/60 dark:focus:ring-red-500/20";

  const labelCls =
    "text-sm font-bold text-slate-700 dark:text-slate-300 mb-2.5 block";

  // ─────────────────────────────────────────────────────────────────────────
  // RENDER
  // ─────────────────────────────────────────────────────────────────────────
  return (
    <div className="w-full max-w-7xl mx-auto py-8 relative">

      {/* ══════════════════════════════════════════════════════════════════════
          POST-COPY MODAL
      ══════════════════════════════════════════════════════════════════════ */}
      {showCopiedModal && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4"
          style={{ backgroundColor: "rgba(2, 6, 23, 0.72)" }}
          onClick={handleBackdropClick}
          role="dialog"
          aria-modal="true"
          aria-labelledby="modal-title"
        >
          <div className="absolute inset-0 backdrop-blur-sm" aria-hidden="true" />

          <div
            ref={modalRef}
            className="relative z-10 w-full max-w-md"
            style={{ animation: "modalSlideIn 0.28s cubic-bezier(0.16,1,0.3,1) both" }}
          >
            <div
              className="rounded-3xl overflow-hidden border border-white/20 shadow-2xl"
              style={{
                background:           "linear-gradient(145deg,rgba(255,255,255,0.11) 0%,rgba(255,255,255,0.06) 100%)",
                backdropFilter:       "blur(40px) saturate(180%)",
                WebkitBackdropFilter: "blur(40px) saturate(180%)",
                boxShadow:            "0 32px 80px -12px rgba(0,0,0,0.6),inset 0 1px 0 rgba(255,255,255,0.12)",
              }}
            >
              {/* Teal accent bar */}
              <div
                className="h-[2px] w-full"
                style={{ background: "linear-gradient(90deg,#00D4C8 0%,#007CF0 50%,#00D4C8 100%)" }}
              />

              <div className="p-8">
                {/* Animated checkmark */}
                <div className="flex justify-center mb-5">
                  <div
                    className="w-20 h-20 rounded-full flex items-center justify-center"
                    style={{
                      background: "linear-gradient(135deg,rgba(16,185,129,0.22) 0%,rgba(16,185,129,0.08) 100%)",
                      border:     "1.5px solid rgba(16,185,129,0.35)",
                      boxShadow:  "0 0 40px rgba(16,185,129,0.18)",
                    }}
                  >
                    <svg viewBox="0 0 52 52" className="w-10 h-10"
                      style={{ animation: "checkDraw 0.45s ease 0.1s both" }}>
                      <circle cx="26" cy="26" r="24" fill="none"
                        stroke="rgba(16,185,129,0.25)" strokeWidth="2" />
                      <polyline points="14,26 22,34 38,18" fill="none"
                        stroke="#10b981" strokeWidth="3"
                        strokeLinecap="round" strokeLinejoin="round"
                        style={{
                          strokeDasharray: 35, strokeDashoffset: 0,
                          animation: "checkStroke 0.4s ease 0.2s both",
                        }}
                      />
                    </svg>
                  </div>
                </div>

                <div className="text-center mb-1">
                  <h2 id="modal-title" className="text-2xl font-extrabold tracking-tight"
                    style={{ color: "rgba(255,255,255,0.95)" }}>
                    Code Copied Successfully!
                  </h2>
                  <p className="text-sm mt-2" style={{ color: "rgba(255,255,255,0.45)" }}>
                    Your JSON-LD schema is on your clipboard, ready to deploy.
                  </p>
                </div>

                <div className="my-6 h-px" style={{ background: "rgba(255,255,255,0.08)" }} />

                <div className="mb-6">
                  <p className="text-xs font-bold tracking-widest uppercase mb-4 text-center"
                    style={{ color: "rgba(255,255,255,0.35)" }}>
                    Next Step — Add this to your site
                  </p>

                  <div className="space-y-3">
                    {/* WordPress guide CTA */}
                    <a href="/guides/wordpress"
                      onClick={() => setShowCopiedModal(false)}
                      className="group flex items-center gap-4 w-full rounded-2xl p-4 transition-all duration-200"
                      style={{ background: "rgba(0,212,200,0.1)", border: "1px solid rgba(0,212,200,0.22)" }}
                      onMouseEnter={(e) => {
                        (e.currentTarget as HTMLElement).style.background  = "rgba(0,212,200,0.17)";
                        (e.currentTarget as HTMLElement).style.borderColor = "rgba(0,212,200,0.4)";
                      }}
                      onMouseLeave={(e) => {
                        (e.currentTarget as HTMLElement).style.background  = "rgba(0,212,200,0.1)";
                        (e.currentTarget as HTMLElement).style.borderColor = "rgba(0,212,200,0.22)";
                      }}
                    >
                      <div className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0"
                        style={{ background: "rgba(0,212,200,0.15)" }}>
                        <svg viewBox="0 0 24 24" className="w-5 h-5" fill="none">
                          <path d="M12 2C6.477 2 2 6.477 2 12s4.477 10 10 10 10-4.477 10-10S17.523 2 12 2z"
                            fill="rgba(0,212,200,0.35)" />
                          <path d="M3.5 12c0-2.356.823-4.52 2.184-6.224L9.5 16.5H7l-1-2H4.5A8.5 8.5 0 013.5 12zm8.5 8.5c-.88 0-1.73-.132-2.53-.377l2.686-7.812 2.75 7.536A8.524 8.524 0 0112 20.5zm3.9-.96L18.9 9.9c.4-1 .5-1.8.5-2.5 0-.257-.017-.497-.05-.73A8.498 8.498 0 0120.5 12c0 2.992-1.551 5.625-3.9 7.044-.23.136-.467.26-.7.377z"
                            fill="rgba(255,255,255,0.8)" />
                        </svg>
                      </div>
                      <div className="flex-1 text-left">
                        <div className="text-sm font-bold leading-tight"
                          style={{ color: "rgba(255,255,255,0.88)" }}>
                          Read the WordPress Guide
                        </div>
                        <div className="text-xs mt-0.5"
                          style={{ color: "rgba(255,255,255,0.4)" }}>
                          Step-by-step: paste into your &lt;head&gt; in 2 minutes
                        </div>
                      </div>
                      <svg className="w-4 h-4 shrink-0 transition-transform duration-200 group-hover:translate-x-0.5"
                        style={{ color: "rgba(0,212,200,0.6)" }}
                        fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                      </svg>
                    </a>

                    {/* Email CTA */}
                    <button type="button"
                      onClick={() => alert("Email flow coming soon!")}
                      className="group flex items-center gap-4 w-full rounded-2xl p-4 transition-all duration-200"
                      style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.09)" }}
                      onMouseEnter={(e) => {
                        (e.currentTarget as HTMLElement).style.background  = "rgba(255,255,255,0.08)";
                        (e.currentTarget as HTMLElement).style.borderColor = "rgba(255,255,255,0.16)";
                      }}
                      onMouseLeave={(e) => {
                        (e.currentTarget as HTMLElement).style.background  = "rgba(255,255,255,0.04)";
                        (e.currentTarget as HTMLElement).style.borderColor = "rgba(255,255,255,0.09)";
                      }}
                    >
                      <div className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0"
                        style={{ background: "rgba(255,255,255,0.07)" }}>
                        <svg className="w-5 h-5" style={{ color: "rgba(255,255,255,0.45)" }}
                          fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
                          <path strokeLinecap="round" strokeLinejoin="round"
                            d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                        </svg>
                      </div>
                      <div className="flex-1 text-left">
                        <div className="text-sm font-bold leading-tight"
                          style={{ color: "rgba(255,255,255,0.65)" }}>
                          Email this code to my developer
                        </div>
                        <div className="text-xs mt-0.5"
                          style={{ color: "rgba(255,255,255,0.3)" }}>
                          Send the snippet directly to your tech team
                        </div>
                      </div>
                      <svg className="w-4 h-4 shrink-0 transition-transform duration-200 group-hover:translate-x-0.5"
                        style={{ color: "rgba(255,255,255,0.22)" }}
                        fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                      </svg>
                    </button>
                  </div>
                </div>

                <button type="button" onClick={() => setShowCopiedModal(false)}
                  className="w-full py-2.5 rounded-xl text-sm font-semibold transition-all duration-200"
                  style={{ color: "rgba(255,255,255,0.3)" }}
                  onMouseEnter={(e) => {
                    (e.currentTarget as HTMLElement).style.color      = "rgba(255,255,255,0.55)";
                    (e.currentTarget as HTMLElement).style.background = "rgba(255,255,255,0.05)";
                  }}
                  onMouseLeave={(e) => {
                    (e.currentTarget as HTMLElement).style.color      = "rgba(255,255,255,0.3)";
                    (e.currentTarget as HTMLElement).style.background = "transparent";
                  }}
                >
                  Dismiss
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
      {/* ══ End Modal ══════════════════════════════════════════════════════════ */}


      {/* ══════════════════════════════════════════════════════════════════════
          MAIN TOOL CARD
          Light: white surface with slate border and subtle shadow
          Dark:  deep #0C1018 with teal glow
      ══════════════════════════════════════════════════════════════════════ */}
      <div className="rounded-2xl border overflow-hidden
        border-slate-200 shadow-sm
        dark:border-white/[0.07] dark:shadow-[0_0_80px_-20px_rgba(0,212,200,0.12),0_0_0_1px_rgba(255,255,255,0.04)]
        bg-white dark:bg-[#0C1018]">

        {/* ── Header bar ──────────────────────────────────────────────────── */}
        <div className="flex items-center justify-between
          px-6 py-3.5 border-b
          bg-slate-50 border-slate-200
          dark:bg-[#080B11] dark:border-white/[0.07]">

          {/* Live indicator */}
          <div className="flex items-center gap-2.5">
            <div className="flex items-center gap-2 px-2.5 py-1 rounded-full
              bg-teal-500/[0.07] border border-teal-500/[0.16]">
              <span className="w-1.5 h-1.5 rounded-full bg-teal-400 animate-pulse shrink-0" />
              <span className="font-mono text-[10px] text-teal-400/75 uppercase tracking-wider hidden sm:inline">
                Live Preview
              </span>
            </div>
          </div>

          {/* Quick actions */}
          <div className="flex items-center gap-1.5">
            <button
              onClick={handleClear}
              className="text-[12px] font-mono px-3 py-1.5 rounded-md transition-colors
                text-slate-400 hover:text-slate-600 hover:bg-slate-100
                dark:text-white/25 dark:hover:text-white/50 dark:hover:bg-white/[0.04]"
            >
              Clear
            </button>
            <button
              onClick={handleLoadExample}
              className="flex items-center gap-1.5 text-[12px] font-mono
                px-3 py-1.5 rounded-md border transition-all duration-150
                text-teal-600 hover:text-teal-700
                bg-teal-500/[0.07] hover:bg-teal-500/[0.13]
                border-teal-500/20 hover:border-teal-500/35
                dark:text-teal-400/65 dark:hover:text-teal-400
                dark:bg-teal-500/[0.05] dark:hover:bg-teal-500/[0.1]
                dark:border-teal-500/[0.14] dark:hover:border-teal-500/[0.28]"
            >
              <svg width="11" height="11" viewBox="0 0 24 24" fill="currentColor">
                <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" />
              </svg>
              Load Example
            </button>
          </div>
        </div>

        {/* ── Two-panel body ────────────────────────────────────────────────── */}
        <div className="grid grid-cols-1 lg:grid-cols-[55%_45%]
          divide-y lg:divide-y-0 lg:divide-x
          divide-slate-200 dark:divide-white/[0.07]">

          {/* ════════════════════════════════════════════════════════════════
              LEFT PANEL — Input form
          ════════════════════════════════════════════════════════════════ */}
          <div className="overflow-y-auto lg:max-h-[740px] custom-scrollbar
            p-7 space-y-8 bg-white dark:bg-[#0C1018]">

            {/* ── Section 1: Business Details ──────────────────────────── */}
            <div>
              <div className="flex items-center gap-3 mb-6">
                <span className="shrink-0 w-5 h-5 rounded-md flex items-center justify-center
                  font-mono text-[9px] select-none
                  bg-slate-100 border border-slate-200 text-slate-400
                  dark:bg-white/[0.04] dark:border-white/[0.07] dark:text-white/25">
                  01
                </span>
                <span className="text-[11px] font-semibold uppercase tracking-[0.14em]
                  text-slate-500 dark:text-white/45">
                  Business Details
                </span>
                <div className="flex-1 h-px bg-slate-200 dark:bg-white/[0.05]" />
              </div>

              <div className="grid grid-cols-2 gap-4">

                {/* Business Name */}
                <div className="col-span-2">
                  <Label htmlFor="tool-name" className={labelCls}>
                    Business Name{" "}
                    <span className="text-red-500/70 dark:text-red-400/60 normal-case tracking-normal font-normal text-xs">*</span>
                  </Label>
                  <Input
                    id="tool-name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder={placeholderName}
                    className={isNameValid ? inputCls : inputErrCls}
                  />
                </div>

                {/* Business Type — custom dropdown */}
                <div className="col-span-2">
                  <Label htmlFor="tool-type" className={labelCls}>
                    Business Type
                  </Label>
                  <CustomSelect
                    id="tool-type"
                    value={formData.type}
                    options={SCHEMA_OPTIONS}
                    onValueChange={(val) => setFormData((prev) => ({ ...prev, type: val }))}
                    placeholder="Select type"
                  />
                </div>

                {/* Website URL */}
                <div className="col-span-2">
                  <Label htmlFor="tool-url" className={labelCls}>
                    Website URL{" "}
                    <span className="text-red-500/70 dark:text-red-400/60 normal-case tracking-normal font-normal text-xs">*</span>
                  </Label>
                  <Input
                    id="tool-url"
                    type="url"
                    name="url"
                    value={formData.url}
                    onChange={handleChange}
                    placeholder="e.g., https://www.example.com"
                    className={isUrlValid ? inputCls : inputErrCls}
                  />
                </div>

                {/* Logo URL */}
                <div className="col-span-2">
                  <Label htmlFor="tool-logo" className={labelCls}>
                    Logo URL
                  </Label>
                  <Input
                    id="tool-logo"
                    type="url"
                    name="logo"
                    value={formData.logo}
                    onChange={handleChange}
                    placeholder="e.g., https://www.example.com/logo.png"
                    className={inputCls}
                  />
                </div>

                {/* Description */}
                <div className="col-span-2">
                  <Label htmlFor="tool-description" className={labelCls}>
                    Brief Description
                  </Label>
                  <textarea
                    id="tool-description"
                    name="description"
                    value={formData.description}
                    onChange={handleChange}
                    rows={2}
                    placeholder="e.g., Award-winning plumbing services in Austin, TX"
                    className="w-full rounded-xl px-4 py-3 text-sm border resize-none shadow-sm
                      transition-all duration-200 focus:outline-none
                      border-slate-200/80 bg-white text-slate-900 placeholder:text-slate-400
                      focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/15
                      dark:bg-[#111111] dark:border-white/10 dark:text-white
                      dark:placeholder:text-slate-600 dark:focus:border-indigo-500 dark:focus:ring-indigo-500/20"
                  />
                </div>

              </div>
            </div>

            {/* ── Section 2: Location & Contact ────────────────────────── */}
            <div>
              <div className="flex items-center gap-3 mb-6">
                <span className="shrink-0 w-5 h-5 rounded-md flex items-center justify-center
                  font-mono text-[9px] select-none
                  bg-slate-100 border border-slate-200 text-slate-400
                  dark:bg-white/[0.04] dark:border-white/[0.07] dark:text-white/25">
                  02
                </span>
                <span className="text-[11px] font-semibold uppercase tracking-[0.14em]
                  text-slate-500 dark:text-white/45">
                  Location &amp; Contact
                </span>
                <div className="flex-1 h-px bg-slate-200 dark:bg-white/[0.05]" />
              </div>

              <div className="grid grid-cols-2 gap-4">

                {/* Email Address — full width */}
                <div className="col-span-2">
                  <Label htmlFor="tool-email" className={labelCls}>Email Address</Label>
                  <Input
                    id="tool-email"
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="e.g., hello@acmeplumbing.com"
                    className={inputCls}
                  />
                </div>

                {/* Street address — full width, hidden when SAB is on */}
                {!isSAB && (
                  <div className="col-span-2">
                    <Label htmlFor="tool-street" className={labelCls}>Street Address</Label>
                    <Input
                      id="tool-street"
                      name="street"
                      value={formData.street}
                      onChange={handleChange}
                      placeholder="e.g., 123 Main Street"
                      className={inputCls}
                    />
                  </div>
                )}

                {/* City + State — half each */}
                <div>
                  <Label htmlFor="tool-city" className={labelCls}>City</Label>
                  <Input
                    id="tool-city"
                    name="city"
                    value={formData.city}
                    onChange={handleChange}
                    placeholder="e.g., Austin"
                    className={inputCls}
                  />
                </div>

                <div>
                  <Label htmlFor="tool-state" className={labelCls}>State / Province</Label>
                  <Input
                    id="tool-state"
                    name="state"
                    value={formData.state}
                    onChange={handleChange}
                    placeholder="e.g., TX"
                    className={inputCls}
                  />
                </div>

                {/* Zip + Phone — half each */}
                <div>
                  <Label htmlFor="tool-zip" className={labelCls}>Zip / Postal Code</Label>
                  <Input
                    id="tool-zip"
                    name="zip"
                    value={formData.zip}
                    onChange={handleChange}
                    placeholder="e.g., 78701"
                    className={inputCls}
                  />
                </div>

                <div>
                  <Label htmlFor="tool-phone" className={labelCls}>Phone Number</Label>
                  <Input
                    id="tool-phone"
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    placeholder="e.g., +1 (555) 123-4567"
                    className={inputCls}
                  />
                </div>

                {/* Country — full width, custom dropdown */}
                <div className="col-span-2">
                  <Label htmlFor="tool-country" className={labelCls}>Country</Label>
                  <CustomSelect
                    id="tool-country"
                    value={formData.country}
                    options={COUNTRY_OPTIONS}
                    onValueChange={(val) => setFormData((prev) => ({ ...prev, country: val }))}
                    placeholder="Select country"
                  />
                </div>

              </div>
            </div>

            {/* ── Section 3: SAB Toggle Card ────────────────────────────── */}
            <div
              onClick={() => setIsSAB(!isSAB)}
              className={`cursor-pointer rounded-xl border p-5 transition-all duration-300
                relative overflow-hidden group ${
                  isSAB
                    ? "bg-teal-500/[0.06] border-teal-500/25 shadow-[0_0_24px_-6px_rgba(0,212,200,0.15)]"
                    : "bg-slate-50 border-slate-200 hover:border-slate-300 hover:bg-slate-100/50 dark:bg-white/[0.02] dark:border-white/[0.08] dark:hover:border-white/[0.14] dark:hover:bg-white/[0.04]"
                }`}
            >
              {isSAB && (
                <div className="absolute top-0 left-0 right-0 h-px
                  bg-gradient-to-r from-transparent via-teal-500/40 to-transparent" />
              )}

              <div className="flex items-center justify-between gap-4">
                <div className="flex items-start gap-3.5">
                  <div className={`mt-0.5 w-9 h-9 rounded-lg flex items-center justify-center
                    shrink-0 transition-colors duration-300 ${
                      isSAB
                        ? "bg-teal-500/15 border border-teal-500/25"
                        : "bg-slate-100 border border-slate-200 dark:bg-white/[0.05] dark:border-white/[0.08]"
                    }`}>
                    <svg
                      width="16" height="16" viewBox="0 0 24 24" fill="none"
                      stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
                      className={`transition-colors duration-300 ${
                        isSAB ? "text-teal-400" : "text-slate-400 dark:text-white/30"
                      }`}
                    >
                      <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
                      <polyline points="9 22 9 12 15 12 15 22" />
                    </svg>
                  </div>
                  <div>
                    <h3 className={`font-semibold text-sm transition-colors duration-300 ${
                      isSAB
                        ? "text-teal-600 dark:text-teal-300"
                        : "text-slate-700 dark:text-white/70"
                    }`}>
                      Service Area Business (SAB)
                    </h3>
                    <p className="text-[12px] mt-0.5 leading-relaxed max-w-xs
                      text-slate-500 dark:text-white/30">
                      Enable if you travel to customers. Hides your street address to comply
                      with Google&apos;s SAB guidelines.
                    </p>
                  </div>
                </div>

                {/* Toggle pill */}
                <div className={`w-11 h-6 rounded-full flex items-center p-[3px]
                  transition-colors duration-300 shrink-0 ${
                    isSAB ? "bg-teal-500" : "bg-slate-200 dark:bg-white/10"
                  }`}>
                  <div className={`w-[18px] h-[18px] rounded-full bg-white shadow-sm
                    transition-transform duration-300 ${isSAB ? "translate-x-5" : "translate-x-0"}`}
                  />
                </div>
              </div>

              {/* Expanded service areas input */}
              <div className={`transition-all duration-500 ease-in-out ${
                isSAB ? "max-h-28 opacity-100 mt-5" : "max-h-0 opacity-0 overflow-hidden"
              }`}>
                <div onClick={(e) => e.stopPropagation()}>
                  <Label htmlFor="tool-serviceAreas" className={labelCls}>
                    Service Areas
                    <span className="ml-1.5 normal-case tracking-normal font-sans font-normal
                      text-slate-400 dark:text-white/30 text-xs">
                      (comma separated)
                    </span>
                  </Label>
                  <Input
                    id="tool-serviceAreas"
                    name="serviceAreas"
                    value={formData.serviceAreas}
                    onChange={handleChange}
                    placeholder="e.g., Brooklyn, Queens, Manhattan"
                    className="w-full h-[52px] rounded-xl px-4 text-sm border shadow-sm
                      transition-all duration-200 focus:outline-none
                      bg-white border-teal-300 text-slate-900 placeholder:text-slate-400
                      focus:border-teal-500 focus:ring-4 focus:ring-teal-500/15
                      dark:bg-[#111111] dark:border-teal-500/20 dark:text-white
                      dark:placeholder:text-slate-600 dark:focus:border-teal-500/50 dark:focus:ring-teal-500/15"
                  />
                </div>
              </div>
            </div>

            {/* ── Section 4: Advanced Accordion ────────────────────────── */}
            <div className="rounded-xl border overflow-hidden
              border-slate-200 dark:border-white/[0.07]">
              <button
                type="button"
                onClick={() => setShowAdvanced(!showAdvanced)}
                className={`w-full flex items-center justify-between px-5 py-4
                  transition-colors duration-200 focus:outline-none group ${
                    showAdvanced
                      ? "bg-slate-100/70 dark:bg-white/[0.04]"
                      : "bg-slate-50 hover:bg-slate-100/70 dark:bg-white/[0.02] dark:hover:bg-white/[0.04]"
                  }`}
              >
                <div className="flex items-center gap-3">
                  <div className={`w-7 h-7 rounded-lg flex items-center justify-center
                    transition-colors duration-200 ${
                      showAdvanced
                        ? "bg-teal-500/10 border border-teal-500/20 text-teal-500 dark:text-teal-400"
                        : "bg-slate-200 border border-slate-200 text-slate-400 group-hover:text-slate-600 dark:bg-white/[0.04] dark:border-white/[0.07] dark:text-white/30 dark:group-hover:text-white/50"
                    }`}>
                    <svg width="13" height="13" viewBox="0 0 24 24" fill="none"
                      stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <circle cx="12" cy="12" r="3" />
                      <path d="M19.07 4.93a10 10 0 0 1 0 14.14M4.93 4.93a10 10 0 0 0 0 14.14" />
                    </svg>
                  </div>
                  <div className="text-left">
                    <p className={`text-sm font-semibold transition-colors ${
                      showAdvanced
                        ? "text-slate-800 dark:text-white/75"
                        : "text-slate-500 dark:text-white/50"
                    }`}>
                      Advanced Schema Settings
                    </p>
                    <p className="text-[11px] mt-0.5 text-slate-400 dark:text-white/25">
                      Price range, social profiles, etc.
                    </p>
                  </div>
                </div>
                <svg
                  width="16" height="16" viewBox="0 0 24 24" fill="none"
                  stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
                  className={`transition-transform duration-300 shrink-0 ${
                    showAdvanced
                      ? "rotate-180 text-teal-500 dark:text-teal-400"
                      : "text-slate-400 dark:text-white/25"
                  }`}
                >
                  <path d="M6 9l6 6 6-6" />
                </svg>
              </button>

              <div className={`transition-all duration-500 ease-in-out border-t ${
                showAdvanced
                  ? "max-h-64 opacity-100 border-slate-200 dark:border-white/[0.06]"
                  : "max-h-0 opacity-0 overflow-hidden border-t-0"
              }`}>
                <div className="p-5 grid grid-cols-1 sm:grid-cols-2 gap-4
                  bg-slate-50/50 dark:bg-white/[0.015]">

                  <div>
                    <Label htmlFor="tool-priceRange" className={labelCls}>Price Range</Label>
                    <Input
                      id="tool-priceRange"
                      name="priceRange"
                      value={formData.priceRange}
                      onChange={handleChange}
                      placeholder="e.g., $$, $$$, or $100–$500"
                      className={inputCls}
                    />
                  </div>

                  <div className="sm:col-span-2">
                    <Label htmlFor="tool-socialLinks" className={labelCls}>
                      Social Profiles
                      <span className="ml-1.5 normal-case tracking-normal font-sans
                        text-slate-400 dark:text-white/20">
                        (comma separated)
                      </span>
                    </Label>
                    <textarea
                      id="tool-socialLinks"
                      name="socialLinks"
                      value={formData.socialLinks}
                      onChange={handleChange}
                      rows={2}
                      placeholder="e.g., https://facebook.com/yourbiz, https://instagram.com/yourbiz"
                      className="w-full rounded-xl px-4 py-3 text-sm border resize-none shadow-sm
                        transition-all duration-200 focus:outline-none
                        border-slate-200/80 bg-white text-slate-900 placeholder:text-slate-400
                        focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/15
                        dark:bg-[#111111] dark:border-white/10 dark:text-white
                        dark:placeholder:text-slate-600 dark:focus:border-indigo-500 dark:focus:ring-indigo-500/20"
                    />
                  </div>

                </div>
              </div>
            </div>

          </div>
          {/* ══ End Left Panel ══════════════════════════════════════════════ */}


          {/* ════════════════════════════════════════════════════════════════
              RIGHT PANEL — Code editor output
              Light: GitHub Light style (#F6F8FA bg, #EAECF0 chrome)
              Dark:  macOS terminal style (#050810 bg, #040709 chrome)
          ════════════════════════════════════════════════════════════════ */}
          <div className="flex flex-col lg:max-h-[740px]
            bg-[#F6F8FA] dark:bg-[#050810]">

            {/* Editor header */}
            <div className="shrink-0 flex items-center justify-between px-4 py-3 border-b
              bg-[#EAECF0] border-slate-300
              dark:bg-[#040709] dark:border-white/[0.06]">

              {/* macOS traffic lights */}
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-[#FF5F57] border border-[#E0443E]/50" />
                <div className="w-3 h-3 rounded-full bg-[#FFBD2E] border border-[#DEA123]/50" />
                <div className="w-3 h-3 rounded-full bg-[#27C93F] border border-[#1AAB29]/50" />
              </div>

              {/* Filename tab */}
              <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-md
                bg-white border border-slate-300
                dark:bg-white/[0.035] dark:border-white/[0.06]">
                <svg width="11" height="11" viewBox="0 0 24 24" fill="none"
                  className="text-teal-500 dark:text-teal-400/60" stroke="currentColor" strokeWidth="2">
                  <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                  <polyline points="14 2 14 8 20 8" />
                </svg>
                <span className="font-mono text-[11px] text-slate-600 dark:text-white/40">
                  schema.jsonld
                </span>
              </div>

              {/* Google Rich Results link */}
              <a
                href="https://search.google.com/test/rich-results"
                target="_blank"
                rel="noreferrer"
                title="Test in Google Rich Results Validator"
                className="flex items-center gap-1 font-mono text-[11px] transition-colors duration-150
                  text-slate-500 hover:text-teal-600
                  dark:text-white/25 dark:hover:text-teal-400"
              >
                Test
                <svg width="10" height="10" viewBox="0 0 24 24" fill="none"
                  stroke="currentColor" strokeWidth="2.5">
                  <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
                  <polyline points="15 3 21 3 21 9" />
                  <line x1="10" y1="14" x2="21" y2="3" />
                </svg>
              </a>
            </div>

            {/* Code area — scrollable */}
            <div className="flex-1 overflow-y-auto overflow-x-auto custom-scrollbar min-h-0">
              <div className="flex min-h-full">

                {/* Line numbers gutter */}
                <div
                  className="shrink-0 select-none border-r py-5 px-3 text-right
                    border-slate-200 bg-[#EAECF0]/60
                    dark:border-white/[0.04] dark:bg-[#040709]/60"
                  style={{ minWidth: "2.75rem" }}
                  aria-hidden="true"
                >
                  <div style={{ lineHeight: terminalLineH, height: terminalLineH }} />
                  {lines.map((_, i) => (
                    <div
                      key={i}
                      className="font-mono text-[11px] text-slate-400 dark:text-white/[0.16]"
                      style={{ lineHeight: terminalLineH }}
                    >
                      {i + 1}
                    </div>
                  ))}
                  <div style={{ lineHeight: terminalLineH, height: terminalLineH }} />
                </div>

                {/* Code: script tag + highlighted JSON */}
                <div className="flex-1 py-5 pl-4 pr-6 min-w-0">
                  <pre
                    className="font-mono text-[13px] whitespace-pre"
                    style={{ lineHeight: terminalLineH }}
                  >
                    <span className="text-slate-400 dark:text-white/20">{"<"}</span>
                    <span className="text-[#22863A] dark:text-rose-400/75">script</span>
                    {" "}
                    <span className="text-[#6F42C1] dark:text-sky-300/65">type</span>
                    <span className="text-slate-400 dark:text-white/20">{"="}</span>
                    <span className="text-[#032F62] dark:text-amber-300/70">{`"application/ld+json"`}</span>
                    <span className="text-slate-400 dark:text-white/20">{">"}</span>
                    {"\n"}
                    <code
                      dangerouslySetInnerHTML={{ __html: highlightJSON(jsonString, isDark) }}
                      className="block"
                      style={{ lineHeight: terminalLineH }}
                    />
                    <span className="text-slate-400 dark:text-white/20">{"</"}</span>
                    <span className="text-[#22863A] dark:text-rose-400/75">script</span>
                    <span className="text-slate-400 dark:text-white/20">{">"}</span>
                    <span className="terminal-cursor" />
                  </pre>
                </div>

              </div>
            </div>

            {/* Action bar footer */}
            <div className="shrink-0 flex items-center gap-2 px-4 py-3 border-t
              bg-[#EAECF0] border-slate-300
              dark:bg-[#040709] dark:border-white/[0.06]">

              {/* Primary: Copy Code */}
              <button
                onClick={handleCopy}
                disabled={!canCopy}
                className={`flex-1 flex items-center justify-center gap-2 h-9
                  rounded-lg text-sm font-semibold transition-all duration-300
                  focus:outline-none focus-visible:ring-2 focus-visible:ring-teal-500/50
                  focus-visible:ring-offset-1
                  focus-visible:ring-offset-[#EAECF0] dark:focus-visible:ring-offset-[#040709] ${
                    !canCopy
                      ? "bg-slate-100 text-slate-300 cursor-not-allowed border border-slate-200 dark:bg-white/[0.03] dark:text-white/15 dark:border-white/[0.05]"
                      : copied
                        ? "bg-emerald-50 border border-emerald-300 text-emerald-600 dark:bg-emerald-500/15 dark:border-emerald-500/30 dark:text-emerald-400"
                        : "bg-teal-50 hover:bg-teal-100 border border-teal-300 hover:border-teal-400 text-teal-700 hover:text-teal-800 hover:-translate-y-px dark:bg-teal-500/15 dark:hover:bg-teal-500/25 dark:border-teal-500/25 dark:hover:border-teal-500/45 dark:text-teal-400 dark:hover:text-teal-300"
                  }`}
              >
                {copied ? (
                  <>
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none"
                      stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                      <polyline points="20 6 9 17 4 12" />
                    </svg>
                    Copied!
                  </>
                ) : (
                  <>
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none"
                      stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <rect x="9" y="9" width="13" height="13" rx="2" ry="2" />
                      <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" />
                    </svg>
                    Copy Code
                  </>
                )}
              </button>

              {/* Secondary: Download .jsonld */}
              <button
                onClick={handleDownload}
                disabled={!canCopy}
                title="Download as schema.jsonld"
                className="h-9 w-9 flex items-center justify-center rounded-lg
                  transition-all duration-150
                  border border-slate-300 hover:border-slate-400
                  text-slate-400 hover:text-slate-700
                  dark:border-white/[0.07] dark:hover:border-white/[0.15]
                  dark:text-white/25 dark:hover:text-white/60
                  disabled:opacity-30 disabled:cursor-not-allowed
                  focus:outline-none focus-visible:ring-2 focus-visible:ring-teal-500/40"
              >
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none"
                  stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                  <polyline points="7 10 12 15 17 10" />
                  <line x1="12" y1="15" x2="12" y2="3" />
                </svg>
              </button>

            </div>

          </div>
          {/* ══ End Right Panel ═════════════════════════════════════════════ */}

        </div>
      </div>
      {/* ══ End Main Tool Card ════════════════════════════════════════════════ */}


      {/* Validation hint */}
      <div className="mt-4 flex items-center justify-center gap-2">
        {!canCopy ? (
          <p className="flex items-center gap-1.5 font-mono text-[11px]
            text-red-500/60 dark:text-red-400/50">
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none"
              stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="12" cy="12" r="10" />
              <line x1="12" y1="8" x2="12" y2="12" />
              <line x1="12" y1="16" x2="12.01" y2="16" />
            </svg>
            Fill in Business Name and Website URL (*) to enable copy
          </p>
        ) : (
          <p className="flex items-center gap-1.5 font-mono text-[11px]
            text-slate-400 dark:text-white/20">
            <span className="w-1.5 h-1.5 rounded-full bg-teal-400/60 animate-pulse shrink-0" />
            Output updates live as you type
          </p>
        )}
      </div>

      {/* Local styles */}
      <style>{`
        .custom-scrollbar::-webkit-scrollbar          { width: 4px; height: 4px; }
        .custom-scrollbar::-webkit-scrollbar-track    { background: transparent; }
        .custom-scrollbar::-webkit-scrollbar-thumb    { background: rgba(0,0,0,0.1); border-radius: 99px; }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover { background: rgba(0,0,0,0.18); }

        .dark .custom-scrollbar::-webkit-scrollbar-thumb      { background: rgba(255,255,255,0.08); }
        .dark .custom-scrollbar::-webkit-scrollbar-thumb:hover { background: rgba(255,255,255,0.14); }

        .terminal-cursor {
          display: inline-block;
          width: 2px;
          height: 14px;
          background-color: #00D4C8;
          vertical-align: text-bottom;
          margin-left: 2px;
          border-radius: 1px;
          animation: cursorBlink 1.1s step-end infinite;
        }

        @keyframes cursorBlink {
          0%, 100% { opacity: 1; }
          50%       { opacity: 0; }
        }

        @keyframes modalSlideIn {
          from { opacity: 0; transform: scale(0.94) translateY(12px); }
          to   { opacity: 1; transform: scale(1)    translateY(0);    }
        }

        @keyframes checkStroke {
          from { stroke-dashoffset: 35; }
          to   { stroke-dashoffset: 0;  }
        }

        @keyframes checkDraw {
          from { opacity: 0; transform: scale(0.7); }
          to   { opacity: 1; transform: scale(1); }
        }
      `}</style>

    </div>
  );
}
