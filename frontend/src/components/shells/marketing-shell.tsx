import * as React from "react";

import { MarketingNav } from "@/components/patterns/marketing-nav";

function MarketingShell({ children }: { children: React.ReactNode }) {
  return (
    <main className="relative overflow-x-hidden">
      <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(rgba(23,19,17,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(23,19,17,0.02)_1px,transparent_1px)] [background-size:88px_88px]" />
      <MarketingNav />
      <div className="relative z-10">{children}</div>
    </main>
  );
}

export { MarketingShell };
