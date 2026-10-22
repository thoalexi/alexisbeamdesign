# Keep the About portrait in view while the bio scrolls

## Recommendation
Yes, but only on wider screens. The bio is longer than the portrait, so on desktop the photo scrolls away while the text keeps going. If the portrait stays put while the visitor reads, the photo and words stay together. It's a quiet, editorial touch, and nothing animates.

## What changes
- Desktop/laptop (wide screens): the portrait stays in place just below the top bar while the bio and highlights scroll past. Once the bio ends, the portrait scrolls away normally with the rest of the section.
- Tablet and phone (stacked layout): no change. The portrait stays above the bio and scrolls normally, because a fixed photo would cover the text on small screens.
- The wording, photo, size, colors, and spacing all stay the same.
- Nothing is published.

## Checks
- Desktop at 1280 wide: scroll through About and confirm the portrait stays visible, never overlaps the top bar, and lets go at the end of the section.
- Mobile at 390 wide: confirm the layout is unchanged and nothing scrolls sideways.
- Confirm the bio is visible when you click "About" from the homepage.
- Desktop and mobile screenshots for you to review.

## Technical details
- In `src/routes/index.tsx`, on the About portrait column: `lg:sticky lg:top-[header height + small gap] lg:self-start`. The grid row must not use `items-stretch` on that column.
- No new dependencies and no JavaScript scroll handlers, so reduced-motion settings aren't affected.
