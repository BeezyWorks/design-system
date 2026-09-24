import {NamedColor} from './named'
import {SemanticColor} from './semantic'
import type {BrandPalette, ResolvedBrand} from './brands'
import {resolveBrand} from './derive'

// Tier 3 — the theme definitions. Each maps every semantic token to a named
// color for one mode and one brand; `Record<SemanticColor, …>` makes a
// missing or extra token a compile error. A theme is the mode's shared
// neutrals (surfaces, text, borders, status — the same for every app) plus
// the brand's slots for the brand-derived tokens. Pure data — no React, no
// Platform.
export type ThemeMode = 'light' | 'sepia' | 'dark'

// Values are named colors, except a brand's washes, which are derived from
// the brand's named colors (see `withAlpha`).
export type ThemeDefinition = Record<SemanticColor, string>

const C = NamedColor
const S = SemanticColor

// The tokens a brand decides. Everything else is shared by the family.
type BrandToken =
  | typeof S.TextAccent
  | typeof S.SurfaceHighlight
  | typeof S.AccentPrimary
  | typeof S.AccentPrimaryDeep
  | typeof S.AccentPrimaryStrong
  | typeof S.AccentTabActive
  | typeof S.AccentTint
  | typeof S.AccentTintSelected

type NeutralDefinition = Omit<ThemeDefinition, BrandToken>
type BrandDefinition = Record<BrandToken, string>

const lightNeutrals: NeutralDefinition = {
  [S.TextPrimary]: C.Ink,
  [S.TextSecondary]: C.InkFaded,
  [S.TextTabInactive]: C.InkFaded60,
  [S.TextOnAccent]: C.White,
  [S.TextOnPhoto]: C.White,
  [S.TextInverse]: C.Cream,
  [S.TextDanger]: C.DangerRed,
  [S.TextSuccess]: C.SuccessGreenDeep,

  [S.SurfaceBackground]: C.Cream,
  [S.SurfaceCard]: C.White,
  [S.SurfaceSelected]: C.Linen,
  [S.SurfaceHover]: C.InkWash,
  [S.SurfacePanel]: C.PanelGray,
  [S.SurfaceTrackOff]: C.Sand,
  [S.SurfaceThumb]: C.White,
  [S.SurfaceSwatchLight]: C.White,
  [S.SurfaceSwatchDark]: C.PanelGray,
  [S.SurfaceSwatchSystem]: C.Stone,
  [S.SurfaceTransparent]: C.Transparent,
  [S.SurfaceDanger]: C.DangerRed,
  [S.SurfaceSuccess]: C.SuccessGreenDeepTint,
  [S.SurfaceOnAccent]: C.WhiteTint18,

  [S.BorderDefault]: C.InkHairline,
  [S.BorderStrong]: C.BlackScrim50,

  [S.OverlayScrim]: C.BlackScrim50,
  [S.OverlayScrimSoft]: C.BlackScrim15,
  [S.OverlayPhotoScrim]: C.BlackScrim50,
  [S.OverlayShadow]: C.Black,

  [S.AccentDanger]: C.DangerRedBright,
  [S.AccentAlert]: C.AlertOrange,
  [S.AccentAlertFaded]: C.AlertOrangeFaded,
  [S.AccentWarning]: C.WarningYellow,
  [S.AccentInfo]: C.InfoBlue,
  [S.AccentInfoFaded]: C.InfoBlueFaded,
  [S.AccentSuccess]: C.SuccessGreen,
}
// Warm paper for long reading sessions: the light theme's structure with
// brown ink on sepia paper. Status hues and overlays match light.
const sepiaNeutrals: NeutralDefinition = {
  ...lightNeutrals,
  [S.TextPrimary]: C.SepiaInk,
  [S.TextSecondary]: C.SepiaInkFaded,
  [S.TextTabInactive]: C.SepiaInkFaded60,
  [S.TextInverse]: C.SepiaCard,

  [S.SurfaceBackground]: C.SepiaPaper,
  [S.SurfaceCard]: C.SepiaCard,
  [S.SurfaceSelected]: C.SepiaLinen,
  [S.SurfaceHover]: C.SepiaInkWash,
  [S.SurfaceTrackOff]: C.SepiaSand,

  [S.BorderDefault]: C.SepiaInkHairline,
}

