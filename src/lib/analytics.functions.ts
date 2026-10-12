import { createServerFn } from "@tanstack/react-start";

// GA4 measurement IDs are public by nature (they ship in every page's tag); we just read it from settings.
export const getAnalyticsId = createServerFn({ method: "GET" }).handler(async () => {
  const id = process.env["GOOGLE_ANALYTICS_MEASUREMENT_ID"]?.trim() ?? "";
  return /^G-[A-Z0-9]+$/i.test(id) ? id : null;
});
