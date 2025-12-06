import React from "react";
import clsx from "clsx";

// ---------- Main Card Container ----------
export function Card({ children, className }) {
  return (
    <div
      className={clsx(
        "bg-white rounded-xl shadow-md border border-neutral-200 overflow-hidden",
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
        "p-4 border-b border-neutral-200 font-semibold text-neutral-900",
        className
      )}
    >
      {children}
    </div>
  );
}

// ---------- Card Body ----------
export function CardBody({ children, className }) {
  return (
    <div className={clsx("p-4 text-neutral-800", className)}>
      {children}
    </div>
  );
}

// ---------- Card Footer ----------
export function CardFooter({ children, className }) {
  return (
    <div
      className={clsx(
        "p-4 border-t border-neutral-200 bg-neutral-50 text-neutral-700",
        className
      )}
    >
      {children}
    </div>
  );
}
