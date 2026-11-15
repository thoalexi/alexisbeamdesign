import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

const mocks = vi.hoisted(() => ({ insert: vi.fn(), email: vi.fn(), calls: [] as string[] }));
vi.mock("@tanstack/react-start", () => ({ createServerFn: () => ({ inputValidator: (validate: (v: unknown) => unknown) => ({ handler: (fn: (arg: { data: unknown }) => unknown) => ({ data }: { data: unknown }) => fn({ data: validate(data) }) }) }) }));
vi.mock("@supabase/supabase-js", () => ({ createClient: () => ({ from: () => ({ insert: mocks.insert }) }) }));
vi.mock("@/lib/email-templates/send-email", () => ({ sendTemplateEmail: mocks.email }));
import { submitInquiry } from "@/lib/inquiry.functions";

const input = { name: "Preview visitor", email: "preview@example.com", message: "I would like to improve my website.", startedAt: Date.now() - 5000 };
beforeEach(() => {
  vi.stubEnv("SUPABASE_URL", "https://example.com");
  vi.stubEnv("SUPABASE_PUBLISHABLE_KEY", "test-public-key");
  mocks.calls.length = 0;
  mocks.insert.mockImplementation(async () => { mocks.calls.push("save"); return { error: null }; });
  mocks.email.mockImplementation(async () => { mocks.calls.push("alert"); return { sent: true }; });
  vi.spyOn(console, "error").mockImplementation(() => {});
});
afterEach(() => { vi.restoreAllMocks(); vi.unstubAllEnvs(); vi.clearAllMocks(); });

describe("inquiry storage and notification boundary", () => {
  it("saves before notifying the confirmed inbox and permits omitted interest", async () => {
    expect(await submitInquiry({ data: input })).toEqual({ ok: true });
    expect(mocks.calls).toEqual(["save", "alert"]);
    expect(mocks.insert).toHaveBeenCalledWith(expect.objectContaining({ service: "", budget: null, timeline: null, business_name: null }));
    expect(mocks.email).toHaveBeenCalledWith("new-inquiry-alert", "alexis@alexisbeamdesign.com", expect.objectContaining({ replyTo: input.email }));
  });
  it("does not report success or send an alert when saving fails", async () => {
    mocks.insert.mockResolvedValue({ error: { message: "Simulated failure" } });
    expect((await submitInquiry({ data: input })).ok).toBe(false);
    expect(mocks.email).not.toHaveBeenCalled();
  });
  it("keeps the saved inquiry successful if notification fails", async () => {
    mocks.email.mockRejectedValue(new Error("Simulated failure"));
    expect(await submitInquiry({ data: input })).toEqual({ ok: true });
    expect(mocks.insert).toHaveBeenCalledTimes(1);
  });
  it("rejects spam without saving or notifying", async () => {
    expect((await submitInquiry({ data: { ...input, startedAt: Date.now() } })).ok).toBe(false);
    expect(() => submitInquiry({ data: { ...input, website: "spam" } })).toThrow();
    expect(mocks.insert).not.toHaveBeenCalled();
    expect(mocks.email).not.toHaveBeenCalled();
  });
});