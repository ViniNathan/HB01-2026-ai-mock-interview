"use client";

import { Check, Languages } from "lucide-react";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useLanguage } from "@/lib/i18n/language-provider";
import type { Locale } from "@/lib/i18n/dictionaries";
import { cn } from "@/lib/utils";

const options: { value: Locale; label: string; flag: string }[] = [
  { value: "pt", label: "Português", flag: "🇧🇷" },
  { value: "en", label: "English", flag: "🇺🇸" },
];

type LanguageSwitcherProps = {
  theme?: "default" | "inverse";
  className?: string;
};

function LanguageSwitcher({ theme = "default", className }: LanguageSwitcherProps) {
  const { locale, setLocale } = useLanguage();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger
        render={
          <button
            type="button"
            className={cn(
              "inline-flex h-9 shrink-0 cursor-pointer items-center gap-1.5 rounded-[var(--radius-pill)] border px-3 text-xs font-medium transition-colors duration-200",
              theme === "inverse"
                ? "border-border-inverse bg-white/8 text-text-inverse hover:bg-white/14"
                : "border-border-subtle bg-surface-soft text-text-strong hover:bg-surface-elevated",
              className,
            )}
          >
            <Languages className="size-3.5" />
            <span className="uppercase tracking-[0.08em]">{locale}</span>
          </button>
        }
      />
      <DropdownMenuContent align="end" className="min-w-40 rounded-2xl p-1.5">
        {options.map((option) => (
          <DropdownMenuItem
            key={option.value}
            onClick={() => setLocale(option.value)}
            className="flex items-center gap-2 rounded-xl px-2.5 py-2 text-sm"
          >
            <span className="text-base leading-none">{option.flag}</span>
            <span className="flex-1">{option.label}</span>
            {locale === option.value ? (
              <Check className="size-3.5 text-primary" />
            ) : null}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

export { LanguageSwitcher };
