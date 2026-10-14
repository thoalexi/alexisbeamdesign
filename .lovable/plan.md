# About section update

Only the About section changes. The rest of the site stays the same.

## Stays the same
- The "A LITTLE ABOUT ME" label, the heading "A creative mind. An analytical one, too.", the portrait and its terracotta frame.
- The quote underneath ("Good ideas deserve to become something real.") and its praxi caption.
- Fonts, colors and the numbered style (terracotta number, serif title, small grey description).

## Bio
- Remove the large standalone "Hi, I'm Alexis." and all six current paragraphs.
- Add your four new paragraphs, word for word. The first one ("You know your business...") is a little larger and darker, matching how the "Beautiful websites..." line looks in the opening section. The other three use the current bio style.

## Three numbered items
- 01 Human-Centered Thinking: "Clear information and intuitive experiences that help people find their way."
- 02 Business-Minded Solutions: "Recommendations grounded in your goals, priorities, and everyday work."
- 03 Thoughtful Design: "Visual care and practical functionality, considered together from the start."
- The new descriptions are longer, and three narrow columns next to the bio would leave only a few words per line. So the items stack one under another on phones and tablets, and sit side by side only on wide screens. The spacing between them is slightly larger so they're comfortable to read.

## Checks before you publish
- Screenshots of the About section on desktop and on a phone.
- Confirm there's no clipped text or sideways scrolling at phone width.
- Confirm the "About" menu link scrolls to this section on desktop and from the phone menu.
- Share a short summary of the changes. I won't publish.

## Technical details
- `src/routes/index.tsx`, `About()` only. The bio `<p>`s replace lines 238–244. The lead paragraph uses `font-serif text-2xl md:text-3xl text-foreground leading-snug`. The card list becomes `grid gap-8 border-t pt-8 xl:grid-cols-3`, with the new captions.
- Playwright at 1280 and 390 widths: check that `scrollWidth <= innerWidth`, click the nav `#about` link and check the section's position.
