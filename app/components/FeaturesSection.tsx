"use client";

import { motion } from "framer-motion";
import {
  MapPin,
  ToggleLeft,
  Zap,
  ShieldCheck,
  ArrowRight,
  Layers,
  Clock,
  DollarSign,
} from "lucide-react";

// ─────────────────────────────────────────────────────────────────────────────
// DATA
// ─────────────────────────────────────────────────────────────────────────────
const STATS = [
  {
    Icon: Layers,
    value: "52+",
    label: "Schema Types",
    valueColor:
      "text-teal-600 dark:text-teal-400",
  },
  {
    Icon: Clock,
    value: "<30s",
    label: "To Generate",
    valueColor:
      "text-slate-900 dark:text-white",
  },
  {
    Icon: DollarSign,
    value: "$0",
    label: "Forever Free",
    valueColor:
      "text-emerald-600 dark:text-emerald-400",
  },
] as const;

interface Feature {
  Icon: React.ComponentType<{ className?: string; strokeWidth?: number }>;
  title: string;
  badge?: string;
  bigValue?: string;
  description: string;
  highlight?: string;
  highlightAfter?: string;
  link?: { text: string; href: string };
  linkAfter?: string;
  gradient: string;
  glowColor: string;
  badgeCls?: string;
  hoverBorder: string;
  topAccent: string;
}

const FEATURES: Feature[] = [
  {
    Icon: ToggleLeft,
    badge: "SAB MODE",
    title: "1-Click SAB Toggle",
    description:
      "Operate out of your home? One toggle removes your street address from the JSON-LD output — keeping you fully",
    highlight: "Google-compliant",
    highlightAfter:
      " and invisible to competitors who don't know this rule exists.",
    gradient: "from-teal-500 to-cyan-400",
    glowColor: "shadow-teal-500/20",
    badgeCls:
      "bg-teal-50 text-teal-700 border border-teal-100 dark:bg-teal-500/10 dark:text-teal-400 dark:border-teal-500/20",
    hoverBorder:
      "hover:border-teal-300/70 dark:hover:border-teal-500/30 hover:shadow-[0_12px_40px_-8px_rgba(20,184,166,0.12)]",
    topAccent: "via-teal-500/50",
  },
  {
    Icon: Zap,
    bigValue: "30s",
    title: "Lightning Fast",
    description:
      "No account creation. No paywalls. No tutorial to sit through. Fill in your details, click Copy, paste into your site header. Done. Your Map Pack position starts improving immediately.",
    gradient: "from-amber-400 to-orange-400",
    glowColor: "shadow-amber-500/20",
    hoverBorder:
      "hover:border-amber-300/60 dark:hover:border-amber-500/30 hover:shadow-[0_12px_40px_-8px_rgba(245,158,11,0.10)]",
    topAccent: "via-amber-400/50",
  },
  {
    Icon: ShieldCheck,
    title: "100% Schema.org Compliant",
    description:
      "Every output is validated against Google's structured data guidelines and Schema.org standards. Use the built-in",
    link: {
      text: "Rich Results Test",
      href: "https://search.google.com/test/rich-results",
    },
    linkAfter: " to verify your schema is live and error-free in under 60 seconds.",
    gradient: "from-emerald-500 to-green-400",
    glowColor: "shadow-emerald-500/20",
    hoverBorder:
      "hover:border-emerald-300/60 dark:hover:border-emerald-500/30 hover:shadow-[0_12px_40px_-8px_rgba(16,185,129,0.10)]",
    topAccent: "via-emerald-500/50",
  },
];

// ─────────────────────────────────────────────────────────────────────────────
// ANIMATION VARIANTS
// ─────────────────────────────────────────────────────────────────────────────
const ease = [0.16, 1, 0.3, 1] as const;

const fadeUp = {
  hidden: { opacity: 0, y: 28 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease } },
};

const fadeRight = (delay: number) => ({
  hidden: { opacity: 0, x: 22 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.5, delay, ease },
  },
});

const scaleUp = (delay: number) => ({
  hidden: { opacity: 0, scale: 0.88 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.4, delay, ease },
  },
});

