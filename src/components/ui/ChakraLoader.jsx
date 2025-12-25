import { useNavigation } from "react-router";
import clsx from "clsx";

export default function ChakraLoader({
  manualLoading = false,
  position = "fixed",
  size = "md",
  className
}) {
  const navigation = useNavigation();
  const isLoading = navigation.state !== "idle" || manualLoading;

  if (!isLoading) return null;

  // SIGNIFICANTLY DECREASED SIZES
  const sizeClasses = {
    sm: "h-12",
    md: "h-16",
    lg: "h-24",
  };

  return (
    <div
      className={clsx(
        "z-[9999] inset-0 flex items-center justify-center overflow-hidden animate-[screen-shake_0.4s_ease-in-out]",
        position === "fixed" ? "fixed" : "absolute",
        className
      )}
    >
      {/* 1. LAYERED BACKGROUND */}
      <div className="absolute inset-0 bg-black/70 backdrop-blur-md" />
      <div className="absolute inset-0 opacity-20">
        <div className="absolute inset-0 bg-[linear-gradient(110deg,transparent_0%,rgba(249,115,22,0.6)_50%,transparent_100%)] bg-[length:250%_100%] animate-[bg-move_1.2s_linear_infinite]" />
      </div>

      {/* 2. WIND PARTICLES (Scale maintained, quantity reduced for small view) */}
      <div className="absolute inset-0 pointer-events-none">
        {[...Array(6)].map((_, i) => (
          <div
            key={i}
            className="absolute bg-orange-400/30 blur-sm rounded-full animate-[wind_0.6s_linear_infinite]"
            style={{
              width: `${Math.random() * 80 + 50}px`,
              height: '1px',
              top: `${Math.random() * 100}%`,
              left: '-20%',
              animationDelay: `${Math.random() * 1}s`
            }}
          />
        ))}
      </div>

      {/* 3. CENTRAL CHARACTER STAGE */}
      <div className="relative flex flex-col items-center">

        {/* Swirling Energy Rings - Scaled down to match runner */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[140%] h-[140%] pointer-events-none">
          <div className="absolute inset-0 border-[2px] border-orange-500/40 rounded-full animate-[ping_1.2s_linear_infinite]" />
          <div className="absolute inset-0 border border-blue-500/10 rounded-full animate-[spin_4s_linear_infinite] scale-110" />
        </div>

        {/* Naruto Runner */}
        <div className="relative z-10 transform-gpu transition-all duration-500">
          <img
            src="/exocommerce/naruto-run.gif"
            alt="Loading..."
            className={clsx(
              "relative z-20 w-auto object-contain drop-shadow-[0_0_20px_rgba(249,115,22,0.8)] filter brightness-125 saturate-150",
              sizeClasses[size]
            )}
          />
          {/* Reduced Ground Bloom */}
          <div className="absolute -bottom-4 left-1/2 -translate-x-1/2 w-[120%] h-4 bg-orange-600/40 blur-[20px] rounded-full animate-pulse" />
        </div>

        {/* 4. DYNAMIC TEXT - Scaled down */}
        <div className="mt-8 text-center">
          <p className="text-blue-400 text-[8px] font-black tracking-[0.5em] uppercase mb-1 animate-pulse">
            Chakra: Critical
          </p>
          <h2 className="text-xl font-black italic text-transparent bg-clip-text bg-gradient-to-r from-orange-600 via-white to-orange-500 bg-[length:200%_auto] animate-[text-shine_2s_linear_infinite] filter drop-shadow-[0_0_8px_rgba(249,115,22,0.4)]">
            LOADING...
          </h2>
        </div>
      </div>

      <style>
        {`
          @keyframes bg-move {
            0% { background-position: 250% 0; }
            100% { background-position: -250% 0; }
          }
          @keyframes wind {
            0% { transform: translateX(-100%) skewX(-45deg); opacity: 0; }
            50% { opacity: 0.8; }
            100% { transform: translateX(800%) skewX(-45deg); opacity: 0; }
          }
          @keyframes screen-shake {
            0% { transform: scale(1.05) translate(0, 0); }
            20% { transform: scale(1.05) translate(-2px, 2px); }
            40% { transform: scale(1.05) translate(-2px, -2px); }
            100% { transform: scale(1) translate(0, 0); }
          }
          @keyframes text-shine {
            to { background-position: 200% center; }
          }
        `}
      </style>
    </div>
  );
}