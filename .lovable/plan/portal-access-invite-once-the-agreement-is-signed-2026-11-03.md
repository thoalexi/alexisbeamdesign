## Portal access: invite once the agreement is signed

Replace the word "onboarding" with the actual trigger: clients get a portal invitation once they sign the service agreement. A paid deposit is not required for access.

### Wording changes (homepage and service pages)

1. **Portal section note** (from your screenshot)
   - Now: "Full portal access begins after onboarding. The portal is for active client projects."
   - New: "You'll receive your portal invitation once your service agreement is signed. The portal is for active client projects."

2. **Step 3, "Make It Official"** (homepage and all three service pages)
   - Now: "Once you're happy with the proposal, we'll finalize the service agreement and initial deposit." / "After onboarding, you'll receive an invitation to your private client portal."
   - New: "Once you're happy with the proposal, we'll finalize the service agreement and initial deposit." / "As soon as your agreement is signed, you'll receive an invitation to your private client portal."

3. **Question "Can I see how my project is going?"**
   - Now: "Once your project begins, you'll receive access to your private client portal."
   - New: "Once your service agreement is signed, you'll receive access to your private client portal."

Nothing else changes. Payments and signatures still aren't described as happening inside the portal. Nothing gets published.

### Technical details
- Edit `portal.notes[2]`, `steps[2].text[1]` and `faqs[4].a[0]` in `src/data/site.ts`.
- Save the rule "portal invite is sent once the agreement is signed, deposit not required" to the quote-scope memory.
- Add a test asserting that no step, note or FAQ contains "onboarding" and that the portal note mentions the signed agreement.
