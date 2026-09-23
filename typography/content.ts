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
} as const
export type Typeface = (typeof Typeface)[keyof typeof Typeface]

export const typefaceFontFamily: Record<Typeface, FontFamily> = {
  [Typeface.Frank]: FontFamily.TaameyFrank,
  [Typeface.David]: FontFamily.David,
  [Typeface.Ezra]: FontFamily.EzraSIL,
  [Typeface.Hadasim]: FontFamily.Hadasim,
  [Typeface.MekorotVilna]: FontFamily.MekorotVilna,
  [Typeface.Cardo]: FontFamily.Cardo,
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

/** What the user picked — the app's preference, in the DL's vocabulary. */
export interface ContentSelection {
  typeface: Typeface
  size: ContentSize
  leading: Leading
}

/** A selection resolved to values a text style can use directly. */
export interface ResolvedContentText {
  typeface: Typeface
  fontFamily: FontFamily
  fontSize: number
  lineHeight: number
}

export const defaultContentSelection: ContentSelection = {
  typeface: Typeface.Frank,
  size: ContentSize.Normal,
  leading: Leading.OneAndAHalf,
}

export const resolveContentText = ({
  typeface,
  size,
  leading,
}: ContentSelection): ResolvedContentText => {
  const fontSize = contentSizeValue[size]
  return {
    typeface,
    fontFamily: typefaceFontFamily[typeface],
    fontSize,
    lineHeight: fontSize + fontSize * leadingValue[leading],
  }
}
