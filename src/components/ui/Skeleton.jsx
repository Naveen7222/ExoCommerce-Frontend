import React from "react";
import clsx from "clsx";

export default function Skeleton({ className, ...props }) {
    return (
        <div
            className={clsx("animate-pulse bg-gray-200 rounded-md", className)}
            {...props}
        />
    );
}

export function ProductCardSkeleton() {
    return (
        <div className="bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden h-full flex flex-col">
            {/* Image Skeleton */}
            <div className="h-56 bg-gray-200 animate-pulse" />

            <div className="p-5 flex flex-col flex-grow space-y-3">
                {/* Title Skeleton */}
                <div className="h-6 bg-gray-200 rounded w-3/4 animate-pulse" />

                {/* Description Skeleton */}
                <div className="space-y-2">
                    <div className="h-4 bg-gray-200 rounded w-full animate-pulse" />
                    <div className="h-4 bg-gray-200 rounded w-5/6 animate-pulse" />
                </div>

                {/* Price Skeleton */}
                <div className="mt-auto pt-4 flex items-center justify-between">
                    <div className="h-8 bg-gray-200 rounded w-1/3 animate-pulse" />
                </div>
            </div>

            {/* Footer Skeleton */}
            <div className="p-4 border-t border-gray-100 bg-gray-50/50">
                <div className="h-10 bg-gray-200 rounded-full w-full animate-pulse" />
            </div>
        </div>
    );
}