const darkNeutrals: NeutralDefinition = {
  [S.TextPrimary]: C.Parchment,
  [S.TextSecondary]: C.ParchmentFaded,
  [S.TextTabInactive]: C.ParchmentFaded60,
  [S.TextOnAccent]: C.White,
  [S.TextOnPhoto]: C.White,
  [S.TextInverse]: C.Coal,
  [S.TextDanger]: C.DangerRed,
  [S.TextSuccess]: C.SuccessGreenLight,

  [S.SurfaceBackground]: C.Coal,
  [S.SurfaceCard]: C.Graphite,
  [S.SurfaceSelected]: C.Smoke,
  [S.SurfaceHover]: C.ParchmentWash,
  [S.SurfacePanel]: C.PanelGray,
  [S.SurfaceTrackOff]: C.Taupe,
  [S.SurfaceThumb]: C.White,
  [S.SurfaceSwatchLight]: C.White,
  [S.SurfaceSwatchDark]: C.PanelGray,
  [S.SurfaceSwatchSystem]: C.Stone,
  [S.SurfaceTransparent]: C.Transparent,
  [S.SurfaceDanger]: C.DangerRed,
  [S.SurfaceSuccess]: C.SuccessGreenLightTint,
  [S.SurfaceOnAccent]: C.WhiteTint18,

  [S.BorderDefault]: C.WhiteHairline,
  [S.BorderStrong]: C.BlackScrim55,

  [S.OverlayScrim]: C.BlackScrim55,
  [S.OverlayScrimSoft]: C.BlackScrim15,
  [S.OverlayPhotoScrim]: C.BlackScrim50,
  [S.OverlayShadow]: C.Black,

  [S.AccentDanger]: C.DangerRedBright,
  [S.AccentAlert]: C.AlertOrange,
  [S.AccentAlertFaded]: C.AlertOrangeFaded,
  [S.AccentWarning]: C.WarningYellow,
  [S.AccentInfo]: C.InfoBlue,
  [S.AccentInfoFaded]: C.InfoBlueFaded,
  [S.AccentSuccess]: C.SuccessGreen,
}
/** A brand color at some opacity, as an `rgba()` string. */
const withAlpha = (color: string, alpha: number): string => {
  const [r, g, b] = [1, 3, 5].map((i) => parseInt(color.slice(i, i + 2), 16))
  return `rgba(${r}, ${g}, ${b}, ${alpha})`
}

const lightBrand = (brand: ResolvedBrand): BrandDefinition => ({
  [S.TextAccent]: brand.primary,
  [S.SurfaceHighlight]: withAlpha(brand.primary, 0.1),
  [S.AccentPrimary]: brand.primary,
  [S.AccentPrimaryDeep]: brand.deep,
  [S.AccentPrimaryStrong]: brand.primary,
  [S.AccentTabActive]: brand.primary,
  [S.AccentTint]: withAlpha(brand.primary, 0.08),
  [S.AccentTintSelected]: withAlpha(brand.primary, 0.1),
})

const darkBrand = (brand: ResolvedBrand): BrandDefinition => ({
  [S.TextAccent]: brand.primaryLight,
  [S.SurfaceHighlight]: C.WhiteWash,
  [S.AccentPrimary]: brand.primaryLight,
  [S.AccentPrimaryDeep]: brand.deep,
  [S.AccentPrimaryStrong]: brand.primary,
  [S.AccentTabActive]: brand.primary,
  [S.AccentTint]: withAlpha(brand.primaryLight, 0.6),
  [S.AccentTintSelected]: withAlpha(brand.primaryLight, 0.1),
})

const modes: Record<
  ThemeMode,
  {neutrals: NeutralDefinition; brand: (b: ResolvedBrand) => BrandDefinition}
> = {
  light: {neutrals: lightNeutrals, brand: lightBrand},
  sepia: {neutrals: sepiaNeutrals, brand: lightBrand},
  dark: {neutrals: darkNeutrals, brand: darkBrand},
}

const cache = new WeakMap<
  BrandPalette,
  Partial<Record<ThemeMode, ThemeDefinition>>
>()

/** The full theme for one mode and brand (memoized per brand object). */
export const buildTheme = (
  mode: ThemeMode,
  brand: BrandPalette,
): ThemeDefinition => {
  let byMode = cache.get(brand)
  if (!byMode) cache.set(brand, (byMode = {}))
  return (byMode[mode] ??= {
    ...modes[mode].neutrals,
    ...modes[mode].brand(resolveBrand(brand)),
  })
}

/** Resolves one semantic token to its concrete color for a mode and brand. */
export const resolveColor = (
  mode: ThemeMode,
  token: SemanticColor,
  brand: BrandPalette,
): string => buildTheme(mode, brand)[token]
