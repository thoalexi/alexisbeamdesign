import { createFileRoute } from "@tanstack/react-router";

const BASE_URL = "https://alexisbeamdesign.com";

// Public, indexable pages only. No <lastmod>: there is no authoritative
// page-specific content timestamp to source it from.
const PATHS = [
  "/",
  "/privacy-policy",
  "/small-business-web-design",
  "/website-redesign",
  "/workflow-automation",
] as const;

const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${PATHS.map((p) => `  <url><loc>${BASE_URL}${p}</loc></url>`).join("\n")}
</urlset>
`;

export const Route = createFileRoute("/sitemap.xml")({
  server: {
    handlers: {
      GET: () =>
        new Response(xml, {
          headers: { "Content-Type": "application/xml; charset=utf-8" },
        }),
    },
  },
});
