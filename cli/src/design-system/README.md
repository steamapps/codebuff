# Prism Design System

Prism is the visual identity layer of this fork. It replaces the ad-hoc hex
values that used to be scattered across `utils/theme-system.ts`,
`utils/ui-constants.ts` and individual components.

## Layers

| File | Responsibility |
| --- | --- |
| `tokens.ts` | Raw, brand-agnostic values: color scales, spacing (in terminal cells), motion, border weights. **The only place hex strings are allowed.** |
| `themes.ts` | Semantic mapping of tokens onto the `ChatTheme` contract, for `dark` and `light`. |
| `index.ts` | Public entrypoint. |

## Identity

- **Brand:** violet (`palette.brand`) — primary actions, user attribution, headings.
- **Accent:** cyan (`palette.accent`) — secondary emphasis, info, inline code.
- **Neutrals:** cool ink scale (`palette.neutral`) — text, surfaces, borders.
- **Status:** emerald / rose / amber for success, error and warning.

## Rules

1. A component never hardcodes a color. It reads from `useTheme()`.
2. A new visual need becomes a **semantic role** in `ChatTheme`, not a one-off hex.
3. Spacing and gaps come from `spacing` / `rhythm`, not magic numbers.
4. `tokens.ts` has no dependencies. `themes.ts` depends only on `tokens.ts`
   and the `ChatTheme` type, which keeps the graph acyclic.

## Consumers

- `utils/theme-system.ts` re-exports `prismThemes` as `chatThemes` and derives
  the logo colors from `palette.brand`.
- `utils/ui-constants.ts` derives its inverted CTA foreground from
  `palette.neutral`.
- `hooks/use-theme.tsx` builds the runtime theme (overrides + plugins) on top.
