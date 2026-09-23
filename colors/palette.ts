import {Platform} from 'react-native'
import {ThemeColors} from '@models'
import {withOpacity} from './withOpacity'

// The warm/editorial palette — ink on paper, one accent blue. This is the
// one static (non-hook) entry point into the color system — `useTheme`/
// `useColors` are how every component should actually read colors; this
// file exists so those hooks (and a couple of native-module config spots,
// e.g. splash/status-bar setup) have something non-circular to resolve
// against.
export const ColorInk = '#2A2521'
export const ColorInkDark = '#F0ECE4'

export const ColorAccent = '#3E7FD1'
export const ColorAccentDark = '#6FA3E8'

export const SurfaceBackground = '#FAF7F0'
export const SurfaceBackgroundDark = '#1C1A17'

export const SurfaceCard = '#FFFFFF'
export const SurfaceCardDark = '#262320'

export const BorderColor = 'rgba(30, 25, 20, 0.10)'
export const BorderColorDark = 'rgba(255, 255, 255, 0.12)'

export const TintColor = '#F2EDE2'
export const TintColorDark = '#34302A'

// Pre-redesign names, kept as aliases — a handful of call sites use these
// as fixed, theme-independent colors (accent-tinted buttons, the Luach
// home screen's always-dark kotel-photo chrome) rather than through the
// LightTheme/DarkTheme maps below, so aliasing keeps those sites correct
// without hunting down every literal.
export const ColorPrimary = ColorAccent
export const ColorPrimaryLight = '#6ec6ff'
export const ColorPrimaryDark = '#0069c0'

export const ColorSecondary = '#fdd835'
export const ColorSecondaryLight = '#ffff6b'
export const ColorSecondaryDark = '#c6a700'

export const WarningColor = '#f44336'

// Fixed (non-theme-adaptive) colors — literal white/black for chrome that
// sits on a photo, a colored fill, or a shadow, plus a few one-off
// component constants that used to be hex literals at the call site. Named
// here so no component spells a raw hex/rgba string.
export const White = '#FFFFFF'
export const Black = '#000000'
export const ToggleTrackOff = '#D8D2C4'
// Placeholder (no design value given yet) — swap once one is provided, same
// as `TintColorDark`.
export const ToggleTrackOffDark = '#4A443B'
export const ThemeSwatchSystem = '#C7C2B8'
// The Luach hero's round "next tefila" button — same in light and dark.
export const NextTefilaPill = '#3B7FB4'

export const BackgroundLight = SurfaceCard
export const BackgroundLightDirty = '#efefef'

// Fixed dark — NOT part of this palette. The Luach home screen's kotel-photo
// panels (Dashboard/Zmanim/Agenda/Calendar) are intentionally always dark
// regardless of the light/dark toggle; `DarkSurface`/`PanelGrid2x2` import
// these directly rather than through `LightTheme`/`DarkTheme`.
export const BackgroundDark = '#313131'
export const BackgroundDarkDirty = '#515151'

export const DarkTheme: ThemeColors = {
  primaryColor: ColorAccentDark,
  secondaryColor: ColorSecondary,
  headerTextColor:
    Platform.OS === 'android' ? SurfaceCardDark : ColorAccentDark,
  primaryTextColor: ColorInkDark,
  specialTextColor: ColorAccentDark,
  secondaryTextColor: withOpacity(ColorInkDark, 0.5),
  backgroundColor: SurfaceBackgroundDark,
  backgroundColorDirty: SurfaceCardDark,
  // Black, not ink — a warm-toned scrim barely darkens an already-warm
  // photo (the kotel hero) since there's no hue contrast to read against;
  // black reads as a clear dim regardless of what's underneath. Also used
  // as the generic modal/popover backdrop, where the same reasoning holds.
  scrimColor: 'rgba(0, 0, 0, 0.55)',
  // 0.4 was too faint for the tab bar's inactive icons/labels against the
  // glass pill — the original (pre-redesign) value was a solid, fully
  // opaque gray, not a translucent wash.
  tabOffColor: withOpacity(ColorInkDark, 0.6),
  warningColor: WarningColor,
  borderColor: BorderColorDark,
  tintColor: TintColorDark,
  tintAccent: withOpacity(ColorAccentDark, 0.6),
}

export const LightTheme: ThemeColors = {
  primaryColor: ColorAccent,
  secondaryColor: ColorSecondary,
  specialTextColor: ColorAccent,
  headerTextColor: Platform.OS === 'android' ? SurfaceCard : ColorAccent,
  primaryTextColor: ColorInk,
  secondaryTextColor: withOpacity(ColorInk, 0.5),
  backgroundColor: SurfaceBackground,
  backgroundColorDirty: SurfaceCard,
  scrimColor: 'rgba(0, 0, 0, 0.5)',
  tabOffColor: withOpacity(ColorInk, 0.6),
  warningColor: WarningColor,
  borderColor: BorderColor,
  tintColor: TintColor,
  tintAccent: withOpacity(ColorAccent, 0.08),
}
