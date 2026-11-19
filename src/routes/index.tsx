import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useRef, type PointerEvent as ReactPointerEvent } from "react";
import { useTheme } from "@/components/site/ThemeProvider";
import { Header, Wordmark } from "@/components/site/Header";
import { Reveal } from "@/components/site/Reveal";
import { ContactForm } from "@/components/site/ContactForm";
import { BookingLink } from "@/components/site/BookingLink";
import { Link } from "@tanstack/react-router";
import { projects, type Project } from "@/data/projects";
import { FaqAccordion } from "@/components/site/FaqAccordion";
import { ServiceNavigationLink } from "@/components/site/ServiceNavigationLink";
import { clientPortalUrl, faqIntro, faqs, homepageCopy, inquiryCopy, navLinks, portal, serviceNavigation, serviceOptions, services, socials, steps, websiteDiagnosis } from "@/data/site";
import { preselectService, servicePages } from "@/data/services";
import { cn } from "@/lib/utils";
import headshot from "@/assets/alexis-headshot.png.asset.json";

const TITLE = "Alexis Beam | Web Design, Automation & Digital Solutions";
const DESC =
  "Thoughtful web design and practical business automation for small businesses. Simplify repetitive tasks, improve workflows, and build a better digital presence.";
const URL_HOME = "https://alexisbeamdesign.com/";

export const Route = createFileRoute("/")({
  // Inquiry CTAs arrive as /?service=<option>#contact; only allowlisted form options preselect.
  validateSearch: (search: Record<string, unknown>) => {
    const service = preselectService(typeof search["service"] === "string" ? search["service"] : "", serviceOptions);
    return service ? { service } : {};
  },
  head: () => ({
    meta: [
      { title: TITLE },
      { name: "description", content: DESC },
      { property: "og:title", content: TITLE },
      { property: "og:description", content: DESC },
      { property: "og:type", content: "website" },
      { property: "og:url", content: URL_HOME },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: TITLE },
      { name: "twitter:description", content: DESC },
    ],
    links: [{ rel: "canonical", href: URL_HOME }],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "ProfessionalService",
          name: "Alexis Beam",
          description: DESC,
          slogan: "Thoughtfully designed. Purposefully built.",
          founder: { "@type": "Person", name: "Alexis Beam", jobTitle: "Web Designer & Digital Solutions Consultant, Ph.D.", hasCredential: "Ph.D. in Psychology" },
          serviceType: services.map((s) => s.title),
        }),
      },
    ],
  }),
  component: Home,
});

function Home() {
  return (
    <>
      <a href="#main" className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[60] focus:bg-foreground focus:px-4 focus:py-2 focus:text-background">
        Skip to content
      </a>
      <Header />
      <main id="main">
        <Hero />
        <Services />
        <Work />
        <About />
        <Process />
        <Faq />
        <Contact />
      </main>
      <Footer />
    </>
  );
}

function SectionHead({ eyebrow, title, copy, className }: { eyebrow: string; title: React.ReactNode; copy?: string; className?: string }) {
  return (
    <div className={cn("grid gap-8 md:grid-cols-12", className)}>
      <Reveal className="md:col-span-7">
        <p className="eyebrow flex items-center gap-4 text-accent">
          <span className="h-px w-10 bg-accent" aria-hidden="true" />
          {eyebrow}
        </p>
        <h2 className="editorial-heading mt-6">{title}</h2>
      </Reveal>
      {copy && (
        <Reveal delay={120} className="self-end md:col-span-4 md:col-start-9">
          <p className="text-lg leading-relaxed text-muted-foreground">{copy}</p>
        </Reveal>
      )}
    </div>
  );
}

