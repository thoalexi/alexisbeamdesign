import { describe, expect, it } from "vitest";
import { clientPortalUrl, faqs, steps } from "@/data/site";

describe("client process content", () => {
  it("has five process steps", () => expect(steps).toHaveLength(5));
  it("has eight FAQs", () => expect(faqs).toHaveLength(8));
  it("FAQ 3 gives no two-week estimate", () => expect(faqs[2].a.join(" ")).not.toMatch(/two weeks/i));
  it("client login points to the real portal", () => expect(clientPortalUrl).toBe("https://portal.alexisbeamdesign.com"));
});
