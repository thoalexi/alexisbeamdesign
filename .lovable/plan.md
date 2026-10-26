# "Back to services" links on each service page

Add a quiet "← Back to services" link to all three service pages: website design, redesign and workflow automation.

- **Top:** a small link just above the service name at the start of the page.
- **Bottom:** the same link at the end of the page, just before the footer.
- Both links go to the homepage Services section (/#services).
- It is styled as a simple text link with the site's existing underline-on-hover effect, not a big button. That way "Request a Quote" stays the main action, and it adapts to all four personalities automatically.
- No other wording or layout changes.

## Technical details
- Both links live once in the shared service page layout (`ServicePage.tsx`), so all three pages get them together.
- The label is stored with the other service page wording in `src/data/services.ts`.
- They use the same `/#services` anchor the header already uses.
- Check: the existing service page tests run, and a quick phone and desktop check confirms both links land on the Services section.
