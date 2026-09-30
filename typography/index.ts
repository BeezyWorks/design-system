import {Platform, TextStyle} from 'react-native'
import {SemanticColor} from '../colors/semantic'
import {useContentText, useHeaderTypeface, useResolvedColor} from '../theme'
import {FontFamily} from './fontFamily'
import {
  HeaderTypeface,
  Typeface,
  headerTypefaceFontFamily,
  latinTypefaceFontFamily,
  typefaceFontFamily,
} from './content'

// Chrome (UI-label) type ramp — every raw `fontSize`/`fontWeight` the app
// used to spell out ad hoc, named by role and snapped to the sizes already
// in use across the app (12–22).
export const type = {
  caption: {fontSize: 12, fontWeight: '400'},
  label: {fontSize: 13, fontWeight: '500'},
  body: {fontSize: 14, fontWeight: '400'},
  bodyStrong: {fontSize: 14, fontWeight: '600'},
  headline: {fontSize: 16, fontWeight: '600'},
  title: {fontSize: 18, fontWeight: '700'},
  titleLarge: {fontSize: 20, fontWeight: '700'},
  largeTitle: {fontSize: 22, fontWeight: '700'},
  // Editorial (Frank Ruhl Libre) ramp — the ink/accent palette's own type
  // spec, distinct from the sans-serif chrome ramp above. Each has a
  // dedicated default color in `variantTone` below rather than the usual
  // uniform `primaryTextColor`.
  pageHeader: {
    fontFamily: FontFamily.FrankRuhlLibreBold,
    fontSize: 30,
    fontWeight: '700',
  },
  // A card/section title: the top of the card type scale (title FRL Bold 16
  // ink > label FRL Regular 16 ink > value/detail sans 13 secondary).
  // Frank Ruhl Libre draws its Latin and Hebrew as a pair, so an English and
  // a Hebrew title carry the same weight and size. Bold face stands in for
  // "600", as in `itemHeader`.
  sectionHeader: {
    fontFamily: FontFamily.FrankRuhlLibreBold,
    fontSize: 16,
    fontWeight: '600',
  },
  // A settings/menu row label. Frank Ruhl Libre draws Hebrew and Latin at
  // matched weight, so mixed-script labels ('Names of חולים') read evenly.
  rowLabel: {
    fontFamily: FontFamily.FrankRuhlLibre,
    fontSize: 16,
    fontWeight: '400',
  },
  item: {
    fontFamily: FontFamily.FrankRuhlLibre,
    fontSize: 16,
    fontWeight: '400',
  },
  // A list row's title — same family as `item`, but the
  // spec calls for a 600 weight; the font only ships Regular/Bold faces,
  // so the Bold face stands in for "600" here (same trick `pageHeader`
  // already uses for its own 700).
  itemHeader: {
    fontFamily: FontFamily.FrankRuhlLibreBold,
    fontSize: 17,
    fontWeight: '600',
  },
  // Chrome "Detail"/"Description" role — secondary text under a row title, a
  // short blurb, etc. The 1.4 line-height only matters once text wraps to
  // 2+ lines.
  detail: {fontSize: 13, fontWeight: '400', lineHeight: 18},
  // Chrome "Supplemental" role — a value trailing a list row (a time, a
  // date).
  supplemental: {fontSize: 15, fontWeight: '600'},
  // The screen header's centered title and the section subtitle under it;
  // the wide (iPad/desktop) header sets a larger title.
  headerTitle: {fontSize: 22, fontWeight: '700'},
  headerTitleWide: {fontSize: 26, fontWeight: '700'},
  headerSubtitle: {fontSize: 16, fontWeight: '400'},
  // Display ramp (Frank Ruhl Libre): a one- or two-word headline and the
  // serif lines around it, for hero areas — usually over a photo, with
  // `Text`'s `onPhoto`.
  displayLarge: {
    fontFamily: FontFamily.FrankRuhlLibreBlack,
    fontSize: 64,
    lineHeight: 72,
    fontWeight: '900',
  },
  displayMedium: {
    fontFamily: FontFamily.FrankRuhlLibreBold,
    fontSize: 40,
    lineHeight: 46,
    fontWeight: '700',
  },
  bodySerifLarge: {
    fontFamily: FontFamily.FrankRuhlLibre,
    fontSize: 18,
    lineHeight: 26,
    fontWeight: '400',
  },
  bodySerif: {
    fontFamily: FontFamily.FrankRuhlLibre,
    fontSize: 16,
    lineHeight: 23,
    fontWeight: '400',
  },
  // Sheet title (Cancel/title/Save header row) — distinct from the plain
  // `BottomSheetHeader` title style.
  sheetTitle: {fontSize: 17, fontWeight: '600'},
  // A picker row, unselected/selected — mirrors the settings nav-row
  // (`item`) and chip selection convention (weight + tone flip, not a whole
  // different visual language).
  menuOption: {
    fontFamily: FontFamily.FrankRuhlLibre,
    fontSize: 16,
    fontWeight: '400',
  },
  menuOptionSelected: {
    fontFamily: FontFamily.FrankRuhlLibreBold,
    fontSize: 16,
    fontWeight: '600',
  },
} as const satisfies Record<string, TextStyle>

