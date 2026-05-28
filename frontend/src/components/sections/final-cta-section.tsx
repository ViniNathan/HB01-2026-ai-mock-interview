import Link from "next/link";

import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

type FinalCtaSectionProps = {
  title: string;
  highlight: string;
  ctaHref: string;
  ctaLabel: string;
};

function FinalCtaSection({
  title,
  highlight,
  ctaHref,
  ctaLabel,
}: FinalCtaSectionProps) {
  return (
    <section className="relative overflow-hidden bg-[#060606] py-24 md:py-32">
      <div className="absolute inset-0 opacity-30 [background-image:radial-gradient(1px_1px_at_20px_30px,rgba(255,255,255,0.8),transparent),radial-gradient(1.5px_1.5px_at_120px_80px,rgba(255,255,255,0.75),transparent),radial-gradient(1px_1px_at_60px_140px,rgba(255,255,255,0.6),transparent),radial-gradient(1px_1px_at_170px_40px,rgba(255,255,255,0.65),transparent)] [background-size:220px_220px] [background-repeat:repeat]" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(255,255,255,0.12),transparent_16%),radial-gradient(circle_at_70%_40%,rgba(255,255,255,0.08),transparent_18%),linear-gradient(135deg,rgba(255,255,255,0.02),transparent_45%)]" />
      <div className="content-width relative z-10 text-center">
        <h2 className="font-display text-5xl leading-none tracking-[-0.06em] text-text-inverse md:text-[5rem]">
          {title}
          <span className="mt-2 block font-normal italic text-text-inverse">
            {highlight}
          </span>
        </h2>

        <Link
          href={ctaHref}
          className={cn(
            buttonVariants({ variant: "outline", size: "lg", shape: "pill" }),
            "mt-10 border-white/20 bg-white text-[#090909] hover:bg-white/90",
          )}
        >
          {ctaLabel}
        </Link>
      </div>
    </section>
  );
}

export { FinalCtaSection };
