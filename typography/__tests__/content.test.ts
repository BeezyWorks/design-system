import {
  ContentSize,
  LatinTypeface,
  Leading,
  Typeface,
  latinTypefaceFontFamily,
  resolveContentText,
  typefaceFontFamily,
} from '../content'
import {FontFamily} from '../fontFamily'

describe('resolveContentText', () => {
  it('computes line height as size + size * leading', () => {
    expect(
      resolveContentText({
        typeface: Typeface.Frank,
        size: ContentSize.Normal,
        leading: Leading.OneAndAHalf,
      }),
    ).toEqual({
      typeface: 'Frank',
      fontFamily: FontFamily.TaameyFrank,
      fontSize: 24,
      lineHeight: 60, // 24 + 24 * 1.5
      latinTypeface: 'Source Serif 4',
      letterSpacing: 0,
    })
  })

  it('takes a numeric size (px) and leading (multiplier) from sliders', () => {
    expect(
      resolveContentText({
        typeface: Typeface.FrankRuhlLibre,
        size: 20,
        leading: 1.7,
        latinTypeface: LatinTypeface.Inter,
        tracking: 0.05,
      }),
    ).toEqual({
      typeface: 'Frank Ruhl Libre',
      fontFamily: FontFamily.FrankRuhlLibre,
      fontSize: 20,
      lineHeight: 34,
      latinTypeface: 'Inter',
      letterSpacing: 1,
    })
  })

  it('maps every Latin typeface to registered font families', () => {
    const families = new Set<string>(Object.values(FontFamily))
    for (const typeface of Object.values(LatinTypeface)) {
      for (const family of Object.values(latinTypefaceFontFamily[typeface])) {
        expect(families.has(family)).toBe(true)
      }
    }
  })

  it('maps every typeface to a registered font family', () => {
    const families = new Set<string>(Object.values(FontFamily))
    for (const typeface of Object.values(Typeface)) {
      expect(families.has(typefaceFontFamily[typeface])).toBe(true)
    }
  })

  // These string values are persisted in user prefs and settings backups.
  it('keeps the persisted option keys', () => {
    expect(Object.values(Typeface)).toEqual([
      'Frank',
      'David',
      'Ezra',
      'Hadasim',
      'Mekorot Vilna',
      'Cardo',
      'Frank Ruhl Libre',
      'Noto Serif Hebrew',
      'Rubik',
    ])
    expect(Object.values(LatinTypeface)).toEqual([
      'Source Serif 4',
      'Crimson Pro',
      'Libre Baskerville',
      'Inter',
    ])
    expect(Object.values(ContentSize)).toEqual([
      'Small',
      'Normal',
      'Large',
      'XLarge',
    ])
    expect(Object.values(Leading)).toEqual(['Single', 'OneAndAHalf', 'Double'])
  })
})
