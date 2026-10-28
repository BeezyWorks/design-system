import {NamedColor} from './named'
import {SemanticColor, categoryColors, eventTones} from './semantic'
import type {EventKind} from './semantic'
import type {BrandPalette, ResolvedBrand} from './brands'
import {resolveBrand} from './derive'

// Tier 3 — the theme definitions. Each maps every semantic token to a named
// color for one mode and one brand; `Record<SemanticColor, …>` makes a
// missing or extra token a compile error. A theme is the mode's shared
// neutrals (surfaces, text, borders, status — the same for every app) plus
// the brand's slots for the brand-derived tokens. Pure data — no React, no
// Platform.
export type ThemeMode = 'light' | 'sepia' | 'dark' | 'black'

/** Light or dark — a mode collapsed to what native APIs understand
 * (pickers, glass, blur, the status bar). Sepia is a light appearance,
 * black a dark one. */
export type Appearance = 'light' | 'dark'

export const appearanceOf = (mode: ThemeMode): Appearance =>
  mode === 'dark' || mode === 'black' ? 'dark' : 'light'

// Values are named colors, except a brand's washes, which are derived from
// the brand's named colors (see `withAlpha`).
export type ThemeDefinition = Record<SemanticColor, string>

const C = NamedColor
const S = SemanticColor

// The tokens a brand decides. Everything else is shared by the family.
type BrandToken =
  | typeof S.TextAccent
  | typeof S.TextMarker
  | typeof S.SurfaceHighlight
  | typeof S.AccentPrimary
  | typeof S.AccentPrimaryDeep
  | typeof S.AccentPrimaryStrong
  | typeof S.AccentTabActive
  | typeof S.AccentTint
  | typeof S.AccentTintSelected

// The categorical tokens: per-mode, but not per-brand.
type CategoryToken = Extract<
  SemanticColor,
  `category${number}` | `categoryTint${number}`
>

// The calendar event tokens: per-mode, like the categories.
type EventToken = Extract<SemanticColor, `event${string}`>

type NeutralDefinition = Omit<
  ThemeDefinition,
  BrandToken | CategoryToken | EventToken
>
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
  [S.SurfaceTrack]: C.InkTrack,
  [S.SurfaceTrackOff]: C.Sand,
  [S.SurfaceThumb]: C.White,
  [S.SurfaceSwatchLight]: C.White,
  [S.SurfaceSwatchDark]: C.PanelGray,
  [S.SurfaceSwatchSystem]: C.Stone,
  [S.SurfaceTransparent]: C.Transparent,
  [S.SurfaceDanger]: C.DangerRed,
  [S.SurfaceSuccess]: C.SuccessGreenDeepTint,
  [S.SurfaceOnAccent]: C.WhiteTint18,
  [S.SurfaceGlass]: C.GlassFrost,
  [S.SurfaceGlassOpaque]: C.GlassFrostOpaque,
  [S.SurfaceGlassSheen]: C.GlassSheenLight,

  [S.BorderDefault]: C.InkHairline,
  [S.BorderStrong]: C.BlackScrim50,
  [S.BorderGlass]: C.GlassEdgeLight,

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

  [S.SurfaceProviderGoogle]: C.White,
  [S.BorderProviderGoogle]: C.GoogleButtonStroke,
  [S.TextProviderGoogle]: C.GoogleButtonInk,
  [S.SurfaceProviderApple]: C.Black,
  [S.TextProviderApple]: C.White,
  [S.MarkGoogleBlue]: C.GoogleBlue,
  [S.MarkGoogleGreen]: C.GoogleGreen,
  [S.MarkGoogleYellow]: C.GoogleYellow,
  [S.MarkGoogleRed]: C.GoogleRed,
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
  [S.SurfaceTrack]: C.SepiaInkTrack,
  [S.SurfaceTrackOff]: C.SepiaSand,
  [S.SurfaceGlass]: C.GlassSepia,
  [S.SurfaceGlassOpaque]: C.GlassSepiaOpaque,

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
  [S.SurfaceTrack]: C.WhiteWash,
  [S.SurfaceTrackOff]: C.Taupe,
  [S.SurfaceThumb]: C.White,
  [S.SurfaceSwatchLight]: C.White,
  [S.SurfaceSwatchDark]: C.PanelGray,
  [S.SurfaceSwatchSystem]: C.Stone,
  [S.SurfaceTransparent]: C.Transparent,
  [S.SurfaceDanger]: C.DangerRed,
  [S.SurfaceSuccess]: C.SuccessGreenLightTint,
  [S.SurfaceOnAccent]: C.WhiteTint18,
  [S.SurfaceGlass]: C.GlassSmoke,
  [S.SurfaceGlassOpaque]: C.GlassSmokeOpaque,
  [S.SurfaceGlassSheen]: C.GlassSheenDark,

  [S.BorderDefault]: C.WhiteHairline,
  [S.BorderStrong]: C.BlackScrim55,
  [S.BorderGlass]: C.GlassEdgeDark,

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

  [S.SurfaceProviderGoogle]: C.GoogleButtonDark,
  [S.BorderProviderGoogle]: C.GoogleButtonStrokeDark,
  [S.TextProviderGoogle]: C.GoogleButtonInkDark,
  [S.SurfaceProviderApple]: C.White,
  [S.TextProviderApple]: C.Black,
  [S.MarkGoogleBlue]: C.GoogleBlue,
  [S.MarkGoogleGreen]: C.GoogleGreen,
  [S.MarkGoogleYellow]: C.GoogleYellow,
  [S.MarkGoogleRed]: C.GoogleRed,
}
// Lights out for OLED screens: the dark theme with every surface black, so
// only the text (and the hairlines that outline cards) light pixels.
const blackNeutrals: NeutralDefinition = {
  ...darkNeutrals,
  [S.TextInverse]: C.Black,

  [S.SurfaceBackground]: C.Black,
  [S.SurfaceCard]: C.Black,
  [S.SurfaceSelected]: C.Onyx,
  [S.SurfaceGlass]: C.GlassBlack,
  [S.SurfaceGlassOpaque]: C.GlassBlackOpaque,
}

