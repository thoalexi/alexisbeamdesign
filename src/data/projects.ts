import picklightlyShot from "@/assets/picklightly.jpg";
import projectbidsShot from "@/assets/projectbids.jpg";
import medicareShot from "@/assets/medicarechoice.jpg";

export type Project = {
  slug: string;
  name: string;
  category: string;
  description: string;
  highlights: string[];
  /** Live URL. Leave null until a real link exists — no button is rendered. */
  url: string | null;
  cta: string;
  /** Screenshot of the real site. Leave null to show a "screenshot coming" placeholder. */
  image: string | null;
  imageAlt: string;
  inDevelopment?: boolean;
};

export const projects: Project[] = [
  {
    slug: "picklightly",
    name: "picklightly",
    category: "Interactive Web Application / Consumer Experience",
    description:
      "A thoughtfully designed decision-making toolkit that helps everyday overthinkers make choices with more clarity and confidence. Picklightly combines interactive decision tools with a simple, approachable experience designed to make everyday decisions feel less overwhelming.",
    highlights: [
      "Interactive decision-making tools",
      "Guided user experiences",
      "Thoughtful UX design",
      "Clear information architecture",
    ],
    url: "https://picklightly-decision-guide.lovable.app/",
    cta: "Explore picklightly",
    image: picklightlyShot,
    imageAlt: "Picklightly homepage with the headline “You’ve thought about it enough.” and the Decision Router tool",
  },
  {
    slug: "projectbids",
    name: "ProjectBids",
    category: "Marketplace / Web Application",
    description:
      "A digital marketplace designed to simplify the process of connecting customers with contractors. ProjectBids explores a more streamlined way to describe projects, receive bids, and connect with service providers.",
    highlights: [
      "Marketplace design",
      "Customer and provider experiences",
      "User workflows",
      "Digital product development",
    ],
    url: "https://projectbids.app/",
    cta: "Explore ProjectBids",
    image: projectbidsShot,
    imageAlt: "ProjectBids homepage with the headline “Post it once. Local Atlanta pros compete for your business.”",
  },
  {
    slug: "medicare-comparison",
    name: "Medicare Comparison Tool",
    category: "Information Platform / Consumer Experience",
    description:
      "A user-friendly digital resource designed to help people navigate Medicare options with greater clarity. Created around the belief that complicated information should be easier to understand, especially when it affects important life decisions.",
    highlights: [
      "Complex information simplified",
      "Consumer-focused design",
      "Accessible information architecture",
      "Guided comparison experience",
    ],
    url: "https://medicarechoice.app/",
    cta: "Explore MedicareChoice",
    image: medicareShot,
    imageAlt: "MedicareChoice homepage with the headline “Pick the right Medicare plan—without the fine print headache.”",
  },
];
