import { cva, type VariantProps } from "class-variance-authority";
import * as React from "react";

import { cn } from "@/lib/utils";

const surfaceVariants = cva("border", {
  variants: {
    variant: {
      default:
        "border-border-subtle bg-surface-base shadow-[var(--shadow-soft)]",
      elevated:
        "border-border-subtle bg-surface-elevated shadow-[var(--shadow-elevated)]",
      glass:
        "border-border-subtle bg-surface-glass backdrop-blur-xl shadow-[var(--shadow-glass)]",
      inverse:
        "border-border-inverse bg-surface-inverse text-text-inverse shadow-[var(--shadow-inverse)]",
      soft: "border-transparent bg-surface-soft",
    },
    padding: {
      none: "p-0",
      sm: "p-4",
      md: "p-5",
      lg: "p-6 md:p-7",
      xl: "p-7 md:p-10",
    },
    radius: {
      md: "rounded-2xl",
      lg: "rounded-[var(--radius-card)]",
      xl: "rounded-[var(--radius-panel)]",
      full: "rounded-[var(--radius-pill)]",
    },
  },
  defaultVariants: {
    variant: "default",
    padding: "md",
    radius: "lg",
  },
});

function Surface({
  className,
  variant,
  padding,
  radius,
  ...props
}: React.ComponentProps<"div"> & VariantProps<typeof surfaceVariants>) {
  return (
    <div
      data-slot="surface"
      className={cn(surfaceVariants({ variant, padding, radius, className }))}
      {...props}
    />
  );
}

export { Surface, surfaceVariants };
