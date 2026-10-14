# Opening section update and mobile contact check

## Text changes (homepage opening section only)
- The headline "Thoughtfully designed. Purposefully built." stays exactly as it is.
- Remove the line "Beautiful websites. Smarter ways of working."
- Replace the "Hi, I'm Alexis. From beautiful, functional websites..." paragraph with:
  "Hi, I'm Alexis. I design and redesign websites and help small businesses improve workflows with practical automation—in Atlanta and across the U.S."
  "Hi, I'm Alexis." keeps its slightly darker color, and the paragraph keeps its current style.
- The doctorate and experience paragraph stays below it, unchanged.
- Spacing is adjusted so removing the line leaves no gap.

## Note on button names
The site no longer has a "Let's Work Together" button or a "Send My Inquiry" button. They were renamed earlier to **Request a Quote** and **Send My Project Details**. I'll test those buttons and keep their current names. Tell me if you want the old names back.

## Mobile check
- On a phone-sized screen, tap "Request a Quote" in the opening section, and also the one in the menu.
- Confirm the page scrolls to the contact section, the heading isn't hidden behind the sticky top bar, and every form field and the send button can be seen and used.
- Fix any overlapping or clipped content I find, with small spacing changes only.
- Send you screenshots of the updated opening section (desktop and mobile) and the mobile contact section, and report whether the link works. I won't publish.

## Technical details
- Edit `src/routes/index.tsx`, hero block around lines 110–116. If the section heading ends up under the sticky header, add `scroll-mt` to `#contact`.
- Verify with Playwright at 390x844: click the hero `#contact` link, check the `#contact` bounding box against the header height, and confirm the submit button is visible and enabled.
