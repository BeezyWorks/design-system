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

// Fixed (non-theme-adaptive) palette for tagging calendar/event categories —
// these are deliberately the same in light and dark mode, per the original
// `yearHolidays.model.ts` tailwind-500 palette.
export const eventCategoryColors = {
  fastDay: '#EF4444',
  erevMinorHoliday: '#FDBA74',
  minorHoliday: '#F97316',
  roshChodesh: '#F97316',
  unspecified: '#FCD34D',
  yomTov: '#3B82F6',
  erevYomTov: '#93C5FD',
  userEvent: '#22C55E',
} as const

export type EventCategory = keyof typeof eventCategoryColors

export {SemanticColor} from './semantic'
export type {ThemeMode} from './themes'
export {withOpacity} from './withOpacity'
export * from './palette'
