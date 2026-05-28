import Link from "next/link";

import { cn } from "@/lib/utils";

type BrandMarkProps = {
  href?: string;
  caption?: string;
  compact?: boolean;
  theme?: "default" | "inverse";
  className?: string;
};

function BrandMark({
  href = "/",
  caption = "AI mock interview",
  compact = false,
  theme = "default",
  className,
}: BrandMarkProps) {
  const content = (
    <>
      <span
        className={cn(
          "block rounded-full bg-[radial-gradient(circle_at_32%_28%,var(--brand-orb-highlight)_0%,var(--brand-orb-mid)_28%,var(--brand-orb)_72%,var(--brand-orb-deep)_100%)] shadow-[var(--shadow-orb)]",
          compact ? "size-7" : "size-8",
        )}
      />
      <span className="flex items-baseline gap-2">
        <span
          className={cn(
            "font-display text-xl tracking-[-0.04em]",
            theme === "inverse" ? "text-text-inverse" : "text-text-strong",
          )}
        >
          Hone
        </span>
        <span
          className={cn(
            "hidden text-[0.625rem] uppercase tracking-[0.24em] md:block",
            theme === "inverse" ? "text-text-inverse-muted" : "text-text-muted",
          )}
        >
          {caption}
        </span>
      </span>
    </>
  );

  return href ? (
    <Link
      href={href}
      className={cn("inline-flex items-center gap-3", className)}
    >
      {content}
    </Link>
  ) : (
    <div className={cn("inline-flex items-center gap-3", className)}>
      {content}
    </div>
  );
}

export { BrandMark };
