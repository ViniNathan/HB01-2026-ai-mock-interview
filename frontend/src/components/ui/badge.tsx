import { cva, type VariantProps } from "class-variance-authority";
import * as React from "react";

import { cn } from "@/lib/utils";

const badgeVariants = cva(
  "inline-flex items-center gap-2 border text-[0.625rem] font-semibold uppercase tracking-[0.22em]",
  {
    variants: {
      tone: {
        brand: "",
        success: "",
        critical: "",
        neutral: "",
        inverse: "",
      },
      emphasis: {
        soft: "",
        solid: "",
        outline: "",
      },
    },
    compoundVariants: [
      {
        tone: "brand",
        emphasis: "soft",
        className:
          "border-transparent bg-primary/12 text-primary dark:bg-primary/16",
      },
      {
        tone: "brand",
        emphasis: "solid",
        className: "border-primary bg-primary text-primary-foreground",
      },
      {
        tone: "brand",
        emphasis: "outline",
        className: "border-border-strong bg-transparent text-text-base",
      },
      {
        tone: "success",
        emphasis: "soft",
        className:
          "border-transparent bg-[var(--status-success-surface)] text-[var(--status-success-foreground)]",
      },
      {
        tone: "critical",
        emphasis: "soft",
        className:
          "border-transparent bg-[var(--status-critical-surface)] text-[var(--status-critical-foreground)]",
      },
      {
        tone: "neutral",
        emphasis: "soft",
        className:
          "border-transparent bg-[var(--status-neutral-surface)] text-[var(--status-neutral-foreground)]",
      },
      {
        tone: "inverse",
        emphasis: "soft",
        className: "border-border-inverse bg-white/8 text-text-inverse",
      },
      {
        tone: "inverse",
        emphasis: "solid",
        className: "border-white/0 bg-white text-text-inverse",
      },
      {
        tone: "neutral",
        emphasis: "outline",
        className: "border-border-subtle bg-surface-base text-text-base",
      },
    ],
    defaultVariants: {
      tone: "brand",
      emphasis: "soft",
    },
  },
);

function Badge({
  className,
  tone,
  emphasis,
  ...props
}: React.ComponentProps<"span"> & VariantProps<typeof badgeVariants>) {
  return (
    <span
      data-slot="badge"
      className={cn(
        badgeVariants({ tone, emphasis }),
        "rounded-[var(--radius-pill)] px-3 py-1.5",
        className,
      )}
      {...props}
    />
  );
}

export { Badge, badgeVariants };
