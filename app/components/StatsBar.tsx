"use client";

import { motion } from "framer-motion";
import { ShieldCheck, Zap, Layers, TrendingUp } from "lucide-react";

// ─────────────────────────────────────────────────────────────────────────────
// Avatar stack — SVG initials (no external URLs, CSP-safe)
// ─────────────────────────────────────────────────────────────────────────────
const AVATARS = [
  { initials: "MR", bg: "bg-teal-500",   ring: "ring-teal-500/30" },
  { initials: "SC", bg: "bg-indigo-500", ring: "ring-indigo-500/30" },
  { initials: "JO", bg: "bg-amber-500",  ring: "ring-amber-500/30" },
  { initials: "AL", bg: "bg-emerald-500",ring: "ring-emerald-500/30" },
  { initials: "PK", bg: "bg-rose-500",   ring: "ring-rose-500/30" },
] as const;

// ─────────────────────────────────────────────────────────────────────────────
// Badge definitions
// ─────────────────────────────────────────────────────────────────────────────
const BADGES = [
  {
    Icon: ShieldCheck,
    label: "Google Compliant",
    iconCls: "text-emerald-600 dark:text-emerald-400",
    iconBg:  "bg-emerald-50 dark:bg-emerald-500/10",
    border:  "border-emerald-200/80 dark:border-emerald-500/20",
    hover:   "hover:border-emerald-300 dark:hover:border-emerald-500/40 hover:shadow-[0_4px_16px_-4px_rgba(16,185,129,0.18)]",
    dot:     "bg-emerald-500",
  },
  {
    Icon: Zap,
    label: "Zero Sign-Up",
    iconCls: "text-amber-600 dark:text-amber-400",
    iconBg:  "bg-amber-50 dark:bg-amber-500/10",
    border:  "border-amber-200/80 dark:border-amber-500/20",
    hover:   "hover:border-amber-300 dark:hover:border-amber-500/40 hover:shadow-[0_4px_16px_-4px_rgba(245,158,11,0.15)]",
    dot:     "bg-amber-500",
  },
  {
    Icon: Layers,
    label: "52+ Niches",
    iconCls: "text-blue-600 dark:text-blue-400",
    iconBg:  "bg-blue-50 dark:bg-blue-500/10",
    border:  "border-blue-200/80 dark:border-blue-500/20",
    hover:   "hover:border-blue-300 dark:hover:border-blue-500/40 hover:shadow-[0_4px_16px_-4px_rgba(59,130,246,0.15)]",
    dot:     "bg-blue-500",
  },
] as const;

const ease = [0.16, 1, 0.3, 1] as const;

