"use client";

import { FaqSection } from "@/components/sections/faq-section";
import { FeaturesSection } from "@/components/sections/features-section";
import { FinalCtaSection } from "@/components/sections/final-cta-section";
import { HeroSection } from "@/components/sections/hero-section";
import { MarketingFooter } from "@/components/sections/marketing-footer";
import { OrbStripSection } from "@/components/sections/orb-strip-section";
import { PracticeSection } from "@/components/sections/practice-section";
import { TestimonialsSection } from "@/components/sections/testimonials-section";
import { MarketingShell } from "@/components/shells/marketing-shell";
import { useLanguage } from "@/lib/i18n/language-provider";

const orbTones = [
  "graphite",
  "brand",
  "stone",
  "aurora",
  "fog",
  "ember",
  "pearl",
  "mint",
] as const;

export default function Home() {
  const { t } = useLanguage();

  return (
    <MarketingShell>
      <HeroSection
        kicker={t.hero.kicker}
        title={t.hero.title}
        highlight={t.hero.highlight}
        ctaHref="/login"
        ctaLabel={t.hero.ctaLabel}
        supportingText={t.hero.supportingText}
        preview={t.hero.preview}
      />

      <FeaturesSection
        heading={t.features.heading}
        highlight={t.features.highlight}
        features={t.features.cards}
        topics={t.features.topics}
        topicTracking={t.features.topicTracking}
      />

      <PracticeSection
        title={t.practice.title}
        description={t.practice.description}
        prompt={t.practice.prompt}
        levels={t.practice.levels}
        activeLevel={t.practice.activeLevel}
        activeSessionLabel={t.practice.activeSessionLabel}
      />

      <OrbStripSection tones={orbTones} />

      <TestimonialsSection
        eyebrow={t.carousel.eyebrow}
        title={t.carousel.title}
        highlight={t.carousel.highlight}
        slides={t.carousel.slides}
      />

      <FaqSection
        eyebrow={t.faq.eyebrow}
        title={t.faq.title}
        items={t.faq.items}
      />

      <FinalCtaSection
        title={t.finalCta.title}
        highlight={t.finalCta.highlight}
        ctaHref="/login"
        ctaLabel={t.finalCta.ctaLabel}
      />

      <MarketingFooter />
    </MarketingShell>
  );
}
