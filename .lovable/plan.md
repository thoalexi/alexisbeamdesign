# Optional 15-Minute Chats, Clearer Contact Paths, Privacy Policy

## Recommendation: a plain Calendly link (no embedded widget)
A link that opens your Calendly page (https://calendly.com/alexisbeamdesign) in a new tab is the best fit for your priorities:
- **Speed:** loads nothing extra on your site. An embed adds Calendly's script and window (300KB+).
- **Maintenance:** one link, kept in one place.
- **Experience:** Calendly's full page works just as well on phones, and visitors keep your site open in their original tab.
- **Sync and confirmations:** Calendly handles calendar sync, double-booking, time zones, confirmation emails, rescheduling and cancelling either way.
- **Cost:** Calendly's free plan covers this. Your own logo and colors on the Calendly page need its paid plan, whether you link or embed.
- **The one trade-off:** only an embed can tell Google Analytics that a booking was actually made. With the link, I track clicks only (`discovery_call_click`). Calendly's own reports show your real bookings.

## Phase 1 — Buttons and new section
- **Header (desktop + mobile):** "Let's Talk" becomes **Request a Quote**, which jumps to the form.
- **Hero:** "Explore My Work" stays as is. "Let's Work Together →" becomes **Request a Quote →**. No booking link here.
- **New section just before Contact:** headed "Have Something in Mind?", with your copy, a **Schedule a Free 15-Minute Chat →** button and the no-obligation line. Same editorial style; no cards, icons or popups.
- **Contact:** opens with **Ready to Get Started?** and its copy, then the form, which stays the most prominent thing. Beside it, a quieter **Still Exploring?** with a "Schedule a Free 15-Minute Chat →" text link.
- **Services:** one quiet line, "Not sure what you need? Let's talk it through. Schedule a Free 15-Minute Chat →"
- **Exactly three booking links in total.** They all use one central setting and disappear if it's ever removed. Each one tells screen readers it opens a new tab.
- **Calendly link:** your page builds itself with scripts, so I can't read the exact event link from here. I'll open it in a real browser and use the direct link to "Free 15-Minute Consultation" (for example calendly.com/alexisbeamdesign/…). If I can't confirm that event, I'll stop and ask you for the link instead of guessing.

Conflict to note: the current Contact heading already says "Have something in mind? Let's make it happen." To avoid repeating the same heading twice in a row, I'll change the Contact heading to **"Ready to Get Started?"**, as your brief describes.

## Phase 2 — Inquiry form
- New optional field **Existing website**, with the example text "https://yourwebsite.com". It accepts entries like "mysite.com" and adds the https:// itself, rejects entries that aren't web addresses, and is capped at 255 characters. I'll never visit the address.
- New optional dropdown **When are you hoping to get started?** It starts on "Select a timeline (optional)" with nothing chosen. Options: As soon as possible / Within 1–3 months / Within 3–6 months / I'm flexible.
- The send button becomes **Send My Project Details →**.
- Everything else stays: every current field, required-field checks, spam trap, the "Sending…" lock that stops double sends, clear error messages, and the success message only after a real save.

## Phase 3 — Saving and email alerts
- Two optional details are added to saved inquiries: the website and the timeline. The rule that lets the public submit is tightened to check both. The public still can't read, edit or delete inquiries.
- The alert email to alexisbeamdesign@gmail.com shows the website and timeline.
- **Locked-down submissions:** the public can only write the form fields themselves. The database refuses any attempt to set the alert-status fields, at the permission level as well as through the existing rules. Nobody from the public can read, change or delete any inquiry, including their own.
- **Duplicate protection, enforced by the database:** each new inquiry gets its own submission ID. Retrying the same submission reuses that ID, and the database refuses a second copy. After a successful send, the next inquiry gets a fresh ID. A repeat is quietly treated as success and reveals nothing about the inquiry already saved.
- **Responsive and independent:** the inquiry is saved first, and the visitor sees "message received" as soon as it is. The alert is tried once straight away, with a short time limit, and the result is recorded on the inquiry: sent, failed or pending, plus the error.
- **Automatic retries that survive outages:** a scheduled job runs every 15 minutes, finds alerts still pending or failed, and resends them, up to 6 tries over roughly 1.5 hours. Each inquiry has a fixed send key, so a retry can never send you two alerts. The job only runs with a private secret.
- **Recovery after launch:** an alert that's still failed after all retries stays marked "failed". You can find it in Cloud → Database → inquiries by filtering for failed alerts; every inquiry is visible there, whether or not its alert was sent. To resend, set its attempt count back to 0 and the next scheduled run will send it again. Cloud → Emails shows what was actually delivered. The site never claims an email arrived.
- **Rate limiting:** the platform has no built-in limit on how often someone can submit. The current spam trap, the too-fast-submission check and the database rules stay in place. A stricter limit would need extra custom work, which I'd only add if you want it.

## Phase 4 — Analytics
- `discovery_call_click` with placement `services`, `discovery_section` or `contact`. No booked-call event.
- `generate_lead` stays as is. It already fires only after a successful save, once per submission.
- No names, emails or messages are sent to Google.
- Google already remembers where each visitor came from, for example a Facebook ad. I'll add `utm_source=alexisbeamdesign.com&utm_medium=website&utm_content=<placement>` to the Calendly link, which shows in Calendly's reports and doesn't change your Google Analytics data.

## Phase 5 — Privacy Policy page
- A new **/privacy-policy** page in the site's style, with its own title and description, findable by search engines, linked quietly in the footer.
- It names **Meant To Beam LLC, doing business as Alexis Beam Design**, and covers the inquiry form, email alerts, Google Analytics (ad personalization off) and Calendly.
- Effective date **October 12, 2026**. Privacy contact **alexisbeamdesign@gmail.com**.
- Retention, as it actually works today: inquiries are stored by the website's hosting provider and are not deleted automatically on a schedule. No specific timeframe. Visitors can email alexisbeamdesign@gmail.com with questions or requests about their information. The policy does **not** promise deletion, since there's no deletion process yet. Before publishing, you'll need to confirm whether you'll handle deletion requests; if so, I'll add a line about it.
- **No placeholders on the published page.** Anything unconfirmed is left out rather than marked. Before you publish, I'll list what's still open (for example, whether you want a mailing address shown).
- No cookie banner for now.

## Phase 6 — Testing
Send a real test inquiry with the new fields, then check that it saved, that the alert email went out (once your sending domain is verified), and that the error messages work. Check that all three booking links open the right Calendly page in a new tab, that the analytics events fire, that desktop and mobile layouts have no overflow, that everything works with the keyboard, and that the privacy page and footer link work.

## Technical details
- `src/data/site.ts`: `bookingUrl: string | null = "https://calendly.com/alexisbeamdesign"`, `timelineOptions`, and a `bookingLink(placement)` helper that appends UTMs via `URL`, keeping any existing params.
- `src/routes/index.tsx`: header/hero labels, new `Consultation` section, Contact restructure, Services line, footer link. `Header.tsx` label.
- `ContactForm.tsx`: new fields. A `submissionId` (crypto.randomUUID) is held in a ref, reused on retries, and regenerated after success.
- Migration (additive, no new tables): nullable `website_url`, `timeline`, `submission_id uuid` (unique index), `alert_status text not null default 'pending'` (CHECK pending/sent/failed/suppressed), `alert_error text`, `alert_attempts int not null default 0`, `alert_last_attempt_at`, `alert_sent_at`. Then `REVOKE INSERT ON inquiries FROM anon, authenticated` and re-`GRANT INSERT (name, email, business_name, service, message, budget, website_url, timeline, submission_id)`: column grants block alert columns at the permission layer. No SELECT/UPDATE/DELETE. The insert policy is recreated with the new checks.
- `inquiry.functions.ts`: insert via the publishable client with no `.select()` (no read-back). Unique violation 23505 → `{ ok: true }`, no send, no data returned. Then one inline send attempt (idempotency key `inquiry-alert-<submissionId>`, ~8s timeout). The outcome is recorded via `supabaseAdmin` loaded inside the handler, setting only alert columns, matched by `submission_id`.
- `src/routes/api/public/cron/retry-inquiry-alerts.ts`: POST, `authenticateCronRequest` first. It loads ≤20 rows where status in (pending, failed), attempts < 6 and last attempt older than 10 minutes, then sends with the same idempotency key and records the outcome. pg_cron + pg_net run it every 15 min at minute 7/22/37/52, with the secret read from vault at call time. Returns `{ checked, sent, failed }`.
- `inquiry.functions.ts`: zod URL normalize + validate and a timeline enum; insert the new columns; pass them to `new-inquiry-alert.tsx`, which gets two new rows.
- New `src/routes/privacy-policy.tsx` with its own `head()` and canonical.

## Final safeguards
- **One attempt at a time per inquiry:** before sending, a single atomic database update claims the inquiry. It only succeeds if no other attempt holds a claim from the last 5 minutes; a claim older than that counts as abandoned. The instant send and the scheduled retry can never send the same alert at once. Built as a `claim_inquiry_alert(submission_id)` function that only the server can run (revoked from public/anon/authenticated) and that sets `alert_claimed_at` with `UPDATE ... WHERE (alert_claimed_at IS NULL OR alert_claimed_at < now() - interval '5 min') AND alert_status IN ('pending','failed') RETURNING`. The claim is released when the outcome is recorded.
- **Honest delivery wording:** the fixed send key makes the email service skip repeats it already accepted. I will check how long it remembers that key in its documentation, and won't promise exactly-once delivery. "Sent" means the email service accepted the alert, not that it reached your inbox.
- **Duplicate check is specific:** an error is treated as "already saved" only when it is error 23505 **and** the violated constraint is `inquiries_submission_id_key`. Every other database error shows the visitor the normal "couldn't be sent" message and is logged.
