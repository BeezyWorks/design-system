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
  /** Small marks set among body text (verse numbers): the brand hue at mid
   * lightness, so it separates from `TextPrimary` in every mode. */
  TextMarker: 'textMarker',
  TextOnAccent: 'textOnAccent',
  TextOnPhoto: 'textOnPhoto',
  TextInverse: 'textInverse',
  TextDanger: 'textDanger',
  TextSuccess: 'textSuccess',

  // Categorical: the text color of item N (see `categoryColor`), and a
  // quiet wash of it to lay behind that item's text.
  Category1: 'category1',
  Category2: 'category2',
  Category3: 'category3',
  Category4: 'category4',
  Category5: 'category5',
  Category6: 'category6',
  Category7: 'category7',
  Category8: 'category8',
  Category9: 'category9',
  Category10: 'category10',
  Category11: 'category11',
  Category12: 'category12',
  Category13: 'category13',
  Category14: 'category14',
  Category15: 'category15',
  Category16: 'category16',
  Category17: 'category17',
  Category18: 'category18',
  CategoryTint1: 'categoryTint1',
  CategoryTint2: 'categoryTint2',
  CategoryTint3: 'categoryTint3',
  CategoryTint4: 'categoryTint4',
  CategoryTint5: 'categoryTint5',
  CategoryTint6: 'categoryTint6',
  CategoryTint7: 'categoryTint7',
  CategoryTint8: 'categoryTint8',
  CategoryTint9: 'categoryTint9',
  CategoryTint10: 'categoryTint10',
  CategoryTint11: 'categoryTint11',
  CategoryTint12: 'categoryTint12',
  CategoryTint13: 'categoryTint13',
  CategoryTint14: 'categoryTint14',
  CategoryTint15: 'categoryTint15',
  CategoryTint16: 'categoryTint16',
  CategoryTint17: 'categoryTint17',
  CategoryTint18: 'categoryTint18',

  // Calendar events by kind (see `eventTones`): the marker and text color,
  // a wash to lay behind the event, and that wash's outline.
  EventHoliday: 'eventHoliday',
  EventHolidayTint: 'eventHolidayTint',
  EventHolidayBorder: 'eventHolidayBorder',
  EventMinor: 'eventMinor',
  EventMinorTint: 'eventMinorTint',
  EventMinorBorder: 'eventMinorBorder',
  EventFast: 'eventFast',
  EventFastTint: 'eventFastTint',
  EventFastBorder: 'eventFastBorder',
  EventPersonal: 'eventPersonal',
  EventPersonalTint: 'eventPersonalTint',
  EventPersonalBorder: 'eventPersonalBorder',

  // Surface
  SurfaceBackground: 'surfaceBackground',
  SurfaceCard: 'surfaceCard',
  SurfaceSelected: 'surfaceSelected',
  SurfaceHover: 'surfaceHover',
  SurfaceHighlight: 'surfaceHighlight',
  SurfacePanel: 'surfacePanel',
  /** The recessed well of a segmented control; the selected thumb is
   * `SurfaceCard`. */
  SurfaceTrack: 'surfaceTrack',
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
  /** The tint of a frosted-glass panel (laid over a backdrop blur). */
  SurfaceGlass: 'surfaceGlass',
  /** `SurfaceGlass` where the platform can't blur. */
  SurfaceGlassOpaque: 'surfaceGlassOpaque',
  /** The light catching the top of a glass panel (fades out downward). */
  SurfaceGlassSheen: 'surfaceGlassSheen',

  // Border
  BorderDefault: 'borderDefault',
  BorderStrong: 'borderStrong',
  /** A glass panel's bright edge. */
  BorderGlass: 'borderGlass',

  // Provider — sign-in buttons for third-party identity providers, whose
  // guidelines dictate their colors (see `ProviderButton`).
  SurfaceProviderGoogle: 'surfaceProviderGoogle',
  BorderProviderGoogle: 'borderProviderGoogle',
  TextProviderGoogle: 'textProviderGoogle',
  SurfaceProviderApple: 'surfaceProviderApple',
  TextProviderApple: 'textProviderApple',
  /** The four colors of Google's "G" — the same in every mode. */
  MarkGoogleBlue: 'markGoogleBlue',
  MarkGoogleGreen: 'markGoogleGreen',
  MarkGoogleYellow: 'markGoogleYellow',
  MarkGoogleRed: 'markGoogleRed',

  // Overlay
  OverlayScrim: 'overlayScrim',
  OverlayScrimSoft: 'overlayScrimSoft',
  OverlayPhotoScrim: 'overlayPhotoScrim',
  OverlayShadow: 'overlayShadow',

  // Accent
  AccentPrimary: 'accentPrimary',
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

