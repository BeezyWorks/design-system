import {DesignFonts} from '../fonts'
import {FontFamily} from '../fontFamily'

describe('font registry', () => {
  it('has exactly one asset per FontFamily entry', () => {
    expect(Object.keys(DesignFonts).sort()).toEqual(
      Object.values(FontFamily).slice().sort(),
    )
  })

  it('has no empty assets', () => {
    for (const [family, asset] of Object.entries(DesignFonts)) {
      expect({family, loaded: asset != null}).toEqual({family, loaded: true})
    }
  })

  it('keeps the exact family names fonts register under', () => {
    // These strings are what `fontFamily` resolves against and, for the
    // Hebrew faces, what is persisted — they must not change.
    expect(FontFamily.TaameyFrank).toBe('Taamey Frank CLM')
    expect(FontFamily.MekorotVilna).toBe('Mekorot-Vilna')
    expect(FontFamily.EzraSIL).toBe('Ezra SIL SR')
    expect(FontFamily.Hadasim).toBe('Hadasim CLM')
    expect(FontFamily.David).toBe('David CLM')
    expect(FontFamily.Cardo).toBe('Cardo_400Regular')
  })
})
