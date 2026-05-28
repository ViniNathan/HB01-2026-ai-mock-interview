import { Plus } from "lucide-react";

type FaqItemProps = {
  question: string;
  answer: string;
};

function FaqItem({ question, answer }: FaqItemProps) {
  return (
    <details className="group border-b border-border-subtle py-6">
      <summary className="flex list-none items-center justify-between gap-6 text-left [&::-webkit-details-marker]:hidden">
        <span className="font-display text-[1.4rem] tracking-[-0.04em] text-text-strong md:text-[1.65rem]">
          {question}
        </span>
        <span className="flex size-9 items-center justify-center rounded-full border border-border-subtle text-text-muted transition-transform duration-300 group-open:rotate-45">
          <Plus className="size-4" />
        </span>
      </summary>
      <p className="max-w-2xl pt-4 text-sm leading-7 text-text-muted md:text-base">
        {answer}
      </p>
    </details>
  );
}

export type { FaqItemProps };
export { FaqItem };
