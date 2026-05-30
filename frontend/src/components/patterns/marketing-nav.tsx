import Link from "next/link";

import { BrandMark } from "@/components/patterns/brand-mark";
import { Surface } from "@/components/ui/surface";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const defaultLinks = [
  { href: "#product", label: "Product" },
  { href: "#features", label: "Features" },
  { href: "#practice", label: "Practice" },
  { href: "#about", label: "About" },
] as const;

function MarketingNav() {
  return (
    <header className="fixed inset-x-0 top-0 z-40">
      <div className="content-width pt-5">
        <Surface
          variant="glass"
          radius="full"
          padding="sm"
          className="flex items-center justify-between gap-4 shadow-[var(--shadow-soft)]"
        >
          <BrandMark />

          <nav className="hidden items-center gap-8 text-sm text-text-muted md:flex">
            {defaultLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="transition-colors duration-200 hover:text-text-strong"
              >
                {link.label}
              </Link>
            ))}
          </nav>

          <Link
            href="/login"
            className={cn(
              buttonVariants({ variant: "inverse", size: "sm", shape: "pill" }),
              "px-4 text-[0.6875rem] uppercase tracking-[0.18em]",
            )}
          >
            Get started
          </Link>
        </Surface>
      </div>
    </header>
  );
}

export { MarketingNav };
