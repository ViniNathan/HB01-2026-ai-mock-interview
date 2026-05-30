import * as React from "react";

import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

type SectionHeaderProps = {
  align?: "left" | "center";
  eyebrow?: React.ReactNode;
  title: React.ReactNode;
  subtitle?: React.ReactNode;
  className?: string;
};

function SectionHeader({
  align = "left",
  eyebrow,
  title,
  subtitle,
  className,
}: SectionHeaderProps) {
  return (
    <div
      className={cn(
        "space-y-5",
        align === "center" && "mx-auto max-w-3xl text-center",
        className,
      )}
    >
      {typeof eyebrow === "string" ? <Badge>{eyebrow}</Badge> : eyebrow}
      <div className="space-y-4">
        <h2 className="font-display text-4xl leading-none tracking-[-0.06em] text-text-strong md:text-[3.5rem]">
          {title}
        </h2>
        {subtitle ? (
          <p className="text-sm leading-7 text-text-muted md:text-base">
            {subtitle}
          </p>
        ) : null}
      </div>
    </div>
  );
}

export { SectionHeader };