export type TypeVariant = keyof typeof type

// Variants whose default color isn't the usual `TextPrimary` — unlisted
// variants fall back to that.
const variantColor: Partial<Record<TypeVariant, SemanticColor>> = {
  pageHeader: SemanticColor.TextAccent,
  sectionHeader: SemanticColor.TextPrimary,
  rowLabel: SemanticColor.TextPrimary,
  item: SemanticColor.TextPrimary,
  itemHeader: SemanticColor.TextPrimary,
  detail: SemanticColor.TextSecondary,
  supplemental: SemanticColor.TextAccent,
  headerTitle: SemanticColor.TextAccent,
  headerTitleWide: SemanticColor.AccentPrimary,
  headerSubtitle: SemanticColor.TextAccent,
  menuOption: SemanticColor.TextPrimary,
  menuOptionSelected: SemanticColor.TextAccent,
}

// The header roles, set in the app's `headerTypeface` (bold cut).
const headerVariants: ReadonlySet<TypeVariant> = new Set<TypeVariant>([
  'pageHeader',
  'sectionHeader',
  'itemHeader',
])

// The screen header's title, set in the header face only when the app opted
// in to one (otherwise it keeps the system font).
const optInHeaderVariants: ReadonlySet<TypeVariant> = new Set<TypeVariant>([
  'headerTitle',
  'headerTitleWide',
])

// Resolves a chrome type-ramp step to a concrete style, with its default
// semantic text color mixed in (callers may still override color via the
// `color` prop on `Text`, never via a raw style object).
export const useTypeStyle = (variant: TypeVariant): TextStyle => {
  const color = useResolvedColor(
    variantColor[variant] ?? SemanticColor.TextPrimary,
  )
  const appTypeface = useHeaderTypeface()
  const headerTypeface = headerVariants.has(variant)
    ? (appTypeface ?? HeaderTypeface.FrankRuhlLibre)
    : optInHeaderVariants.has(variant)
      ? appTypeface
      : undefined
  return headerTypeface
    ? {
        ...type[variant],
        fontFamily: headerTypefaceFontFamily[headerTypeface].bold,
        color,
      }
    : {...type[variant], color}
}

/** The bold family of the app's header face, or `undefined` when it set
 * none — for titles drawn with raw RN `Text` (`Header`, the full-screen
 * sheet), which keep the system font by default. */
export const useHeaderFontFamily = (): FontFamily | undefined => {
  const headerTypeface = useHeaderTypeface()
  return headerTypeface && headerTypefaceFontFamily[headerTypeface].bold
}

/** Which reading ramp a `content` text uses: the Hebrew reading typeface
 * (right-aligned) or the Latin one (for translations). */
export type ContentScript = 'hebrew' | 'latin'

// Secondary reading text (commentary, glosses) sits a step below the main
// text at the same typeface, so it tracks the user's size setting.
const SECONDARY_CONTENT_SCALE = 0.8

// Reading content (long-form text) uses a *different*, user-configurable
// ramp (typeface, font size, line height, tracking all come from the user's
// selection passed to `DesignSystemProvider`).
export const useContentTypeStyle = (
  script: ContentScript = 'hebrew',
  secondary = false,
): TextStyle => {
  const {fontFamily, fontSize, lineHeight, letterSpacing, latinTypeface} =
    useContentText()
  const color = useResolvedColor(SemanticColor.TextPrimary)
  const scale = secondary ? SECONDARY_CONTENT_SCALE : 1
  return {
    color,
    fontSize: Math.round(fontSize * scale),
    lineHeight: Math.round(lineHeight * scale),
    // iOS's CoreText mis-lays-out kerned (NSKern) right-to-left Hebrew with
    // niqqud: past a few lines, rows overlap and later rows render mirrored.
    // Hebrew on iOS keeps the face's own spacing; Latin and other platforms
    // honor the setting.
    ...(letterSpacing !== 0 &&
      !(script === 'hebrew' && Platform.OS === 'ios') && {
        letterSpacing: letterSpacing * scale,
      }),
    fontFamily:
      script === 'latin'
        ? latinTypefaceFontFamily[latinTypeface].regular
        : fontFamily,
    textAlign: script === 'latin' ? 'left' : 'right',
  }
}

export const useTypefaceFontFamily = (typeface: Typeface) =>
  typefaceFontFamily[typeface]

export {DesignFonts} from './fonts'
export * from './fontFamily'
export * from './content'
