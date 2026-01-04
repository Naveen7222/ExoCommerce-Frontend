import React from "react";
import clsx from "clsx";

// ---------- Main Card Container ----------
export function Card({ children, className }) {
  return (
    <div
      className={clsx(
        "bg-[#1E293B]/70 backdrop-blur-md rounded-3xl shadow-lg border border-white/5 overflow-hidden transition-all duration-500 hover:shadow-[0_20px_40px_-15px_rgba(249,115,22,0.2)] hover:border-primary/30 hover:-translate-y-2 group relative z-0",
        className
      )}
    >
      {/* Subtle background glow effect on hover */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-primary/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none -z-10" />
      {children}
    </div>
  );
}

// ---------- Card Header ----------
export function CardHeader({ children, className }) {
  return (
    <div
      className={clsx(
        "p-5 border-b border-white/5 font-bold text-white text-lg",
        className
      )}
    >
      {children}
    </div>
  );
}

// ---------- Card Image ----------
export function CardImage({ src, alt, className, ...props }) {
  return (
    <div className={clsx("w-full h-64 overflow-hidden bg-slate-800 relative", className)}>
      {/* Skeleton placeholder behind image? For now just bg color */}
      <img
        src={src}
        alt={alt || "Card Image"}
        className="w-full h-full object-cover transition-transform duration-700 hover:scale-110"
        {...props}
      />
    </div>
  );
}

// ---------- Card Body ----------
export function CardBody({ children, className }) {
  return (
    <div className={clsx("p-5 text-slate-400 text-sm leading-relaxed", className)}>
      {children}
    </div>
  );
}

// ---------- Card Footer ----------
export function CardFooter({ children, className }) {
  return (
    <div
      className={clsx(
        "p-5 border-t border-white/5 bg-black/20 backdrop-blur-sm flex justify-end gap-2",
        className
      )}
    >
      {children}
    </div>
  );
}
