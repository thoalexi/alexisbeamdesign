<!-- LOVABLE:BEGIN -->
> [!IMPORTANT]
> This project is connected to [Lovable](https://lovable.dev). Avoid rewriting
> published git history — force pushing, or rebasing/amending/squashing commits
> that are already pushed — as it rewrites history on Lovable's side and the
> user will likely lose their project history.
>
> Commits you push to the connected branch sync back to Lovable and show up in
> the editor, so keep the branch in a working state.
<!-- LOVABLE:END -->

- Portfolio projects, services, process steps, socials and form options live in `src/data/*` — edit content there, not in components (keeps the site easy to update).
- Contact inquiries are inserted via a server function (`src/lib/inquiry.functions.ts`) using the publishable key and an insert-only RLS policy; never expose read access to inquiries publicly.
- Calendly booking links render only via BookingLink + bookingUrl in src/data/site.ts (plain external link, no embed) — one place to change, no dead links, no third-party script.
