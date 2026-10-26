# Add the four "Pick Your Personality" themes

The Alexis Beam Labs source code is available. The theme definitions, selector and theme styles will come from it directly, not from guesses based on the public site. Only visual styling moves over. No words, sections or features from Labs come with it.

## What visitors will see
- A slim "Pick Your Personality" strip sits right below the top bar and above the opening headline. It has the small label, four round swatches (Classic, Retro, Playful, Moody) with a name tooltip, and the active name in italics. It looks and behaves like the Labs selector.
- On phones the strip stays compact under the top bar, and the mobile menu also lists all four names as tappable options, the same way Labs does.
- Choosing a personality restyles the whole site: homepage, all three service pages and the privacy page. That covers colors, fonts, buttons, borders, shapes, decorative touches and hover effects.
- Classic is the default and looks exactly like the site does today.
- A visitor's choice is remembered on return visits. A first visit always starts on Classic, and no other theme flashes on screen while the page loads.

## What stays exactly the same
- All wording, headlines, portfolio, About bio, services, FAQs, buttons, form, footer, navigation and search titles and descriptions.
- Section order, links, quote preselection, Calendly links, inquiry form, analytics and campaign tracking.

## Technical details
- Copy `src/data/themes.ts` from Labs (definitions, storage key, read/save/apply, inline bootstrap script). Copy `ThemeSelector.tsx` and its `ThemeProvider` too, adapting only placement.
- Copy the personality CSS from the Labs `styles.css`: `--personality-*` tokens, `[data-theme="retro|playful|after-dark"]` overrides and swatch classes. Keep the current `:root` values so Classic computes identically. `--font-serif` maps to `--personality-display`, which defaults to Cormorant Garamond.
- `__root.tsx`: add the bootstrap script in the head so the theme is set before paint. Wrap the app in ThemeProvider. Load fonts only for the active theme, with `display=swap`.
- Header: add the selector row under the nav inside the fixed header. The page's top offset and `scroll-padding-top` are adjusted once for every theme, so switching themes never moves the layout.
- Review the Labs `index.tsx` and `ServicePage.tsx` only for theme-specific class hooks, and add those hooks without any content changes.
- Respect reduced motion for theme transitions. Arrow-key radio group keyboard support is already part of the Labs selector.
- Port the Labs `themes.test.tsx` (default Classic, invalid stored value falls back, blocked storage never breaks switching).
- Add an AGENTS.md rule: themes are visual-only tokens keyed by `data-theme`, and content never depends on the theme.

## Verification
- Compare every page's visible text before and after the change.
- Compare Classic screenshots against the current site.
- Check all four themes at 375, 768, 1440 and 1920 widths.
- Confirm the choice is remembered after a reload, there is no flash of the wrong theme, keyboard switching works and nothing jumps.
- Run the existing 18 tests plus the new theme tests, and a typecheck.
