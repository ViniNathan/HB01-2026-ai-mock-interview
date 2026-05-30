import { Paperclip, SendHorizontal } from "lucide-react";

import { LevelPillGroup } from "@/components/patterns/level-pill-group";
import { Badge } from "@/components/ui/badge";
import { IconButton } from "@/components/ui/icon-button";
import { SectionHeader } from "@/components/ui/section-header";
import { Surface } from "@/components/ui/surface";

type PracticeSectionProps = {
  title: string;
  description: string;
  prompt: string;
  levels: readonly string[];
  activeLevel: string;
};

function PracticeSection({
  title,
  description,
  prompt,
  levels,
  activeLevel,
}: PracticeSectionProps) {
  return (
    <section
      id="practice"
      className="relative overflow-hidden bg-[#070808] py-24 md:py-36"
    >
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(11,139,115,0.22),transparent_28%),radial-gradient(circle_at_80%_60%,rgba(91,103,99,0.24),transparent_24%),linear-gradient(180deg,#090909_0%,#060707_100%)]" />
      <div className="content-width relative z-10">
        <SectionHeader
          align="center"
          title={<span className="text-text-inverse">{title}</span>}
          subtitle={
            <span className="text-text-inverse-muted">{description}</span>
          }
        />

        <Surface
          variant="glass"
          radius="xl"
          padding="xl"
          className="mx-auto mt-16 max-w-4xl bg-white/86 text-left shadow-[var(--shadow-inverse)]"
        >
          <h3 className="font-display text-2xl leading-tight tracking-[-0.04em] text-[#181614] md:text-[2.15rem] dark:text-text-strong">
            {prompt}
          </h3>

          <div className="mt-12 flex flex-wrap items-center gap-3 border-t border-border-subtle pt-6 text-sm text-text-muted">
            <Badge tone="neutral">Active Session</Badge>
            <LevelPillGroup levels={levels} active={activeLevel} />

            <div className="ml-auto flex items-center gap-2">
              <IconButton variant="pill" size="icon-sm" shape="pill">
                <Paperclip className="size-4" />
              </IconButton>
              <IconButton variant="primary" size="icon-sm" shape="pill">
                <SendHorizontal className="size-4" />
              </IconButton>
            </div>
          </div>
        </Surface>
      </div>
    </section>
  );
}

export { PracticeSection };
