"use client";

import Autoplay from "embla-carousel-autoplay";
import { Quote } from "lucide-react";
import * as React from "react";

import { Reveal } from "@/components/patterns/reveal";
import {
  Carousel,
  CarouselContent,
  CarouselDots,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { SectionHeader } from "@/components/ui/section-header";
import { Surface } from "@/components/ui/surface";

type TestimonialSlide = {
  title: string;
  description: string;
};

type TestimonialsSectionProps = {
  eyebrow: string;
  title: string;
  highlight: string;
  slides: readonly TestimonialSlide[];
};

function TestimonialsSection({
  eyebrow,
  title,
  highlight,
  slides,
}: TestimonialsSectionProps) {
  const [autoplay] = React.useState(() =>
    Autoplay({ delay: 5200, stopOnInteraction: true, stopOnMouseEnter: true }),
  );

  return (
    <section className="content-width section-spacing">
      <Reveal>
        <SectionHeader
          align="center"
          eyebrow={
            <p className="font-display text-2xl italic text-primary md:text-[2rem]">
              {eyebrow}
            </p>
          }
          title={
            <>
              {title}{" "}
              <span className="font-normal italic text-primary">
                {highlight}
              </span>
            </>
          }
        />
      </Reveal>

      <Carousel
        opts={{ loop: true, align: "center" }}
        plugins={[autoplay]}
        className="mx-auto mt-14 max-w-3xl"
      >
        <CarouselContent>
          {slides.map((slide, index) => (
            <CarouselItem key={index}>
              <Surface
                variant="elevated"
                radius="xl"
                padding="xl"
                className="text-center"
              >
                <Quote className="mx-auto size-8 text-primary/40" />
                <p className="mt-6 text-balance font-display text-2xl leading-tight tracking-[-0.03em] text-text-strong md:text-[1.9rem]">
                  {slide.title}
                </p>
                <p className="mt-6 text-sm uppercase tracking-[0.18em] text-text-muted">
                  {slide.description}
                </p>
              </Surface>
            </CarouselItem>
          ))}
        </CarouselContent>

        <div className="mt-8 flex items-center justify-center gap-5">
          <CarouselPrevious />
          <CarouselDots />
          <CarouselNext />
        </div>
      </Carousel>
    </section>
  );
}

export { TestimonialsSection };
