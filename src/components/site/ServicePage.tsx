import { Link } from "@tanstack/react-router";
import { Header } from "@/components/site/Header";
import { Reveal } from "@/components/site/Reveal";
import { BookingLink } from "@/components/site/BookingLink";
import { backToServices, servicePages, serviceProcessSteps, type ServicePage } from "@/data/services";

/** Shared layout for the standalone service pages. Content lives in src/data/services.ts. */
function BackToServices({ className }: { className?: string }) {
  return (
    <a href={backToServices.href} className={`group inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground ${className ?? ""}`}>
      <span aria-hidden="true" className="transition-transform duration-300 group-hover:-translate-x-1">←</span>
      <span className="link-underline">{backToServices.label}</span>
    </a>
  );
}

export function ServicePageLayout({ service }: { service: ServicePage }) {
  const others = servicePages.filter((s) => s.slug !== service.slug);
  const quoteHref = `/?service=${encodeURIComponent(service.inquiryService)}#contact`;

  return (
    <>
      <Header />
      <main id="main">
        {/* Hero */}
        <section className="personality-hero px-6 pb-20 pt-44 md:px-10 md:pb-28 md:pt-52">
          <div className="mx-auto max-w-7xl">
            <BackToServices className="mb-10" />
            <Reveal>
              <p className="eyebrow flex items-center gap-4 text-accent">
                <span className="h-px w-10 bg-accent" aria-hidden="true" />
                {service.title}
              </p>
              <h1 className="editorial-page-title mt-6 max-w-4xl">{service.h1}</h1>
              <p className="mt-8 max-w-2xl text-lg leading-relaxed text-muted-foreground">{service.intro}</p>
              <div className="mt-10 flex flex-col gap-4 sm:flex-row sm:items-center sm:gap-8">
                <a
                  href={quoteHref}
                  className="site-cta group inline-flex min-h-12 items-center justify-center gap-3 bg-foreground px-7 py-4 text-sm text-background transition-colors duration-300 hover:bg-accent"
                >
                  Request a Quote <span className="transition-transform duration-300 group-hover:translate-x-1">→</span>
                </a>
                <BookingLink placement="services" className="link-underline self-start py-2 text-sm text-foreground sm:self-auto">
                  Schedule a Free 15-Minute Chat →
                </BookingLink>
              </div>
            </Reveal>
          </div>
        </section>

        {/* Problems / use cases */}
        <section className="bg-secondary px-6 py-24 md:px-10 md:py-32">
          <div className="mx-auto grid max-w-7xl gap-12 md:grid-cols-12">
            <Reveal className="md:col-span-5">
              <h2 className="editorial-heading">{service.problemsTitle}</h2>
            </Reveal>
            <Reveal delay={120} className="md:col-span-6 md:col-start-7">
              <ul className="space-y-5">
                {service.problems.map((p) => (
                  <li key={p} className="flex gap-4 border-b border-foreground/10 pb-5 leading-relaxed text-muted-foreground">
                    <span className="text-terracotta" aria-hidden="true">—</span>
                    {p}
                  </li>
                ))}
              </ul>
            </Reveal>
          </div>
        </section>

        {/* Included work */}
        <section className="px-6 py-24 md:px-10 md:py-32">
          <div className="mx-auto grid max-w-7xl gap-12 md:grid-cols-12">
            <Reveal className="md:col-span-5">
              <h2 className="editorial-heading">{service.includedTitle}</h2>
            </Reveal>
            <Reveal delay={120} className="md:col-span-6 md:col-start-7">
              <ul className="space-y-2.5 text-base">
                {service.included.map((x) => (
                  <li key={x} className="flex gap-3 border-b border-foreground/10 pb-2.5">
                    <span className="text-accent" aria-hidden="true">+</span>
                    {x}
                  </li>
                ))}
              </ul>
            </Reveal>
          </div>
        </section>

        {/* Process */}
        <section className="bg-secondary px-6 py-24 md:px-10 md:py-32">
          <div className="mx-auto max-w-7xl">
            <Reveal>
              <p className="eyebrow flex items-center gap-4 text-accent">
                <span className="h-px w-10 bg-accent" aria-hidden="true" />
                The process
              </p>
              <h2 className="editorial-heading mt-6 max-w-2xl">Simple process. <em className="text-accent">Thoughtful results.</em></h2>
              <p className="mt-6 max-w-2xl text-lg leading-relaxed text-muted-foreground">{service.processNote}</p>
            </Reveal>
            <ol className="relative mt-16 grid gap-12 md:grid-cols-4 md:gap-8">
              <span aria-hidden="true" className="absolute bottom-0 left-[7px] top-0 w-px bg-border md:bottom-auto md:left-0 md:right-0 md:top-[7px] md:h-px md:w-auto" />
              {serviceProcessSteps.map((s, i) => (
                <Reveal as="li" key={s.title} delay={i * 110} className="relative pl-10 md:pl-0 md:pt-12">
                  <span aria-hidden="true" className="absolute left-0 top-1 h-[15px] w-[15px] rounded-full border border-terracotta bg-background md:top-0" />
                  <h3 className="font-serif text-3xl leading-tight">{s.title}</h3>
                  <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{s.text}</p>
                </Reveal>
              ))}
            </ol>
            <Reveal className="mt-16">
              <p className="max-w-xl text-sm italic text-muted-foreground">{service.scopeCaveat}</p>
            </Reveal>
          </div>
        </section>

        {/* FAQs */}
        <section className="px-6 py-24 md:px-10 md:py-32">
          <div className="mx-auto max-w-7xl">
            <Reveal>
              <p className="eyebrow flex items-center gap-4 text-accent">
                <span className="h-px w-10 bg-accent" aria-hidden="true" />
                Common questions
              </p>
            </Reveal>
            <div className="mt-12 grid gap-x-16 gap-y-12 md:grid-cols-2">
              {service.faqs.map((f) => (
                <Reveal key={f.q} as="article">
                  <h3 className="editorial-subheading">{f.q}</h3>
                  <p className="editorial-body mt-4 max-w-prose text-muted-foreground">{f.a}</p>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        {/* Other services + CTA */}
        <section className="bg-aegean px-6 py-24 text-accent-foreground md:px-10 md:py-32">
          <div className="mx-auto grid max-w-7xl gap-12 md:grid-cols-12">
            <Reveal className="md:col-span-6">
              <h2 className="editorial-heading">Ready to talk about <em>your</em> project?</h2>
              <div className="mt-10 flex flex-col gap-4 sm:flex-row sm:items-center sm:gap-8">
                <a
                  href={quoteHref}
                  className="site-cta group inline-flex min-h-12 items-center justify-center gap-3 bg-accent-foreground px-7 py-4 text-sm text-aegean transition-colors duration-300 hover:opacity-90"
                >
                  Request a Quote <span className="transition-transform duration-300 group-hover:translate-x-1">→</span>
                </a>
                <BookingLink placement="services" className="link-underline self-start py-2 text-sm text-accent-foreground sm:self-auto">
                  Schedule a Free 15-Minute Chat →
                </BookingLink>
              </div>
            </Reveal>
            <Reveal delay={120} className="self-end md:col-span-5 md:col-start-8">
              <p className="eyebrow text-accent-foreground/70">Also exploring</p>
              <ul className="mt-5 space-y-4">
                {others.map((o) => (
                  <li key={o.slug}>
                    <Link to={o.path} className="group inline-flex items-baseline gap-3 font-serif text-2xl">
                      <span className="link-underline">{o.title}</span>
                      <span aria-hidden="true" className="text-base transition-transform duration-300 group-hover:translate-x-1">→</span>
                    </Link>
                  </li>
                ))}
              </ul>
            </Reveal>
          </div>
        </section>
      </main>
      <footer className="bg-ink px-6 py-10 text-ink-foreground md:px-10">
        <div className="mx-auto flex max-w-7xl flex-col gap-4 text-xs text-ink-foreground/60 sm:flex-row sm:items-center sm:justify-between">
          <p>© {new Date().getFullYear()} Alexis Beam. All rights reserved.</p>
          <p className="flex gap-6">
            <Link to="/" className="link-underline">Home</Link>
            <Link to="/privacy-policy" className="link-underline">Privacy Policy</Link>
          </p>
        </div>
      </footer>
    </>
  );
}
