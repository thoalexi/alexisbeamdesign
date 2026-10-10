export const navLinks = [
  { id: "work", label: "Work" },
  { id: "about", label: "About" },
  { id: "services", label: "Services" },
  { id: "contact", label: "Contact" },
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
    title: "Digital Solutions & Automation",
    blurb:
      "Sometimes the best solution goes beyond a traditional website. I explore practical ways to simplify workflows, organize information, and bring new digital ideas to life.",
    includes: [
      "Interactive web tools",
      "Custom forms and workflows",
      "Business process improvements",
      "Analytics and reporting",
      "Automation opportunities",
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
