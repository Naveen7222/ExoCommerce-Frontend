// src/components/ui/Button.jsx
import React from 'react';
import clsx from 'clsx';
import { Link } from 'react-router-dom';

const variantClasses = {
  primary: 'bg-primary text-white hover:bg-primary-hover focus:ring-primary shadow-lg shadow-primary/30 hover:shadow-primary/50 overflow-hidden relative after:absolute after:inset-0 after:bg-white/20 after:translate-x-[-100%] hover:after:translate-x-[100%] after:transition-transform after:duration-500',
  secondary: 'bg-secondary text-white hover:bg-secondary-hover focus:ring-secondary shadow-lg shadow-secondary/30 hover:shadow-secondary/50',
  danger: 'bg-red-500 text-white hover:bg-red-600 focus:ring-red-500 shadow-lg shadow-red-500/30',
  ghost: 'bg-transparent text-primary hover:bg-primary/10 focus:ring-primary',
  gradient: 'bg-gradient-to-r from-primary to-[#FF9055] text-white hover:shadow-xl hover:shadow-primary/40 transform hover:-translate-y-0.5 focus:ring-primary border border-white/10',
  outline: 'border-2 border-primary/80 text-primary hover:bg-primary hover:text-white focus:ring-primary bg-transparent'
};

const sizeClasses = {
  sm: 'px-3 py-1.5 text-sm',
  md: 'px-6 py-3 text-base',
  lg: 'px-8 py-4 text-lg',
  icon: 'p-2.5', // For icon-only buttons
};

export function Button({
  children,
  variant = 'primary',
  size = 'md',
  className,
  to,
  isLoading = false,
  startIcon,
  endIcon,
  disabled,
  ...props
}) {
  const baseClasses =
    'font-semibold rounded-full shadow-md transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2 active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none disabled:shadow-none inline-flex items-center justify-center';

  const classes = clsx(
    baseClasses,
    variantClasses[variant],
    sizeClasses[size],
    className,
  );

  const content = (
    <>
      {isLoading && (
        <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-current" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
        </svg>
      )}
      {!isLoading && startIcon && <span className="mr-2">{startIcon}</span>}
      {children}
      {!isLoading && endIcon && <span className="ml-2">{endIcon}</span>}
    </>
  );

  if (to && !disabled) {
    return (
      <Link to={to} className={classes} {...props}>
        {content}
      </Link>
    );
  }

  return (
    <button className={classes} disabled={disabled || isLoading} {...props}>
      {content}
    </button>
  );
}   