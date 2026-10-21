import * as React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@/lib/utils';

const badgeVariants = cva(
  'inline-flex items-center rounded-full px-3 py-1 text-xs font-medium transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2',
  {
    variants: {
      variant: {
        default: 'liquid-glass-subtle text-foreground hover:liquid-glass',
        secondary:
          'liquid-glass-subtle text-secondary-foreground hover:liquid-glass',
        destructive:
          'bg-destructive/80 text-destructive-foreground backdrop-blur-sm rounded-full',
        outline:
          'border border-[var(--glass-border)] bg-transparent backdrop-blur-sm text-foreground',
        glass: 'liquid-glass text-foreground',
        flat: 'bg-secondary/80 text-secondary-foreground border border-border/50',
        accent:
          'border border-point-50 bg-point-10 text-foreground shadow-[0_0_0_1px_color-mix(in_srgb,var(--gradient-mid)_20%,transparent)]',
      },
    },
    defaultVariants: {
      variant: 'default',
    },
  }
);

export interface BadgeProps
  extends
    React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof badgeVariants> {}

function Badge({ className, variant, ...props }: BadgeProps) {
  return (
    <div className={cn(badgeVariants({ variant }), className)} {...props} />
  );
}

export { Badge, badgeVariants };
