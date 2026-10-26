import { useRef, type KeyboardEvent } from "react";
import { themeDefinitions } from "@/data/themes";
import { useTheme } from "@/components/site/ThemeProvider";
import { cn } from "@/lib/utils";

/**
 * The site's personality switcher: a small label, four swatches, and the active name.
 * `inline` sits under the logo; `list` (mobile menu) shows every name as visible text.
 */
export function ThemeSelector({ className, variant = "inline" }: { className?: string; variant?: "inline" | "list" }) {
  const { theme, setTheme } = useTheme();
  const refs = useRef<(HTMLButtonElement | null)[]>([]);
  const current = themeDefinitions.find((t) => t.id === theme) ?? themeDefinitions[0];
  const list = variant === "list";

  const onKey = (e: KeyboardEvent, i: number) => {
    const n = themeDefinitions.length;
    let next = -1;
    if (e.key === "ArrowRight" || e.key === "ArrowDown") next = (i + 1) % n;
    if (e.key === "ArrowLeft" || e.key === "ArrowUp") next = (i - 1 + n) % n;
    if (next < 0) return;
    e.preventDefault();
    const target = themeDefinitions[next];
    if (target) setTheme(target.id);
    refs.current[next]?.focus();
  };

  return (
    <div className={cn("theme-selector flex", list ? "flex-col gap-3" : "items-center gap-2", className)}>
      <span aria-hidden="true" className="eyebrow whitespace-nowrap text-[10px] leading-none text-muted-foreground">
        Pick Your Personality
      </span>
      <div
        role="radiogroup"
        aria-label="Pick Your Personality"
        className={cn("flex items-center", list ? "grid grid-cols-2 gap-x-4" : "-my-2")}
      >
        {themeDefinitions.map((item, i) => {
          const active = item.id === theme;
          return (
            <button
              key={item.id}
              ref={(el) => { refs.current[i] = el; }}
              type="button"
              role="radio"
              aria-checked={active}
              aria-label={item.label}
              tabIndex={active ? 0 : -1}
              onClick={() => setTheme(item.id)}
              onKeyDown={(e) => onKey(e, i)}
              className={cn(
                "group relative flex items-center rounded-full focus-visible:outline-none",
                list ? "min-h-11 gap-2 pr-1 text-sm text-foreground" : "h-8 w-7 justify-center",
              )}
            >
              <span
                aria-hidden="true"
                className={cn(
                  `theme-swatch theme-swatch-${item.id} !h-3 !w-3 transition-shadow duration-200`,
                  active
                    ? "ring-1 ring-foreground ring-offset-2 ring-offset-background"
                    : "group-hover:ring-1 group-hover:ring-muted-foreground group-hover:ring-offset-2 group-hover:ring-offset-background",
                  "group-focus-visible:ring-2 group-focus-visible:ring-ring group-focus-visible:ring-offset-2 group-focus-visible:ring-offset-background",
                )}
              />
              {list ? (
                <span className={cn(active ? "text-foreground" : "text-muted-foreground")}>{item.label}</span>
              ) : (
                <span
                  aria-hidden="true"
                  className="pointer-events-none absolute left-1/2 top-full z-10 mt-1 -translate-x-1/2 whitespace-nowrap bg-foreground px-2 py-1 text-[11px] leading-none text-background opacity-0 transition-opacity duration-150 group-hover:opacity-100 group-focus-visible:opacity-100"
                >
                  {item.label}
                </span>
              )}
            </button>
          );
        })}
      </div>
      {!list && (
        <span aria-live="polite" className="whitespace-nowrap font-serif text-sm italic leading-none text-foreground">
          {current?.label}
        </span>
      )}
    </div>
  );
}
