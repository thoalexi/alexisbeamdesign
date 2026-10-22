import { createServerFn } from "@tanstack/react-start";
import { createClient } from "@supabase/supabase-js";
import { z } from "zod";
import { budgetOptions, serviceOptions, timelineOptions } from "@/data/site";

/** Adds https:// when missing; returns "" for empty, null for invalid. No network access. */
export function normalizeWebsite(raw: string): string | null {
  const s = raw.trim();
  if (!s) return "";
  const withScheme = /^https?:\/\//i.test(s) ? s : `https://${s}`;
  try {
    const u = new URL(withScheme);
    if (!/^https?:$/.test(u.protocol) || !/^[a-z0-9-]+(\.[a-z0-9-]+)*\.[a-z]{2,}$/i.test(u.hostname)) return null;
    const out = u.toString();
    return out.length <= 255 ? out : null;
  } catch {
    return null;
  }
}

export const inquirySchema = z.object({
  name: z.string().trim().min(1, "Please share your name").max(100),
  email: z.string().trim().email("Please enter a valid email").max(255),
  businessName: z.string().trim().max(150).optional().or(z.literal("")),
  service: z.enum(serviceOptions, { errorMap: () => ({ message: "Please choose an option" }) }),
  message: z.string().trim().min(10, "A few more words would help (10+ characters)").max(5000),
  budget: z.enum(budgetOptions).optional().or(z.literal("")),
  websiteUrl: z
    .string()
    .max(255)
    .optional()
    .transform((v, ctx) => {
      const n = normalizeWebsite(v ?? "");
      if (n === null) {
        ctx.addIssue({ code: z.ZodIssueCode.custom, message: "Please enter a valid website address" });
        return z.NEVER;
      }
      return n;
    }),
  timeline: z.enum(timelineOptions).optional().or(z.literal("")),
  website: z.string().max(0).optional(), // honeypot
  startedAt: z.number(),
  // Optional first-touch acquisition context. Allowlisted keys, safe token
  // characters only, bounded lengths — never full URLs, query strings, or referrer.
  attribution: z
    .object({
      utm_source: z.string().regex(/^[A-Za-z0-9_-]{1,100}$/).optional(),
      utm_medium: z.string().regex(/^[A-Za-z0-9_-]{1,100}$/).optional(),
      utm_campaign: z.string().regex(/^[A-Za-z0-9_-]{1,100}$/).optional(),
      utm_content: z.string().regex(/^[A-Za-z0-9_-]{1,100}$/).optional(),
      landingPath: z.string().regex(/^\/(?!\/)[A-Za-z0-9\-._~/]{0,199}$/).optional(),
    })
    .optional(),
});

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
      business_name: data.businessName || null,
      service: data.service,
      message: data.message,
      budget: data.budget || null,
      website_url: data.websiteUrl || null,
      timeline: data.timeline || null,
    });
    if (error) {
      console.error("inquiry insert failed", error);
      return { ok: false as const, error: "Your message couldn't be sent just now. Please try again in a moment." };
    }
    try {
      const { sendTemplateEmail } = await import("@/lib/email-templates/send-email");
      await sendTemplateEmail("new-inquiry-alert", "alexisbeamdesign@gmail.com", {
        templateData: {
          name: data.name,
          email: data.email,
          businessName: data.businessName || "",
          service: data.service,
          budget: data.budget || "",
          websiteUrl: data.websiteUrl || "",
          timeline: data.timeline || "",
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
