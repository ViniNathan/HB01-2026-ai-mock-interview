import { cn } from "@/lib/utils";

type OrbStripSectionProps = {
  tones: readonly string[];
};

const toneClasses: Record<string, string> = {
  graphite: "bg-[#1b1b1b]",
  brand:
    "bg-[radial-gradient(circle_at_32%_28%,var(--brand-orb-highlight)_0%,var(--brand-orb-mid)_28%,var(--brand-orb)_72%,var(--brand-orb-deep)_100%)] shadow-[var(--shadow-orb)]",
  stone: "bg-[#5b6763]",
  aurora: "bg-[linear-gradient(135deg,#14866f_0%,#8be1cf_100%)]",
  fog: "bg-[#d8ddd9]",
  ember: "bg-[linear-gradient(135deg,#d85b58_0%,#2f8880_100%)]",
  pearl: "bg-[#e5e2e0]",
  mint: "bg-[#0b8b73]",
};

function OrbStripSection({ tones }: OrbStripSectionProps) {
  return (
    <section className="overflow-hidden py-12 md:py-16">
      <div className="content-width">
        <div className="grid grid-flow-col justify-center gap-5">
          {tones.map((tone, index) => (
            <div
              key={`${tone}-${index}`}
              className={cn(
                "size-14 shrink-0 rounded-full shadow-[0_14px_28px_rgba(17,14,12,0.16)] md:size-16",
                index % 2 === 0
                  ? "[animation:orb-sway-up_4.8s_ease-in-out_infinite]"
                  : "[animation:orb-sway-down_4.8s_ease-in-out_infinite]",
                toneClasses[tone],
              )}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

export { OrbStripSection };
