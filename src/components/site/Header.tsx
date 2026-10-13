import { useEffect, useState } from "react";
import { navLinks } from "@/data/site";
import { cn } from "@/lib/utils";

export function Wordmark({ className }: { className?: string }) {
  return (
    <span className={cn("font-serif text-3xl font-medium tracking-tight md:text-4xl", className)}>
      alexis beam<span className="text-terracotta">.</span>
    </span>
  );
}

export function Header() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
  }, [open]);

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 transition-all duration-500",
        scrolled || open ? "border-b bg-background/90 backdrop-blur-md" : "bg-transparent",
      )}
    >
      <nav aria-label="Main" className="mx-auto flex h-18 max-w-7xl items-center justify-between px-6 py-4 md:px-10">
        <a href="#top" aria-label="alexis beam, back to top" onClick={() => setOpen(false)}>
          <Wordmark />
        </a>
        <div className="hidden items-center gap-10 md:flex">
          <ul className="flex items-center gap-8 text-sm">
            {navLinks.map((l) => (
              <li key={l.id}>
                <a href={`#${l.id}`} className="link-underline pb-0.5 text-foreground/80 hover:text-foreground">
                  {l.label}
                </a>
              </li>
            ))}
          </ul>
          <a
            href="#contact"
            className="group inline-flex items-center gap-2 border border-foreground px-5 py-2.5 text-sm transition-colors duration-300 hover:bg-foreground hover:text-background"
          >
            Request a Quote <span className="transition-transform duration-300 group-hover:translate-x-1">→</span>
          </a>
        </div>
        <button
          type="button"
          className="relative flex h-11 w-11 items-center justify-center md:hidden"
          aria-expanded={open}
          aria-controls="mobile-menu"
          aria-label={open ? "Close menu" : "Open menu"}
          onClick={() => setOpen((o) => !o)}
        >
          <span className={cn("absolute h-px w-6 bg-foreground transition-transform duration-300", open ? "rotate-45" : "-translate-y-1.5")} />
          <span className={cn("absolute h-px w-6 bg-foreground transition-transform duration-300", open ? "-rotate-45" : "translate-y-1.5")} />
        </button>
      </nav>
      <div
        id="mobile-menu"
        hidden={!open}
        className="h-[calc(100dvh-4.5rem)] bg-background px-6 pb-10 pt-8 md:hidden"
      >
        <ul className="space-y-2">
          {navLinks.map((l, i) => (
            <li key={l.id} className="rise" style={{ animationDelay: `${i * 60}ms` }}>
              <a href={`#${l.id}`} onClick={() => setOpen(false)} className="flex items-baseline gap-4 border-b py-4 font-serif text-4xl">
                <span className="eyebrow text-muted-foreground">0{i + 1}</span>
                {l.label}
              </a>
            </li>
          ))}
        </ul>
        <a
          href="#contact"
          onClick={() => setOpen(false)}
          className="mt-10 flex items-center justify-center bg-foreground py-4 text-background"
        >
          Request a Quote →
        </a>
      </div>
    </header>
  );
}
