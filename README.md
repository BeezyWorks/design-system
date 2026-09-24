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
| 1. Named colors | `colors/named.ts`, `colors/brands.ts` | Every literal value (`Ink`, `BrandGold`, `InkFaded` = ink at 50%). Alpha lives in the named color. A **brand** (`Brand.Blue`, `Brand.Gold`) is a handful of these named colors, one per brand slot. Never used outside tier 3 and build config. |
| 2. Semantic colors | `colors/semantic.ts` | `Role` + `Qualifier`: `Surface*`, `Text*`, `Border*`, `Overlay*`, `Accent*`. The only vocabulary components and apps use. |
| 3. Themes | `colors/themes.ts` | `buildTheme(mode, brand)`: `Record<SemanticColor, NamedColor>` — the mode's shared neutrals plus the brand's slots for the brand tokens. A missing token is a compile error. |

Resolved values for every mode × brand are pinned by a snapshot in
`colors/__tests__`.

### One family, one hue each

The apps are meant to feel related, so **only the brand hue differs between
them**. A brand fills the brand-derived tokens (`AccentPrimary*`,
`AccentTabActive`, `AccentTint*`, `TextAccent`, `SurfaceHighlight`);
surfaces, text, borders, overlays and status colors are shared (a test
enforces it). To add an app's hue, add its named colors and a `Brand` entry
— never per-app surface or text colors.

### Modes

`light`, `sepia` (warm paper for long reading; light's structure with brown
ink) and `dark`. Native APIs that only know light/dark (pickers, glass, blur,
the status bar) should read `useAppearance()`, which treats sepia as light.
An app offers whichever modes it wants.

## What an app provides

```tsx
<DesignSystemRoot               // or DesignSystemProvider, if you wire the rest yourself
  mode={resolvedMode}            // 'light' | 'sepia' | 'dark' — the app resolves "system"
  brand={Brand.Gold}             // the app's hue; default Brand.Blue
  content={{typeface, size, leading, latinTypeface, tracking}}  // the user's reading-text choice
>
```

- `DesignSystemRoot` is the provider plus `GestureHandlerRootView` (which
  `Slider` needs) and `SafeAreaProvider`, so an app's root has no style
  literals of its own.

- `ThemeScope mode="dark"` forces a subtree (an always-dark hero) to a mode.
- `useResolvedColor(token)` / `useColorResolver()` give plain color strings for
  third-party APIs (status bar, navigation theme, calendar dots).
- **Fonts:** call expo-font's `useFonts(DesignFonts)` once at the root.
- **Bottom sheets:** provide `SheetHostContext` (`{dismissed, dismiss,
  onClosed}`) from your modal system. `BottomSheetModal` reads it.
- **Tab bar height:** provide `TabBarHeightContext` (a number, or `undefined`
  when not inside tabs) so `Screen` can reserve room for the bar.
- **Collapsible side rail:** if the app lets users collapse `SideNavRail` to
  icons, provide the state through `SideNavCollapsedContext` so `Screen`
  reserves the narrower width.

## Reading-text options

`Typeface` (Hebrew reading faces), `LatinTypeface` (for translations),
`ContentSize`, `Leading` (+ their values) are exported here; the string values
are persisted by apps, so **never rename them**. Display labels
(translations) belong to the app, as does which options it offers.

`size` and `leading` take a preset (stepped pickers) or a number (sliders):
a numeric size is px, a numeric leading a line-height multiplier. `tracking`
is letter spacing in em. `<Text content>` renders Hebrew reading text,
`<Text content="latin">` Latin; `secondary` sets it a step smaller
(commentary).

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

## Versioning

Releases are cut by semantic-release on every push to `main`, from
conventional commits (enforced by a commitlint hook): `fix:` → patch,
`feat:` → minor. While the version is `0.x`, a breaking change
(`feat!:` or a `BREAKING CHANGE:` footer) also bumps the minor; drop the
`releaseRules` override in `.releaserc.json` to go to 1.0.

Breaking means an app has to change code: renaming or removing a
`SemanticColor` token, a component, a prop or an exported value, or changing
what a persisted value (`Typeface`, `ContentSize`, `Leading`) means.

Apps pin the submodule to a release tag and bump it deliberately
(`git -C packages/design checkout vX.Y.Z`), reading `CHANGELOG.md` first.

## Peer dependencies

Declared in `package.json`. The barrel is `export *`, so an app must install
all of them (including the native ones: `expo-blur`, `expo-glass-effect`,
`react-native-pager-view`, `@react-native-community/datetimepicker`,
`expo-linear-gradient`, `react-native-gesture-handler`, …) even
if it never renders the components that use them.

## Known gaps

- `SiddurIcons` is registered in `FontFamily` but no component uses it.
- The Storybook does not load `DesignFonts`, so Hebrew typeface stories fall
  back to system fonts.
