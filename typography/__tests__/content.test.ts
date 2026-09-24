import {
  ContentSize,
  Leading,
  Typeface,
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
    })
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
