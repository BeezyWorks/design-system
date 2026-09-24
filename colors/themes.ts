import {NamedColor} from './named'
import {SemanticColor} from './semantic'
import {Brand, BrandPalette} from './brands'

// Tier 3 — the theme definitions. Each maps every semantic token to a named
// color for one mode and one brand; `Record<SemanticColor, …>` makes a
// missing or extra token a compile error. A theme is the mode's shared
// neutrals (surfaces, text, borders, status — the same for every app) plus
// the brand's slots for the brand-derived tokens. Pure data — no React, no
// Platform.
export type ThemeMode = 'light' | 'sepia' | 'dark'

export type ThemeDefinition = Record<SemanticColor, NamedColor>

const C = NamedColor
const S = SemanticColor

// The tokens a brand decides. Everything else is shared by the family.
type BrandToken =
  | typeof S.TextAccent
  | typeof S.SurfaceHighlight
  | typeof S.AccentPrimary
  | typeof S.AccentPrimaryBright
  | typeof S.AccentPrimaryDeep
  | typeof S.AccentPrimaryStrong
  | typeof S.AccentTabActive
  | typeof S.AccentTint
  | typeof S.AccentTintSelected

type NeutralDefinition = Omit<ThemeDefinition, BrandToken>
type BrandDefinition = Record<BrandToken, NamedColor>

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
const lightBrand = (brand: BrandPalette): BrandDefinition => ({
  [S.TextAccent]: brand.primary,
  [S.SurfaceHighlight]: brand.tintSelected,
  [S.AccentPrimary]: brand.primary,
  [S.AccentPrimaryBright]: brand.bright,
  [S.AccentPrimaryDeep]: brand.deep,
  [S.AccentPrimaryStrong]: brand.primary,
  [S.AccentTabActive]: brand.primary,
  [S.AccentTint]: brand.tint,
  [S.AccentTintSelected]: brand.tintSelected,
})

const darkBrand = (brand: BrandPalette): BrandDefinition => ({
  [S.TextAccent]: brand.primaryLight,
  [S.SurfaceHighlight]: C.WhiteWash,
  [S.AccentPrimary]: brand.primaryLight,
  [S.AccentPrimaryBright]: brand.bright,
  [S.AccentPrimaryDeep]: brand.deep,
  [S.AccentPrimaryStrong]: brand.primary,
  [S.AccentTabActive]: brand.primary,
  [S.AccentTint]: brand.lightTintStrong,
  [S.AccentTintSelected]: brand.lightTint,
})

const modes: Record<
  ThemeMode,
  {neutrals: NeutralDefinition; brand: (b: BrandPalette) => BrandDefinition}
> = {
  light: {neutrals: lightNeutrals, brand: lightBrand},
  sepia: {neutrals: sepiaNeutrals, brand: lightBrand},
  dark: {neutrals: darkNeutrals, brand: darkBrand},
}

const cache = new Map<
  BrandPalette,
  Partial<Record<ThemeMode, ThemeDefinition>>
>()

/** The full theme for one mode and brand (memoized per brand object). */
export const buildTheme = (
  mode: ThemeMode,
  brand: BrandPalette = Brand.Blue,
): ThemeDefinition => {
  const byMode = cache.get(brand) ?? {}
  cache.set(brand, byMode)
  return (byMode[mode] ??= {
    ...modes[mode].neutrals,
    ...modes[mode].brand(brand),
  })
}

export const lightTheme = buildTheme('light')
export const sepiaTheme = buildTheme('sepia')
export const darkTheme = buildTheme('dark')

/** The default (`Brand.Blue`) themes by mode. */
export const themes: Record<ThemeMode, ThemeDefinition> = {
  light: lightTheme,
  sepia: sepiaTheme,
  dark: darkTheme,
}

/** Resolves one semantic token to its concrete color for a mode and brand. */
export const resolveColor = (
  mode: ThemeMode,
  token: SemanticColor,
  brand: BrandPalette = Brand.Blue,
): string => buildTheme(mode, brand)[token]
