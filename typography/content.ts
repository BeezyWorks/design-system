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

export const ContentSize = {
  Small: 'Small',
  Normal: 'Normal',
  Large: 'Large',
  XLarge: 'XLarge',
} as const
export type ContentSize = (typeof ContentSize)[keyof typeof ContentSize]

export const contentSizeValue: Record<ContentSize, number> = {
  [ContentSize.Small]: 20,
  [ContentSize.Normal]: 24,
  [ContentSize.Large]: 28,
  [ContentSize.XLarge]: 32,
}

export const Leading = {
  Single: 'Single',
  OneAndAHalf: 'OneAndAHalf',
  Double: 'Double',
} as const
export type Leading = (typeof Leading)[keyof typeof Leading]

// A multiplier on font size added to the size itself:
// lineHeight = fontSize + fontSize * leadingValue.
export const leadingValue: Record<Leading, number> = {
  [Leading.Single]: 1,
  [Leading.OneAndAHalf]: 1.5,
  [Leading.Double]: 1.8,
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
