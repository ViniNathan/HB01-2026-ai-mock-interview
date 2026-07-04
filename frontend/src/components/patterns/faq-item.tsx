import { Plus } from "lucide-react";

import {
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

type FaqItemProps = {
  question: string;
  answer: string;
  value: string;
};

function FaqItem({ question, answer, value }: FaqItemProps) {
  return (
    <AccordionItem value={value} className="border-b border-border-subtle">
      <AccordionTrigger className="group/faq-trigger flex items-center justify-between gap-6 rounded-none py-6 text-left no-underline hover:no-underline">
        <span className="font-display text-[1.4rem] tracking-[-0.04em] text-text-strong md:text-[1.65rem]">
          {question}
        </span>
        <span className="flex size-9 shrink-0 items-center justify-center rounded-full border border-border-subtle text-text-muted transition-transform duration-300 group-aria-expanded/faq-trigger:rotate-45">
          <Plus className="size-4" />
        </span>
      </AccordionTrigger>
      <AccordionContent className="pt-0 pb-6">
        <p className="max-w-2xl text-sm leading-7 text-text-muted md:text-base">
          {answer}
        </p>
      </AccordionContent>
    </AccordionItem>
  );
}

export type { FaqItemProps };
export { FaqItem };
