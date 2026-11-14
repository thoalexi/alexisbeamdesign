# Homepage headline: clean spacing and small-business wording

The suggestion has two parts. One is already done on your site.

## Already in place (no change)
- Right under the headline, your homepage already says: "Websites and practical workflow automation for small businesses." That is the small-business subheadline the suggestion asks for, so I won't add a second one or use the suggested sentence.

## What changes
- **Spacing for search engines and screen readers.** Right now the headline's hidden description and the two visible lines run together when read aloud or scanned ("...Digital SolutionsThoughtfully designed.Purposefully built."). I'll add proper spaces between them.
- **Hidden description.** "Alexis Beam — Web Design & Digital Solutions" becomes "Alexis Beam — Web Design & Workflow Automation for Small Businesses." Visitors won't see this text; search engines and screen readers will.
- The visible headline "Thoughtfully designed. Purposefully built.", its look and its animation stay exactly the same.
- Nothing is published.

## Checks
- Confirm the headline text now reads with spaces between each part.
- Desktop and phone screenshots show the headline looks unchanged.
- Run the existing checks.

## Technical details
- `src/routes/index.tsx` h1: update the sr-only span text, and add `{" "}` text nodes between the sr-only span and each visible span so the h1 textContent is spaced.
