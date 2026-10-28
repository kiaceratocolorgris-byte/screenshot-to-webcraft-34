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

- src/data/properties.ts is the single source of truth for listings (owner-supplied, do not edit its text/prices); map coordinates live in src/data/mapPositions.ts and placeholder photos in src/data/images.ts so the data file stays untouched.
- Use the shared Header Logo component for site branding and derive the favicon from the same artwork so both stay consistent.
