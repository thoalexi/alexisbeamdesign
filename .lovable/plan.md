# Align service-page questions with "A few good questions"

## Where they are today
- **Homepage:** "A few good questions." section near the bottom, just above the contact form. Eight general questions that open and close. Not in the top menu, so it's easy to miss.
- **Each service page:** "Common questions" near the bottom, above "Back to services". Four to six questions written for that service, always fully shown, in a different style.

## Changes
1. **Same look on every page.** Service-page questions use the homepage style: open/close rows with plus/minus, two columns on desktop and one on phone, same heading style ("A few good questions." with a short intro line).
2. **Keep each service's own questions.** Questions that only make sense for that service stay (for example "Will I lose my search rankings?" on redesign, "Will automation work with my tools?" on automation). Wording stays as it is.
3. **Remove repeats and clashes.** Service-page questions already answered on the homepage (cost, what happens after a quote, preparing wording and photos, hosting and support after launch) are checked against the homepage answers. Any that repeat or say something different are removed, so there is one answer in one place.
4. **Link to the full list.** Under each service page's questions: "Have a general question? See all questions" linking to the homepage questions.
5. **Easier to find.** Add "FAQ" to the top menu and phone menu, jumping to the homepage questions.

## Technical details
- Extract the homepage Faq accordion into a shared component in src/components/site, used by src/routes/index.tsx and ServicePage.tsx (content still from src/data/site.ts and src/data/services.ts).
- Trim overlapping entries (quoteFollowUp, contentPreparation, quoteScope, ongoingArrangements, cost FAQ) in src/data/services.ts after comparing to `faqs`.
- Add `{ id: "faq", label: "FAQ" }` to navLinks.
- Update src/test/service-pages.test.tsx for the new question counts; verify desktop and phone in preview. Nothing published.
