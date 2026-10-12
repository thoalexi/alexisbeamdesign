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

Conflict to note: the current Contact heading already says "Have something in mind? Let's make it happen." To avoid repeating the same heading twice in a row, I'll change the Contact heading to **"Ready to Get Started?"**, as your brief describes.

## Phase 2 — Inquiry form
- New optional field **Existing website**, with the example text "https://yourwebsite.com". It accepts entries like "mysite.com" and adds the https:// itself, rejects entries that aren't web addresses, and is capped at 255 characters. I'll never visit the address.
- New optional dropdown **When are you hoping to get started?** It starts on "Select a timeline (optional)" with nothing chosen. Options: As soon as possible / Within 1–3 months / Within 3–6 months / I'm flexible.
- The send button becomes **Send My Project Details →**.
- Everything else stays: every current field, required-field checks, spam trap, the "Sending…" lock that stops double sends, clear error messages, and the success message only after a real save.

## Phase 3 — Saving and email alerts
- Two optional details are added to saved inquiries: the website and the timeline. The rule that lets the public submit is tightened to check both. The public still can't read, edit or delete inquiries.
- The alert email to alexisbeamdesign@gmail.com shows the website and timeline.
- **Duplicate protection:** each submission gets a one-time ID, so a retried send can't create a second alert email.
- **If the alert email fails:** the inquiry is already safely saved, so the visitor still sees success; that matches "processing confirmed" for the business. The failure is logged, not hidden. Changing this would mean visitors see an error even though their message reached you. Tell me if you'd prefer that instead.
- **Rate limiting:** the platform has no built-in limit on how often someone can submit. The current spam trap, the too-fast-submission check and the database rules stay in place. A stricter limit would need extra custom work, which I'd only add if you want it.

## Phase 4 — Analytics
- `discovery_call_click` with placement `services`, `discovery_section` or `contact`. No booked-call event.
- `generate_lead` stays as is. It already fires only after a successful save, once per submission.
- No names, emails or messages are sent to Google.
- Google already remembers where each visitor came from, for example a Facebook ad. I'll add `utm_source=alexisbeamdesign.com&utm_medium=website&utm_content=<placement>` to the Calendly link, which shows in Calendly's reports and doesn't change your Google Analytics data.

## Phase 5 — Privacy Policy page
- A new **/privacy-policy** page in the site's style, with its own title and description, findable by search engines, linked quietly in the footer.
- It names **Meant To Beam LLC, doing business as Alexis Beam Design**, and covers the inquiry form, email alerts, Google Analytics (ad personalization off) and Calendly.
- It makes no claims about how long data is kept, security certifications, or compliance.
- **I need you to confirm:**
  - the effective date (I'll use the day this goes live)
  - the contact email for privacy requests (I'll use alexisbeamdesign@gmail.com unless you say otherwise)
  - how long you keep inquiries
  - your mailing address, if you want it listed

  These are marked clearly on the page until you confirm them.
- No cookie banner for now. I'll flag in the policy whether one may be needed for EU or California visitors.

## Phase 6 — Testing
Send a real test inquiry with the new fields, then check that it saved, that the alert email went out (once your sending domain is verified), and that the error messages work. Check that all three booking links open the right Calendly page in a new tab, that the analytics events fire, that desktop and mobile layouts have no overflow, that everything works with the keyboard, and that the privacy page and footer link work.

## Technical details
- `src/data/site.ts`: `bookingUrl: string | null = "https://calendly.com/alexisbeamdesign"`, `timelineOptions`, and a `bookingLink(placement)` helper that appends UTMs via `URL`, keeping any existing params.
- `src/routes/index.tsx`: header/hero labels, new `Consultation` section, Contact restructure, Services line, footer link. `Header.tsx` label.
- `ContactForm.tsx`: new fields; idempotency ID created once per form mount, sent to the server function, and used as the email `idempotencyKey`.
- Migration: `inquiries.website_url text null` and `inquiries.timeline text null`. The insert policy is recreated with length checks and a timeline whitelist; grants are unchanged (insert-only).
- `inquiry.functions.ts`: zod URL normalize + validate and a timeline enum; insert the new columns; pass them to `new-inquiry-alert.tsx`, which gets two new rows.
- New `src/routes/privacy-policy.tsx` with its own `head()` and canonical.
