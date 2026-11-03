import { attributionUtmParams } from "@/lib/attribution";

export const homepageCopy = {
  opening: "Websites and practical workflow automation for small businesses.",
  intro: "Based in Atlanta, working with small businesses across the U.S.",
  servicesIntro: "Website design, redesign, and practical improvements to the tools you use every day.",
  differentiator: "A website should help people understand your business and take the next step. Connected tools and practical automation can make the work behind it simpler, too.",
  contactIntro: "Share what you need from your website or everyday workflow. I’ll review your details and follow up by email.",
  chatHeading: "Prefer a conversation?",
  chatIntro: "A free 15-minute chat is optional. We can also talk through your project by email.",
  followUp: "I’ll review your details and follow up by email.",
};

export const navLinks = [
  { id: "work", label: "Work" },
  { id: "about", label: "About" },
  { id: "services", label: "Services" },
  { id: "faq", label: "FAQ" },
] as const;

/** Leave null until real details exist — links are hidden when null. */
export const socials = {
  linkedin: null as string | null, // TODO: add LinkedIn profile URL
  email: null as string | null, // TODO: add public email address
};

export const services = [
  {
    title: "Website Design & Development",
    blurb:
      "Modern, thoughtfully designed websites that help your business make a great first impression and turn visitors into customers.",
    includes: [
      "Custom website design",
      "Responsive layouts",
      "Mobile-friendly experiences",
      "Contact and lead-generation forms",
      "Foundational SEO setup",
    ],
  },
  {
    title: "Website Redesign",
    blurb:
      "Already have a website that isn't quite working for you? Let's make it something you're excited to share.",
    includes: [
      "Website refreshes",
      "Improved navigation",
      "User experience enhancements",
      "Mobile optimization",
      "Clearer customer journeys",
    ],
  },
  {
    title: "Digital Solutions & Workflow Automation",
    blurb:
      "Practical automation for the everyday work that eats up your time, from customer follow-ups and connected forms and spreadsheets to reporting and admin workflows, so your business runs more smoothly.",
    includes: [
      "Automated customer follow-ups",
      "Connected forms and spreadsheets",
      "Automated reporting and dashboards",
      "Administrative workflow automation",
      "Interactive web tools",
    ],
  },
];

/** Client portal for active projects. */
export const clientPortalUrl = "https://portal.alexisbeamdesign.com";

export const steps = [
  { title: "Let's Talk", text: ["Tell me about your business, what you're looking for, and what you want your website to accomplish.", "We'll discuss your goals, budget, and timeline to determine the best approach."] },
  { title: "Review Your Proposal", text: ["I'll send you a personalized proposal outlining your project scope, deliverables, timeline, and pricing.", "You can review everything through a private link, ask questions, or request changes."], note: "No account required." },
  { title: "Make It Official", text: ["Once you're happy with the proposal, we'll finalize the service agreement and initial deposit.", "As soon as your agreement is signed, you'll receive an invitation to your private client portal."] },
  { title: "Watch It Come Together", text: ["Follow your project's progress, review designs, provide feedback, upload materials, and access important documents from your personal client workspace.", "You'll always know where things stand and what's needed next."] },
  { title: "Launch & Beyond", text: ["Once your website is approved and the final project balance is paid, we'll prepare for launch.", "Your maintenance plan begins when your website goes live, providing ongoing support, routine upkeep, and minor updates."] },
];

export const portal = {
  intro: "No chasing email threads or wondering what's happening behind the scenes. Once your project begins, you'll have a private workspace to follow progress, share materials, review work, and keep important documents organized.",
  benefits: [
    { title: "Clear Progress", text: "Follow project stages, milestones, and updates as your website comes together." },
    { title: "Easy Collaboration", text: "Review designs, provide feedback, and share files without losing information in lengthy email threads." },
    { title: "Organized Documents", text: "Find your approved proposal, invoices, project information, and important files in one location." },
    { title: "Less Back-and-Forth", text: "See exactly what needs your attention and what happens next." },
  ],
  notes: [
    "Proposals arrive as a private link. No account is needed to review one.",
    "Approving a proposal is a separate step from signing the service agreement.",
    "You'll receive your portal invitation once your service agreement is signed. The portal is for active client projects.",
  ],
};

