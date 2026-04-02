import React from "react";

interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  hover?: boolean;
  padding?: "none" | "sm" | "md" | "lg";
}

export function Card({
  className = "",
  hover = true,
  padding = "md",
  ...props
}: CardProps) {
  const padCls = padding === "none" ? "" : padding === "sm" ? "p-4" : padding === "lg" ? "p-8" : "p-6";
  return (
    <div
      className={[
        "bg-white dark:bg-[#0C1018]",
        "border border-slate-200 dark:border-white/[0.07]",
        "rounded-xl shadow-sm",
        padCls,
        "transition-all duration-200",
        hover ? "hover:shadow-md hover:border-slate-300 dark:hover:border-white/[0.12] hover:-translate-y-px" : "",
        className,
      ].join(" ")}
      {...props}
    />
  );
}