// ─────────────────────────────────────────────────────────────────────────────
// COMPONENT
// ─────────────────────────────────────────────────────────────────────────────
export default function StatsBar() {
  return (
    <section
      aria-label="Social proof"
      className="relative w-full py-10 md:py-14 px-4 sm:px-6 md:px-8
        border-y overflow-hidden
        bg-slate-50 border-slate-200
        dark:bg-[#0a0c12] dark:border-white/[0.06]"
    >
      {/* Subtle teal wash (dark only) */}
      <div className="absolute inset-0 pointer-events-none hidden dark:block
        bg-[radial-gradient(ellipse_60%_80%_at_50%_50%,rgba(0,212,200,0.03),transparent)]" />

      <div className="relative z-10 max-w-7xl mx-auto">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-10 lg:gap-8">

          {/* ── LEFT: avatar stack + 50k stat ─────────────────────────────── */}
          <motion.div
            initial={{ opacity: 0, x: -18 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.55, ease }}
            className="flex items-center gap-5 shrink-0"
          >
            {/* Avatar stack */}
            <div className="flex -space-x-3">
              {AVATARS.map(({ initials, bg, ring }, i) => (
                <motion.div
                  key={initials}
                  initial={{ opacity: 0, scale: 0.7 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.3, delay: i * 0.06, ease }}
                  className="relative"
                >
                  <div
                    className={`
                      w-11 h-11 rounded-full flex items-center justify-center
                      text-white text-xs font-bold tracking-tight select-none
                      ring-2 ring-white dark:ring-[#0a0c12]
                      shadow-sm ${bg}
                    `}
                  >
                    {initials}
                  </div>
                  {/* TrendingUp badge on last avatar */}
                  {i === AVATARS.length - 1 && (
                    <div className="absolute -bottom-1 -right-1
                      w-5 h-5 rounded-full bg-teal-500
                      ring-2 ring-white dark:ring-[#0a0c12]
                      flex items-center justify-center shadow">
                      <TrendingUp className="w-2.5 h-2.5 text-white" strokeWidth={2.5} />
                    </div>
                  )}
                </motion.div>
              ))}
            </div>

            {/* Count + label */}
            <div>
              <p className="text-4xl font-black tracking-[-0.04em] leading-none tabular-nums
                text-slate-900 dark:text-white">
                50,000+
              </p>
              <p className="font-mono text-[11px] uppercase tracking-[0.14em] mt-1.5
                text-slate-400 dark:text-white/30">
                Businesses &amp; Agencies
              </p>
            </div>
          </motion.div>

          {/* ── CENTER: trust message ──────────────────────────────────────── */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1, ease }}
            className="text-center max-w-sm"
          >
            {/* Dividers (desktop only) */}
            <div className="hidden lg:flex items-center gap-6 text-center">
              <div className="w-px h-12 bg-slate-200 dark:bg-white/[0.08] shrink-0" />
              <p className="text-sm leading-relaxed
                text-slate-500 dark:text-white/40">
                Trusted by local businesses and SEO agencies to generate{" "}
                <span className="font-semibold text-slate-700 dark:text-white/70">
                  Map Pack-ready
                </span>{" "}
                structured data — completely free, no account required.
              </p>
              <div className="w-px h-12 bg-slate-200 dark:bg-white/[0.08] shrink-0" />
            </div>
            {/* Mobile: no dividers */}
            <p className="lg:hidden text-sm leading-relaxed
              text-slate-500 dark:text-white/40">
              Trusted by local businesses and SEO agencies to generate{" "}
              <span className="font-semibold text-slate-700 dark:text-white/70">
                Map Pack-ready
              </span>{" "}
              structured data — completely free.
            </p>
          </motion.div>

          {/* ── RIGHT: premium badges ──────────────────────────────────────── */}
          <motion.div
            initial={{ opacity: 0, x: 18 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.55, delay: 0.15, ease }}
            className="flex flex-wrap justify-center lg:justify-end gap-2.5 shrink-0"
          >
            {BADGES.map(({ Icon, label, iconCls, iconBg, border, hover, dot }, i) => (
              <motion.div
                key={label}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.35, delay: 0.25 + i * 0.08, ease }}
                className={`
                  group flex items-center gap-2.5
                  pl-2.5 pr-4 py-2 rounded-full
                  border cursor-default
                  transition-all duration-250
                  bg-white dark:bg-white/[0.03]
                  ${border} ${hover}
                `}
              >
                {/* Icon box */}
                <div className={`w-7 h-7 rounded-full flex items-center justify-center shrink-0
                  transition-transform duration-200 group-hover:scale-110 ${iconBg}`}>
                  <Icon className={`w-3.5 h-3.5 ${iconCls}`} strokeWidth={2.25} />
                </div>

                {/* Label */}
                <span className="text-[13px] font-semibold whitespace-nowrap
                  text-slate-700 dark:text-white/75">
                  {label}
                </span>

                {/* Live dot */}
                <span className={`w-1.5 h-1.5 rounded-full shrink-0 ${dot}`} />
              </motion.div>
            ))}
          </motion.div>

        </div>
      </div>
    </section>
  );
}
