import { Bot, Check, Terminal } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Surface } from "@/components/ui/surface";

type ChatPreviewProps = {
  sessionLabel: string;
  question: string;
  answer: string;
  prompt: string;
  contextTitle: string;
  contextBody: string;
};

function ChatPreview({
  sessionLabel,
  question,
  answer,
  prompt,
  contextTitle,
  contextBody,
}: ChatPreviewProps) {
  return (
    <div className="relative mx-auto mt-14 max-w-5xl md:mt-16">
      <Surface
        variant="elevated"
        radius="xl"
        padding="none"
        className="overflow-hidden shadow-[var(--shadow-hero)]"
      >
        <div className="border-b border-border-subtle bg-surface-soft px-4 py-3">
          <div className="flex items-center justify-between gap-4">
            <div className="flex items-center gap-2">
              <span className="size-2.5 rounded-full bg-[#ef8e8e]" />
              <span className="size-2.5 rounded-full bg-[#d8bea1]" />
              <span className="size-2.5 rounded-full bg-primary/60" />
            </div>
            <Badge
              tone="neutral"
              className="shadow-[0_8px_20px_rgba(25,20,18,0.06)]"
            >
              <span className="relative flex size-2.5">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-primary/35" />
                <span className="relative inline-flex size-2.5 rounded-full bg-primary" />
              </span>
              {sessionLabel}
            </Badge>
            <div className="w-10" />
          </div>
        </div>

        <div className="space-y-6 p-5 md:p-8">
          <div className="flex gap-4">
            <div className="flex size-9 shrink-0 items-center justify-center rounded-full bg-primary/12 text-primary">
              <Bot className="size-4" />
            </div>
            <div className="max-w-[82%] rounded-[1.5rem] rounded-tl-md bg-surface-soft px-5 py-4 text-sm leading-7 text-text-base md:text-[15px]">
              {question}
            </div>
          </div>

          <div className="flex justify-end gap-4">
            <div className="max-w-[82%] rounded-[1.5rem] rounded-tr-md bg-primary px-5 py-4 text-sm leading-7 text-primary-foreground md:text-[15px]">
              {answer}
            </div>
            <div className="flex size-9 shrink-0 items-center justify-center rounded-full bg-[#202020] text-white dark:bg-white dark:text-black">
              <Check className="size-4" />
            </div>
          </div>

          <div className="flex gap-4">
            <div className="flex size-9 shrink-0 items-center justify-center rounded-full bg-primary/12 text-primary">
              <Bot className="size-4" />
            </div>
            <div className="rounded-full bg-surface-soft px-4 py-3">
              <div className="flex items-center gap-1.5">
                <span className="size-2 rounded-full bg-text-soft/55" />
                <span className="size-2 rounded-full bg-text-soft/55" />
                <span className="size-2 rounded-full bg-text-soft/55" />
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-border-subtle bg-surface-elevated px-5 py-4 md:px-8">
          <div className="flex items-center gap-3 rounded-[var(--radius-pill)] border border-border-subtle bg-surface-base px-4 py-3 text-sm text-text-muted">
            <Terminal className="size-4 text-text-muted" />
            <span className="truncate">{prompt}</span>
            <span className="relative ml-auto flex size-2.5">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-primary/35" />
              <span className="relative inline-flex size-2.5 rounded-full bg-primary" />
            </span>
          </div>
        </div>
      </Surface>

      <Surface
        variant="glass"
        radius="lg"
        padding="md"
        className="absolute -left-4 top-20 hidden max-w-[220px] [animation:float_8.5s_ease-in-out_infinite] md:block"
      >
        <p className="text-[0.625rem] font-semibold uppercase tracking-[0.26em] text-primary">
          {contextTitle}
        </p>
        <p className="mt-3 text-sm leading-6 text-text-muted">{contextBody}</p>
      </Surface>

      <div className="absolute -bottom-10 right-0 size-32 rounded-full bg-[radial-gradient(circle_at_32%_28%,var(--brand-orb-highlight)_0%,var(--brand-orb-mid)_28%,var(--brand-orb)_72%,var(--brand-orb-deep)_100%)] shadow-[var(--shadow-orb)] [animation:float_7s_ease-in-out_infinite] md:size-40" />
    </div>
  );
}

export { ChatPreview };
