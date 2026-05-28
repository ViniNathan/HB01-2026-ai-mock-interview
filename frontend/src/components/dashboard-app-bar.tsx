import Link from "next/link";
import { Activity, ArrowUpRight, ShieldCheck } from "lucide-react";

import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export function DashboardAppBar() {
  return (
    <header className="content-width pt-5">
      <div className="glass-card flex flex-col gap-4 px-4 py-4 md:flex-row md:items-center md:justify-between md:px-6">
        <div className="space-y-2">
          <div className="flex items-center gap-2 text-[11px] uppercase tracking-[0.24em] text-muted-foreground">
            <Activity className="size-3.5 text-primary" />
            App workspace
          </div>
          <div>
            <h1 className="text-lg font-semibold tracking-[-0.03em] text-foreground md:text-xl">
              Dashboard do AI Mock Interview
            </h1>
            <p className="text-sm text-muted-foreground">
              Base visual do produto pronta para conectar upload, sessoes e
              streaming nas proximas iteracoes.
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <div className="hidden items-center gap-2 rounded-[6px] border border-white/8 bg-white/4 px-3 py-2 text-xs text-muted-foreground md:flex">
            <ShieldCheck className="size-3.5 text-primary" />
            Dashboard publico temporario
          </div>
          <Link
            href="/"
            className={cn(
              buttonVariants({ variant: "outline", size: "sm" }),
              "rounded-[6px] border-white/10 bg-transparent px-4 text-white hover:bg-white/6",
            )}
          >
            Ver landing
          </Link>
          <Link
            href="/login"
            className={cn(
              buttonVariants({ variant: "default", size: "sm" }),
              "rounded-[6px] px-4 font-semibold",
            )}
          >
            Entrar
            <ArrowUpRight className="size-3.5" />
          </Link>
        </div>
      </div>
    </header>
  );
}
