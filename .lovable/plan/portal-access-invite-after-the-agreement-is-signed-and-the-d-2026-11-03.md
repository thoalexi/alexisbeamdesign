## Portal access: invite after the agreement is signed and the deposit is paid

Your portal's "What happens next" screen says the invitation comes once both the agreement is signed and the deposit is paid. The website currently says signing alone is enough. This change makes the website say the same thing as the portal.

### Wording changes (homepage and all three service pages)

1. **Portal section note**
   - Now: "You'll receive your portal invitation once your service agreement is signed. The portal is for active client projects."
   - New: "You'll receive your portal invitation once your service agreement is signed and your deposit is paid. The portal is for active client projects."

2. **Step 3, "Make It Official"**
   - Now: "As soon as your agreement is signed, you'll receive an invitation to your private client portal."
   - New: "Once your agreement is signed and your deposit is paid, you'll receive an invitation to your private client portal."

3. **Question "Can I see how my project is going?"**
   - Now: "Once your service agreement is signed, you'll receive access to your private client portal."
   - New: "Once your service agreement is signed and your deposit is paid, you'll receive access to your private client portal."

Nothing else changes, and nothing is published.

### Technical details
- Edit `steps[2].text[1]`, `portal.notes[2]`, `faqs[4].a[0]` in `src/data/site.ts`.
- Update the test in `src/test/client-process.test.ts` so it checks that the portal note mentions both the signed agreement and the paid deposit.
- Update the quote-scope memory: the portal invite is sent after the agreement is signed and the deposit is paid.
