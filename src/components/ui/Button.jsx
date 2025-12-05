// src/components/ui/Button.jsx
import React from 'react';
import clsx from 'clsx'; 
import { Link } from 'react-router-dom'; // Import Link for routing support

// 1. Define Style Mapping based on the 'variant' prop
const variantClasses = {
  // Uses custom primary-500 from tailwind.config.js
  primary: 'bg-primary-500 text-white hover:bg-primary-600 focus:ring-primary-500',
  // Uses Tailwind default grays for a muted look
  secondary: 'bg-gray-200 text-text-base hover:bg-gray-300 focus:ring-gray-300', 
  // Uses custom danger color (if defined) or a standard red
  danger: 'bg-red-600 text-white hover:bg-red-700 focus:ring-red-600', 
  // For text-only links/buttons
  ghost: 'bg-transparent text-primary-500 hover:text-primary-600 hover:bg-gray-100 focus:ring-primary-500 border-none',
};

// 2. Define Size Mapping based on the 'size' prop
const sizeClasses = {
  sm: 'px-3 py-1.5 text-sm',
  md: 'px-4 py-2 text-base', // Standard/Default size
  lg: 'px-6 py-3 text-lg',
};

// 3. The main Button component definition
export function Button({
  children,
  variant = 'primary',    // Default: brand color
  size = 'md',            // Default: medium
  className,              // For external custom classes
  to,                     // Optional prop for React Router Link
  ...props                // Catch-all for standard HTML attributes (onClick, type, disabled)
}) {
  // Styles applied to ALL buttons
  const baseClasses = 
    'font-semibold rounded-ecom-md shadow-md transition-all duration-150 focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed inline-flex items-center justify-center';

  // Combine all class strings using clsx for conditional class management
  const classes = clsx(
    baseClasses,
    variantClasses[variant], // Add the variant styles
    sizeClasses[size],       // Add the size styles
    className,               // Add any external classes
  );

  // If 'to' prop is present, render as a React Router Link
  if (to) {
    return (
      <Link to={to} className={classes} {...props}>
        {children}
      </Link>
    );
  }

  // Otherwise, render as a standard HTML button
  return (
    <button className={classes} {...props}>
      {children}
    </button>
  );
}   