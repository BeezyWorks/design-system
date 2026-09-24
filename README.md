# @beezyworks/design

React Native components, color tokens, fonts and a Hebrew-date model shared by
the apps. It ships as TypeScript source (no build step); the app's Metro and
Babel compile it.

## Using it in an app

Apps mount this repo as a git submodule and link it through their pnpm
workspace, so it can be edited in place alongside the app:

```sh
git submodule add ../design-system.git packages/design   # relative URL: ssh or https, whatever the app's origin uses
```

```yaml
# pnpm-workspace.yaml
packages:
  - '.'
  - 'packages/*'
```

```jsonc
// package.json
"dependencies": { "@beezyworks/design": "workspace:*" }
```

Then `import {Text, SemanticColor} from '@beezyworks/design'`.

- Install every peer dependency (see below) in the app.
- Jest: the package lives outside `node_modules`, so it is transformed by
  default; `@hebcal/core` and `lucide-react-native` need the same
  `moduleNameMapper` entries as `jest.config.js` here.
- Clones and CI need `git submodule update --init` (`actions/checkout` with
  `submodules: true` and a token that can read this repo).
- To bump: commit and push here, then commit the new submodule pointer in the
  app.

## Rules

1. **No raw colors.** Colors are `SemanticColor` tokens, passed by accessor:
   `<Text color={SemanticColor.TextDanger} />`. No hex or `rgb()` strings
   outside `colors/named.ts` (lint-enforced).
2. **No styling props.** Components take declarative props (`padding="md"`,
   `background={SemanticColor.SurfaceCard}`), never `style`.
3. **No app imports.** Relative imports only; the design system never imports
   itself by package name. Apps import it through one barrel
   (`@beezyworks/design`).
4. **Idiosyncratic components live in the app.** Every part they are made of
   is exported from here.

## Colors: three tiers

| Tier | File | What |
|---|---|---|
| 1. Named colors | `colors/named.ts` | Every literal value (`Ink`, `BrandBlue`, `InkFaded` = ink at 50%). Alpha lives in the named color. Never used outside tier 3 and build config. |
| 2. Semantic colors | `colors/semantic.ts` | `Role` + `Qualifier`: `Surface*`, `Text*`, `Border*`, `Overlay*`, `Accent*`. The only vocabulary components and apps use. |
| 3. Themes | `colors/themes.ts` | `lightTheme` / `darkTheme`: `Record<SemanticColor, NamedColor>`. A missing token is a compile error. |

Resolved values are pinned by a snapshot in `colors/__tests__`.

## What an app provides

```tsx
<DesignSystemProvider
  mode={resolvedMode}            // 'light' | 'dark' — the app resolves "system"
  content={{typeface, size, leading}}  // the user's reading-text choice
>
```

- `ThemeScope mode="dark"` forces a subtree (an always-dark hero) to a mode.
- `useResolvedColor(token)` / `useColorResolver()` give plain color strings for
  third-party APIs (status bar, navigation theme, calendar dots).
- **Fonts:** call expo-font's `useFonts(DesignFonts)` once at the root.
- **Bottom sheets:** provide `SheetHostContext` (`{dismissed, dismiss,
  onClosed}`) from your modal system. `BottomSheetModal` reads it.
- **Tab bar height:** provide `TabBarHeightContext` (a number, or `undefined`
  when not inside tabs) so `Screen` can reserve room for the bar.

## Reading-text options

`Typeface`, `ContentSize`, `Leading` (+ their values) are exported here; the
string values are persisted by apps, so **never rename them**. Display labels
(translations) belong to the app.

## Hebrew dates

`hebrewDate/` holds the model the date pickers use: months, `HebrewMoment`,
month/day option lists, and conversions between JS dates, moments and Hebrew
dates. Pure (no React).

## Layout

`layout/` exports the tab bar / side nav constants (`TAB_BAR_HEIGHT`,
`SIDE_NAV_BREAKPOINT`, …), `useIsWideWebNav`, `useSideNavWidth`,
`useIsWideLayout` and `useTabBarHeight`.

## Development

- `pnpm storybook` — web Storybook (react-native-web + Vite). Native-only
  modules are stubbed in `.storybook/stubs`. Every push to `main` publishes
  it to https://beezyworks.github.io/design-system/.
- `pnpm typecheck`, `pnpm lint`, `pnpm test` — also run by CI on every push.
- Tests live in `__tests__` folders next to what they cover; component tests
  are snapshot tests rendered through `testing/renderWithTheme` (this folder's
  helper, using only `DesignSystemProvider`).

## Peer dependencies

Declared in `package.json`. The barrel is `export *`, so an app must install
all of them (including the native ones: `expo-blur`, `expo-glass-effect`,
`react-native-pager-view`, `@react-native-community/datetimepicker`, …) even
if it never renders the components that use them.

## Known gaps

- `Rubik`, `SiddurIcons` and `NotoSerifHebrew` are registered in `FontFamily`
  but no component uses them.
- The Storybook does not load `DesignFonts`, so Hebrew typeface stories fall
  back to system fonts.
