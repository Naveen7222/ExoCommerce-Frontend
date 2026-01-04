import clsx from "clsx";

export default function Input({
  label,
  type = "text",
  className,
  wrapperClassName,
  startIcon,
  endIcon,
  error,
  fullWidth = true,
  multiline = false,
  rows = 3,
  labelClassName,
  ...props
}) {
  const Component = multiline ? "textarea" : "input";

  return (
    <div className={clsx("flex flex-col mb-4", fullWidth && "w-full", wrapperClassName)}>
      {label && (
        <label className={clsx("block text-sm font-medium mb-2", labelClassName || "text-slate-300")}>
          {label}
        </label>
      )}
      <div className="relative">
        {startIcon && (
          <div className={clsx(
            "absolute left-0 pl-3 flex pointer-events-none text-gray-400",
            multiline ? "top-3" : "inset-y-0 items-center"
          )}>
            {startIcon}
          </div>
        )}

        <Component
          type={!multiline ? type : undefined}
          rows={multiline ? rows : undefined}
          className={clsx(
            "w-full border border-white/10 bg-white/5 rounded-xl py-3 text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all duration-200 hover:bg-white/10 hover:border-white/20 hover:shadow-lg hover:shadow-primary/5",
            startIcon ? "pl-10" : "pl-4",
            endIcon ? "pr-12" : "pr-4",
            error && "border-red-500 focus:ring-red-500",
            multiline && "resize-none",
            className
          )}
          {...props}
        />

        {endIcon && (
          <div className={clsx(
            "absolute right-0 pr-3 flex",
            multiline ? "top-3" : "inset-y-0 items-center"
          )}>
            {endIcon}
          </div>
        )}
      </div>
      {error && <p className="mt-1 text-sm text-red-500">{error}</p>}
    </div>
  );
}
