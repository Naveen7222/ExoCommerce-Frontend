import React, { useEffect } from "react";
import { createPortal } from "react-dom";
import clsx from "clsx";

const CloseIcon = () => (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 6 6 18" /><path d="m6 6 18 18" /></svg>
);
const SuccessIcon = () => (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-green-500"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" /><path d="m9 11 3 3L22 4" /></svg>
);
const ErrorIcon = () => (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-red-500"><circle cx="12" cy="12" r="10" /><path d="m15 9-6 6" /><path d="m9 9 6 6" /></svg>
);

export default function Toast({ message, type = "success", onClose, duration = 3000 }) {
    useEffect(() => {
        if (message) {
            const timer = setTimeout(() => {
                onClose();
            }, duration);
            return () => clearTimeout(timer);
        }
    }, [message, duration, onClose]);

    if (!message) return null;

    return createPortal(
        <div className="fixed top-5 right-5 z-50 animate-slide-in">
            <div className={clsx(
                "flex items-center gap-3 px-4 py-3 rounded-xl shadow-2xl backdrop-blur-md border border-white/20 min-w-[300px]",
                type === "success" ? "bg-white/90 text-gray-800" : "bg-white/90 text-gray-800"
            )}>
                <div className={clsx("p-2 rounded-full bg-opacity-10", type === "success" ? "bg-green-100" : "bg-red-100")}>
                    {type === "success" ? <SuccessIcon /> : <ErrorIcon />}
                </div>
                <div className="flex-1">
                    <h4 className="font-semibold text-sm">{type === 'success' ? 'Success' : 'Error'}</h4>
                    <p className="text-sm text-gray-600">{message}</p>
                </div>
                <button onClick={onClose} className="text-gray-400 hover:text-gray-600 transition-colors">
                    <CloseIcon />
                </button>
            </div>
            <style>{`
            @keyframes slide-in {
                from { transform: translateX(100%); opacity: 0; }
                to { transform: translateX(0); opacity: 1; }
            }
            .animate-slide-in {
                animation: slide-in 0.4s cubic-bezier(0.16, 1, 0.3, 1) forwards;
            }
        `}</style>
        </div>,
        document.body
    );
}
