# Client process, portal and FAQ updates

Enhancement to the existing homepage only. No redesign, no prices, no packages section (skipped for now), no portfolio changes.

## What changes

1. **What Working Together Looks Like** — replaces the current four-step "The process" section with your five steps (Let's Talk, Review Your Proposal, Make It Official, Watch It Come Together, Launch & Beyond), copy as written. Same editorial numbered timeline style. "Start Your Project" button goes to the existing inquiry form.
2. **Your Project. Everything in One Place.** — new text-only section (no picture) with your supporting copy and the four benefits. Short notes: proposals come by private link with no account; approving a proposal is separate from signing the agreement; portal access comes after onboarding; the portal is for active clients. Payments and signatures are not described as happening in the portal.
3. **Client Login** — link to https://portal.alexisbeamdesign.com in the top menu (small, quiet) and footer.
4. **A Few Good Questions** — eight accordion FAQs with your exact wording, except FAQ 3 drops the two-week estimate: "Timing depends on the size of the project and when I have the content and information needed to begin. You'll receive an estimated timeline in your proposal before work starts, so you know what to expect." Two columns on desktop, one on phone, plus/minus indicators, keyboard friendly. Below: "Still have questions? Let's talk." linking to the contact form and the 15-minute chat.
5. **Consistency check** — the services pages' FAQs currently say things like "a clear, scoped quote before any work begins". I'll review them against the new terms and change only wording that contradicts them; I'll list every change.

## Homepage order

Hero, Work, About, Services, What Working Together Looks Like, Client Portal, Differentiator, FAQ, Contact. (Work stays where it is since the portfolio is on hold.)

## Saved rules updated

- Remove "no timing or support promises" wording conflict: the site will now describe the 50/50 payment split, maintenance starting at launch, the three-month initial term, then month-to-month with 30 days' written notice, and ownership after full payment — exactly as you wrote them. Still no prices and no timing estimates.

## Not done

- No legal agreements written or changed; the Privacy Policy is untouched.
- Nothing published.

## Technical details

- Copy in `src/data/site.ts` (steps, portal benefits, FAQs, `clientPortalUrl`); sections in `src/routes/index.tsx`.
- Accordion built with the existing shadcn Accordion (Radix, already installed — aria-expanded handled), content kept in the DOM for indexing; no FAQ schema added.
- Update tests that reference the old steps; add a test that FAQ count is 8 and FAQ 3 has no "two weeks".
- Update mem://constraints/quote-scope with the new allowed terms.
