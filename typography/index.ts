import {TextStyle} from 'react-native'
import {SemanticColor} from '../colors/semantic'
import {useContentText, useResolvedColor} from '../theme'
import {FontFamily} from './fontFamily'
import {Typeface, latinTypefaceFontFamily, typefaceFontFamily} from './content'

// Chrome (UI-label) type ramp — every raw `fontSize`/`fontWeight` the app
// used to spell out ad hoc, named by role and snapped to the sizes already
// in use across the app (12–22).
export const type = {
  caption: {fontSize: 12, fontWeight: '400'},
  label: {fontSize: 13, fontWeight: '500'},
  body: {fontSize: 14, fontWeight: '400'},
  bodyStrong: {fontSize: 14, fontWeight: '600'},
  subheader: {fontSize: 15, fontWeight: '400'},
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
  // A card/section title. Frank Ruhl Libre draws its Latin and Hebrew as a
  // pair, so an English and a Hebrew title carry the same weight and size —
  // the old 12px uppercase system-font style made Latin caps look far larger
  // than Hebrew, which has no case. Bold face stands in for "600", as in
  // `itemHeader`.
  sectionHeader: {
    fontFamily: FontFamily.FrankRuhlLibreBold,
    fontSize: 15,
    fontWeight: '600',
    letterSpacing: 0.3, // 0.02em @ 15px, pre-multiplied
  },
  item: {
    fontFamily: FontFamily.FrankRuhlLibre,
    fontSize: 17,
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
  // Sheet title (Cancel/title/Save header row) — distinct from the plain
  // `BottomSheetHeader` title style.
  sheetTitle: {fontSize: 17, fontWeight: '600'},
  // A picker row, unselected/selected — mirrors the settings nav-row
  // (`item`) and chip selection convention (weight + tone flip, not a whole
  // different visual language).
  menuOption: {
    fontFamily: FontFamily.FrankRuhlLibre,
    fontSize: 16,
    fontWeight: '500',
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
  sectionHeader: SemanticColor.TextSecondary,
  item: SemanticColor.TextPrimary,
  itemHeader: SemanticColor.TextPrimary,
  detail: SemanticColor.TextSecondary,
  supplemental: SemanticColor.TextAccent,
  menuOption: SemanticColor.TextPrimary,
  menuOptionSelected: SemanticColor.TextAccent,
}

// Resolves a chrome type-ramp step to a concrete style, with its default
// semantic text color mixed in (callers may still override color via the
// `color` prop on `Text`, never via a raw style object).
export const useTypeStyle = (variant: TypeVariant): TextStyle => {
  const color = useResolvedColor(
    variantColor[variant] ?? SemanticColor.TextPrimary,
  )
  return {...type[variant], color}
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
    ...(letterSpacing !== 0 && {letterSpacing: letterSpacing * scale}),
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
