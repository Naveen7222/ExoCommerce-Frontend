import React from "react";
import clsx from "clsx";

// ---------- Main Card Container ----------
export function Card({ children, className }) {
  return (
    <div
      className={clsx(
        "bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden transition-all duration-300 hover:shadow-2xl hover:shadow-gray-200/50 hover:-translate-y-1 group",
        className
      )}
    >
      {children}
    </div>
  );
}

// ---------- Card Header ----------
export function CardHeader({ children, className }) {
  return (
    <div
      className={clsx(
        "p-4 border-b border-neutral-100 font-semibold text-neutral-900 text-lg",
        className
      )}
    >
      {children}
    </div>
  );
}

// ---------- Card Image ----------
export function CardImage({ src, alt, className }) {
  return (
    <div className={clsx("w-full h-48 overflow-hidden bg-neutral-100", className)}>
      <img
        src={src}
        alt={alt || "Card Image"}
        className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
      />
    </div>
  );
}

// ---------- Card Body ----------
export function CardBody({ children, className }) {
  return (
    <div className={clsx("p-4 text-neutral-600 text-sm leading-relaxed", className)}>
      {children}
    </div>
  );
}

// ---------- Card Footer ----------
export function CardFooter({ children, className }) {
  return (
    <div
      className={clsx(
        "p-4 border-t border-neutral-100 bg-neutral-50 flex justify-end gap-2",
        className
      )}
    >
      {children}
    </div>
  );
}
