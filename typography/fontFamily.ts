// Every font family the design system ships, by accessor. Values are the exact
// family names the fonts register under (they must never change — they are
// what `fontFamily` resolves against, and the Hebrew liturgical faces are
// persisted by name through `Typeface`). Pure data: safe to import anywhere,
// including build tooling. The actual font assets live in fonts.ts.
export const FontFamily = {
  // Hebrew liturgical / reading faces
  TaameyFrank: 'Taamey Frank CLM',
  TaameyFrankBold: 'TaameyFrankCLM-Bold',
  MekorotVilna: 'Mekorot-Vilna',
  EzraSIL: 'Ezra SIL SR',
  Hadasim: 'Hadasim CLM',
  David: 'David CLM',
  // Cardo — the one Google Fonts Hebrew face with real OpenType niqqud and
  // te'amim support.
  Cardo: 'Cardo_400Regular',
  CardoBold: 'Cardo_700Bold',
  // Editorial serif for the Latin/Hebrew chrome ramp (`pageHeader`, `item`).
  FrankRuhlLibre: 'FrankRuhlLibre_400Regular',
  FrankRuhlLibreBold: 'FrankRuhlLibre_700Bold',
  // Ktav Rashi (semi-cursive) script for commentary text.
  NotoRashiHebrew: 'NotoRashiHebrew_400Regular',
  NotoRashiHebrewBold: 'NotoRashiHebrew_700Bold',
  // Registered but not yet wired to a token or a selectable typeface.
  NotoSerifHebrew: 'NotoSerifHebrew_400Regular',
  NotoSerifHebrewBold: 'NotoSerifHebrew_700Bold',
  Rubik: 'Rubik',
  SiddurIcons: 'SiddurIcons',
} as const

export type FontFamily = (typeof FontFamily)[keyof typeof FontFamily]
