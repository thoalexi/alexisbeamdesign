import { attributionUtmParams } from "@/lib/attribution";

export const navLinks = [
  { id: "work", label: "Work" },
  { id: "about", label: "About" },
  { id: "services", label: "Services" },
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

export const steps = [
  { title: "Discover", text: "We'll talk about your business, your goals, and what you're hoping to accomplish." },
  { title: "Design", text: "I'll develop a visual direction and user experience that fits your brand and audience." },
  { title: "Build", text: "I'll turn the design into a functional, responsive digital experience." },
  { title: "Launch", text: "We'll review, refine, and get everything ready to share with the world." },
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

export type BookingPlacement = "services" | "discovery_section" | "contact" | "automation";

/** Booking URL tagged with the placement, keeping any existing query params. Null if not configured/invalid. */
export function bookingLink(placement: BookingPlacement): string | null {
  if (!bookingUrl) return null;
  try {
    const u = new URL(bookingUrl);
    if (u.protocol !== "https:") return null;
    // Forward first-touch campaign attribution (already sanitized to safe tokens),
    // falling back to the site's own defaults when none was captured.
    const captured = attributionUtmParams();
    u.searchParams.set("utm_source", captured.utm_source ?? "alexisbeamdesign.com");
    u.searchParams.set("utm_medium", captured.utm_medium ?? "website");
    if (captured.utm_campaign) u.searchParams.set("utm_campaign", captured.utm_campaign);
    // The placement is always reported separately as utm_content.
    u.searchParams.set("utm_content", placement);
    return u.toString();
  } catch {
    return null;
  }
}