/** A brand color at some opacity, as an `rgba()` string. */
const withAlpha = (color: string, alpha: number): string => {
  const [r, g, b] = [1, 3, 5].map((i) => parseInt(color.slice(i, i + 2), 16))
  return `rgba(${r}, ${g}, ${b}, ${alpha})`
}

const lightBrand = (brand: ResolvedBrand): BrandDefinition => ({
  [S.TextAccent]: brand.primary,
  [S.TextMarker]: brand.marker,
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
  [S.TextMarker]: brand.markerLight,
  [S.SurfaceHighlight]: C.WhiteWash,
  [S.AccentPrimary]: brand.primaryLight,
  [S.AccentPrimaryDeep]: brand.deep,
  [S.AccentPrimaryStrong]: brand.primary,
  // Lifted like the active label (`TextAccent`): the base brand hue sinks
  // into a dark bar or a photo behind the glass.
  [S.AccentTabActive]: brand.primaryLight,
  [S.AccentTint]: withAlpha(brand.primaryLight, 0.16),
  [S.AccentTintSelected]: withAlpha(brand.primaryLight, 0.1),
})

/** The categorical hues for one mode: text colors, and washes derived from them. */
const categories = (light: boolean): Record<CategoryToken, string> => {
  const theme: Partial<Record<CategoryToken, string>> = {}
  categoryColors.forEach(({text, tint}, i) => {
    const color = C[`Category${i + 1}${light ? '' : 'Light'}` as keyof typeof C]
    theme[text as CategoryToken] = color
    theme[tint as CategoryToken] = withAlpha(color, light ? 0.14 : 0.2)
  })
  return theme as Record<CategoryToken, string>
}
const lightCategories = categories(true)
const darkCategories = categories(false)

const eventHues: Record<EventKind, string> = {
  holiday: 'EventSlate',
  minor: 'EventOchre',
  fast: 'EventOxblood',
  personal: 'EventSage',
}

/** The event hues for one mode: text colors, washes and their outlines. */
const events = (light: boolean): Record<EventToken, string> => {
  const theme: Partial<Record<EventToken, string>> = {}
  ;(Object.keys(eventTones) as EventKind[]).forEach((kind) => {
    const {text, tint, border} = eventTones[kind]
    const color =
      C[`${eventHues[kind]}${light ? '' : 'Light'}` as keyof typeof C]
    theme[text as EventToken] = color
    theme[tint as EventToken] = withAlpha(color, light ? 0.12 : 0.16)
    theme[border as EventToken] = withAlpha(color, light ? 0.35 : 0.4)
  })
  return theme as Record<EventToken, string>
}
const lightEvents = events(true)
const darkEvents = events(false)

const modes: Record<
  ThemeMode,
  {
    neutrals: NeutralDefinition
    categories: Record<CategoryToken, string>
    events: Record<EventToken, string>
    brand: (b: ResolvedBrand) => BrandDefinition
  }
> = {
  light: {
    neutrals: lightNeutrals,
    categories: lightCategories,
    events: lightEvents,
    brand: lightBrand,
  },
  sepia: {
    neutrals: sepiaNeutrals,
    categories: lightCategories,
    events: lightEvents,
    brand: lightBrand,
  },
  dark: {
    neutrals: darkNeutrals,
    categories: darkCategories,
    events: darkEvents,
    brand: darkBrand,
  },
  black: {
    neutrals: blackNeutrals,
    categories: darkCategories,
    events: darkEvents,
    brand: darkBrand,
  },
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
    ...modes[mode].categories,
    ...modes[mode].events,
    ...modes[mode].brand(resolveBrand(brand)),
  })
}

/** Resolves one semantic token to its concrete color for a mode and brand. */
export const resolveColor = (
  mode: ThemeMode,
  token: SemanticColor,
  brand: BrandPalette,
): string => buildTheme(mode, brand)[token]
