import Link from "next/link";

import { BrandMark } from "@/components/patterns/brand-mark";

function MarketingFooter() {
  return (
    <footer className="border-t border-border-subtle py-16">
      <div className="content-width flex flex-col items-center gap-8 text-center">
        <BrandMark />

        <div className="flex flex-wrap items-center justify-center gap-6 text-[0.6875rem] font-medium uppercase tracking-[0.24em] text-text-muted">
          <Link href="#">X</Link>
          <Link href="#">LinkedIn</Link>
          <Link href="#">Instagram</Link>
          <Link href="#">Legal</Link>
          <Link href="#">Privacy</Link>
        </div>

        <div className="space-y-2 text-[0.6875rem] uppercase tracking-[0.24em] text-text-muted">
          <p>(c) 2026 Hone AI. All rights reserved.</p>
          <p>Cosmic curiosity</p>
        </div>
      </div>
    </footer>
  );
}

export { MarketingFooter };