export const faqIntro = "Here's what you can expect when we work together. Still wondering about something? Just ask.";

export const faqs: { q: string; a: string[] }[] = [
  { q: "Do I need to know anything technical?", a: ["Not at all. If you can tell me what your business does and what you want your website to accomplish, that's enough to get started. I'll handle the technical details and explain anything you'd like to understand along the way."] },
  { q: "What do you need from me to start?", a: ["A little information about your business, your goals, and any branding, photos, or content you already have. Don't have everything ready? That's okay. We can discuss what you need and whether content creation or branding support should be included in your proposal."] },
  { q: "How long does it take?", a: ["Timing depends on the size of the project and when I have the content and information needed to begin. You'll receive an estimated timeline in your proposal before work starts, so you know what to expect."] },
  { q: "What if I don't like how it looks?", a: ["You'll have opportunities to review the work and share feedback throughout the project, not just at the end.", "Your project includes two consolidated revision rounds at each major design milestone, unless your proposal specifies otherwise.", "Changes within our agreed scope are included. If you'd like to add something beyond that scope, I'll explain the additional cost and get your approval before proceeding."] },
  { q: "Can I see how my project is going?", a: ["Absolutely. Once your service agreement is signed, you'll receive access to your private client portal.", "You can follow progress, see updates, review work, share files, and access important documents like your proposal and invoices.", "Everything stays organized in one place."] },
  { q: "How do payments work?", a: ["Website projects are typically split into two payments: 50% to get started and 50% before launch.", "Your personalized proposal outlines the full project cost, deliverables, payment schedule, and any ongoing fees before you commit.", "Additional work outside the original scope is quoted and approved separately."] },
  { q: "Do I have to pay monthly?", a: ["My standard website packages include an ongoing maintenance plan to keep your site secure, updated, and running smoothly.", "Maintenance begins when your website launches, with an initial three-month commitment followed by month-to-month service.", "After the initial term, you can cancel with 30 days' written notice.", "Your domain and website remain yours, and I'll help make the transition straightforward."] },
  { q: "What if you disappear?", a: ["Your website shouldn't depend on me being around forever.", "Your domain and essential accounts stay in your name, and you receive ownership of the original website deliverables once the project is paid in full, subject to any third-party licensing terms.", "If we part ways, you'll retain access to your accounts and receive the materials needed to continue independently.", "There are no surprises about ownership or ongoing responsibilities."] },
];

export const serviceOptions = [
  "New Website",
  "Website Redesign",
  "Digital Tool or Web Application",
  "Automation / Workflow Improvement",
  "Something Else",
] as const;

export const budgetOptions = ["Under $1,000", "$1,000–$2,500", "$2,500–$5,000", "$5,000+", "Not Sure Yet"] as const;

export const timelineOptions = ["As soon as possible", "Within 1–3 months", "Within 3–6 months", "I'm flexible"] as const;

/** Public Calendly page for the Free 15-Minute Consultation. Set to null to hide every booking link. */
export const bookingUrl: string | null = "https://calendly.com/alexisbeamdesign";

export type BookingPlacement = "services" | "discovery_section" | "contact" | "automation" | "opening";

/** Booking URL tagged with the placement, keeping any existing query params. Null if not configured/invalid. */
export function bookingLink(placement: BookingPlacement, includeAttribution = true): string | null {
  if (!bookingUrl) return null;
  try {
    const u = new URL(bookingUrl);
    if (u.protocol !== "https:") return null;
    // Forward first-touch campaign attribution (already sanitized to safe tokens),
    // falling back to the site's own defaults when none was captured.
    const captured = includeAttribution ? attributionUtmParams() : {};
    u.searchParams.set("utm_source", captured["utm_source"] ?? "alexisbeamdesign.com");
    u.searchParams.set("utm_medium", captured["utm_medium"] ?? "website");
    if (captured["utm_campaign"]) u.searchParams.set("utm_campaign", captured["utm_campaign"]);
    // The placement is always reported separately as utm_content.
    u.searchParams.set("utm_content", placement);
    return u.toString();
  } catch {
    return null;
  }
}
