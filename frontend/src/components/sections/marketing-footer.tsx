"use client";

import Link from "next/link";

import { BrandMark } from "@/components/patterns/brand-mark";
import { useLanguage } from "@/lib/i18n/language-provider";

function MarketingFooter() {
  const { t } = useLanguage();

  return (
    <footer className="border-t border-border-subtle py-16">
      <div className="content-width flex flex-col items-center gap-8 text-center">
        <BrandMark caption={t.footer.caption} />

        <div className="flex flex-wrap items-center justify-center gap-6 text-[0.6875rem] font-medium uppercase tracking-[0.24em] text-text-muted">
          {t.footer.links.map((label) => (
            <Link key={label} href="#">
              {label}
            </Link>
          ))}
        </div>

        <div className="space-y-2 text-[0.6875rem] uppercase tracking-[0.24em] text-text-muted">
          <p>{t.footer.copyright}</p>
          <p>{t.footer.tagline}</p>
        </div>
      </div>
    </footer>
  );
}

export { MarketingFooter };
