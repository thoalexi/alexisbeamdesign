# Service-page questions: match the homepage design, keep service content

## Where they are today
- **Homepage:** "A few good questions." near the bottom, above the contact form. Eight general questions. It isn't in the top menu.
- **Each service page:** "Common questions" near the bottom. Four to six questions for that service, always fully shown, in a different style.

## Changes
1. **Same design everywhere.** Service-page questions use the homepage accordion: same typography, dividers, spacing, plus/minus icons, two columns on desktop and one on phone, and the same open/close behavior.
2. **Same heading, service-specific intro.** Every service page uses the "A few good questions." heading style. The short intro line under it is written for that service, for example: "Common questions about building a new website."
3. **Keep the service questions.** Each page keeps its existing 4–6 questions and answers, including ones that overlap with the homepage. Wording changes only where it conflicts with the updated terms. One likely fix: "What about hosting, software costs, and support after launch?" says support "depends on the project," but the homepage now says standard website packages include a maintenance plan from launch. That answer would be reworded to match. Any other change will be listed for you.
4. **Homepage unchanged.** The eight general questions stay exactly as they are.
5. **Link to all FAQs.** A subtle line under each service page's questions: "Have a general question? See all FAQs." It goes to the homepage questions.
6. **FAQ in the menu.** Add "FAQ" to the top menu and the phone menu. From any page it jumps to the homepage questions.

Nothing is published automatically.

## Technical details
- Extract the homepage accordion into a shared component in src/components/site, used by src/routes/index.tsx and ServicePage.tsx. Homepage answers are string arrays and service answers are strings, so the component accepts both.
- Add `faqIntro` per service in src/data/services.ts. Revise `ongoingArrangements` (redesign and automation wording reviewed against the maintenance terms) and leave the other entries alone.
- Add `{ id: "faq", label: "FAQ" }` to navLinks. Check that Header links work from service pages (go to `/#faq`).
- Add a roadmap.md entry. Update the tests (homepage FAQ count stays 8, each service has 4–6 questions). Check desktop and phone in the preview.
