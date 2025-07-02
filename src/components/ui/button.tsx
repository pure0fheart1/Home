'use client';

import * as React from 'react';
import { cn } from '@/lib/utils';

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost' | 'link' | 'gold';
  size?: 'sm' | 'md' | 'lg' | 'xl';
  loading?: boolean;
  icon?: React.ReactNode;
  iconPosition?: 'left' | 'right';
  fullWidth?: boolean;
  children: React.ReactNode;
}

const buttonVariants = {
  primary: 'bg-foreground text-background hover:bg-foreground/90 focus:ring-foreground/20',
  secondary: 'bg-muted text-muted-foreground hover:bg-muted/80 focus:ring-muted/20',
  outline: 'border border-border bg-transparent hover:bg-muted focus:ring-border/20',
  ghost: 'bg-transparent hover:bg-muted focus:ring-muted/20',
  link: 'bg-transparent text-accent hover:text-accent/80 underline-offset-4 hover:underline focus:ring-accent/20',
  gold: 'bg-gradient-to-r from-primary-gold to-primary-gold-dark text-primary-black hover:from-primary-gold-dark hover:to-primary-gold focus:ring-primary-gold/20 shadow-gold',
};

const buttonSizes = {
  sm: 'h-8 px-3 text-xs font-medium',
  md: 'h-10 px-4 py-2 text-sm font-medium',
  lg: 'h-12 px-6 py-3 text-base font-medium',
  xl: 'h-14 px-8 py-4 text-lg font-semibold',
};

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      className,
      variant = 'primary',
      size = 'md',
      loading = false,
      icon,
      iconPosition = 'left',
      fullWidth = false,
      disabled,
      children,
      ...props
    },
    ref
  ) => {
    const isDisabled = disabled || loading;

    return (
      <button
        ref={ref}
        className={cn(
          // Base styles
          'inline-flex items-center justify-center gap-2 rounded-lg font-medium transition-all duration-200 ease-smooth',
          'focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-background',
          'disabled:pointer-events-none disabled:opacity-50',
          'relative overflow-hidden',
          'hover:scale-[1.02] active:scale-[0.98]',
          
          // Variant styles
          buttonVariants[variant],
          
          // Size styles
          buttonSizes[size],
          
          // Full width
          fullWidth && 'w-full',
          
          className
        )}
        disabled={isDisabled}
        {...props}
      >
        {/* Loading spinner */}
        {loading && (
          <div className="absolute inset-0 flex items-center justify-center bg-inherit">
            <div className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin" />
          </div>
        )}
        
        {/* Content */}
        <div className={cn('flex items-center gap-2', loading && 'opacity-0')}>
          {icon && iconPosition === 'left' && (
            <span className="w-4 h-4 flex-shrink-0">{icon}</span>
          )}
          
          <span>{children}</span>
          
          {icon && iconPosition === 'right' && (
            <span className="w-4 h-4 flex-shrink-0">{icon}</span>
          )}
        </div>
        
        {/* Shimmer effect for gold variant */}
        {variant === 'gold' && !isDisabled && (
          <div className="absolute inset-0 bg-shimmer opacity-20" />
        )}
      </button>
    );
  }
);

Button.displayName = 'Button'; 