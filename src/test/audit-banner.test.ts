import { describe, expect, it } from "vitest";
import { websiteDiagnosis } from "@/data/site";

describe("WebsiteAuditor banner offer", () => {
  it("advertises the $125 audit through December", () => {
    expect(websiteDiagnosis.banner.currentPriceCents).toBe(12500);
    expect(websiteDiagnosis.banner.currentPriceThrough).toBe("December");
  });

  it("preserves the source offer's $175 price in January", () => {
    expect(websiteDiagnosis.banner.newPriceCents).toBe(17500);
    expect(websiteDiagnosis.banner.newPriceFrom).toBe("January");
  });

  it("sends audit visitors to the dedicated offer website", () => {
    expect(websiteDiagnosis.url).toBe("https://websiteaudit.alexisbeamdesign.com");
  });
});