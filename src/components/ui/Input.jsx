import clsx from "clsx";

export default function Input({
  label,
  type = "text",
  className,
  startIcon,
  endIcon,
  error,
  fullWidth = true,
  multiline = false,
  rows = 3,
  ...props
}) {
  const Component = multiline ? "textarea" : "input";

  return (
    <div className={clsx("flex flex-col mb-4", fullWidth && "w-full")}>
      {label && (
        <label className="block text-sm font-medium text-gray-700 mb-2">
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
            "w-full border border-gray-300 rounded-lg py-3 focus:outline-none focus:ring-2 focus:ring-violet-500 focus:border-transparent transition-all duration-200",
            startIcon && "pl-10",
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
