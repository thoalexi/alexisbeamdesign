import { createServerFn } from "@tanstack/react-start";
import { createClient } from "@supabase/supabase-js";
import { z } from "zod";
import { budgetOptions, serviceOptions } from "@/data/site";

export const inquirySchema = z.object({
  name: z.string().trim().min(1, "Please share your name").max(100),
  email: z.string().trim().email("Please enter a valid email").max(255),
  businessName: z.string().trim().max(150).optional().or(z.literal("")),
  service: z.enum(serviceOptions, { errorMap: () => ({ message: "Please choose an option" }) }),
  message: z.string().trim().min(10, "A few more words would help (10+ characters)").max(5000),
  budget: z.enum(budgetOptions).optional().or(z.literal("")),
  website: z.string().max(0).optional(), // honeypot
  startedAt: z.number(),
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
    });
    if (error) {
      console.error("inquiry insert failed", error);
      return { ok: false as const, error: "Your message couldn't be sent just now. Please try again in a moment." };
    }
    return { ok: true as const };
  });
