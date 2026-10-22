import { QueryClient } from "@tanstack/react-query";
import { createRouter, rootRouteId } from "@tanstack/react-router";
import { describe, expect, it } from "vitest";

import { routeTree } from "@/routeTree.gen";
import { servicePages } from "@/data/services";
import { serviceOptions } from "@/data/site";

describe("Service pages", () => {
  it.each(servicePages.map((s) => [s.slug, s] as const))("routes /%s to a page, not the 404 fallback", (slug) => {
    const router = createRouter({ routeTree, context: { queryClient: new QueryClient() } });
    const matches = router.matchRoutes(`/${slug}`);
    expect(matches.at(-1)?.routeId).not.toBe(rootRouteId);
  });

  it.each(servicePages.map((s) => [s.slug, s] as const))("%s has complete, truthful content", (_slug, s) => {
    // Unique metadata
    expect(s.metaTitle.length).toBeGreaterThan(10);
    expect(s.metaDescription.length).toBeGreaterThan(50);
    expect(s.h1.length).toBeGreaterThan(10);
    // Required sections
    expect(s.problems.length).toBeGreaterThanOrEqual(3);
    expect(s.included.length).toBeGreaterThanOrEqual(3);
    expect(s.faqs).toHaveLength(3);
    expect(s.scopeCaveat).toContain("evaluated individually");
    // Quote CTA preselection must map to a real form option
    expect(serviceOptions).toContain(s.inquiryService);
    // No invented proof points
    const allText = JSON.stringify(s);
    expect(allText).not.toMatch(/\$\d/); // no prices
    // No guarantee promises ("cannot be guaranteed" disclaimers are allowed and required)
    expect(allText.replace(/can(no|')t be guaranteed|cannot be guaranteed/gi, "")).not.toMatch(/guarantee/i);
  });

  it("has unique slugs, titles, and meta descriptions", () => {
    expect(new Set(servicePages.map((s) => s.slug)).size).toBe(servicePages.length);
    expect(new Set(servicePages.map((s) => s.metaTitle)).size).toBe(servicePages.length);
    expect(new Set(servicePages.map((s) => s.metaDescription)).size).toBe(servicePages.length);
  });
});
