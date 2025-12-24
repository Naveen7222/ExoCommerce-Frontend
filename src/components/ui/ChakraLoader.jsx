import { useNavigation } from "react-router";

import clsx from "clsx";

export default function ChakraLoader({
  manualLoading = false,
  position = "fixed", // "fixed" | "absolute" | "relative"
  size = "md",
  className
}) {
  const navigation = useNavigation();

  // React Router v7 state: 'idle', 'submitting', or 'loading'
  const isLoading = navigation.state !== "idle" || manualLoading;

  if (!isLoading) return null;

  // Sizes for the Naruto image (increased again per user request)
  // Options: "sm" | "md" | "lg"
  const sizeClasses = {
    sm: "h-16", // ~64px (was 48px)
    md: "h-24", // ~96px (was 64px)
    lg: "h-32", // ~128px
  };

  const positionClasses = {
    fixed: "fixed top-0 left-0 w-full",
    absolute: "absolute top-0 left-0 w-full",
    relative: "relative w-full",
  };

  return (
    <div
      className={clsx(
        "z-[9999] pointer-events-none flex flex-col justify-end items-center", // Center runner
        positionClasses[position] || positionClasses.fixed,
        className
      )}
    >
      {/* Naruto Running Container - Centered & Stationary */}
      <div
        className="relative flex justify-center items-end"
        style={{
          // Match container height to image height
          height: size === "sm" ? "4rem" : size === "md" ? "6rem" : "8rem"
        }}
      >
        <div className="relative z-10">
          {/* The Runner with Aura */}
          <img
            src="/exocommerce/naruto-run.gif"
            alt="Loading..."
            className={clsx(
              "w-auto object-contain drop-shadow-[0_0_15px_rgba(249,115,22,0.6)]", // Orange Aura
              sizeClasses[size] || sizeClasses.md
            )}
          />
          {/* Speed Dust / Smoke */}
          <div className="absolute bottom-0 right-0 h-2 w-12 bg-white/40 blur-md rounded-full animate-pulse" />
        </div>
      </div>

      {/* The Moving Track - Simulates Speed */}
      <div className="h-2 w-full overflow-hidden bg-gray-200/50 relative">
        <div
          className="absolute inset-0 h-full w-full"
          style={{
            background: "repeating-linear-gradient(90deg, #f97316 0, #f97316 20%, transparent 20%, transparent 40%)",
            backgroundSize: "100px 100%",
            animation: "track-move 0.5s linear infinite"
          }}
        />
      </div>

      <style>
        {`
          @keyframes track-move {
            0% { background-position: 0 0; }
            100% { background-position: -100px 0; }
          }
        `}
      </style>
    </div>
  );
}