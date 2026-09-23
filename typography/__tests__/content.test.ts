import {
  ContentSize,
  Leading,
  Typeface,
  contentSizeValue,
  leadingValue,
  resolveContentText,
  typefaceFontFamily,
} from '../content'
import {FontFamily} from '../fontFamily'
// The app's own copies of these options (persisted in user prefs and settings
// backups). Until they are deleted in favor of the DL's, this file guarantees
// the two never disagree. Delete the @models comparisons with those models.
import {
  TypeFace as ModelTypeFace,
  FontSize as ModelFontSize,
  getFontFamilyName,
  getValueForFontSize,
  Leading as ModelLeading,
  getValueForLeading,
} from '@models'
import {getTextSettings} from '@selectors'

describe('reading-text options match the persisted app models', () => {
  it('typefaces: same set, same order, same font families', () => {
    expect(Object.values(Typeface)).toEqual([...ModelTypeFace])
    for (const typeface of ModelTypeFace) {
      expect(typefaceFontFamily[typeface]).toBe(getFontFamilyName(typeface))
    }
  })

  it('sizes: same keys, same values', () => {
    expect(Object.values(ContentSize)).toEqual([...ModelFontSize])
    for (const size of ModelFontSize) {
      expect(contentSizeValue[size]).toBe(getValueForFontSize(size))
    }
  })

  it('leading: same keys, same values', () => {
    expect(Object.values(Leading)).toEqual([...ModelLeading])
    for (const leading of ModelLeading) {
      expect(leadingValue[leading]).toBe(getValueForLeading(leading))
    }
  })
})

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

  it('agrees with the app selector for every combination', () => {
    for (const typeface of Object.values(Typeface)) {
      for (const size of Object.values(ContentSize)) {
        for (const leading of Object.values(Leading)) {
          const app = getTextSettings.resultFunc(leading, typeface, size)
          const dl = resolveContentText({typeface, size, leading})
          expect({size, leading, fontSize: dl.fontSize}).toEqual({
            size,
            leading,
            fontSize: app.fontSize,
          })
          expect(dl.lineHeight).toBe(app.lineHeight)
          expect(dl.typeface).toBe(app.typeface)
        }
      }
    }
  })

  it('maps every typeface to a registered font family', () => {
    const families = new Set<string>(Object.values(FontFamily))
    for (const typeface of Object.values(Typeface)) {
      expect(families.has(typefaceFontFamily[typeface])).toBe(true)
    }
  })
})
