import { Accordion } from "@/components/ui/accordion";
import { FaqItem, type FaqItemProps } from "@/components/patterns/faq-item";
import { Reveal } from "@/components/patterns/reveal";
import { SectionHeader } from "@/components/ui/section-header";

type FaqSectionProps = {
  eyebrow: string;
  title: string;
  items: readonly Omit<FaqItemProps, "value">[];
};

function FaqSection({ eyebrow, title, items }: FaqSectionProps) {
  return (
    <section id="about" className="content-width section-spacing">
      <Reveal>
        <SectionHeader
          align="center"
          eyebrow={
            <p className="font-display text-2xl italic text-primary md:text-[2rem]">
              {eyebrow}
            </p>
          }
          title={title}
        />
      </Reveal>

      <Reveal delay={0.1} className="mx-auto mt-14 max-w-3xl">
        <Accordion multiple>
          {items.map((item, index) => (
            <FaqItem key={item.question} value={String(index)} {...item} />
          ))}
        </Accordion>
      </Reveal>

      <div className="mt-14 flex justify-center">
        <div className="size-10 rounded-full bg-primary/10" />
      </div>
    </section>
  );
}

export { FaqSection };
