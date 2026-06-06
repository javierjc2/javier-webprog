# TODO - Make Dashboard Color Scheme Consistent with Site

- [ ] Inspect current dashboard styling in `src/layouts/DashLayout.jsx` and identify hardcoded colors.
- [ ] Inspect site theme/styles in `src/layouts/Layout.jsx` and `src/assets/styles/index.css` to extract the target palette.
- [ ] Update dashboard MUI `sx`/styled styles to use the same palette (zinc-950 background, zinc-200 borders, text-rose? -> actually use `#f8fafc`, `#334155`, etc.).
- [ ] Verify selected/hover states in the drawer match the site (no light grays like `#f4f4f5`).
- [ ] Run the dev server and manually verify `/dashboard`, `/dashboard/reports`, `/dashboard/users`.
- [ ] (Optional) Ensure MUI components like AppBar/Drawer inherit background/text consistently.

