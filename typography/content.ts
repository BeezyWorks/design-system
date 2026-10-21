import {FontFamily} from './fontFamily'

// The reading-text options the design system offers, and how a selection
// resolves to concrete typography. The DL owns the *options* (and their
// values); the app owns which one the user picked and passes that selection
// to `DesignSystemProvider`. Display labels (translations) stay in the app.
//
// The string values are persisted in user prefs and settings backups —
// renaming one breaks existing installs.

export const Typeface = {
  Frank: 'Frank',
  David: 'David',
  Ezra: 'Ezra',
  Hadasim: 'Hadasim',
  MekorotVilna: 'Mekorot Vilna',
  Cardo: 'Cardo',
  FrankRuhlLibre: 'Frank Ruhl Libre',
  NotoSerifHebrew: 'Noto Serif Hebrew',
  Rubik: 'Rubik',
} as const
export type Typeface = (typeof Typeface)[keyof typeof Typeface]

export const typefaceFontFamily: Record<Typeface, FontFamily> = {
  [Typeface.Frank]: FontFamily.TaameyFrank,
  [Typeface.David]: FontFamily.David,
  [Typeface.Ezra]: FontFamily.EzraSIL,
  [Typeface.Hadasim]: FontFamily.Hadasim,
  [Typeface.MekorotVilna]: FontFamily.MekorotVilna,
  [Typeface.Cardo]: FontFamily.Cardo,
  [Typeface.FrankRuhlLibre]: FontFamily.FrankRuhlLibre,
  [Typeface.NotoSerifHebrew]: FontFamily.NotoSerifHebrew,
  [Typeface.Rubik]: FontFamily.Rubik,
}

// Families that ship a real bold cut. Android resolves `fontWeight: 'bold'`
// on a custom family with no registered bold face to the *system* font, so
// bold text must switch family instead. The rest (David, Ezra, Hadasim,
// Mekorot Vilna, Rubik) ship a single weight.
const boldFamilies: Partial<Record<FontFamily, FontFamily>> = {
  [FontFamily.TaameyFrank]: FontFamily.TaameyFrankBold,
  [FontFamily.Cardo]: FontFamily.CardoBold,
  [FontFamily.FrankRuhlLibre]: FontFamily.FrankRuhlLibreBold,
  [FontFamily.NotoSerifHebrew]: FontFamily.NotoSerifHebrewBold,
  [FontFamily.NotoRashiHebrew]: FontFamily.NotoRashiHebrewBold,
}

/** The bold cut of a family, or `undefined` when it ships only one weight. */
export const boldFontFamily = (family: FontFamily): FontFamily | undefined =>
  boldFamilies[family]

/** Latin reading faces — for translations and other long-form English set
 * beside Hebrew content. Persisted by value, like `Typeface`. */
export const LatinTypeface = {
  SourceSerif4: 'Source Serif 4',
  CrimsonPro: 'Crimson Pro',
  LibreBaskerville: 'Libre Baskerville',
  Inter: 'Inter',
} as const
export type LatinTypeface = (typeof LatinTypeface)[keyof typeof LatinTypeface]

/** Each Latin face's regular, bold and italic families. Latin faces ship
 * real bold/italic cuts, so `Text` switches family rather than asking the
 * platform to synthesize them. */
export const latinTypefaceFontFamily: Record<
  LatinTypeface,
  {regular: FontFamily; bold: FontFamily; italic: FontFamily}
> = {
  [LatinTypeface.SourceSerif4]: {
    regular: FontFamily.SourceSerif4,
    bold: FontFamily.SourceSerif4Bold,
    italic: FontFamily.SourceSerif4Italic,
  },
  [LatinTypeface.CrimsonPro]: {
    regular: FontFamily.CrimsonPro,
    bold: FontFamily.CrimsonProBold,
    italic: FontFamily.CrimsonProItalic,
  },
  [LatinTypeface.LibreBaskerville]: {
    regular: FontFamily.LibreBaskerville,
    bold: FontFamily.LibreBaskervilleBold,
    italic: FontFamily.LibreBaskervilleItalic,
  },
  [LatinTypeface.Inter]: {
    regular: FontFamily.Inter,
    bold: FontFamily.InterBold,
    italic: FontFamily.InterItalic,
  },
}

/** The serif for header roles in the editorial ramp (`pageHeader`,
 * `sectionHeader`, `itemHeader`). Both draw Latin and Hebrew as a pair. */
export const HeaderTypeface = {
  FrankRuhlLibre: 'Frank Ruhl Libre',
  Cardo: 'Cardo',
} as const
export type HeaderTypeface =
  (typeof HeaderTypeface)[keyof typeof HeaderTypeface]

