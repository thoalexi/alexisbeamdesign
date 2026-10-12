# Optional Discovery Calls + Clearer Inquiry Paths

## Scheduling recommendation: a link that opens Calendly (no embedded widget)

| Priority | Calendly link | Embedded Calendly |
|---|---|---|
| Professional booking | Full Calendly page, works well on phones | Same scheduler squeezed into a box on your page |
| Page speed | No effect, nothing extra loads | Loads Calendly's script and frame (~300KB+) |
| Maintenance | One link to update | Script, sizing and styling to look after |
| Calendar sync and confirmations | Handled by Calendly | Same |
| Branding | Logo + colors on the booking page (paid plans) | Same limits; widget still looks like Calendly |
| Cost | Free plan works | Free plan works |

**Recommendation: the link.** Embedding doesn't give visitors a better experience, and it slows the page and adds upkeep. The link opens in a new tab, so visitors keep their place on your site.

**Calendly Free plan covers:** one type of meeting (your 15-minute call), real-time availability, syncing with one calendar, no double-booking, automatic time zones, confirmation emails, rescheduling and cancelling, buffer time, and custom questions. Your logo and colors on the booking page need the paid Standard plan (about $10–12/month). Free is fine to start.

**Booking tracking limitation:** With a plain link, Google Analytics can't tell when a call is actually booked. Booking happens on Calendly's site, and only an embedded widget can report it back. So I'll track `discovery_call_click` (which button was clicked) and skip `discovery_call_booked`, since I won't count clicks as bookings. Calendly's own reports show your real bookings.

## What I need from you (setup in Calendly)
1. Create a free Calendly account and connect your Google calendar.
2. Create a 15-minute meeting named "Free 15-Minute Discovery Call". Set your hours and add a buffer if you'd like one.
3. Add these booking questions:
   - Business name (required)
   - What are you hoping to accomplish with your website or digital project? (required)
   - Existing website URL (optional)
   - General timeline (optional)
   Name and email are asked automatically.
4. Send me the public link (for example calendly.com/alexisbeam/15min).

Until you send it, I won't add any booking buttons, so there are no dead links.

## Site changes (everything else stays as it is)

**Hero:** "Explore My Work" stays the main button. "Let's Work Together →" becomes **"Request a Quote →"** and jumps to the form. The call button isn't added here, to keep it uncluttered.

**Header:** "Let's Talk" becomes **"Request a Quote"** on desktop and in the mobile menu.

**New section, "Let's Talk About Your Website":** a short, quiet section placed just before Contact, using your exact copy. It has a **Book a Free 15-Minute Call** button and the line "No obligation. Just a conversation about your business and what you're looking to build." It follows the existing editorial style: no icons, cards or popups.

**Contact section, two choices:**
- **Ready to Get Started?** "Know what you need? Share your project details and let's discuss next steps." This is followed by the existing form, which keeps the main emphasis.
- **Still Exploring?** "Have questions or want to talk through an idea? Let's connect." This gets a quieter text link: **Book a Free 15-Minute Call →**.
- The form's button becomes **"Request a Quote →"**, and the line under the form uses your quote copy.

**Services:** a single line under the services, "Not sure which fits? Book a free 15-minute call," as a quiet link. No extra buttons.

That's four booking links in total, so the site doesn't feel salesy.

## Quote form: kept as is, with two optional fields added
- Everything that works now stays: checks on required fields, spam protection, a success message only after real success, email alerts to you, and the button locking while sending so it can't be sent twice.
- New optional fields: **Existing website** and **Desired timeline** (dropdown: ASAP, 1–3 months, 3–6 months, Flexible). Both are also included in your email alert.
- No call is ever required. No automatic prices are shown.

## Privacy and accessibility
- Calendly handles booking details. Nothing booking-related is stored on your site or sent to Google Analytics.
- The site has no privacy policy page yet. I recommend adding a short one that mentions the inquiry form, Google Analytics and Calendly. This is optional and would be a separate step. Tell me if you'd like it.
- Booking links say they open in a new tab and work with the keyboard.

## Technical details
- `src/data/site.ts`: add `bookingUrl: string | null` (booking CTAs render only when set) and `timelineOptions`.
- New `DiscoveryCall` section in `src/routes/index.tsx`, inserted before `Contact`. Contact gets the two-path intro. Hero and header CTA labels change.
- Booking links use `target="_blank" rel="noopener"` and `track("discovery_call_click", { placement })`, where placement is hero/services/discovery_section/contact. `generate_lead` is unchanged. UTMs carry over through GA's first-touch attribution, and I'll also add `utm_source=website` + `utm_content=<placement>` to the Calendly link so Calendly's reports show which button was used.
- Migration: add nullable `website_url` and `timeline` columns to `inquiries`, extending the insert policy with length checks. Update the zod schema, the server function insert, and the alert email template.
- Verify: test submission end-to-end, mobile layout, and links.