/** A categorical color: the text color of one item and a wash to lay behind it. */
export interface CategoryColor {
  text: SemanticColor
  tint: SemanticColor
}

/** Every categorical color, in the order they should be assigned. */
export const categoryColors: readonly CategoryColor[] = [
  {text: SemanticColor.Category1, tint: SemanticColor.CategoryTint1},
  {text: SemanticColor.Category2, tint: SemanticColor.CategoryTint2},
  {text: SemanticColor.Category3, tint: SemanticColor.CategoryTint3},
  {text: SemanticColor.Category4, tint: SemanticColor.CategoryTint4},
  {text: SemanticColor.Category5, tint: SemanticColor.CategoryTint5},
  {text: SemanticColor.Category6, tint: SemanticColor.CategoryTint6},
  {text: SemanticColor.Category7, tint: SemanticColor.CategoryTint7},
  {text: SemanticColor.Category8, tint: SemanticColor.CategoryTint8},
  {text: SemanticColor.Category9, tint: SemanticColor.CategoryTint9},
  {text: SemanticColor.Category10, tint: SemanticColor.CategoryTint10},
  {text: SemanticColor.Category11, tint: SemanticColor.CategoryTint11},
  {text: SemanticColor.Category12, tint: SemanticColor.CategoryTint12},
  {text: SemanticColor.Category13, tint: SemanticColor.CategoryTint13},
  {text: SemanticColor.Category14, tint: SemanticColor.CategoryTint14},
  {text: SemanticColor.Category15, tint: SemanticColor.CategoryTint15},
  {text: SemanticColor.Category16, tint: SemanticColor.CategoryTint16},
  {text: SemanticColor.Category17, tint: SemanticColor.CategoryTint17},
  {text: SemanticColor.Category18, tint: SemanticColor.CategoryTint18},
]

/** A kind of calendar day: a festival, a lesser day (a new month, a minor
 * holiday), a fast, or one of the user's own events. */
export type EventKind = 'holiday' | 'minor' | 'fast' | 'personal'

/** One kind of event's colors: its marker/text color, a wash to lay behind
 * it, and the wash's outline. */
export interface EventTone {
  text: SemanticColor
  tint: SemanticColor
  border: SemanticColor
}

export const eventTones: Record<EventKind, EventTone> = {
  holiday: {
    text: SemanticColor.EventHoliday,
    tint: SemanticColor.EventHolidayTint,
    border: SemanticColor.EventHolidayBorder,
  },
  minor: {
    text: SemanticColor.EventMinor,
    tint: SemanticColor.EventMinorTint,
    border: SemanticColor.EventMinorBorder,
  },
  fast: {
    text: SemanticColor.EventFast,
    tint: SemanticColor.EventFastTint,
    border: SemanticColor.EventFastBorder,
  },
  personal: {
    text: SemanticColor.EventPersonal,
    tint: SemanticColor.EventPersonalTint,
    border: SemanticColor.EventPersonalBorder,
  },
}

/** The categorical color for the item at `index` (wraps past the last one). */
export const categoryColor = (index: number): CategoryColor =>
  categoryColors[
    ((index % categoryColors.length) + categoryColors.length) %
      categoryColors.length
  ]
