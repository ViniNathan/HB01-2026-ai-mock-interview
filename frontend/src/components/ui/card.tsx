import { cva, type VariantProps } from "class-variance-authority";
import * as React from "react";

import { cn } from "@/lib/utils";

const cardVariants = cva(
  "group/card flex flex-col overflow-hidden border text-sm text-card-foreground",
  {
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
      },
      size: {
        default: "gap-5 py-5",
        sm: "gap-3 py-4",
      },
      radius: {
        lg: "rounded-[var(--radius-card)]",
        xl: "rounded-[var(--radius-panel)]",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
      radius: "lg",
    },
  },
);

function Card({
  className,
  size,
  radius,
  variant,
  ...props
}: React.ComponentProps<"div"> & VariantProps<typeof cardVariants>) {
  return (
    <div
      data-slot="card"
      className={cn(cardVariants({ variant, size, radius, className }))}
      {...props}
    />
  );
}

function CardHeader({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="card-header"
      className={cn(
        "grid auto-rows-min items-start gap-2 px-5 has-data-[slot=card-action]:grid-cols-[1fr_auto]",
        className,
      )}
      {...props}
    />
  );
}

function CardTitle({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="card-title"
      className={cn(
        "font-display text-[1.75rem] leading-none tracking-[-0.04em]",
        className,
      )}
      {...props}
    />
  );
}

function CardDescription({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="card-description"
      className={cn("text-sm leading-6 text-text-muted", className)}
      {...props}
    />
  );
}

function CardAction({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="card-action"
      className={cn("col-start-2 row-span-2 row-start-1 self-start", className)}
      {...props}
    />
  );
}

function CardContent({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="card-content"
      className={cn("px-5", className)}
      {...props}
    />
  );
}

function CardFooter({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="card-footer"
      className={cn(
        "flex items-center border-t border-border-subtle px-5 pt-5",
        className,
      )}
      {...props}
    />
  );
}

export {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
  cardVariants,
};