// ─────────────────────────────────────────────────────────────────────────────
// COMPONENT
// ─────────────────────────────────────────────────────────────────────────────
export default function FeaturesSection() {
  return (
    <section
      className="w-full py-20 md:py-32 px-4 sm:px-6 md:px-8 relative z-10
        bg-white dark:bg-[#07090E]"
    >
      <div className="max-w-7xl mx-auto">

        {/* ── Section header ─────────────────────────────────────────────── */}
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="mb-12 md:mb-18"
        >
          <p className="font-mono text-[11px] uppercase tracking-[0.16em] mb-4
            text-teal-600 dark:text-teal-400/60">
            Why LocalSchema
          </p>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-black tracking-[-0.03em]
            leading-[1.05] max-w-2xl
            text-slate-900 dark:text-white">
            Built for the{" "}
            <span className="text-transparent bg-clip-text
              bg-gradient-to-r from-teal-500 to-cyan-500
              dark:from-teal-400 dark:to-cyan-300">
              Map Pack
            </span>
            ,<br className="hidden sm:block" /> not the tag cloud.
          </h2>
          <p className="mt-5 text-lg max-w-xl leading-relaxed font-light
            text-slate-600 dark:text-white/35">
            Generic schema generators output{" "}
            <code className="font-mono text-sm px-1.5 py-0.5 rounded border
              text-slate-600 bg-slate-100 border-slate-200
              dark:text-white/50 dark:bg-white/[0.06] dark:border-white/[0.07]">
              LocalBusiness
            </code>{" "}
            for everyone. We output{" "}
            <code className="font-mono text-sm px-1.5 py-0.5 rounded border
              text-teal-700 bg-teal-50 border-teal-200
              dark:text-teal-400/80 dark:bg-teal-500/[0.07] dark:border-teal-500/[0.14]">
              Plumber
            </code>
            {", "}
            <code className="font-mono text-sm px-1.5 py-0.5 rounded border
              text-teal-700 bg-teal-50 border-teal-200
              dark:text-teal-400/80 dark:bg-teal-500/[0.07] dark:border-teal-500/[0.14]">
              Dentist
            </code>
            {", and 50+ precise types that Google's local algorithm actually rewards."}
          </p>
        </motion.div>

        {/* ── Two-column grid ────────────────────────────────────────────── */}
        <div className="grid lg:grid-cols-[1fr_1fr] gap-5 md:gap-6 items-start">

          {/* ── LEFT: Map Pack Dominance card ─────────────────────────────── */}
          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="relative rounded-3xl overflow-hidden
              border border-slate-200 dark:border-white/[0.08]
              shadow-[0_4px_24px_-8px_rgba(0,0,0,0.06)]
              dark:shadow-[0_0_60px_-15px_rgba(0,212,200,0.10)]
              bg-gradient-to-br from-slate-50 to-white
              dark:from-[#0C1018] dark:to-[#080C14]
              p-8 md:p-10 lg:sticky lg:top-24"
          >
            {/* Top-edge teal glow line */}
            <div className="absolute top-0 left-0 right-0 h-px
              bg-gradient-to-r from-transparent via-teal-500/40 to-transparent" />

            {/* Background teal radial (dark only) */}
            <div className="absolute top-0 left-0 w-72 h-72 pointer-events-none
              bg-[radial-gradient(ellipse_at_top_left,rgba(0,212,200,0.05),transparent_65%)]
              dark:bg-[radial-gradient(ellipse_at_top_left,rgba(0,212,200,0.09),transparent_65%)]" />

            {/* Icon box */}
            <div className="relative z-10 w-14 h-14 rounded-2xl flex items-center
              justify-center mb-8 shadow-lg shadow-teal-500/25
              bg-gradient-to-br from-teal-500 to-cyan-400">
              <MapPin className="w-7 h-7 text-white" strokeWidth={2} />
            </div>

            {/* Headline */}
            <div className="relative z-10">
              <h3 className="text-2xl md:text-3xl lg:text-[28px] xl:text-3xl
                font-black tracking-tight mb-5 leading-tight
                text-slate-900 dark:text-white">
                Google Map Pack{" "}
                <span className="text-transparent bg-clip-text
                  bg-gradient-to-r from-teal-500 to-cyan-500
                  dark:from-teal-400 dark:to-cyan-300">
                  Dominance
                </span>
              </h3>

              <p className="text-base leading-relaxed font-light mb-9
                text-slate-600 dark:text-white/40 max-w-sm">
                Using the specific{" "}
                <code className="font-mono text-[13px] px-1.5 py-0.5 rounded border
                  text-teal-700 bg-teal-50 border-teal-200
                  dark:text-teal-400/80 dark:bg-teal-500/[0.08] dark:border-teal-500/[0.15]">
                  Plumber
                </code>{" "}
                or{" "}
                <code className="font-mono text-[13px] px-1.5 py-0.5 rounded border
                  text-teal-700 bg-teal-50 border-teal-200
                  dark:text-teal-400/80 dark:bg-teal-500/[0.08] dark:border-teal-500/[0.15]">
                  HVACBusiness
                </code>{" "}
                schema type instead of the generic{" "}
                <code className="font-mono text-[13px] px-1.5 py-0.5 rounded border
                  text-slate-500 bg-slate-100 border-slate-200
                  dark:text-white/40 dark:bg-white/[0.05] dark:border-white/[0.07]">
                  LocalBusiness
                </code>{" "}
                sends a categorical relevance signal directly to Google&apos;s local ranking algorithm.
              </p>

              {/* Stat pills */}
              <div className="grid grid-cols-3 gap-3">
                {STATS.map(({ Icon, value, label, valueColor }, i) => (
                  <motion.div
                    key={label}
                    variants={scaleUp(0.1 + i * 0.08)}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                    className="flex flex-col items-center justify-center gap-1.5
                      py-4 px-2 rounded-2xl text-center
                      bg-white border border-slate-200 shadow-sm
                      dark:bg-white/[0.03] dark:border-white/[0.08]"
                  >
                    <Icon className="w-4 h-4 text-slate-400 dark:text-white/25 shrink-0" />
                    <span className={`text-2xl font-black leading-none tabular-nums ${valueColor}`}>
                      {value}
                    </span>
                    <span className="font-mono text-[9.5px] uppercase tracking-wider
                      text-slate-400 dark:text-white/25 leading-tight">
                      {label}
                    </span>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>

          {/* ── RIGHT: Feature cards stack ────────────────────────────────── */}
          <div className="flex flex-col gap-4">
            {FEATURES.map((f, i) => (
              <motion.div
                key={f.title}
                variants={fadeRight(i * 0.1)}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                className={[
                  "group relative rounded-2xl overflow-hidden",
                  "bg-white dark:bg-[#0C1018]",
                  "border border-slate-200 dark:border-white/[0.07]",
                  "shadow-sm",
                  "transition-all duration-300",
                  f.hoverBorder,
                  "p-6 md:p-7",
                ].join(" ")}
              >
                {/* Colored top-border accent — appears on hover */}
                <div className={[
                  "absolute top-0 left-0 right-0 h-[2.5px]",
                  "bg-gradient-to-r from-transparent",
                  f.topAccent,
                  "to-transparent",
                  "opacity-0 group-hover:opacity-100 transition-opacity duration-300",
                ].join(" ")} />

                <div className="flex items-start gap-4">
                  {/* Icon / value box */}
                  <div className={[
                    "w-12 h-12 rounded-xl flex items-center justify-center shrink-0",
                    "shadow-lg",
                    f.glowColor,
                    `bg-gradient-to-br ${f.gradient}`,
                  ].join(" ")}>
                    {f.bigValue ? (
                      <span className="text-white font-black text-base leading-none">
                        {f.bigValue}
                      </span>
                    ) : (
                      <f.Icon className="w-6 h-6 text-white" strokeWidth={2} />
                    )}
                  </div>

                  {/* Text */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center flex-wrap gap-2 mb-2">
                      <h3 className="text-[17px] font-bold leading-snug tracking-tight
                        text-slate-900 dark:text-white">
                        {f.title}
                      </h3>
                      {f.badge && (
                        <span className={`text-[10px] font-bold uppercase tracking-wider
                          px-2 py-0.5 rounded-full ${f.badgeCls ?? ""}`}>
                          {f.badge}
                        </span>
                      )}
                    </div>

                    <p className="text-[15px] leading-relaxed font-light
                      text-slate-600 dark:text-white/40">
                      {f.highlight ? (
                        <>
                          {f.description}{" "}
                          <span className="text-teal-600 dark:text-teal-400 font-medium
                            underline decoration-teal-400/40 underline-offset-2">
                            {f.highlight}
                          </span>
                          {f.highlightAfter}
                        </>
                      ) : f.link ? (
                        <>
                          {f.description}{" "}
                          <a
                            href={f.link.href}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-1 font-medium
                              text-emerald-600 dark:text-emerald-400
                              hover:text-emerald-700 dark:hover:text-emerald-300
                              transition-colors group/lnk"
                          >
                            {f.link.text}
                            <ArrowRight
                              className="w-3 h-3 transition-transform
                                group-hover/lnk:translate-x-0.5"
                              strokeWidth={2.5}
                            />
                          </a>
                          {f.linkAfter}
                        </>
                      ) : (
                        f.description
                      )}
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

        </div>
      </div>
    </section>
  );
}
