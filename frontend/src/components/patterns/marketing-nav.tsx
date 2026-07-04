"use client";

import { Menu, X } from "lucide-react";
import Link from "next/link";
import * as React from "react";

import { BrandMark } from "@/components/patterns/brand-mark";
import { LanguageSwitcher } from "@/components/patterns/language-switcher";
import { buttonVariants } from "@/components/ui/button";
import { IconButton } from "@/components/ui/icon-button";
import { Surface } from "@/components/ui/surface";
import { useLanguage } from "@/lib/i18n/language-provider";
import { cn } from "@/lib/utils";

function MarketingNav() {
  const { t } = useLanguage();
  const [open, setOpen] = React.useState(false);

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
            {t.nav.links.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="transition-colors duration-200 hover:text-text-strong"
              >
                {link.label}
              </Link>
            ))}
          </nav>

          <div className="flex items-center gap-2">
            <div className="hidden md:block">
              <LanguageSwitcher />
            </div>

            <Link
              href="/login"
              className={cn(
                buttonVariants({ variant: "inverse", size: "sm", shape: "pill" }),
                "hidden px-4 text-[0.6875rem] uppercase tracking-[0.18em] sm:inline-flex",
              )}
            >
              {t.nav.cta}
            </Link>

            <IconButton
              variant="pill"
              size="icon-sm"
              shape="pill"
              className="md:hidden"
              onClick={() => setOpen((prev) => !prev)}
              aria-label="Menu"
            >
              {open ? <X className="size-4" /> : <Menu className="size-4" />}
            </IconButton>
          </div>
        </Surface>

        {open ? (
          <Surface
            variant="glass"
            radius="lg"
            padding="md"
            className="mt-3 flex flex-col gap-1 shadow-[var(--shadow-soft)] md:hidden"
          >
            {t.nav.links.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setOpen(false)}
                className="rounded-xl px-3 py-2.5 text-sm text-text-muted transition-colors duration-200 hover:bg-surface-soft hover:text-text-strong"
              >
                {link.label}
              </Link>
            ))}

            <div className="mt-2 flex items-center justify-between gap-3 border-t border-border-subtle pt-3">
              <LanguageSwitcher />
              <Link
                href="/login"
                onClick={() => setOpen(false)}
                className={cn(
                  buttonVariants({ variant: "inverse", size: "sm", shape: "pill" }),
                  "px-4 text-[0.6875rem] uppercase tracking-[0.18em]",
                )}
              >
                {t.nav.cta}
              </Link>
            </div>
          </Surface>
        ) : null}
      </div>
    </header>
  );
}

export { MarketingNav };