/** Header roles are bold; `regular` is there for completeness. */
export const headerTypefaceFontFamily: Record<
  HeaderTypeface,
  {regular: FontFamily; bold: FontFamily}
> = {
  [HeaderTypeface.FrankRuhlLibre]: {
    regular: FontFamily.FrankRuhlLibre,
    bold: FontFamily.FrankRuhlLibreBold,
  },
  [HeaderTypeface.Cardo]: {
    regular: FontFamily.Cardo,
    bold: FontFamily.CardoBold,
  },
}

// 16-44px in 2px steps. The four original names are kept (at their original
// sizes) because they are persisted in user prefs and settings backups; the
// rest are named by their px size. Order here is the order of the stepper.
export const ContentSize = {
  Size16: 'Size16',
  Size18: 'Size18',
  Small: 'Small',
  Size22: 'Size22',
  Normal: 'Normal',
  Size26: 'Size26',
  Large: 'Large',
  Size30: 'Size30',
  XLarge: 'XLarge',
  Size34: 'Size34',
  Size36: 'Size36',
  Size38: 'Size38',
  Size40: 'Size40',
  Size42: 'Size42',
  Size44: 'Size44',
} as const
export type ContentSize = (typeof ContentSize)[keyof typeof ContentSize]

export const contentSizeValue: Record<ContentSize, number> = {
  [ContentSize.Size16]: 16,
  [ContentSize.Size18]: 18,
  [ContentSize.Small]: 20,
  [ContentSize.Size22]: 22,
  [ContentSize.Normal]: 24,
  [ContentSize.Size26]: 26,
  [ContentSize.Large]: 28,
  [ContentSize.Size30]: 30,
  [ContentSize.XLarge]: 32,
  [ContentSize.Size34]: 34,
  [ContentSize.Size36]: 36,
  [ContentSize.Size38]: 38,
  [ContentSize.Size40]: 40,
  [ContentSize.Size42]: 42,
  [ContentSize.Size44]: 44,
}

export const Leading = {
  Tight: 'Tight',
  Single: 'Single',
  OneAndAHalf: 'OneAndAHalf',
  Double: 'Double',
} as const
export type Leading = (typeof Leading)[keyof typeof Leading]

// A multiplier on font size added to the size itself:
// lineHeight = fontSize + fontSize * leadingValue. Pointed Hebrew needs room
// for niqqud and trop but reads as double-spaced past ~2x, so the presets
// top out at 2x. `Tight` (1.25x) is for unpointed text.
export const leadingValue: Record<Leading, number> = {
  [Leading.Tight]: 0.25,
  [Leading.Single]: 0.5,
  [Leading.OneAndAHalf]: 0.75,
  [Leading.Double]: 1,
}

/** What the user picked — the app's preference, in the DL's vocabulary.
 * `size` and `leading` take either a preset (stepped pickers) or a number
 * (continuous sliders): a numeric size is in px, a numeric leading is a
 * plain line-height multiplier (`lineHeight = fontSize × leading`). */
export interface ContentSelection {
  typeface: Typeface
  size: ContentSize | number
  leading: Leading | number
  /** The face for Latin reading text (`<Text content="latin">`). */
  latinTypeface?: LatinTypeface
  /** Letter spacing in em. */
  tracking?: number
}

/** A selection resolved to values a text style can use directly. */
export interface ResolvedContentText {
  typeface: Typeface
  fontFamily: FontFamily
  fontSize: number
  lineHeight: number
  latinTypeface: LatinTypeface
  /** Letter spacing in px (already multiplied by the font size). */
  letterSpacing: number
}

export const defaultContentSelection: ContentSelection = {
  typeface: Typeface.Frank,
  size: ContentSize.Normal,
  leading: Leading.OneAndAHalf,
}

const resolveLineHeight = (fontSize: number, leading: Leading | number) =>
  typeof leading === 'number'
    ? Math.round(fontSize * leading)
    : fontSize + fontSize * leadingValue[leading]

export const resolveContentText = ({
  typeface,
  size,
  leading,
  latinTypeface = LatinTypeface.SourceSerif4,
  tracking = 0,
}: ContentSelection): ResolvedContentText => {
  const fontSize = typeof size === 'number' ? size : contentSizeValue[size]
  return {
    typeface,
    fontFamily: typefaceFontFamily[typeface],
    fontSize,
    lineHeight: resolveLineHeight(fontSize, leading),
    latinTypeface,
    letterSpacing: tracking * fontSize,
  }
}
