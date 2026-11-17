import { useEffect, useRef, useState } from "react";
import { Link } from "@tanstack/react-router";
import { ChevronDown } from "lucide-react";
import { clientPortalUrl, inquiryCopy, navLinks, serviceNavigation } from "@/data/site";
import { cn } from "@/lib/utils";
import { ThemeSelector } from "@/components/site/ThemeSelector";
import { ServiceNavigationLink } from "@/components/site/ServiceNavigationLink";
import { Button } from "@/components/ui/button";
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuItem } from "@/components/ui/dropdown-menu";

export function Wordmark({ className }: { className?: string }) {
  return (
    <span className={cn("font-serif text-3xl font-medium md:text-4xl", className)}>
      alexis beam design<span className="text-terracotta">.</span>
    </span>
  );
}

export function Header() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [servicesOpen, setServicesOpen] = useState(false);
  const menuButton = useRef<HTMLButtonElement>(null);
  const closeMobile = () => { setOpen(false); setServicesOpen(false); };

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = open ? "hidden" : "";
    const escape = (event: KeyboardEvent) => {
      if (event.key !== "Escape" || !open) return;
      setOpen(false);
      setServicesOpen(false);
      menuButton.current?.focus();
    };
    window.addEventListener("keydown", escape);
    return () => { document.body.style.overflow = previousOverflow; window.removeEventListener("keydown", escape); };
  }, [open]);

  return (
    <header
      className={cn(
        "site-header fixed inset-x-0 top-0 z-50 transition-all duration-500",
        scrolled || open ? "border-b bg-background/90 backdrop-blur-md" : "bg-transparent",
      )}
    >
      <nav aria-label="Main" className="mx-auto flex h-18 max-w-7xl items-center justify-between px-6 py-4 md:px-10">
        <Link to="/" aria-label="alexis beam, back to top" onClick={closeMobile}>
          <Wordmark />
        </Link>
        <div className="hidden items-center gap-5 xl:flex">
          <ul className="flex items-center gap-5 text-sm">
            {navLinks.map((l) => (
              <li key={l.id}>
                {l.id === "services" ? (
                  <DropdownMenu modal={false}>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" className="h-auto rounded-none p-0 pb-0.5 font-normal text-foreground/80 hover:bg-transparent hover:text-foreground focus-visible:ring-2 focus-visible:ring-offset-4 focus-visible:ring-offset-background">
                        Services <ChevronDown aria-hidden="true" className="size-3.5" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="start" sideOffset={16} className="w-72 rounded-none border-foreground/15 bg-background p-2 text-foreground">
                      {serviceNavigation.map((item) => (
                        <DropdownMenuItem key={item.label} asChild className="cursor-pointer rounded-none px-3 py-3">
                          <ServiceNavigationLink item={item} />
                        </DropdownMenuItem>
                      ))}
                    </DropdownMenuContent>
                  </DropdownMenu>
                ) : <Link to="/" hash={l.id} className="link-underline pb-0.5 text-foreground/80 hover:text-foreground focus-visible:outline focus-visible:outline-2 focus-visible:outline-ring focus-visible:outline-offset-4">
                  {l.label}
                </Link>}
              </li>
            ))}
          </ul>
          <a href={clientPortalUrl} className="link-underline pb-0.5 text-sm text-muted-foreground hover:text-foreground">Client Login</a>
          <Button asChild variant="outline" className="site-cta group h-auto rounded-none border-foreground bg-transparent px-5 py-2.5 font-normal shadow-none transition-colors duration-300 hover:bg-foreground hover:text-background">
          <Link
            to="/" hash="contact"
          >
            {inquiryCopy.navigationCta} <span className="transition-transform duration-300 group-hover:translate-x-1">→</span>
          </Link>
          </Button>
        </div>
        <Button
          ref={menuButton}
          variant="ghost"
          type="button"
          className="relative flex h-11 w-11 items-center justify-center rounded-none hover:bg-transparent xl:hidden"
          aria-expanded={open}
          aria-controls="mobile-menu"
          aria-label={open ? "Close menu" : "Open menu"}
          onClick={() => setOpen((o) => !o)}
        >
          <span className={cn("absolute h-px w-6 bg-foreground transition-transform duration-300", open ? "rotate-45" : "-translate-y-1.5")} />
          <span className={cn("absolute h-px w-6 bg-foreground transition-transform duration-300", open ? "-rotate-45" : "translate-y-1.5")} />
        </Button>
      </nav>
      <div className={cn("border-t transition-colors duration-500", scrolled || open ? "" : "border-transparent")}>
        <div className="mx-auto flex h-9 max-w-7xl items-center px-6 md:px-10">
          <ThemeSelector />
        </div>
      </div>
      <div
        id="mobile-menu"
        hidden={!open}
        className="h-[calc(100dvh-6.75rem)] overflow-y-auto bg-background px-6 pb-10 pt-8 xl:hidden"
      >
        <ul className="space-y-2">
          {navLinks.map((l, i) => (
            <li key={l.id} className="rise" style={{ animationDelay: `${i * 60}ms` }}>
              {l.id === "services" ? (
                <>
                  <Button variant="ghost" aria-label="Services" aria-expanded={servicesOpen} aria-controls="mobile-services" onClick={() => setServicesOpen((value) => !value)} className="flex h-auto w-full justify-start gap-4 rounded-none border-b px-0 py-4 font-serif text-4xl font-normal hover:bg-transparent">
                    <span className="eyebrow text-muted-foreground">01</span>
                    Services <ChevronDown aria-hidden="true" className={cn("ml-auto transition-transform", servicesOpen && "rotate-180")} />
                  </Button>
                  <ul id="mobile-services" hidden={!servicesOpen} className="space-y-1 border-b py-3 pl-8">
                    {serviceNavigation.map((item) => <li key={item.label}><ServiceNavigationLink item={item} onClick={closeMobile} className="block py-3 text-sm text-foreground/80 focus-visible:outline focus-visible:outline-2 focus-visible:outline-ring" /></li>)}
                  </ul>
                </>
              ) : <Link to="/" hash={l.id} onClick={closeMobile} className="flex items-baseline gap-4 border-b py-4 font-serif text-4xl">
                <span className="eyebrow text-muted-foreground">0{i + 1}</span>
                {l.label}
              </Link>}
            </li>
          ))}
        </ul>
        <Button asChild className="site-cta mt-10 flex h-auto w-full rounded-none bg-foreground py-4 font-normal text-background hover:bg-accent">
        <Link
          to="/" hash="contact"
          onClick={closeMobile}
        >
          {inquiryCopy.navigationCta} →
        </Link>
        </Button>
        <a href={clientPortalUrl} className="mt-6 block text-center text-sm text-muted-foreground">Client Login</a>
      </div>
    </header>
  );
}