/* ---------- Hero ---------- */
function Hero() {
  return (
    <section id="top" className="personality-hero relative flex flex-col justify-center overflow-hidden px-6 pb-16 pt-36 md:min-h-[90svh] md:px-10 md:pb-24 md:pt-40">
      <svg aria-hidden="true" className="pointer-events-none absolute inset-0 h-full w-full" viewBox="0 0 1440 900" preserveAspectRatio="xMidYMid slice" fill="none">
        <path className="hero-line" d="M-40 720 C 320 640, 520 260, 860 300 S 1300 520, 1500 140" stroke="var(--terracotta)" strokeWidth="1" strokeDasharray="1200" />
        <circle cx="1130" cy="250" r="140" stroke="var(--aegean)" strokeOpacity="0.35" strokeWidth="1" />
      </svg>
      <div className="relative mx-auto w-full max-w-7xl">
        <p className="eyebrow rise text-muted-foreground">Independent web design &amp; digital solutions</p>
        <h1 className="hero-heading mt-8">
          <span className="sr-only">Alexis Beam — Web Design &amp; Workflow Automation for Small Businesses.</span>{" "}
          <span className="rise block" aria-hidden="true" style={{ animationDelay: "120ms" }}>Thoughtfully designed.</span>{" "}
          <span className="rise block italic text-accent sm:pl-3 lg:pl-8" aria-hidden="true" style={{ animationDelay: "260ms" }}>
            Purposefully built<span className="not-italic text-terracotta">.</span>
          </span>
        </h1>
        <div className="mt-8 grid gap-8 md:mt-10 md:grid-cols-12">
          <div className="rise space-y-4 text-lg leading-relaxed text-muted-foreground md:col-span-7 md:col-start-6" style={{ animationDelay: "420ms" }}>
            <p className="hero-support max-w-xl text-foreground">{homepageCopy.opening}</p>
            <p className="max-w-xl font-sans text-sm leading-relaxed md:text-base">{homepageCopy.intro}</p>
            <div className="flex flex-col gap-4 pt-2 sm:flex-row sm:flex-wrap sm:items-center sm:gap-6">
              <a href="#contact" className="site-cta group inline-flex min-h-12 items-center justify-center gap-3 bg-foreground px-7 py-4 text-sm text-background transition-colors duration-300 hover:bg-accent">
                {inquiryCopy.primaryCta} <span aria-hidden="true" className="transition-transform duration-300 group-hover:translate-x-1">→</span>
              </a>
              <BookingLink placement="opening" className="link-underline self-start py-3 text-sm text-foreground sm:self-auto">
                {inquiryCopy.bookingCta} →
              </BookingLink>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ---------- Work ---------- */
function Work() {
  const { theme } = useTheme();
  const frameRef = useRef(0);
  // Pointer position feeds the Playful sticker drift and Moody spotlight; mouse only, skipped for reduced motion.
  const onPointerMove = (e: ReactPointerEvent<HTMLElement>) => {
    if (theme !== "playful" && theme !== "after-dark") return;
    if (e.pointerType !== "mouse" || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const section = e.currentTarget;
    const stage = (e.target as HTMLElement).closest<HTMLElement>(".project-stage");
    const { clientX, clientY } = e;
    cancelAnimationFrame(frameRef.current);
    frameRef.current = requestAnimationFrame(() => {
      const r = section.getBoundingClientRect();
      section.style.setProperty("--px", ((clientX - r.left) / r.width - 0.5).toFixed(3));
      section.style.setProperty("--py", ((clientY - r.top) / r.height - 0.5).toFixed(3));
      if (stage) {
        const st = stage.getBoundingClientRect();
        stage.style.setProperty("--sx", `${Math.round(clientX - st.left)}px`);
        stage.style.setProperty("--sy", `${Math.round(clientY - st.top)}px`);
      }
    });
  };
  useEffect(() => () => cancelAnimationFrame(frameRef.current), []);
  return (
    <section id="work" onPointerMove={onPointerMove} className="work-section relative bg-secondary px-6 pb-28 pt-14 md:px-10 md:pb-40 md:pt-20">
      <span className="work-stickers" aria-hidden="true">
        <svg className="sticker sticker-star" viewBox="0 0 40 40"><path d="M20 2l5 13 13 5-13 5-5 13-5-13-13-5 13-5z" /></svg>
        <svg className="sticker sticker-arrow" viewBox="0 0 60 30"><path d="M2 22 C18 4 36 4 50 16 M42 8 l9 8 -11 4" fill="none" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" /></svg>
        <svg className="sticker sticker-blob" viewBox="0 0 40 40"><path d="M8 10c8-10 26-6 28 8s-12 22-22 18S0 20 8 10z" /></svg>
      </span>
      <div className="relative mx-auto max-w-7xl">
        <SectionHead
          eyebrow="Selected work"
          title={<>Good ideas, <em className="text-accent">brought to life.</em></>}
          copy={homepageCopy.workIntro}
        />
        <div className="mt-24 space-y-32 md:space-y-44">
          {projects.map((p, i) => (
            <ProjectRow key={p.slug} project={p} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}

function ProjectRow({ project: p, index }: { project: Project; index: number }) {
  const flip = index % 2 === 1;
  return (
    <article className="grid items-center gap-10 md:grid-cols-12 md:gap-12" aria-labelledby={`${p.slug}-title`}>
      <Reveal className={cn("md:col-span-7", flip && "md:order-2 md:col-start-6")}>
        <div className="project-stage relative isolate">
          <svg className="stage-sticker" viewBox="0 0 40 40" aria-hidden="true"><path d="M20 2l5 13 13 5-13 5-5 13-5-13-13-5 13-5z" /></svg>
          <ProjectImage project={p} />
        </div>
      </Reveal>
      <Reveal delay={120} className={cn("md:col-span-4", flip ? "md:order-1 md:col-start-1" : "md:col-start-9")}>
        <div className="flex items-center gap-4">
          <span className="font-serif text-5xl text-terracotta">0{index + 1}</span>
          {p.inDevelopment && (
            <span className="eyebrow border border-foreground/30 px-2.5 py-1 text-[0.6rem] text-muted-foreground">In development</span>
          )}
        </div>
        <p className="eyebrow mt-6 text-muted-foreground">{p.category}</p>
        <h3 id={`${p.slug}-title`} className="mt-3 text-4xl md:text-5xl">{p.name}</h3>
        <p className="mt-5 leading-relaxed text-muted-foreground">{p.description}</p>
        <ul className="mt-6 grid grid-cols-1 gap-x-6 gap-y-2 border-t pt-5 text-sm sm:grid-cols-2">
          {p.highlights.map((h) => (
            <li key={h} className="flex gap-2"><span className="text-terracotta" aria-hidden="true">—</span>{h}</li>
          ))}
        </ul>
        {p.url ? (
          <a href={p.url} target="_blank" rel="noopener noreferrer" className="group mt-8 inline-flex items-center gap-3 text-sm">
            <span className="link-underline">{p.cta}</span>
            <span className="transition-transform duration-300 group-hover:translate-x-1">→</span>
            <span className="sr-only">(opens in a new tab)</span>
          </a>
        ) : (
          <p className="mt-8 text-sm italic text-muted-foreground">Live link coming soon.</p>
        )}
      </Reveal>
    </article>
  );
}

function ProjectImage({ project: p }: { project: Project }) {
  const frame = (
    <div className="project-frame group relative overflow-hidden bg-card shadow-[0_30px_60px_-30px_color-mix(in_oklab,var(--ink)_35%,transparent)]">
      <div className="flex items-center gap-1.5 border-b bg-background px-4 py-2.5" aria-hidden="true">
        <span className="h-2 w-2 rounded-full bg-foreground/15" />
        <span className="h-2 w-2 rounded-full bg-foreground/15" />
        <span className="h-2 w-2 rounded-full bg-foreground/15" />
      </div>
      <div className="project-media aspect-[16/10] overflow-hidden">
        {p.image ? (
          <img src={p.image} alt={p.imageAlt} loading="lazy" width={1440} height={900} className="h-full w-full object-cover object-top transition-transform duration-[1.4s] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.03]" />
        ) : (
          <div className="flex h-full w-full flex-col items-center justify-center gap-3 bg-[repeating-linear-gradient(135deg,var(--secondary)_0_12px,var(--background)_12px_24px)] text-center">
            <span className="font-serif text-4xl md:text-5xl">{p.name}</span>
            <span className="eyebrow text-muted-foreground">Screenshot coming soon</span>
          </div>
        )}
      </div>
    </div>
  );
  return p.url ? (
    <a href={p.url} target="_blank" rel="noopener noreferrer" aria-label={`Visit ${p.name} (opens in a new tab)`} className="block">
      {frame}
    </a>
  ) : (
    frame
  );
}

/* ---------- About ---------- */
function About() {
  return (
    <section id="about" className="px-6 pb-14 pt-28 md:px-10 md:pb-20 md:pt-40">
      <div className="mx-auto max-w-7xl">
        <SectionHead eyebrow="A little about me" title={<>A creative mind.<br /><em className="text-accent">An analytical <span className="whitespace-nowrap">one, too.</span></em></>} />
        <div className="mt-12 grid items-start gap-12 md:grid-cols-12 md:gap-10">
          <Reveal className="md:col-span-5 md:sticky md:top-28 md:self-start">
            <div className="relative mx-auto w-full max-w-[300px] md:mx-0 md:max-w-[380px]">
              <img
                src={headshot.url}
                alt="Portrait of Alexis Beam"
                width={890}
                height={1168}
                loading="lazy"
                className="relative z-10 aspect-[4/5] w-full object-cover object-top"
              />
              <span className="absolute -bottom-3 -right-3 hidden h-20 w-20 border border-terracotta md:block" aria-hidden="true" />
            </div>
          </Reveal>
          <Reveal delay={120} className="space-y-5 text-lg leading-relaxed text-muted-foreground md:col-span-6 md:col-start-6">
            <p className="font-serif text-2xl leading-snug text-foreground md:text-3xl">{homepageCopy.aboutPerspective}</p>
            <p>I’m Alexis, and I enjoy turning complicated problems into clear, useful solutions. My Ph.D. in psychology, with a focus in cognitive science, taught me to look closely at how people think, learn, and make decisions. More than 12 years in data, technology, and business strategy taught me to connect that understanding to practical business needs.</p>
            <p>{homepageCopy.aboutApproach}</p>
            <p>Based in Atlanta and working with small businesses across the U.S., I keep the process collaborative and focused on what will be useful to you.</p>
            <ul className="!mt-10 grid gap-8 border-t pt-8 xl:grid-cols-3">
              {[
                ["Human-Centered Thinking", "Clear information and intuitive experiences that help people find their way."],
                ["Business-Minded Solutions", "Recommendations grounded in your goals, priorities, and everyday work."],
                ["Thoughtful Design", "Visual care and practical functionality, considered together from the start."],
              ].map(([h, c]) => (
                <li key={h} className="text-base text-foreground">
                  <span className="editorial-subheading block">{h}</span>
                  <span className="mt-2 block text-sm text-muted-foreground">{c}</span>
                </li>
              ))}
            </ul>
          </Reveal>
        </div>
        <Reveal as="figure" className="mx-auto mt-28 max-w-3xl text-center">
          <blockquote className="font-serif text-4xl italic leading-tight md:text-5xl">“Good ideas deserve to become something real.”</blockquote>
          <figcaption className="mt-6 text-sm text-muted-foreground">
            Inspired by the Greek idea of <em lang="el" className="text-accent">praxi</em> (πράξη): turning thought into action.
          </figcaption>
        </Reveal>
      </div>
    </section>
  );
}

/* ---------- Services ---------- */
function Services() {
  return (
    <section id="services" className="bg-secondary px-6 pb-14 pt-28 md:px-10 md:pb-20 md:pt-40">
      <div className="mx-auto max-w-7xl">
        <SectionHead
          eyebrow="What I do"
          title={<>Good design is just <em className="text-accent">the beginning.</em></>}
          copy={homepageCopy.servicesIntro}
        />
        <div className="mt-20 border-t border-foreground">
          {services.map((s) => (
            <Reveal key={s.title} as="article" className="group grid gap-6 border-b border-foreground/20 py-12 md:grid-cols-12 md:gap-10 md:py-16">
              <div className="md:col-span-7">
                <p className="eyebrow mb-4 text-accent">{s.choice}</p>
                <h3 className="text-4xl transition-transform duration-500 group-hover:translate-x-2 md:text-5xl">{s.title}</h3>
                <p className="mt-5 max-w-lg leading-relaxed text-muted-foreground">{s.blurb}</p>
                {(() => {
                  const page = servicePages.find((p) => p.title === s.title);
                  return (
                    <div className="mt-6 space-y-3">
                      {page ? (
                        <Link to={page.path} className="group/link inline-flex items-center gap-2 text-sm text-foreground">
                          <span className="link-underline">Learn more about {s.title}</span>
                          <span aria-hidden="true" className="transition-transform duration-300 group-hover/link:translate-x-1">→</span>
                        </Link>
                      ) : null}
                      {page?.slug === "website-redesign" ? (
                        <a
                          href={websiteDiagnosis.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="group/link block text-sm text-muted-foreground"
                        >
                          <span className="link-underline">{websiteDiagnosis.homepageLink}</span>
                        </a>
                      ) : null}
                    </div>
                  );
                })()}
              </div>
              <ul className="space-y-2.5 text-sm md:col-span-4 md:col-start-9">
                {s.includes.map((x) => (
                  <li key={x} className="flex gap-3 border-b border-foreground/10 pb-2.5"><span className="mt-[0.45em] h-1.5 w-1.5 shrink-0 rotate-45 bg-accent" aria-hidden="true" />{x}</li>
                ))}
              </ul>
            </Reveal>
          ))}
        </div>
        <p className="mt-10 max-w-xl text-sm italic text-muted-foreground">
          Complex integrations and custom software projects are evaluated individually based on technical requirements.
        </p>
      </div>
    </section>
  );
}

/* ---------- Process ---------- */
function Process() {
  return (
    <section id="process" aria-labelledby="process-title" className="px-6 pb-14 pt-14 md:px-10 md:pb-20 md:pt-20">
      <div className="mx-auto max-w-7xl">
        <SectionHead eyebrow="The process" title={<span id="process-title">What working together <em className="text-accent">looks like.</em></span>} />
        <ol className="mt-20 border-t border-foreground">
          {steps.map((s, i) => (
            <Reveal as="li" key={s.title} className="grid gap-4 border-b border-foreground/20 py-10 md:grid-cols-12 md:gap-10 md:py-12">
              <span className="font-serif text-2xl text-terracotta md:col-span-1">0{i + 1}</span>
              <h3 className="font-serif text-3xl leading-tight md:col-span-4">{s.title}</h3>
              <div className="space-y-3 leading-relaxed text-muted-foreground md:col-span-6 md:col-start-7">
                {s.text.map((t) => <p key={t}>{t}</p>)}
                {"note" in s && s.note && <p className="eyebrow text-accent">{s.note}</p>}
                {"portalLink" in s && s.portalLink && <a href={clientPortalUrl} className="link-underline inline-block text-sm text-foreground">Client Login →</a>}
              </div>
            </Reveal>
          ))}
        </ol>
        <a href="#contact" className="site-cta group mt-12 inline-flex min-h-12 items-center justify-center gap-3 bg-foreground px-7 py-4 text-sm text-background transition-colors duration-300 hover:bg-accent">
          {inquiryCopy.primaryCta} <span aria-hidden="true" className="transition-transform duration-300 group-hover:translate-x-1">→</span>
        </a>
      </div>
    </section>
  );
}

/* ---------- FAQ ---------- */
function Faq() {
  return (
    <section id="faq" aria-labelledby="faq-title" className="px-6 pb-14 pt-14 md:px-10 md:pb-20 md:pt-20">
      <div className="mx-auto max-w-7xl">
        <SectionHead eyebrow="FAQ" title={<span id="faq-title">A few good <em className="text-accent">questions.</em></span>} copy={faqIntro} />
        <FaqAccordion items={faqs} />
        <p className="mt-12 text-sm">
          Still have questions?{" "}
          <a href="#contact" className="link-underline text-foreground">{inquiryCopy.primaryCta}</a>{" "}
          <span className="text-muted-foreground">Or </span>
          <BookingLink placement="contact" className="link-underline text-foreground">{inquiryCopy.bookingCta}</BookingLink>.
        </p>
      </div>
    </section>
  );
}

/* ---------- Contact ---------- */
function Contact() {
  const { service } = Route.useSearch();
  return (
    <section id="contact" className="px-6 pb-28 pt-14 md:px-10 md:pb-40 md:pt-20">
      <div className="mx-auto grid max-w-7xl gap-16 md:grid-cols-12">
        <Reveal className="md:col-span-5">
          <p className="eyebrow flex items-center gap-4 text-accent"><span className="h-px w-10 bg-accent" aria-hidden="true" />Say hello</p>
          <h2 className="editorial-heading mt-6">
            {homepageCopy.contactHeading}
          </h2>
          <p className="mt-8 text-lg leading-relaxed text-muted-foreground">{homepageCopy.contactIntro}</p>
          <div className="mt-12 border-t pt-8">
            <p className="font-serif text-2xl">{homepageCopy.chatHeading}</p>
            <p className="mt-2 leading-relaxed text-muted-foreground">{homepageCopy.chatIntro}</p>
            <BookingLink placement="contact" className="group mt-4 inline-flex items-center gap-2 text-sm">
              <span className="link-underline">{inquiryCopy.bookingCta}</span>
              <span aria-hidden="true" className="transition-transform duration-300 group-hover:translate-x-1">→</span>
            </BookingLink>
          </div>
        </Reveal>
        <Reveal delay={120} className="relative md:col-span-6 md:col-start-7">
          <ContactForm preselectedService={service} />
        </Reveal>
      </div>
    </section>
  );
}

/* ---------- Footer ---------- */
function Footer() {
  return (
    <footer className="bg-ink px-6 pb-10 pt-20 text-ink-foreground md:px-10">
      <div className="mx-auto max-w-7xl">
        <div className="flex flex-col gap-12 xl:flex-row xl:items-start xl:justify-between">
          <div>
            <Wordmark className="text-4xl md:text-5xl" />
            <p className="mt-3 font-serif text-xl italic text-ink-foreground/70">Thoughtfully designed. Purposefully built.</p>
          </div>
          <nav aria-label="Footer" className="grid gap-8 sm:grid-cols-2 xl:max-w-2xl">
            <ul className="space-y-3 text-sm">
              {serviceNavigation.map((item) => <li key={item.label}><ServiceNavigationLink item={item} className="link-underline" /></li>)}
            </ul>
            <div className="space-y-6">
            <ul className="flex flex-wrap gap-x-8 gap-y-3 text-sm">
              {navLinks.map((l) => (
                <li key={l.id}><a href={`/#${l.id}`} className="link-underline">{l.label}</a></li>
              ))}
            </ul>
            {(socials.linkedin || socials.email) && (
              <ul className="flex gap-8 text-sm">
                {socials.linkedin && <li><a href={socials.linkedin} target="_blank" rel="noopener noreferrer" className="link-underline">LinkedIn</a></li>}
                {socials.email && <li><a href={`mailto:${socials.email}`} className="link-underline">Email</a></li>}
              </ul>
            )}
            <ul className="flex gap-8 text-sm">
              <li><a href={clientPortalUrl} className="link-underline">Client Login</a></li>
              <li><a href="/#contact" className="link-underline">{inquiryCopy.primaryCta}</a></li>
            </ul>
            </div>
          </nav>
        </div>
        <div className="mt-16 flex flex-col gap-2 border-t border-ink-foreground/15 pt-6 text-xs text-ink-foreground/60 sm:flex-row sm:justify-between">
          <p>© {new Date().getFullYear()} Alexis Beam. All rights reserved.</p>
          <p className="flex gap-6">
            <Link to="/privacy-policy" className="link-underline">Privacy Policy</Link>
            <span className="font-serif text-sm italic">Made thoughtfully, by Alexis.</span>
          </p>
        </div>
      </div>
    </footer>
  );
}
