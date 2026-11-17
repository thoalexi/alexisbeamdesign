import { describe, expect, it } from "vitest";
import { serviceNavigation, websiteDiagnosis } from "@/data/site";

describe("service navigation destinations", () => {
  it("returns visitors to the existing Services anchor", () => {
    expect(serviceNavigation[0]).toEqual({ label: "All Services", to: "/", hash: "services" });
  });
  it("keeps the three service URLs in the requested order", () => {
    expect(serviceNavigation.slice(1, 4).map((item) => item.to)).toEqual([
      "/small-business-web-design", "/website-redesign", "/workflow-automation",
    ]);
  });
  it("keeps diagnosis purchases on the dedicated offer website", () => {
    expect(websiteDiagnosis.url).toBe("https://websiteaudit.alexisbeamdesign.com");
    expect(serviceNavigation[4]?.url).toBe(websiteDiagnosis.url);
  });
});