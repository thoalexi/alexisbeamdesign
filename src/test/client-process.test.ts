import { describe, expect, it } from "vitest";
import { clientPortalUrl, faqs, steps } from "@/data/site";

describe("client process content", () => {
  it("has five process steps", () => expect(steps).toHaveLength(5));
  it("has eight FAQs", () => expect(faqs).toHaveLength(8));
  it("FAQ 3 gives no two-week estimate", () => expect(faqs[2]!.a.join(" ")).not.toMatch(/two weeks/i));
  it("client login points to the real portal", () => expect(clientPortalUrl).toBe("https://portal.alexisbeamdesign.com"));
});

describe("portal access timing", () => {
  it("never mentions onboarding and ties the invite to the signed agreement", async () => {
    const { steps, portal, faqs } = await import("@/data/site");
    const all = JSON.stringify({ steps, portal, faqs }).toLowerCase();
    expect(all).not.toContain("onboarding");
    expect(portal.notes.some((n) => n.includes("service agreement is signed and your deposit is paid"))).toBe(true);
  });
});
