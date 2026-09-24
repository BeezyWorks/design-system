// Tier 2 — semantic colors: the only color vocabulary components and apps
// use. Names follow Role then Qualifier:
//   Surface — backgrounds and fills      Text   — text and icon glyphs
//   Border  — hairlines and outlines     Overlay — scrims and shadows
//   Accent  — dots and bright colors, here or there
// Pass them by object accessor, never as string literals:
//   <Text color={SemanticColor.TextDanger} />
export const SemanticColor = {
  // Text
  TextPrimary: 'textPrimary',
  TextSecondary: 'textSecondary',
  TextTabInactive: 'textTabInactive',
  TextAccent: 'textAccent',
  TextOnAccent: 'textOnAccent',
  TextOnPhoto: 'textOnPhoto',
  TextInverse: 'textInverse',
  TextDanger: 'textDanger',
  TextSuccess: 'textSuccess',

  // Surface
  SurfaceBackground: 'surfaceBackground',
  SurfaceCard: 'surfaceCard',
  SurfaceSelected: 'surfaceSelected',
  SurfaceHover: 'surfaceHover',
  SurfaceHighlight: 'surfaceHighlight',
  SurfacePanel: 'surfacePanel',
  SurfaceTrackOff: 'surfaceTrackOff',
  SurfaceThumb: 'surfaceThumb',
  SurfaceSwatchLight: 'surfaceSwatchLight',
  SurfaceSwatchDark: 'surfaceSwatchDark',
  SurfaceSwatchSystem: 'surfaceSwatchSystem',
  SurfaceTransparent: 'surfaceTransparent',
  SurfaceDanger: 'surfaceDanger',
  SurfaceSuccess: 'surfaceSuccess',
  /** A translucent chip laid over a brand fill (`AccentPrimaryStrong`). */
  SurfaceOnAccent: 'surfaceOnAccent',

  // Border
  BorderDefault: 'borderDefault',
  BorderStrong: 'borderStrong',

  // Overlay
  OverlayScrim: 'overlayScrim',
  OverlayScrimSoft: 'overlayScrimSoft',
  OverlayPhotoScrim: 'overlayPhotoScrim',
  OverlayShadow: 'overlayShadow',

  // Accent
  AccentPrimary: 'accentPrimary',
  AccentPrimaryBright: 'accentPrimaryBright',
  AccentPrimaryDeep: 'accentPrimaryDeep',
  /** The brand fill that carries `TextOnAccent` in every mode (unlike
   * `AccentPrimary`, which lightens in dark mode). */
  AccentPrimaryStrong: 'accentPrimaryStrong',
  AccentTabActive: 'accentTabActive',
  AccentTint: 'accentTint',
  AccentTintSelected: 'accentTintSelected',
  AccentDanger: 'accentDanger',
  AccentAlert: 'accentAlert',
  AccentAlertFaded: 'accentAlertFaded',
  AccentWarning: 'accentWarning',
  AccentInfo: 'accentInfo',
  AccentInfoFaded: 'accentInfoFaded',
  AccentSuccess: 'accentSuccess',
} as const

export type SemanticColor = (typeof SemanticColor)[keyof typeof SemanticColor]
