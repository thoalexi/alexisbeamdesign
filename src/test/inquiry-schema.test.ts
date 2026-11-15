import { describe, expect, it } from "vitest";
import { inquirySchema } from "@/lib/inquiry-schema";

const minimal = { name: "Preview visitor", email: "preview@example.com", message: "I would like to improve my website.", startedAt: Date.now() - 5000 };

describe("short public inquiry", () => {
  it("requires only name, email and message among visitor fields", () => {
    expect(inquirySchema.safeParse(minimal).success).toBe(true);
    for (const key of ["name", "email", "message"] as const) {
      expect(inquirySchema.safeParse({ ...minimal, [key]: "" }).success).toBe(false);
    }
  });
  it("allows no service but rejects unknown service values", () => {
    expect(inquirySchema.safeParse({ ...minimal, service: "" }).success).toBe(true);
    expect(inquirySchema.safeParse({ ...minimal, service: "invented" }).success).toBe(false);
  });
  it("normalizes optional website addresses without a protocol", () => {
    expect(inquirySchema.parse({ ...minimal, websiteUrl: "example.com" }).websiteUrl).toBe("https://example.com/");
    expect(inquirySchema.safeParse({ ...minimal, websiteUrl: "not a website" }).success).toBe(false);
  });
  it("does not forward retired public intake fields", () => {
    const result = inquirySchema.parse({ ...minimal, budget: "$5,000+", timeline: "As soon as possible", businessName: "Example" });
    expect(result).not.toHaveProperty("budget");
    expect(result).not.toHaveProperty("timeline");
    expect(result).not.toHaveProperty("businessName");
  });
});