import { createFileRoute } from "@tanstack/react-router";
import { ServicePageLayout } from "@/components/site/ServicePage";
import { servicePageBySlug } from "@/data/services";

const service = servicePageBySlug("website-redesign")!;
const URL = `https://alexisbeamdesign.com/${service.slug}`;

export const Route = createFileRoute("/website-redesign")({
  head: () => ({
    meta: [
      { title: service.metaTitle },
      { name: "description", content: service.metaDescription },
      { property: "og:title", content: service.metaTitle },
      { property: "og:description", content: service.metaDescription },
      { property: "og:type", content: "website" },
      { property: "og:url", content: URL },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: service.metaTitle },
      { name: "twitter:description", content: service.metaDescription },
    ],
    links: [{ rel: "canonical", href: URL }],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "Service",
          name: service.title,
          description: service.metaDescription,
          provider: { "@type": "ProfessionalService", name: "Alexis Beam", url: "https://alexisbeamdesign.com/" },
          areaServed: "United States",
        }),
      },
    ],
  }),
  component: () => <ServicePageLayout service={service} />,
});
