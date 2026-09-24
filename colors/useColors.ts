import {useTheme} from '@hooks'
import type {ThemeColors, ThemeStyle} from '@models'
import {ColorPrimary} from './palette'
import {withOpacity} from './withOpacity'

// Semantic color roles for the app chrome. Values come from the existing
// light/dark ThemeColors (user-selectable via ThemeStyle) — this hook is the
// one place that resolves "what does 'danger' mean right now" so components
// never touch the raw theme or a hex literal.
export interface Colors extends ThemeColors {
  border: string
  surface: string
  surfaceRaised: string
  overlay: string
  danger: string
  /** The active/selected tint for navigation chrome (tab bar icons/labels,
   * side-rail highlight). Deliberately fixed — the same brand blue in both
   * light and dark mode — unlike `primaryColor`, which does vary by theme. */
  tabActive: string
  // Named aliases for the ink/accent/surface palette — same underlying
  // values as the fields above (`primaryTextColor`/`primaryColor`/
  // `backgroundColor`/`backgroundColorDirty`), just spelled the way the
  // design spec names them so new code can use either without a lookup.
  ink: string
  accent: string
  surfaceBackground: string
  surfaceCard: string
  transparent: string
  /** A light tint over `surfaceCard` for hover/press states — not a theme
   * field of its own since it's always just a small ink wash, not a color
   * that itself varies independently by theme. */
  surfaceHover: string
  /** Flat fill for a selected/pressed row (e.g. a picked zman in a list) —
   * distinct from `surfaceHover`'s opacity wash. */
  tint: string
}

export const useColors = (override?: ThemeStyle): Colors => {
  const theme = useTheme(override)
  return {
    ...theme,
    border: theme.borderColor,
    surface: theme.backgroundColor,
    surfaceRaised: theme.backgroundColorDirty,
    overlay: theme.scrimColor,
    danger: theme.warningColor,
    tabActive: ColorPrimary,
    ink: theme.primaryTextColor,
    accent: theme.primaryColor,
    surfaceBackground: theme.backgroundColor,
    surfaceCard: theme.backgroundColorDirty,
    surfaceHover: withOpacity(theme.primaryTextColor, 0.04),
    tint: theme.tintColor,
    transparent: withOpacity('#fff', 0),
  }
}
