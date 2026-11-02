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

const CONTACT = "alexis@alexisbeamdesign.com";

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="border-t pt-8">
      <h2 className="font-serif text-3xl leading-tight md:text-4xl">{title}</h2>
      <div className="editorial-body mt-4 space-y-4 text-muted-foreground">{children}</div>
    </section>
  );
}

function PrivacyPolicy() {
  return (
    <>
      <header className="border-b px-6 py-5 md:px-10">
        <div className="mx-auto flex max-w-3xl flex-wrap items-center justify-between gap-x-6 gap-y-3">
          <Link to="/" aria-label="alexis beam, home"><Wordmark /></Link>
          <Link to="/" className="link-underline text-sm">← Back to site</Link>
        </div>
      </header>
      <main id="main" className="px-6 pb-20 pt-32 md:px-10 md:pb-28 md:pt-40">
        <article className="mx-auto max-w-3xl space-y-12">
          <div>
            <p className="eyebrow text-accent">Last revised: November 2, 2026</p>
            <h1 className="editorial-page-title mt-4">Privacy Policy</h1>
            <p className="mt-6 text-lg leading-relaxed text-muted-foreground">
              This website, alexisbeamdesign.com, is operated by Meant To Beam LLC, doing business as Alexis Beam Design ("I", "me"). This policy explains what information I collect through this website and through my Facebook and Instagram consultation request forms, and how it's used.
            </p>
          </div>

          <Section title="Inquiries submitted through this website">
            <p>When you send an inquiry through this website, I collect what you choose to provide: your name, email address, and optionally your business name, existing website, desired timeline, approximate budget, the type of service you're interested in, and your project description.</p>
            <p>I use website inquiries to review your request and respond about your project. I don't sell this information, add you to a marketing email list, or use your form answers for promotional marketing.</p>
          </Section>

          <Section title="How inquiries are processed">
            <p>Inquiries are stored in the website's database, which is managed by the site's hosting provider, and are not publicly accessible. When an inquiry arrives, an email notification with its details is sent to me through the hosting provider's email service so I can reply.</p>
            <p>Inquiries are not automatically deleted on a set schedule.</p>
            <p>The website database and notification-email process described here applies to inquiries submitted through this website.</p>
          </Section>

          <Section title="Facebook and Instagram consultation requests">
            <p>When you request a free consultation through a Facebook or Instagram instant form, I collect the information you submit. This includes your name, email address, business name, the service you need, and your project timeframe. You may also choose to provide your phone number and existing website.</p>
            <p>Your form responses are collected through Meta and automatically transferred to a Google Sheet that I use to manage consultation requests. I use this information to respond to your request, discuss your project, arrange a consultation, and keep track of follow-up.</p>
            <p>Submitting a request does not subscribe you to a marketing email list. I do not sell your personal information.</p>
            <p>Meta and Google process information through their respective services under their applicable privacy policies: <a href="https://www.facebook.com/privacy/policy/" target="_blank" rel="noopener noreferrer" className="link-underline text-foreground">Meta Privacy Policy<span className="sr-only"> (opens in a new tab)</span></a> and <a href="https://policies.google.com/privacy" target="_blank" rel="noopener noreferrer" className="link-underline text-foreground">Google Privacy Policy<span className="sr-only"> (opens in a new tab)</span></a>.</p>
            <p>I keep Facebook and Instagram consultation requests in Google Sheets until I manually delete them. To request deletion, contact me at <a href={`mailto:${CONTACT}`} className="link-underline text-foreground">{CONTACT}</a>.</p>
          </Section>

          <Section title="Advertising measurement with Meta">
            <p>Alongside transferring consultation requests to Google Sheets, I have connected Meta's Conversions API for advertising measurement. Meta processes information it receives through this connection under <a href="https://www.facebook.com/privacy/policy/" target="_blank" rel="noopener noreferrer" className="link-underline text-foreground">Meta's Privacy Policy<span className="sr-only"> (opens in a new tab)</span></a>.</p>
            <p>I don't use this connection to build marketing lists or send you promotional messages.</p>
          </Section>

          <Section title="Analytics">
            <p>This site uses Google Analytics to understand how visitors find and use it, for example which pages are viewed and which buttons are clicked. Google Analytics uses cookies and collects information such as your approximate location, device and browser type, and the website that referred you.</p>
            <p>Advertising personalization and Google signals are turned off. Your name, email address and form answers are not sent to Google Analytics. Google's own use of this data is described in <a href="https://policies.google.com/privacy" target="_blank" rel="noopener noreferrer" className="link-underline text-foreground">Google's Privacy Policy<span className="sr-only"> (opens in a new tab)</span></a>.</p>
            <p>Google Analytics is separate from the Google Sheet described above. Form responses are not sent to Google Analytics.</p>
            <p>If you arrive through a tagged link (for example from an ad or a social post), the site may remember the link's campaign tags and the page you first landed on, stored only in your browser's session storage for that visit. If you later send an inquiry or open the scheduling page, those tags are included with the inquiry notification email or passed to Calendly so I can understand how people find the site. If your browser blocks this storage, that context is simply omitted.</p>
          </Section>

          <Section title="Scheduling with Calendly">
            <p>If you book a free 15-minute consultation, you'll be taken to Calendly, a third-party scheduling service. Information you enter there, such as your name, email and answers to booking questions, is collected by Calendly and shared with me so we can meet. Calendly's handling of your data is described in <a href="https://calendly.com/privacy" target="_blank" rel="noopener noreferrer" className="link-underline text-foreground">Calendly's Privacy Notice<span className="sr-only"> (opens in a new tab)</span></a>.</p>
          </Section>

          <Section title="Service providers">
            <p>I rely on a small number of providers:</p>
            <ul className="list-disc space-y-2 pl-5">
              <li>The site's hosting and database provider, which also sends website inquiry notification emails.</li>
              <li>Google Analytics, for website analytics.</li>
              <li>Calendly, for scheduling.</li>
              <li>Meta Platforms, for Facebook and Instagram lead forms and the connected advertising measurement integration.</li>
              <li>Google Sheets, for storing and managing consultation requests submitted through Meta.</li>
            </ul>
            <p>They process information only as needed to provide their services.</p>
          </Section>

          <Section title="Your choices and questions">
            <p>You can block or delete cookies in your browser settings, or use Google's opt-out browser add-on to stop Google Analytics from collecting data about your visits.</p>
            <p>If you have questions about this policy or about information you've submitted, whether through this website or through a Facebook or Instagram consultation request, or you want to make a request regarding your information, email <a href={`mailto:${CONTACT}`} className="link-underline text-foreground">{CONTACT}</a>. Information from Facebook and Instagram requests may be held in both Meta and Google Sheets. Contact me about access or deletion requests. Depending on where you live, you may have rights under applicable law to request access to or deletion of your personal information, and I'll respond to requests as required by that law.</p>
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
