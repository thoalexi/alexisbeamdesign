import { z } from "zod";
import { serviceOptions } from "@/data/site";

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
  service: z.enum(serviceOptions).optional().or(z.literal("")),
  message: z.string().trim().min(10, "A few more words would help (10+ characters)").max(5000),
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

