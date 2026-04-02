"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import { ShieldCheck, Zap, Layers, TrendingUp } from "lucide-react";

// ─────────────────────────────────────────────────────────────────────────────
// DATA
// ─────────────────────────────────────────────────────────────────────────────

// Unsplash CDN photos — allowed by the existing `img-src 'self' data: https:` CSP
const AVATARS = [
  {
    src: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=96&h=96&fit=crop&crop=face&q=80",
    alt: "Mike R.",
  },
  {
    src: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=96&h=96&fit=crop&crop=face&q=80",
    alt: "Sarah C.",
  },
  {
    src: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=96&h=96&fit=crop&crop=face&q=80",
    alt: "James O.",
  },
  {
    src: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=96&h=96&fit=crop&crop=face&q=80",
    alt: "Anna L.",
  },
  {
    src: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=96&h=96&fit=crop&crop=face&q=80",
    alt: "Paul K.",
  },
] as const;

// All three badges share identical structure; only the gradient changes
const BADGES = [
  {
    Icon: ShieldCheck,
    label: "Google Compliant",
    gradient: "from-emerald-400 to-green-500",
    shadow:   "shadow-emerald-500/25",
    hoverRing:"hover:ring-emerald-200 dark:hover:ring-emerald-500/25",
  },
  {
    Icon: Zap,
    label: "Zero Sign-Up",
    gradient: "from-amber-400 to-orange-500",
    shadow:   "shadow-amber-500/25",
    hoverRing:"hover:ring-amber-200 dark:hover:ring-amber-500/25",
  },
  {
    Icon: Layers,
    label: "52+ Niches",
    gradient: "from-blue-400 to-indigo-500",
    shadow:   "shadow-blue-500/25",
    hoverRing:"hover:ring-blue-200 dark:hover:ring-blue-500/25",
  },
] as const;

