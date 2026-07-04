import { Badge } from "@/components/ui/badge";
import { Surface } from "@/components/ui/surface";
import { cn } from "@/lib/utils";

type FeatureCardProps = {
  title: string;
  description: string;
  variant: "resume" | "senior" | "stream" | "review";
  badge?: string;
};

function FeatureCard({ title, description, variant, badge }: FeatureCardProps) {
  return (
    <Surface
      variant={variant === "senior" ? "elevated" : "default"}
      radius="xl"
      padding="lg"
      className={cn(
        "min-h-[260px] transition-[transform,box-shadow] duration-[var(--motion-base)] hover:-translate-y-1.5 hover:shadow-[var(--shadow-elevated)]",
        variant === "senior" && "border-primary/35",
      )}
    >
      <div className="flex items-start justify-between gap-4">
        <h3 className="font-display text-[1.85rem] leading-none tracking-[-0.04em] text-text-strong">
          {title}
        </h3>
        {badge ? <Badge emphasis="solid">{badge}</Badge> : null}
      </div>

      <div className="mt-7">
        {variant === "resume" ? (
          <div className="space-y-3 opacity-75">
            <div className="h-2.5 rounded-full bg-black/8 dark:bg-white/8" />
            <div className="h-2.5 w-4/5 rounded-full bg-black/8 dark:bg-white/8" />
            <div className="h-2.5 w-1/2 rounded-full bg-primary/18" />
          </div>
        ) : null}

        {variant === "senior" ? (
          <div className="flex h-16 items-end gap-2">
            <div className="h-4 w-full rounded-t-full bg-primary/10" />
            <div className="h-8 w-full rounded-t-full bg-primary/20" />
            <div className="h-11 w-full rounded-t-full bg-primary/35" />
            <div className="h-14 w-full rounded-t-full bg-primary" />
          </div>
        ) : null}

        {variant === "stream" ? (
          <div className="rounded-[1.35rem] bg-surface-soft p-4 font-mono text-sm text-text-muted">
            <span className="text-primary">&gt;</span> Getting feedback...
          </div>
        ) : null}

        {variant === "review" ? (
          <div className="space-y-4">
            <div className="flex items-center justify-between text-sm">
              <span className="text-text-base">Concurrency</span>
              <span className="font-semibold text-primary">92%</span>
            </div>
            <div className="h-2 rounded-full bg-black/8 dark:bg-white/8">
              <div className="h-full w-[92%] rounded-full bg-primary" />
            </div>
          </div>
        ) : null}
      </div>

      <p className="mt-auto max-w-[18rem] pt-8 text-sm leading-7 text-text-muted">
        {description}
      </p>
    </Surface>
  );
}

export type { FeatureCardProps };
export { FeatureCard };
