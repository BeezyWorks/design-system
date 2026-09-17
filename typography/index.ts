import {TextStyle} from 'react-native'
import {useSelector} from 'state/store'
import {getTextSettings} from '@selectors'
import {getFontFamilyName, TypeFace} from '@models'
import {useColors, Colors} from '../colors'

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
    fontFamily: 'FrankRuhlLibre_700Bold',
    fontSize: 30,
    fontWeight: '700',
  },
  sectionHeader: {
    fontSize: 12,
    fontWeight: '600',
    textTransform: 'uppercase',
    letterSpacing: 0.72, // 0.06em @ 12px — RN has no em unit, so pre-multiplied
  },
  item: {
    fontFamily: 'FrankRuhlLibre_400Regular',
    fontSize: 17,
    fontWeight: '400',
  },
  // Notification list row's zman name — same family as `item`, but the
  // spec calls for a 600 weight; the font only ships Regular/Bold faces,
  // so the Bold face stands in for "600" here (same trick `pageHeader`
  // already uses for its own 700).
  itemHeader: {
    fontFamily: 'FrankRuhlLibre_700Bold',
    fontSize: 17,
    fontWeight: '600',
  },
  // Chrome "Detail"/"Description" role — offset text under a zman name, a
  // special-notification's blurb, etc. One variant covers both; the 1.4
  // line-height only matters once text wraps to 2+ lines.
  detail: {fontSize: 13, fontWeight: '400', lineHeight: 18},
  // Chrome "Supplemental" role — the computed clock time trailing a
  // notification row.
  supplemental: {fontSize: 15, fontWeight: '600'},
  // Sheet title (Cancel/title/Save header row) — distinct from the plain
  // `BottomSheetHeader` title style used by every other sheet in the app.
  sheetTitle: {fontSize: 17, fontWeight: '600'},
  // Zman Picker row, unselected/selected — mirrors the Settings nav-row
  // (`item`) and typeface-chip selection convention (weight + tone flip,
  // not a whole different visual language).
  menuOption: {
    fontFamily: 'FrankRuhlLibre_400Regular',
    fontSize: 16,
    fontWeight: '500',
  },
  menuOptionSelected: {
    fontFamily: 'FrankRuhlLibre_700Bold',
    fontSize: 16,
    fontWeight: '600',
  },
} as const satisfies Record<string, TextStyle>

export type TypeVariant = keyof typeof type

// Variants whose default color isn't the usual `primaryTextColor` (ink at
// full opacity) — unlisted variants fall back to that as before.
const variantTone: Partial<Record<TypeVariant, keyof Colors>> = {
  pageHeader: 'accent',
  // `secondaryTextColor` *is* ink at 50% opacity (see `LightTheme`/
  // `DarkTheme` in palette.ts) — already exactly the spec, no new token
  // needed.
  sectionHeader: 'secondaryTextColor',
  item: 'ink',
  itemHeader: 'ink',
  detail: 'secondaryTextColor',
  supplemental: 'accent',
  menuOption: 'ink',
  menuOptionSelected: 'accent',
}

// Resolves a chrome type-ramp step to a concrete style, with the app's
// semantic text color mixed in (callers may still override color via a
// `tone` prop on `Text`, never via a raw style object).
export const useTypeStyle = (variant: TypeVariant): TextStyle => {
  const colors = useColors()
  const tone = variantTone[variant] ?? 'primaryTextColor'
  return {...type[variant], color: colors[tone]}
}

// The davening/siddur reading content uses a *different*, user-configurable
// ramp (typeface, font size, line height all come from Settings) — this is
// the direct replacement for the old `useBaseTextStyle`.
export const useContentTypeStyle = (): TextStyle => {
  const {typeface, fontSize, lineHeight} = useSelector(getTextSettings)
  const colors = useColors()
  return {
    color: colors.primaryTextColor,
    fontSize,
    fontFamily: getFontFamilyName(typeface),
    lineHeight,
    textAlign: 'right',
  }
}

export const useTypefaceFontFamily = (typeface: TypeFace) =>
  getFontFamilyName(typeface)

export {AppFonts} from './fonts'