// ─────────────────────────────────────────────────────────────────────────────
// ANIMATED COUNTER
// Counts from `from` to `to` over `duration` ms once the ref is in view.
// ─────────────────────────────────────────────────────────────────────────────
function AnimatedCounter({
  to,
  suffix = "",
  duration = 1800,
}: {
  to: number;
  suffix?: string;
  duration?: number;
}) {
  const ref  = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  const [value, setValue] = useState(0);
  const started = useRef(false);

  useEffect(() => {
    if (!inView || started.current) return;
    started.current = true;

    const start    = performance.now();
    const step     = (now: number) => {
      const progress = Math.min((now - start) / duration, 1);
      // Ease-out quart
      const eased = 1 - Math.pow(1 - progress, 4);
      setValue(Math.round(eased * to));
      if (progress < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }, [inView, to, duration]);

  return (
    <span ref={ref} className="tabular-nums">
      {value.toLocaleString()}{suffix}
    </span>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// ANIMATION VARIANTS
// ─────────────────────────────────────────────────────────────────────────────
const spring = { type: "spring", stiffness: 260, damping: 22 } as const;
const ease   = [0.16, 1, 0.3, 1] as const;

// ─────────────────────────────────────────────────────────────────────────────
// COMPONENT
// ─────────────────────────────────────────────────────────────────────────────
export default function StatsBar() {
  return (
    <section
      aria-label="Social proof"
      className="relative w-full py-12 md:py-16 px-4 sm:px-6 md:px-8
        border-y overflow-hidden
        bg-white border-slate-100
        dark:bg-[#0a0c12] dark:border-white/[0.06]"
    >
      {/* Depth texture — very subtle diagonal lines (light) */}
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.018] dark:opacity-0"
        style={{
          backgroundImage:
            "repeating-linear-gradient(135deg,#0f172a 0px,#0f172a 1px,transparent 1px,transparent 14px)",
        }}
      />
      {/* Teal bloom (dark only) */}
      <div className="absolute inset-0 pointer-events-none hidden dark:block
        bg-[radial-gradient(ellipse_70%_100%_at_50%_50%,rgba(0,212,200,0.04),transparent)]" />

      <div className="relative z-10 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-[auto_1fr_auto] items-center gap-10 lg:gap-0">

          {/* ━━ LEFT — Avatar stack + count ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
          <motion.div
            initial={{ opacity: 0, x: -24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease }}
            className="flex items-center gap-5 lg:pr-14"
          >
            {/* Overlapping avatar photos */}
            <div className="flex -space-x-3.5" role="img" aria-label="Satisfied users">
              {AVATARS.map(({ src, alt }, i) => (
                <motion.div
                  key={alt}
                  initial={{ opacity: 0, scale: 0.75 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ ...spring, delay: i * 0.07 }}
                  className="relative"
                >
                  <div
                    className="w-11 h-11 rounded-full overflow-hidden
                      ring-[3px] ring-white dark:ring-[#0a0c12]
                      shadow-[0_2px_8px_rgba(0,0,0,0.14)]"
                  >
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={src}
                      alt={alt}
                      width={44}
                      height={44}
                      className="w-full h-full object-cover"
                      loading="lazy"
                      decoding="async"
                    />
                  </div>

                  {/* Trending badge on last avatar */}
                  {i === AVATARS.length - 1 && (
                    <div
                      className="absolute -bottom-1 -right-1 z-10
                        w-5 h-5 rounded-full
                        bg-gradient-to-br from-teal-400 to-teal-600
                        ring-2 ring-white dark:ring-[#0a0c12]
                        flex items-center justify-center
                        shadow-[0_0_8px_rgba(20,184,166,0.55)]"
                    >
                      <TrendingUp className="w-2.5 h-2.5 text-white" strokeWidth={2.5} />
                    </div>
                  )}
                </motion.div>
              ))}
            </div>

            {/* Number + label */}
            <div>
              <p
                className="text-[2.25rem] font-black tracking-[-0.045em] leading-none
                  text-transparent bg-clip-text
                  bg-gradient-to-r from-slate-900 to-slate-600
                  dark:from-white dark:to-white/60"
              >
                <AnimatedCounter to={50000} suffix="+" />
              </p>
              <p className="font-mono text-[10.5px] uppercase tracking-[0.16em] mt-2
                text-slate-400 dark:text-white/28">
                Businesses &amp; Agencies
              </p>
            </div>
          </motion.div>

          {/* ━━ CENTER — Trust copy ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
          <motion.div
            initial={{ opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.55, delay: 0.1, ease }}
            className="flex items-center gap-0 lg:border-x
              lg:border-slate-100 lg:dark:border-white/[0.07]
              lg:px-14 justify-center"
          >
            <p className="text-[15px] leading-[1.7] text-center max-w-[300px]
              text-slate-500 dark:text-white/38">
              Trusted by local businesses and SEO agencies to generate{" "}
              <span className="font-semibold
                text-slate-800 dark:text-white/75">
                Map Pack-ready
              </span>{" "}
              structured data — completely free, no account required.
            </p>
          </motion.div>

          {/* ━━ RIGHT — Unified badges ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
          <motion.div
            initial={{ opacity: 0, x: 24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.15, ease }}
            className="flex flex-col gap-2.5 lg:pl-14"
          >
            {BADGES.map(({ Icon, label, gradient, shadow, hoverRing }, i) => (
              <motion.div
                key={label}
                initial={{ opacity: 0, x: 14 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: 0.22 + i * 0.09, ease }}
                className={`
                  group flex items-center gap-3
                  pl-2 pr-5 py-2 rounded-full
                  bg-white dark:bg-white/[0.04]
                  border border-slate-200 dark:border-white/[0.08]
                  shadow-sm
                  ring-2 ring-transparent
                  transition-all duration-200 cursor-default
                  hover:-translate-y-px hover:shadow-md hover:border-slate-300
                  dark:hover:border-white/[0.14]
                  ${hoverRing}
                `}
              >
                {/* Icon — gradient circle, identical size on all three */}
                <div
                  className={`
                    w-7 h-7 rounded-full shrink-0
                    bg-gradient-to-br ${gradient}
                    shadow-sm ${shadow}
                    flex items-center justify-center
                    transition-transform duration-200 group-hover:scale-110
                  `}
                >
                  <Icon className="w-3.5 h-3.5 text-white" strokeWidth={2.25} />
                </div>

                {/* Label — identical typography on all three */}
                <span className="text-[13px] font-medium whitespace-nowrap
                  text-slate-700 dark:text-white/70">
                  {label}
                </span>
              </motion.div>
            ))}
          </motion.div>

        </div>
      </div>
    </section>
  );
}
