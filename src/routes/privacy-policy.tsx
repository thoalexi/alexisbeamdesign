import { createFileRoute, Link } from "@tanstack/react-router";
import { Wordmark } from "@/components/site/Header";

const TITLE = "Privacy Policy | Alexis Beam Design";
const DESC = "How Alexis Beam Design collects and uses information submitted through alexisbeamdesign.com, including inquiries, analytics and Calendly scheduling.";

export const Route = createFileRoute("/privacy-policy")({
  head: () => ({
    meta: [
      { title: TITLE },
      { name: "description", content: DESC },
      { property: "og:title", content: TITLE },
      { property: "og:description", content: DESC },
      { property: "og:type", content: "article" },
      { property: "og:url", content: "/privacy-policy" },
      { name: "twitter:card", content: "summary" },
      { name: "twitter:title", content: TITLE },
      { name: "twitter:description", content: DESC },
    ],
    links: [{ rel: "canonical", href: "/privacy-policy" }],
  }),
  component: PrivacyPolicy,
});

const CONTACT = "alexisbeamdesign@gmail.com";

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="border-t pt-8">
      <h2 className="text-3xl md:text-4xl">{title}</h2>
      <div className="mt-4 space-y-4 leading-relaxed text-muted-foreground">{children}</div>
    </section>
  );
}

function PrivacyPolicy() {
  return (
    <>
      <header className="border-b px-6 py-5 md:px-10">
        <div className="mx-auto flex max-w-3xl items-center justify-between">
          <Link to="/" aria-label="alexis beam, home"><Wordmark /></Link>
          <Link to="/" className="link-underline text-sm">← Back to site</Link>
        </div>
      </header>
      <main id="main" className="px-6 py-20 md:px-10 md:py-28">
        <article className="mx-auto max-w-3xl space-y-12">
          <div>
            <p className="eyebrow text-accent">Effective October 12, 2026</p>
            <h1 className="mt-4 text-5xl leading-[0.95] sm:text-6xl">Privacy Policy</h1>
            <p className="mt-6 text-lg leading-relaxed text-muted-foreground">
              This website, alexisbeamdesign.com, is operated by Meant To Beam LLC, doing business as Alexis Beam Design ("I", "me"). This policy explains what information the site collects and how it's used.
            </p>
          </div>

          <Section title="Information you submit">
            <p>When you send an inquiry, I collect what you choose to provide: your name, email address, and optionally your business name, existing website, desired timeline, approximate budget, the type of service you're interested in, and your project description.</p>
            <p>I use this information only to review your request and respond to you about your project. I don't sell it or use it for advertising.</p>
          </Section>

          <Section title="How inquiries are processed">
            <p>Inquiries are stored in the website's database, which is managed by the site's hosting provider, and are not publicly accessible. When an inquiry arrives, an email notification with its details is sent to me through the hosting provider's email service so I can reply.</p>
            <p>Inquiries are not automatically deleted on a set schedule.</p>
          </Section>

          <Section title="Analytics">
            <p>This site uses Google Analytics to understand how visitors find and use it, for example which pages are viewed and which buttons are clicked. Google Analytics uses cookies and collects information such as your approximate location, device and browser type, and the website that referred you.</p>
            <p>Advertising personalization and Google signals are turned off. Your name, email address and form answers are not sent to Google Analytics. Google's own use of this data is described in <a href="https://policies.google.com/privacy" target="_blank" rel="noopener noreferrer" className="link-underline text-foreground">Google's Privacy Policy<span className="sr-only"> (opens in a new tab)</span></a>.</p>
            <p>If you arrive through a tagged link (for example from an ad or a social post), the site may remember the link's campaign tags and the page you first landed on, stored only in your browser's session storage for that visit. If you later send an inquiry or open the scheduling page, those tags are included with the inquiry notification email or passed to Calendly so I can understand how people find the site. If your browser blocks this storage, that context is simply omitted.</p>
          </Section>

          <Section title="Scheduling with Calendly">
            <p>If you book a free 15-minute consultation, you'll be taken to Calendly, a third-party scheduling service. Information you enter there, such as your name, email and answers to booking questions, is collected by Calendly and shared with me so we can meet. Calendly's handling of your data is described in <a href="https://calendly.com/privacy" target="_blank" rel="noopener noreferrer" className="link-underline text-foreground">Calendly's Privacy Notice<span className="sr-only"> (opens in a new tab)</span></a>.</p>
          </Section>

          <Section title="Service providers">
            <p>The site relies on a small number of providers to operate: its hosting and database provider (which also sends inquiry notification emails), Google Analytics, and Calendly. They process information only as needed to provide their services.</p>
          </Section>

          <Section title="Your choices and questions">
            <p>You can block or delete cookies in your browser settings, or use Google's opt-out browser add-on to stop Google Analytics from collecting data about your visits.</p>
            <p>If you have questions about this policy or about information you've submitted, or you want to make a request regarding your information, email <a href={`mailto:${CONTACT}`} className="link-underline text-foreground">{CONTACT}</a>. Depending on where you live, you may have rights under applicable law to request access to or deletion of your personal information, and I'll respond to requests as required by that law.</p>
          </Section>

          <Section title="Changes to this policy">
            <p>If this policy changes, the updated version will be posted on this page with a new effective date.</p>
          </Section>
        </article>
      </main>
      <footer className="border-t px-6 py-8 text-xs text-muted-foreground md:px-10">
        <p className="mx-auto max-w-3xl">© {new Date().getFullYear()} Meant To Beam LLC, doing business as Alexis Beam Design.</p>
      </footer>
    </>
  );
}
