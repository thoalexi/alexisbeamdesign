import { useEffect, useRef, useState, type FormEvent } from "react";
import { homepageCopy, inquiryCopy, serviceOptions, serviceOptionLabels } from "@/data/site";
import { BookingLink } from "@/components/site/BookingLink";
import { Button } from "@/components/ui/button";
import { useServerFn } from "@tanstack/react-start";
import { normalizeWebsite } from "@/lib/inquiry-schema";
import { submitInquiry } from "@/lib/inquiry.functions";
import { cn } from "@/lib/utils";
import { track, trackOnce } from "@/lib/analytics";
import { getAttribution } from "@/lib/attribution";

type Errors = Partial<Record<"name" | "email" | "service" | "message" | "websiteUrl" | "form", string>>;

const fieldBase =
  "w-full border-0 border-b border-input bg-transparent px-0 py-3 text-base text-foreground placeholder:text-muted-foreground/70 focus:border-accent focus:outline-none focus:ring-0 transition-colors";

export function ContactForm({ preselectedService = "" }: { preselectedService?: string | undefined }) {
  const startedAt = useRef(Date.now());
  const submitting = useRef(false);
  const submit = useServerFn(submitInquiry);
  const serviceRef = useRef<HTMLSelectElement>(null);

  // Browsers auto-select the first enabled option when none matches; set the
  // value explicitly so an empty preselection lands on the disabled placeholder.
  useEffect(() => {
    if (serviceRef.current) serviceRef.current.value = preselectedService;
  }, [preselectedService]);
  const [status, setStatus] = useState<"idle" | "sending" | "sent">("idle");
  const [errors, setErrors] = useState<Errors>({});

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (submitting.current) return;
    const fd = new FormData(e.currentTarget);
    const v = (k: string) => String(fd.get(k) ?? "").trim();
    const next: Errors = {};
    if (!v("name")) next.name = "Please share your name.";
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v("email"))) next.email = "Please enter a valid email address.";
    if (v("service") && !serviceOptions.some((o) => o === v("service"))) next.service = "Please choose a valid option.";
    if (normalizeWebsite(v("websiteUrl")) === null) next.websiteUrl = "Please enter a valid website address, like yourwebsite.com.";
    if (v("message").length < 10) next.message = "Tell me a little more (at least 10 characters).";
    setErrors(next);
    if (Object.keys(next).length) return;

    submitting.current = true;
    setStatus("sending");
    try {
      const res = await submit({
        data: {
          name: v("name"),
          email: v("email"),
          service: v("service") as (typeof serviceOptions)[number],
          message: v("message"),
          websiteUrl: v("websiteUrl"),
          website: v("website"),
          startedAt: startedAt.current,
          attribution: getAttribution(),
        },
      });
      if (res.ok) {
        track("generate_lead", { form_id: "contact_inquiry", service_type: v("service") });
        setStatus("sent");
      }
      else {
        setErrors({ form: res.error });
        setStatus("idle");
      }
    } catch {
      setErrors({ form: "Your message couldn't be sent just now. Please check your details and try again." });
      setStatus("idle");
    } finally {
      submitting.current = false;
    }
  }

  if (status === "sent") {
    return (
      <div role="status" className="form-success relative border-t border-foreground pt-10">
        <span className="success-stamp" aria-hidden="true">Sent!</span>
        <span className="success-confetti" aria-hidden="true">
          {Array.from({ length: 10 }, (_, i) => <i key={i} />)}
        </span>
        <p className="eyebrow text-accent">{inquiryCopy.successHeading}</p>
        <p className="mt-5 font-serif text-3xl leading-snug md:text-4xl">
          {inquiryCopy.successBody}
        </p>
        <BookingLink placement="contact" className="link-underline mt-8 inline-flex py-2 text-sm">{inquiryCopy.bookingCta}</BookingLink>
      </div>
    );
  }

  const err = (k: keyof Errors) =>
    errors[k] ? (
      <p id={`${k}-error`} className="mt-2 text-sm text-destructive">
        {errors[k]}
      </p>
    ) : null;

  return (
    <form onSubmit={onSubmit} onFocus={() => trackOnce("inq", "inquiry_start", { form_id: "contact_inquiry" })} noValidate className="grid gap-x-10 gap-y-8 sm:grid-cols-2">
      <div className="absolute -left-[9999px]" aria-hidden="true">
        <label>
          Website <input name="website" tabIndex={-1} autoComplete="off" />
        </label>
      </div>
      <Field label={inquiryCopy.nameLabel} htmlFor="inquiry-name" required>
        <input id="inquiry-name" name="name" required autoComplete="name" maxLength={100} className={fieldBase} aria-invalid={!!errors.name} aria-describedby={errors.name ? "name-error" : undefined} />
        {err("name")}
      </Field>
      <Field label={inquiryCopy.emailLabel} htmlFor="inquiry-email" required>
        <input id="inquiry-email" name="email" type="email" required autoComplete="email" maxLength={255} className={fieldBase} aria-invalid={!!errors.email} aria-describedby={errors.email ? "email-error" : undefined} />
        {err("email")}
      </Field>
      <Field label={inquiryCopy.serviceLabel} htmlFor="inquiry-service">
        <select id="inquiry-service" ref={serviceRef} name="service" defaultValue={preselectedService} className={cn(fieldBase, "cursor-pointer")} aria-invalid={!!errors.service} aria-describedby={errors.service ? "service-error" : undefined}>
          <option value="">Choose one (optional)</option>
          {serviceOptions.map((o) => <option key={o} value={o}>{serviceOptionLabels[o]}</option>)}
        </select>
        {err("service")}
      </Field>
      <Field label={inquiryCopy.websiteLabel} htmlFor="inquiry-website-url">
        <input id="inquiry-website-url" name="websiteUrl" type="text" inputMode="url" autoComplete="url" placeholder="https://yourwebsite.com" maxLength={255} className={fieldBase} aria-invalid={!!errors.websiteUrl} aria-describedby={errors.websiteUrl ? "websiteUrl-error" : undefined} />
        {err("websiteUrl")}
      </Field>
      <Field label={inquiryCopy.messageLabel} htmlFor="inquiry-message" required className="sm:col-span-2">
        <textarea id="inquiry-message" name="message" required rows={5} maxLength={5000} placeholder={inquiryCopy.messagePlaceholder} className={cn(fieldBase, "resize-y")} aria-invalid={!!errors.message} aria-describedby={errors.message ? "message-error" : undefined} />
        {err("message")}
      </Field>
      <div className="flex flex-col gap-4 sm:col-span-2 sm:flex-row sm:items-center sm:justify-between">
        <p className="text-sm text-muted-foreground" aria-live="polite">
          {errors.form ? <span className="text-destructive">{errors.form}</span> : homepageCopy.followUp}
        </p>
        <Button
          variant="ghost"
          type="submit"
          disabled={status === "sending"}
          className="site-button group h-auto shrink-0 whitespace-nowrap rounded-none font-normal inline-flex min-h-12 items-center justify-center gap-3 bg-foreground px-8 py-4 text-sm tracking-wide text-background transition-colors duration-300 hover:bg-accent disabled:opacity-60"
        >
          {status === "sending" ? "Sending…" : inquiryCopy.submitLabel}
          <span className="transition-transform duration-300 group-hover:translate-x-1">→</span>
        </Button>
      </div>
    </form>
  );
}

function Field({ label, required, htmlFor, className, children }: { label: string; required?: boolean; htmlFor?: string; className?: string; children: React.ReactNode }) {
  return (
    <label className={cn("block", className)} htmlFor={htmlFor}>
      <span className="eyebrow text-muted-foreground">
        {label} {required ? <span className="text-terracotta" aria-hidden="true">*</span> : <span className="normal-case tracking-normal">(optional)</span>}
      </span>
      {children}
    </label>
  );
}
