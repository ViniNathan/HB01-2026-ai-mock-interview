import Link from "next/link";

import { ChatPreview } from "@/components/patterns/chat-preview";
import { Reveal } from "@/components/patterns/reveal";
import { SectionHeader } from "@/components/ui/section-header";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

type HeroSectionProps = {
  kicker: string;
  title: string;
  highlight: string;
  ctaHref: string;
  ctaLabel: string;
  supportingText: string;
  preview: {
    sessionLabel: string;
    question: string;
    answer: string;
    prompt: string;
    contextTitle: string;
    contextBody: string;
  };
};

function HeroSection({
  kicker,
  title,
  highlight,
  ctaHref,
  ctaLabel,
  supportingText,
  preview,
}: HeroSectionProps) {
  return (
    <section
      id="product"
      className="content-width relative overflow-hidden pt-32 pb-24 md:pt-[10.5rem] md:pb-32"
    >
      <div className="absolute inset-x-10 top-10 h-64 rounded-full bg-[radial-gradient(circle,rgba(11,139,115,0.1)_0%,transparent_70%)] blur-3xl" />
      <Reveal>
        <SectionHeader
          align="center"
          eyebrow={
            <p className="text-[0.6875rem] font-medium uppercase tracking-[0.34em] text-text-muted">
              {kicker}
            </p>
          }
          title={
            <>
              {title}
              <span className="mt-3 block font-normal italic text-primary">
                {highlight}
              </span>
            </>
          }
        />
      </Reveal>

      <Reveal delay={0.12}>
        <ChatPreview {...preview} />
      </Reveal>

      <Reveal delay={0.2}>
        <div className="mt-16 text-center">
          <Link
            href={ctaHref}
            className={cn(
              buttonVariants({ variant: "inverse", size: "xl", shape: "pill" }),
              "px-7 text-[0.6875rem] uppercase tracking-[0.24em]",
            )}
          >
            {ctaLabel}
          </Link>
          <p className="mt-4 text-sm text-text-muted">{supportingText}</p>
        </div>
      </Reveal>
    </section>
  );
}

export { HeroSection };
