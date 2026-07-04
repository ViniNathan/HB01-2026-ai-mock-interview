import {
  FeatureCard,
  type FeatureCardProps,
} from "@/components/patterns/feature-card";
import { Reveal, RevealGroup, RevealItem } from "@/components/patterns/reveal";
import {
  TopicStatusCard,
  type TopicStatusCardProps,
} from "@/components/patterns/topic-status-card";
import { SectionHeader } from "@/components/ui/section-header";
import { Surface } from "@/components/ui/surface";

type FeaturesSectionProps = {
  heading: string;
  highlight: string;
  features: readonly FeatureCardProps[];
  topics: readonly TopicStatusCardProps[];
  topicTracking: {
    title: string;
    titleLine2: string;
    description: string;
  };
};

function FeaturesSection({
  heading,
  highlight,
  features,
  topics,
  topicTracking,
}: FeaturesSectionProps) {
  return (
    <section id="features" className="content-width section-spacing">
      <Reveal>
        <SectionHeader
          align="center"
          title={
            <>
              {heading}{" "}
              <span className="font-normal italic text-primary">
                {highlight}
              </span>
            </>
          }
        />
      </Reveal>

      <RevealGroup className="mt-16 grid gap-5 md:grid-cols-2 xl:grid-cols-4">
        {features.map((card) => (
          <RevealItem key={card.title}>
            <FeatureCard {...card} />
          </RevealItem>
        ))}

        <RevealItem className="xl:col-span-4">
          <Surface variant="elevated" padding="xl" radius="xl">
            <div className="grid gap-8 md:grid-cols-[0.9fr_1.1fr] md:items-center">
              <div>
                <h3 className="font-display text-[2.4rem] leading-none tracking-[-0.05em] text-text-strong md:text-[3.3rem]">
                  {topicTracking.title}
                  <span className="block">{topicTracking.titleLine2}</span>
                </h3>
                <p className="mt-5 max-w-md text-sm leading-7 text-text-muted md:text-base">
                  {topicTracking.description}
                </p>
              </div>

              <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-3">
                {topics.map((card) => (
                  <TopicStatusCard key={card.title} {...card} />
                ))}
              </div>
            </div>
          </Surface>
        </RevealItem>
      </RevealGroup>
    </section>
  );
}

export { FeaturesSection };
