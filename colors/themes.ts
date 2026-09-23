import {NamedColor} from './named'
import {SemanticColor} from './semantic'

// Tier 3 — the theme definitions. Each maps every semantic token to a named
// color for one mode; `Record<SemanticColor, …>` makes a missing or extra
// token a compile error. Pure data — no React, no Platform.
export type ThemeMode = 'light' | 'dark'

type ThemeDefinition = Record<SemanticColor, NamedColor>

const C = NamedColor
const S = SemanticColor

export const lightTheme: ThemeDefinition = {
  [S.TextPrimary]: C.Ink,
  [S.TextSecondary]: C.InkFaded,
  [S.TextSecondaryMedium]: C.InkFaded55,
  [S.TextSecondaryStrong]: C.InkFaded65,
  [S.TextTabInactive]: C.InkFaded60,
  [S.TextAccent]: C.SiddurBlue,
  [S.TextOnAccent]: C.White,
  [S.TextOnPhoto]: C.White,
  [S.TextDanger]: C.DangerRed,

  [S.SurfaceBackground]: C.Cream,
  [S.SurfaceCard]: C.White,
  [S.SurfaceSelected]: C.Linen,
  [S.SurfaceHover]: C.InkWash,
  [S.SurfaceHighlight]: C.SiddurBlueTint10,
  [S.SurfacePanel]: C.PanelGray,
  [S.SurfaceTrackOff]: C.Sand,
  [S.SurfaceThumb]: C.White,
  [S.SurfaceSwatchLight]: C.White,
  [S.SurfaceSwatchDark]: C.PanelGray,
  [S.SurfaceSwatchSystem]: C.Stone,
  [S.SurfaceTransparent]: C.Transparent,

  [S.BorderDefault]: C.InkHairline,
  [S.BorderStrong]: C.BlackScrim50,

  [S.OverlayScrim]: C.BlackScrim50,
  [S.OverlayScrimSoft]: C.BlackScrim15,
  [S.OverlayShadow]: C.Black,

  [S.AccentPrimary]: C.SiddurBlue,
  [S.AccentPrimaryFixed]: C.SiddurBlue,
  [S.AccentPrimaryBright]: C.SkyBlue,
  [S.AccentPrimaryDeep]: C.PillBlue,
  [S.AccentTabActive]: C.SiddurBlue,
  [S.AccentTint]: C.SiddurBlueTint08,
  [S.AccentTintSelected]: C.SiddurBlueTint10,
  [S.AccentTintFixed]: C.SiddurBlueTint10,
  [S.AccentDanger]: C.DangerRedBright,
  [S.AccentAlert]: C.AlertOrange,
  [S.AccentAlertFaded]: C.AlertOrangeFaded,
  [S.AccentWarning]: C.WarningYellow,
  [S.AccentInfo]: C.InfoBlue,
  [S.AccentInfoFaded]: C.InfoBlueFaded,
  [S.AccentSuccess]: C.SuccessGreen,
}

export const darkTheme: ThemeDefinition = {
  [S.TextPrimary]: C.Parchment,
  [S.TextSecondary]: C.ParchmentFaded,
  [S.TextSecondaryMedium]: C.ParchmentFaded55,
  [S.TextSecondaryStrong]: C.ParchmentFaded65,
  [S.TextTabInactive]: C.ParchmentFaded60,
  [S.TextAccent]: C.SiddurBlueLight,
  [S.TextOnAccent]: C.White,
  [S.TextOnPhoto]: C.White,
  [S.TextDanger]: C.DangerRed,

  [S.SurfaceBackground]: C.Coal,
  [S.SurfaceCard]: C.Graphite,
  [S.SurfaceSelected]: C.Smoke,
  [S.SurfaceHover]: C.ParchmentWash,
  [S.SurfaceHighlight]: C.WhiteWash,
  [S.SurfacePanel]: C.PanelGray,
  [S.SurfaceTrackOff]: C.Taupe,
  [S.SurfaceThumb]: C.White,
  [S.SurfaceSwatchLight]: C.White,
  [S.SurfaceSwatchDark]: C.PanelGray,
  [S.SurfaceSwatchSystem]: C.Stone,
  [S.SurfaceTransparent]: C.Transparent,

  [S.BorderDefault]: C.WhiteHairline,
  [S.BorderStrong]: C.BlackScrim55,

  [S.OverlayScrim]: C.BlackScrim55,
  [S.OverlayScrimSoft]: C.BlackScrim15,
  [S.OverlayShadow]: C.Black,

  [S.AccentPrimary]: C.SiddurBlueLight,
  [S.AccentPrimaryFixed]: C.SiddurBlue,
  [S.AccentPrimaryBright]: C.SkyBlue,
  [S.AccentPrimaryDeep]: C.PillBlue,
  [S.AccentTabActive]: C.SiddurBlue,
  [S.AccentTint]: C.SiddurBlueLightTint60,
  [S.AccentTintSelected]: C.SiddurBlueLightTint10,
  [S.AccentTintFixed]: C.SiddurBlueTint10,
  [S.AccentDanger]: C.DangerRedBright,
  [S.AccentAlert]: C.AlertOrange,
  [S.AccentAlertFaded]: C.AlertOrangeFaded,
  [S.AccentWarning]: C.WarningYellow,
  [S.AccentInfo]: C.InfoBlue,
  [S.AccentInfoFaded]: C.InfoBlueFaded,
  [S.AccentSuccess]: C.SuccessGreen,
}

export const themes: Record<ThemeMode, ThemeDefinition> = {
  light: lightTheme,
  dark: darkTheme,
}

/** Resolves one semantic token to its concrete color for a mode. */
export const resolveColor = (mode: ThemeMode, token: SemanticColor): string =>
  themes[mode][token]
