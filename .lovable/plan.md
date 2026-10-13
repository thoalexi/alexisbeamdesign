# Four automation-focused updates

Only these four changes. Nothing else on the site moves or changes.

## 1. Intro under the big headline
The big headline "Thoughtfully designed. Purposefully built." and both buttons stay the same. The paragraphs below it change to:

- New line, slightly bigger and darker: **"Thoughtful websites. Smarter ways of working."**
- "Hi, I'm Alexis. From beautiful, functional websites to automating the everyday tasks that slow you down, I help small businesses simplify their work and grow with confidence."
- The existing paragraph about your doctorate in psychology and 12+ years stays as it is.

## 2. Services
The third service is renamed **"Digital Solutions & Workflow Automation"**.
- Description: "Practical automation for the everyday work that eats up your time, from customer follow-ups and connected forms and spreadsheets to reporting and admin workflows, so your business runs more smoothly."
- List: Automated customer follow-ups · Connected forms and spreadsheets · Automated reporting and dashboards · Administrative workflow automation · Interactive web tools

The other two services stay the same.

## 3. New automation section
This is a short section placed just before the "Have something in mind?" chat section. It looks like that section: same layout, background and outline button.
- Heading: "What's one task you wish you could *automate?*" (the last word in italic blue, like your other headings)
- Body text: exactly as you provided it
- Button: "Let's Talk About Automation →" opens your existing Calendly page in a new tab. No new booking event and no new form.

Between this section and the chat section, the background colors change so the two don't blend together.

## 4. Search and sharing text
- Title: "Alexis Beam | Web Design, Automation & Digital Solutions"
- Description: as you provided it
- These also apply to link previews on social media and in texts. They show up on the live site after you publish.

## Technical details
- `src/routes/index.tsx`: hero copy, new `Automation` section before `Consultation`, TITLE/DESC constants. Consultation background swaps to `bg-background` so it alternates with the new `bg-secondary` section.
- `src/data/site.ts`: service rename/blurb/includes; add `"automation"` to `BookingPlacement` so Calendly UTM and the GA `discovery_call_click` event can tell this button apart.
- No new dependencies.
