# Optional 15-Minute Chats, Clearer Contact Paths, Privacy Policy (simplified)

## Calendly (plain link, no widget)
- One central setting: `bookingUrl`. I'll open your Calendly page in a browser and use the direct link to "Free 15-Minute Consultation". If I can't confirm that event, I'll use https://calendly.com/alexisbeamdesign and tell you.
- **Exactly three links:** Services, the new chat section, and Contact. Each opens in a new tab, tells screen readers it does, and is hidden if the setting is ever empty.

## Page changes
- **Header (desktop + mobile):** "Let's Talk" becomes **Request a Quote**. **Hero:** "Let's Work Together →" becomes **Request a Quote →**, and "Explore My Work" stays as is.
- **New section before Contact:** "Have Something in Mind?", with your copy, a **Schedule a Free 15-Minute Chat →** button and the no-obligation line.
- **Contact:** heading becomes **Ready to Get Started?** with its copy above the form. A quieter **Still Exploring?** text link sits alongside.
- **Services:** "Not sure what you need? Let's talk it through. Schedule a Free 15-Minute Chat →"
- **Footer:** small "Privacy Policy" link.

## Inquiry form
- Optional **Existing website** field: adds https:// if it's missing and rejects entries that aren't web addresses.
- Optional **When are you hoping to get started?** dropdown, with nothing chosen by default.
- Button reads **Send My Project Details →**.
- The current submission process stays as it is: same validation, spam trap, "Sending…" lock, success only after a real save, and the inquiry saved before the alert email. A failed email is logged and the inquiry is kept.
- The alert email shows the two new details.

## Database
- Only two new optional columns: `website_url` and `timeline`. The public submit rule gains length checks and an allowed list of timeline options. The public still can't read, edit or delete inquiries.

## Analytics
- `discovery_call_click` with placement `services`, `discovery_section` or `contact`. No booked-call event.
- `generate_lead` is unchanged. No personal details go to Google.
- The Calendly link gets `utm_source/utm_medium/utm_content` tags, so Calendly's reports show which button was used.

## Privacy Policy (/privacy-policy)
- Effective October 12, 2026. Names Meant To Beam LLC, doing business as Alexis Beam Design. Contact: alexisbeamdesign@gmail.com.
- Covers the inquiry form, email alerts, Google Analytics and Calendly.
- On retention, it says inquiries are stored by the site's hosting provider and are not automatically deleted on a schedule. It gives no timeframe and makes no deletion promise or compliance claims. It has no placeholders.
- Has its own page title and description, and can be found by search engines.

## Testing
I'll send a real test inquiry and confirm it was saved and the alert was attempted. I'll also check the three booking links, the analytics events, desktop and mobile layouts, and the privacy page.
