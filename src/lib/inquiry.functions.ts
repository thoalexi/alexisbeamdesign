import { createServerFn } from "@tanstack/react-start";
import { createClient } from "@supabase/supabase-js";
import { inquirySchema } from "@/lib/inquiry-schema";
export { inquirySchema, normalizeWebsite } from "@/lib/inquiry-schema";


export const submitInquiry = createServerFn({ method: "POST" })
  .inputValidator((input: unknown) => inquirySchema.parse(input))
  .handler(async ({ data }) => {
    // Spam checks: honeypot filled, or submitted impossibly fast — pretend success silently is avoided; reject.
    if (data.website || Date.now() - data.startedAt < 2500) {
      return { ok: false as const, error: "Something looked off with that submission. Please try again." };
    }
    const url = process.env["SUPABASE_URL"];
    const key = process.env["SUPABASE_PUBLISHABLE_KEY"];
    if (!url || !key) return { ok: false as const, error: "The form isn't connected right now. Please try again later." };

    const supabase = createClient(url, key, { auth: { persistSession: false } });
    const { error } = await supabase.from("inquiries").insert({
      name: data.name,
      email: data.email,
      business_name: null,
      service: data.service || "",
      message: data.message,
      budget: null,
      website_url: data.websiteUrl || null,
      timeline: null,
    });
    if (error) {
      console.error("inquiry insert failed", error);
      return { ok: false as const, error: "Your message couldn't be sent just now. Please try again in a moment." };
    }
    try {
      const { sendTemplateEmail } = await import("@/lib/email-templates/send-email");
      await sendTemplateEmail("new-inquiry-alert", "alexis@alexisbeamdesign.com", {
        templateData: {
          name: data.name,
          email: data.email,
          service: data.service || "",
          websiteUrl: data.websiteUrl || "",
          message: data.message,
          utmSource: data.attribution?.utm_source || "",
          utmMedium: data.attribution?.utm_medium || "",
          utmCampaign: data.attribution?.utm_campaign || "",
          utmContent: data.attribution?.utm_content || "",
          landingPath: data.attribution?.landingPath || "",
        },
        replyTo: data.email,
        idempotencyKey: `new-inquiry-alert-${crypto.randomUUID()}`,
      });
    } catch (e) {
      // The inquiry is already saved; don't fail the visitor's submission over the alert.
      console.error("inquiry alert email failed", e);
    }
    return { ok: true as const };
  });
