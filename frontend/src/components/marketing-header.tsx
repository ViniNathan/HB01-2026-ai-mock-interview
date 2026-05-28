import Link from "next/link";

import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const links = [
  { href: "#como-funciona", label: "Como funciona" },
  { href: "#feedback", label: "Feedback" },
  { href: "#revisao", label: "Revisao" },
] as const;

export function MarketingHeader() {
  return (
    <header className="content-width sticky top-0 z-20 pt-5">
      <div className="glass-card flex items-center justify-between px-4 py-3 md:px-6">
        <Link href="/" className="flex items-center gap-3">
          <span className="size-2.5 rounded-full bg-primary shadow-[0_0_24px_rgba(0,220,130,0.8)]" />
          <div>
            <p className="text-[11px] uppercase tracking-[0.28em] text-muted-foreground">
              AI Mock Interview
            </p>
            <p className="text-sm font-semibold tracking-[-0.02em] text-foreground">
              Conversas tecnicas com postura de Tech Lead
            </p>
          </div>
        </Link>

        <nav className="hidden items-center gap-6 text-sm text-muted-foreground md:flex">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="transition-colors hover:text-foreground"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <Link
            href="/login"
            className={cn(
              buttonVariants({ variant: "outline", size: "sm" }),
              "rounded-[6px] border-white/10 bg-transparent px-4 text-white hover:bg-white/6",
            )}
          >
            Login
          </Link>
          <Link
            href="/dashboard"
            className={cn(
              buttonVariants({ variant: "default", size: "sm" }),
              "rounded-[6px] px-4 font-semibold",
            )}
          >
            Abrir dashboard
          </Link>
        </div>
      </div>
    </header>
  );
}
