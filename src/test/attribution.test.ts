import { describe, expect, it } from "vitest";

import { sanitizeAttribution } from "@/lib/attribution";
import { preselectService } from "@/data/services";
import { bookingLink, serviceOptions } from "@/data/site";

describe("sanitizeAttribution", () => {
  it("keeps safe UTM tokens and a bare landing pathname", () => {
    const out = sanitizeAttribution({
      utm_source: "google",
      utm_medium: "cpc",
      utm_campaign: "atlanta_search",
      utm_content: "ad-1",
      landingPath: "/workflow-automation",
    });
    expect(out).toEqual({
      utm_source: "google",
      utm_medium: "cpc",
      utm_campaign: "atlanta_search",
      utm_content: "ad-1",
      landingPath: "/workflow-automation",
    });
  });

  it("drops full URLs, query strings, and arbitrary text", () => {
    const out = sanitizeAttribution({
      utm_source: "https://evil.example/?x=1",
      utm_medium: "not a token!",
      utm_campaign: "a".repeat(101),
      utm_content: "has spaces",
      landingPath: "/workflow-automation?utm_source=google",
    });
    expect(out).toEqual({});
  });

  it("drops protocol-relative and non-path landing values", () => {
    expect(sanitizeAttribution({ landingPath: "//evil.example" })).toEqual({});
    expect(sanitizeAttribution({ landingPath: "https://example.com/" })).toEqual({});
  });

  it("ignores non-allowlisted keys", () => {
    const out = sanitizeAttribution({ referrer: "google", gclid: "abc123", utm_source: "linkedin" });
    expect(out).toEqual({ utm_source: "linkedin" });
  });

  it("returns an empty object for non-object input", () => {
    expect(sanitizeAttribution(null)).toEqual({});
    expect(sanitizeAttribution("utm_source=google")).toEqual({});
  });
});

describe("preselectService", () => {
  it("accepts an exact allowlisted form option", () => {
    expect(preselectService("Website Redesign", serviceOptions)).toBe("Website Redesign");
  });

  it("rejects unknown or crafted values", () => {
    expect(preselectService("<script>", serviceOptions)).toBe("");
    expect(preselectService("website redesign", serviceOptions)).toBe(""); // case-sensitive allowlist
    expect(preselectService("", serviceOptions)).toBe("");
  });
});

describe("Opening booking destination", () => {
  it("uses the existing Calendly destination and opening placement", () => {
    const href = bookingLink("opening");
    if (!href) throw new Error("Missing configured booking destination");
    const url = new URL(href);
    expect(url.origin).toBe("https://calendly.com");
    expect(url.pathname).toBe("/alexisbeamdesign");
    expect(url.searchParams.get("utm_content")).toBe("opening");
  });
});
