import { createFileRoute } from "@tanstack/react-router";
import { Header, Wordmark } from "@/components/site/Header";
import { Reveal } from "@/components/site/Reveal";
import { ContactForm } from "@/components/site/ContactForm";
import { BookingLink } from "@/components/site/BookingLink";
import { Link } from "@tanstack/react-router";
import { projects, type Project } from "@/data/projects";
import { navLinks, services, socials, steps } from "@/data/site";
import { cn } from "@/lib/utils";
import headshot from "@/assets/alexis-headshot.png.asset.json";

const TITLE = "Alexis Beam | Web Design, Automation & Digital Solutions";
const DESC =
  "Thoughtful web design and practical business automation for small businesses. Simplify repetitive tasks, improve workflows, and build a better digital presence.";
const URL_HOME = "https://alexisbeamdesign.com/";

export const Route = createFileRoute("/")({
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
        <Work />
        <About />
        <Services />
        <Process />
        <Differentiator />
        <Automation />
        <Consultation />
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
        <h2 className="mt-6 text-5xl leading-[0.95] sm:text-6xl lg:text-7xl">{title}</h2>
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
    <section id="top" className="relative flex min-h-[100svh] flex-col justify-center overflow-hidden px-6 pb-24 pt-32 md:px-10">
      <svg aria-hidden="true" className="pointer-events-none absolute inset-0 h-full w-full" viewBox="0 0 1440 900" preserveAspectRatio="xMidYMid slice" fill="none">
        <path className="hero-line" d="M-40 720 C 320 640, 520 260, 860 300 S 1300 520, 1500 140" stroke="var(--terracotta)" strokeWidth="1" strokeDasharray="1200" />
        <circle cx="1130" cy="250" r="140" stroke="var(--aegean)" strokeOpacity="0.35" strokeWidth="1" />
        <circle cx="1130" cy="250" r="4" fill="var(--terracotta)" />
      </svg>
      <div className="relative mx-auto w-full max-w-7xl">
        <p className="eyebrow rise text-muted-foreground">Independent web design &amp; digital solutions</p>
        <h1 className="mt-8 text-[clamp(3.2rem,10vw,9.5rem)] leading-[0.88] tracking-[-0.03em]">
          <span className="rise block" style={{ animationDelay: "120ms" }}>Thoughtfully designed.</span>
          <span className="rise block pl-[8vw] italic text-accent" style={{ animationDelay: "260ms" }}>
            Purposefully built<span className="not-italic text-terracotta">.</span>
          </span>
        </h1>
        <div className="mt-14 grid gap-10 md:grid-cols-12">
          <div className="rise space-y-5 text-lg leading-relaxed text-muted-foreground md:col-span-6 md:col-start-6" style={{ animationDelay: "420ms" }}>
            <p className="font-serif text-2xl leading-snug text-foreground md:text-3xl">Thoughtful websites. Smarter ways of working.</p>
            <p>
              <span className="text-foreground">Hi, I'm Alexis.</span> From beautiful, functional websites to automating the everyday tasks that slow you down, I help small businesses simplify their work and grow with confidence.
            </p>
            <p>
              With a <span className="text-foreground">doctorate in psychology</span> and <span className="text-foreground">over 12 years</span> in data strategy and technology, I bring thoughtful design and practical problem-solving together to build things that look great and work even better.
            </p>
            <div className="flex flex-col gap-4 pt-5 sm:flex-row sm:items-center sm:gap-8">
              <a href="#work" className="group inline-flex min-h-12 items-center justify-center gap-3 bg-foreground px-7 py-4 text-sm text-background transition-colors duration-300 hover:bg-accent">
                Explore My Work <span className="transition-transform duration-300 group-hover:translate-y-0.5">↓</span>
              </a>
              <a href="#contact" className="link-underline self-start py-2 text-sm text-foreground sm:self-auto">
                Request a Quote →
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ---------- Work ---------- */
function Work() {
  return (
    <section id="work" className="bg-secondary px-6 py-28 md:px-10 md:py-40">
      <div className="mx-auto max-w-7xl">
        <SectionHead
          eyebrow="Selected work"
          title={<>Good ideas, <em className="text-accent">brought to life.</em></>}
          copy="Every project starts with a problem worth solving. Here's a look at some of the digital experiences I've created."
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
        <ProjectImage project={p} />
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
    <div className="group relative overflow-hidden bg-card shadow-[0_30px_60px_-30px_color-mix(in_oklab,var(--ink)_35%,transparent)]">
      <div className="flex items-center gap-1.5 border-b bg-background px-4 py-2.5" aria-hidden="true">
        <span className="h-2 w-2 rounded-full bg-foreground/15" />
        <span className="h-2 w-2 rounded-full bg-foreground/15" />
        <span className="h-2 w-2 rounded-full bg-foreground/15" />
      </div>
      <div className="aspect-[16/10] overflow-hidden">
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
    <section id="about" className="px-6 py-28 md:px-10 md:py-40">
      <div className="mx-auto max-w-7xl">
        <SectionHead eyebrow="A little about me" title={<>A creative mind.<br /><em className="text-accent">An analytical one, too.</em></>} />
        <div className="mt-20 grid gap-14 md:grid-cols-12">
          <Reveal className="md:col-span-5">
            <div className="relative mx-auto w-full max-w-[260px] md:mx-0 md:max-w-[300px]">
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
          <Reveal delay={120} className="space-y-5 text-lg leading-relaxed text-muted-foreground md:col-span-6 md:col-start-7">
            <p className="font-serif text-3xl text-foreground">Hi, I'm Alexis.</p>
            <p>I hold a Ph.D. in psychology and have spent more than 12 years building a career in data, technology, and business strategy.</p>
            <p>I'm a designer, builder, problem-solver, and someone who genuinely loves figuring out how to make things work better.</p>
            <p>That's a different path than most web designers take, and it taught me to think critically, understand how people interact with information, and approach challenges from multiple perspectives.</p>
            <p>Today, I bring that same curiosity and problem-solving mindset to web design and digital development.</p>
            <p>I believe the best digital experiences aren't just beautiful. They're intuitive, purposeful, and built around the people who use them.</p>
            <p>Whether you're launching a new business, refreshing an existing website, or exploring an idea, I love finding creative ways to bring it to life.</p>
            <ul className="grid gap-6 border-t pt-8 sm:grid-cols-3">
              {[
                ["Human-Centered Thinking", "Grounded in a doctorate in psychology"],
                ["Business-Minded Solutions", "Shaped by years in data strategy"],
                ["Thoughtful Design", "Built with modern technology"],
              ].map(([h, c], i) => (
                <li key={h} className="text-base text-foreground">
                  <span className="eyebrow block text-terracotta">0{i + 1}</span>
                  <span className="mt-2 block font-serif text-2xl leading-tight">{h}</span>
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
    <section id="services" className="bg-secondary px-6 py-28 md:px-10 md:py-40">
      <div className="mx-auto max-w-7xl">
        <SectionHead
          eyebrow="What I do"
          title={<>Good design is just <em className="text-accent">the beginning.</em></>}
          copy="Every business is different. I focus on creating thoughtful digital solutions tailored to what you actually need, without unnecessary complexity."
        />
        <div className="mt-20 border-t border-foreground">
          {services.map((s, i) => (
            <Reveal key={s.title} as="article" className="group grid gap-6 border-b border-foreground/20 py-12 md:grid-cols-12 md:gap-10 md:py-16">
              <span className="font-serif text-2xl text-terracotta md:col-span-1">0{i + 1}</span>
              <div className="md:col-span-6">
                <h3 className="text-4xl transition-transform duration-500 group-hover:translate-x-2 md:text-5xl">{s.title}</h3>
                <p className="mt-5 max-w-lg leading-relaxed text-muted-foreground">{s.blurb}</p>
              </div>
              <ul className="space-y-2.5 text-sm md:col-span-4 md:col-start-9">
                {s.includes.map((x) => (
                  <li key={x} className="flex gap-3 border-b border-foreground/10 pb-2.5"><span className="text-accent" aria-hidden="true">+</span>{x}</li>
                ))}
              </ul>
            </Reveal>
          ))}
        </div>
        <p className="mt-10 max-w-xl text-sm italic text-muted-foreground">
          Complex integrations and custom software projects are evaluated individually based on technical requirements.
        </p>
        <p className="mt-6 text-base text-foreground">
          Not sure what you need? Let's talk it through.{" "}
          <BookingLink placement="services" className="link-underline whitespace-nowrap text-accent">Schedule a Free 15-Minute Chat →</BookingLink>
        </p>
      </div>
    </section>
  );
}

/* ---------- Process ---------- */
function Process() {
  return (
    <section aria-labelledby="process-title" className="px-6 py-28 md:px-10 md:py-40">
      <div className="mx-auto max-w-7xl">
        <SectionHead
          eyebrow="The process"
          title={<span id="process-title">Simple process. <em className="text-accent">Thoughtful results.</em></span>}
          copy="Building something new shouldn't feel overwhelming. I keep the process collaborative, transparent, and focused on what matters most."
        />
        <ol className="relative mt-20 grid gap-12 md:grid-cols-4 md:gap-8">
          <span aria-hidden="true" className="absolute bottom-0 left-[7px] top-0 w-px bg-border md:bottom-auto md:left-0 md:right-0 md:top-[7px] md:h-px md:w-auto" />
          {steps.map((s, i) => (
            <Reveal as="li" key={s.title} delay={i * 110} className="relative pl-10 md:pl-0 md:pt-12">
              <span aria-hidden="true" className="absolute left-0 top-1 h-[15px] w-[15px] rounded-full border border-terracotta bg-background md:top-0" />
              <span className="eyebrow text-muted-foreground">0{i + 1}</span>
              <h3 className="mt-2 text-4xl">{s.title}</h3>
              <p className="mt-4 leading-relaxed text-muted-foreground">{s.text}</p>
            </Reveal>
          ))}
        </ol>
      </div>
    </section>
  );
}

/* ---------- Differentiator ---------- */
function Differentiator() {
  return (
    <section aria-labelledby="diff-title" className="bg-aegean px-6 py-28 text-accent-foreground md:px-10 md:py-40">
      <div className="mx-auto grid max-w-7xl gap-14 md:grid-cols-12">
        <Reveal className="md:col-span-6">
          <h2 id="diff-title" className="text-5xl leading-[0.95] sm:text-6xl lg:text-8xl">
            Not just another <em>pretty</em> website.
          </h2>
        </Reveal>
        <Reveal delay={120} className="space-y-5 self-end text-lg leading-relaxed text-accent-foreground/85 md:col-span-5 md:col-start-8">
          <p>A great website should do more than look good.</p>
          <p>It should help people understand what you do, make it easier for customers to connect with you, and support the way your business operates.</p>
          <p>That's why I approach every project with equal parts creativity, curiosity, and strategy.</p>
          <p className="border-t border-accent-foreground/30 pt-6 font-serif text-2xl italic text-accent-foreground">
            Less unnecessary complexity. More thoughtful solutions.
          </p>
        </Reveal>
      </div>
    </section>
  );
}

/* ---------- Automation ---------- */
function Automation() {
  return (
    <section aria-labelledby="automation-title" className="px-6 py-24 md:px-10 md:py-32">
      <div className="mx-auto grid max-w-7xl gap-10 md:grid-cols-12">
        <Reveal className="md:col-span-6">
          <h2 id="automation-title" className="text-5xl leading-[0.95] sm:text-6xl">
            What's one task you wish you could <em className="text-accent">automate?</em>
          </h2>
        </Reveal>
        <Reveal delay={120} className="self-end md:col-span-5 md:col-start-8">
          <p className="text-lg leading-relaxed text-muted-foreground">
            Every business has repetitive tasks that take up more time than they should. Whether it's managing inquiries, updating spreadsheets, sending follow-ups, or moving information between systems, there may be a simpler way. Tell me what's slowing you down, and I'll help you explore whether automation could make it easier.
          </p>
          <BookingLink
            placement="automation"
            className="group mt-8 inline-flex min-h-12 items-center justify-center gap-3 border border-foreground px-7 py-4 text-sm transition-colors duration-300 hover:bg-foreground hover:text-background"
          >
            Let's Talk About Automation <span aria-hidden="true" className="transition-transform duration-300 group-hover:translate-x-1">→</span>
          </BookingLink>
        </Reveal>
      </div>
    </section>
  );
}

/* ---------- Consultation ---------- */
function Consultation() {
  return (
    <section aria-labelledby="consult-title" className="bg-secondary px-6 py-24 md:px-10 md:py-32">
      <div className="mx-auto grid max-w-7xl gap-10 md:grid-cols-12">
        <Reveal className="md:col-span-6">
          <p className="eyebrow flex items-center gap-4 text-accent"><span className="h-px w-10 bg-accent" aria-hidden="true" />Free 15-minute chat</p>
          <h2 id="consult-title" className="mt-6 text-5xl leading-[0.95] sm:text-6xl">Have something <em className="text-accent">in mind?</em></h2>
        </Reveal>
        <Reveal delay={120} className="self-end md:col-span-5 md:col-start-8">
          <p className="text-lg leading-relaxed text-muted-foreground">Whether you have a specific project or are still figuring things out, I'm happy to hear what you're working on.</p>
          <BookingLink
            placement="discovery_section"
            className="group mt-8 inline-flex min-h-12 items-center justify-center gap-3 border border-foreground px-7 py-4 text-sm transition-colors duration-300 hover:bg-foreground hover:text-background"
          >
            Schedule a Free 15-Minute Chat <span aria-hidden="true" className="transition-transform duration-300 group-hover:translate-x-1">→</span>
          </BookingLink>
          <p className="mt-4 text-sm italic text-muted-foreground">No obligation. Just a conversation about your business and what you're looking to build.</p>
        </Reveal>
      </div>
    </section>
  );
}

/* ---------- Contact ---------- */
function Contact() {
  return (
    <section id="contact" className="px-6 py-28 md:px-10 md:py-40">
      <div className="mx-auto grid max-w-7xl gap-16 md:grid-cols-12">
        <Reveal className="md:col-span-5">
          <p className="eyebrow flex items-center gap-4 text-accent"><span className="h-px w-10 bg-accent" aria-hidden="true" />Request a quote</p>
          <h2 className="mt-6 text-5xl leading-[0.95] sm:text-6xl">
            Ready to get <em className="text-accent">started?</em>
          </h2>
          <p className="mt-8 text-lg leading-relaxed text-muted-foreground">Know what you need? Share your project details and let's discuss next steps.</p>
          <div className="mt-12 border-t pt-8">
            <p className="font-serif text-2xl">Still exploring?</p>
            <p className="mt-2 leading-relaxed text-muted-foreground">Have questions or want to talk through an idea? Let's connect.</p>
            <BookingLink placement="contact" className="group mt-4 inline-flex items-center gap-2 text-sm">
              <span className="link-underline">Schedule a Free 15-Minute Chat</span>
              <span aria-hidden="true" className="transition-transform duration-300 group-hover:translate-x-1">→</span>
            </BookingLink>
          </div>
        </Reveal>
        <Reveal delay={120} className="relative md:col-span-6 md:col-start-7">
          <ContactForm />
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
        <div className="flex flex-col gap-12 md:flex-row md:items-end md:justify-between">
          <div>
            <Wordmark className="text-4xl md:text-5xl" />
            <p className="mt-3 font-serif text-xl italic text-ink-foreground/70">Thoughtfully designed. Purposefully built.</p>
          </div>
          <nav aria-label="Footer" className="flex flex-col gap-6 sm:flex-row sm:gap-14">
            <ul className="flex flex-wrap gap-x-8 gap-y-3 text-sm">
              {navLinks.map((l) => (
                <li key={l.id}><a href={`#${l.id}`} className="link-underline">{l.label}</a></li>
              ))}
            </ul>
            {(socials.linkedin || socials.email) && (
              <ul className="flex gap-8 text-sm">
                {socials.linkedin && <li><a href={socials.linkedin} target="_blank" rel="noopener noreferrer" className="link-underline">LinkedIn</a></li>}
                {socials.email && <li><a href={`mailto:${socials.email}`} className="link-underline">Email</a></li>}
              </ul>
            )}
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
