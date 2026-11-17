import { attributionUtmParams } from "@/lib/attribution";

export const homepageCopy = {
  opening: "Websites and practical workflow automation for small businesses.",
  intro: "Based in Atlanta, working with small businesses across the U.S.",
  servicesIntro: "Website design, redesign, and practical improvements to the tools you use every day.",
  differentiator: "A website should help people understand your business and take the next step. Connected tools and practical automation can make the work behind it simpler, too.",
  contactIntro: "Whether you've got a fully formed idea or just know something needs to change, I'd love to hear about it.",
  contactHeading: "Tell me what you're dreaming up.",
  chatHeading: "Prefer a conversation?",
  chatIntro: "A free 15-minute chat is optional. We can also talk through your project by email.",
  followUp: "Once I learn a little about what you have in mind, I'll be in touch to discuss next steps. No pressure, no commitment.",
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

/** $125 Website Diagnosis offer for people who already have a website. Purchased only on its own page. */
export const websiteDiagnosis = {
  url: "https://websiteaudit.alexisbeamdesign.com",
  redesignCallout: {
    heading: "Not sure your website needs a redesign?",
    body: "For $125, I’ll review your site on desktop and mobile and tell you what’s working, what’s worth fixing, and what I’d tackle first. If a few changes will do the job, I’ll tell you that, too.",
    cta: "Explore the $125 Website Diagnosis →",
  },
  homepageLink: "Not sure what needs fixing? Explore the $125 Website Diagnosis →",
};

export const steps = [
  { title: "Say Hello", text: ["Tell me a little about your business and what you're hoping to accomplish. No polished plan required."] },
  { title: "Let's Figure It Out", text: ["We'll talk through your goals, what's working, what's not, and what kind of solution makes sense. We can start by email; a call is optional."] },
  { title: "Your Personalized Proposal", text: ["Once we've defined the scope, I'll put together a proposal outlining the recommended approach, deliverables, timeline, and pricing.", "You can review your proposal through a private link, ask questions, or request changes."], note: "No account required." },
  { title: "Let's Build Something Good", text: ["After we've agreed on the details, your service agreement is signed, and your deposit is paid, I'll get to work bringing your project to life.", "You'll receive your portal invitation once your service agreement is signed and your deposit is paid. Follow progress, review work, and share materials in your private client workspace."] },
  { title: "Launch & Beyond", text: ["Once your website is approved and the final project balance is paid, we'll get everything ready to go live and I'll make sure you know how to manage your new setup.", "For standard website packages, your maintenance plan begins when your website goes live. Support for automation or custom tools is agreed in your proposal."] },
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
    "You'll receive your portal invitation once your service agreement is signed and your deposit is paid. The portal is for active client projects.",
  ],
};

export const faqIntro = "Here's what you can expect when we work together. Still wondering about something? Just ask.";

export const faqs: { q: string; a: string[] }[] = [
  { q: "Do I need to know anything technical?", a: ["Not at all! Whether you've got a detailed plan or just know your current website isn't cutting it, we can figure out the right next steps together. I'll handle the technical details and explain anything you'd like to understand along the way."] },
  { q: "What do you need from me to start?", a: ["Easy! Tell me a little about your project through my inquiry form, or book a free 15-minute chat. You don't need to have everything figured out before reaching out.", "You're welcome to start the conversation over email; a call isn't required. Share any branding, photos, or content you already have, and we'll discuss what else is needed as we define the scope."] },
  { q: "How long does it take?", a: ["Timing depends on the size of the project and when I have the content and information needed to begin. You'll receive an estimated timeline in your proposal before work starts, so you know what to expect."] },
  { q: "What if I don't like how it looks?", a: ["You'll have opportunities to review the work and share feedback throughout the project, not just at the end.", "Your project includes two consolidated revision rounds at each major design milestone, unless your proposal specifies otherwise.", "Changes within our agreed scope are included. If you'd like to add something beyond that scope, I'll explain the additional cost and get your approval before proceeding."] },
  { q: "Can I see how my project is going?", a: ["Absolutely. Once your service agreement is signed and your deposit is paid, you'll receive access to your private client portal.", "You can follow progress, see updates, review work, share files, and access important documents like your proposal and invoices.", "Everything stays organized in one place."] },
  { q: "How do payments work?", a: ["Website projects are typically split into two payments: 50% to get started and 50% before launch.", "Your personalized proposal outlines the full project cost, deliverables, payment schedule, and any ongoing fees before you commit.", "Additional work outside the original scope is quoted and approved separately."] },
  { q: "Do I have to pay monthly?", a: ["My standard website packages include an ongoing maintenance plan to keep your site secure, updated, and running smoothly.", "Maintenance begins when your website launches, with a recommended initial three-month commitment followed by month-to-month service.", "After the initial term, you can cancel with 30 days' written notice.", "Your domain and website remain yours, and I'll help make the transition straightforward."] },
  { q: "What if you disappear?", a: ["Your website shouldn't depend on me being around forever.", "Your domain and essential accounts stay in your name, and you receive ownership of the original website deliverables once the project is paid in full, subject to any third-party licensing terms.", "If we part ways, you'll retain access to your accounts and receive the materials needed to continue independently.", "There are no surprises about ownership or ongoing responsibilities."] },
  { q: "Can I request a quote?", a: ["Absolutely! Once I understand what you're looking for, I can put together a personalized proposal with the recommended services, timeline, and pricing. If you already have a detailed project in mind, I may send over a few additional questions to make sure the quote is accurate."] },
  { q: "How much does a website cost?", a: ["Every project is a little different. Pricing depends on what you're looking to build, the features you need, and the overall scope. Once we've talked through your goals, I'll provide a proposal outlining the pricing and what's included."] },
];

export const serviceOptions = [
  "New Website",
  "Website Redesign",
  "Digital Tool or Web Application",
  "Automation / Workflow Improvement",
  "Something Else",
] as const;

// Stable stored values preserve historical leads, service links, and analytics.
export const serviceOptionLabels: Record<(typeof serviceOptions)[number], string> = {
  "New Website": "A new website",
  "Website Redesign": "A website refresh or redesign",
  "Automation / Workflow Improvement": "Making my business run smoother (automation)",
  "Digital Tool or Web Application": "A client portal or custom tool",
  "Something Else": "Something else / I'm not sure yet",
};

export const inquiryCopy = {
  primaryCta: "Tell Me About Your Project",
  navigationCta: "Let's Talk",
  bookingCta: "Book a Free 15-Minute Chat",
  nameLabel: "Your Name",
  emailLabel: "Email Address",
  serviceLabel: "What can I help you with?",
  messageLabel: "Tell me a little about your idea",
  messagePlaceholder: "What's going on with your business, and what would you love to improve? No technical jargon needed.",
  websiteLabel: "Have a website already?",
  submitLabel: "Send My Inquiry",
  successHeading: "Your message is on its way!",
  successBody: "Thanks for reaching out! I'll take a look at what you shared and get back to you about next steps. Looking forward to learning more about your project!",
};

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
