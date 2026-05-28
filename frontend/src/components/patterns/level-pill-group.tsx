import { cn } from "@/lib/utils";

type LevelPillGroupProps = {
  levels: readonly string[];
  active: string;
};

function LevelPillGroup({ levels, active }: LevelPillGroupProps) {
  return (
    <div className="flex flex-wrap items-center gap-3">
      {levels.map((level) => {
        const isActive = level === active;

        return (
          <button
            key={level}
            type="button"
            className={cn(
              "rounded-[var(--radius-pill)] px-4 py-2 text-sm transition-colors duration-200",
              isActive
                ? "bg-primary text-primary-foreground"
                : "text-text-muted hover:bg-surface-soft hover:text-text-strong",
            )}
          >
            {level}
          </button>
        );
      })}
    </div>
  );
}

export { LevelPillGroup };
