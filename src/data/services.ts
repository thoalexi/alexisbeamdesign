import { steps } from "./site";

/**
 * Content for the standalone service pages. Everything here must stay truthful:
 * no prices, guarantees, turnaround promises, testimonials, or client outcomes.
 * Alexis is based in Atlanta and works remotely with small businesses across the U.S.
 */

export type ServiceFaq = { q: string; a: string };

export type ServicePagePath = "/small-business-web-design" | "/website-redesign" | "/workflow-automation";

export type ServicePage = {
  /** URL path segment, e.g. "small-business-web-design" */
  slug: string;
  /** Full route path, used for type-safe links. */
  path: ServicePagePath;
  /** Matches an entry in serviceOptions so the quote form can preselect it. */
  inquiryService: string;
  title: string;
  metaTitle: string;
  metaDescription: string;
  h1: string;
  intro: string;
  problemsTitle: string;
  problems: string[];
  includedTitle: string;
  included: string[];
  processNote: string;
  scopeCaveat: string;
  faqs: ServiceFaq[];
};

export const servicePages: ServicePage[] = [
  {
    slug: "small-business-web-design",
    path: "/small-business-web-design",
    inquiryService: "New Website",
    title: "Website Design & Development",
    metaTitle: "Small Business Web Design & Development | Alexis Beam",
    metaDescription:
      "Custom website design and development for small businesses. Thoughtful, mobile-friendly sites built to make a great first impression and turn visitors into customers. Based in Atlanta, working remotely across the U.S.",
    h1: "Website design & development for small businesses",
    intro:
      "Your website is often the first place people meet your business. I design and build custom websites that look considered, load cleanly, and make it easy for visitors to understand what you do and take the next step. I'm based in Atlanta and work remotely with small businesses across the U.S.",
    problemsTitle: "When this is a good fit",
    problems: [
      "You're starting a business and need a professional online presence for the first time.",
      "Your current site is outdated, hard to update, or doesn't reflect the quality of your work.",
      "Visitors browse but don't reach out, and you're not sure why.",
      "You've outgrown a DIY template and want something built around your business, not the other way around.",
    ],
    includedTitle: "What's included",
    included: [
      "Custom website design tailored to your brand and audience",
      "Responsive layouts that work beautifully on phones, tablets, and desktops",
      "Mobile-friendly experiences designed for real visitors",
      "Contact and lead-generation forms so inquiries can reach you directly",
      "Foundational SEO setup: page titles, descriptions, social sharing metadata, and clean structure",
    ],
    processNote:
      "Every website project follows the same collaborative process: we start with a conversation about your business and goals, I develop a visual direction for your review, then I build and refine the site with you before launch.",
    scopeCaveat:
      "Complex integrations and custom software projects are evaluated individually based on technical requirements. If your project needs something beyond a thoughtfully built website, I'll tell you honestly what's involved before we begin.",
    faqs: [
      {
        q: "How much does a new website cost?",
        a: "Every project is different, so I don't publish fixed prices. After a short conversation about what you need, I'll provide a clear, scoped quote before any work begins, so you know what to expect.",
      },
      {
        q: "Do I need to be in Atlanta to work with you?",
        a: "No. I'm based in Atlanta, but I work remotely with small businesses across the U.S. Our conversations happen over video or phone, and everything else is shared online.",
      },
      {
        q: "What do you need from me to get started?",
        a: "Mainly your perspective: what your business does, who your customers are, and what you want the site to accomplish. If you have existing branding, copy, or photos, great — if not, we'll talk through what's needed.",
      },
    ],
  },
  {
    slug: "website-redesign",
    path: "/website-redesign",
    inquiryService: "Website Redesign",
    title: "Website Redesign",
    metaTitle: "Website Redesign for Small Businesses | Alexis Beam",
    metaDescription:
      "Website redesign services for small businesses whose current site isn't working for them. Clearer navigation, better mobile experience, and customer journeys that make sense. Based in Atlanta, working remotely across the U.S.",
    h1: "Website redesigns that make your site work harder",
    intro:
      "Already have a website that isn't quite working for you? A redesign can turn it into something you're excited to share — clearer, faster to navigate, and built around how your customers actually look for information. I'm based in Atlanta and work remotely with small businesses across the U.S.",
    problemsTitle: "Signs it might be time",
    problems: [
      "Your site looks dated next to competitors, and you hesitate to share the link.",
      "Visitors can't quickly find what they need, so they leave without contacting you.",
      "The site is frustrating to use on a phone, where many of your customers browse.",
      "Your business has evolved, but the website still tells the old story.",
    ],
    includedTitle: "What's included",
    included: [
      "Website refreshes that modernize the look while respecting what already works",
      "Improved navigation so visitors find what they need in fewer clicks",
      "User experience enhancements informed by how people actually read and decide",
      "Mobile optimization for the growing share of visitors on phones",
      "Clearer customer journeys from first visit to getting in touch",
    ],
    processNote:
      "A redesign starts with listening: what's working, what's frustrating, and what you want the new site to accomplish. From there I develop a refreshed direction, build it, and we review and refine together before anything goes live.",
    scopeCaveat:
      "Complex integrations and custom software projects are evaluated individually based on technical requirements. If your redesign involves systems beyond the website itself, we'll scope that honestly before starting.",
    faqs: [
      {
        q: "Will I lose my existing content or search rankings?",
        a: "No one can honestly guarantee search rankings — they depend on many factors outside any designer's control. What I can do is handle the fundamentals carefully: we review your existing content together, keep what's working, carry over the foundational SEO elements — page titles, descriptions, and structure — and review URL changes and redirect needs as part of the project scope.",
      },
      {
        q: "How is a redesign different from starting over?",
        a: "A redesign starts from what you have: your content, your audience, and an honest look at what is and isn't working. Sometimes the right answer is a focused refresh; sometimes it's a fuller rebuild. I'll recommend the simpler option when it serves you.",
      },
      {
        q: "Do I need to be local to work with you?",
        a: "No. I'm based in Atlanta and work remotely with small businesses across the U.S. Everything — from our first conversation to design reviews — happens online or over the phone.",
      },
    ],
  },
  {
    slug: "workflow-automation",
    path: "/workflow-automation",
    inquiryService: "Automation / Workflow Improvement",
    title: "Digital Solutions & Workflow Automation",
    metaTitle: "Workflow Automation for Small Businesses | Alexis Beam",
    metaDescription:
      "Practical workflow automation for small businesses: automated customer follow-ups, connected forms and spreadsheets, reporting, and admin workflows. Based in Atlanta, working remotely across the U.S.",
    h1: "Workflow automation that gives you your time back",
    intro:
      "Every business has repetitive tasks that take up more time than they should — follow-ups, data entry, reports, moving information between tools. I build practical automations that handle the everyday work quietly in the background, so your business runs more smoothly. I'm based in Atlanta and work remotely with small businesses across the U.S.",
    problemsTitle: "Where automation helps most",
    problems: [
      "Customer inquiries sit unanswered because follow-up depends on remembering to do it.",
      "The same information gets typed into forms, spreadsheets, and emails more than once.",
      "Reports take hours to assemble by hand, so they happen less often than they should.",
      "Administrative workflows live in someone's head, and everything stalls when they're away.",
    ],
    includedTitle: "What's included",
    included: [
      "Automated customer follow-ups that help inquiries get a timely response",
      "Connected forms and spreadsheets that keep information in sync",
      "Automated reporting and dashboards that are ready when you are",
      "Administrative workflow automation for the repeatable parts of your operations",
      "Interactive web tools built around how your business actually works",
    ],
    processNote:
      "Automation work starts with understanding your current process — what's working, what's frustrating, and what's worth automating. Then I design a practical solution, build it, and we refine it together around your real workflow.",
    scopeCaveat:
      "Complex integrations and custom software projects are evaluated individually based on technical requirements. Some systems connect easily; others need more involved work. I'll always be upfront about which situation you're in before we start.",
    faqs: [
      {
        q: "How do I know if a task is worth automating?",
        a: "A good rule of thumb: if it's repetitive, follows predictable steps, and eats time every week, it's worth a conversation. Part of my job is helping you figure out where automation genuinely helps — and where it doesn't.",
      },
      {
        q: "Will automation work with the tools I already use?",
        a: "Often, yes — many common business tools can be connected. It depends on the specific systems involved, which is why every automation project starts with a look at your current setup before I recommend anything.",
      },
      {
        q: "Do I need to be technical to manage what you build?",
        a: "No. A good automation is designed to run quietly in the background. I build with maintainability in mind and make sure you understand what your systems do in plain language.",
      },
    ],
  },
];

export function servicePageBySlug(slug: string): ServicePage | undefined {
  return servicePages.find((s) => s.slug === slug);
}

/** Map an allowlisted ?service= quote-CTA value to a valid form option, or "" if unknown. */
export function preselectService(raw: string, options: readonly string[]): string {
  const v = raw.trim();
  return options.includes(v) ? v : "";
}

export { steps as serviceProcessSteps };
