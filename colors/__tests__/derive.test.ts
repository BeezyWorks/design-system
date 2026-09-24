import {contrastRatio, resolveBrand} from '../derive'
import {NamedColor} from '../named'
import {sampleBrands} from '../sampleBrands'
import {buildTheme} from '../themes'
import type {BrandPalette} from '../brands'

const hue = (hex: string) => {
  const [r, g, b] = [1, 3, 5].map((i) => parseInt(hex.slice(i, i + 2), 16))
  const max = Math.max(r, g, b)
  const min = Math.min(r, g, b)
  const d = max - min
  if (d === 0) return 0
  const h =
    max === r
      ? ((g - b) / d) % 6
      : max === g
        ? (b - r) / d + 2
        : (r - g) / d + 4
  return (h * 60 + 360) % 360
}
const lightness = (hex: string) => contrastRatio(hex, '#000000') // monotonic in lightness

// Hues that span the wheel, plus a dark one that a fixed lightness step would
// get wrong. All carry white text.
const primaries = [
  '#3E7FD1', // blue
  '#9C7A2E', // gold
  '#C0392B', // red
  '#7B4FD1', // violet
  '#2E7D5B', // green
  '#1F3A5F', // navy
] as const

describe('resolveBrand', () => {
  it.each(primaries)('derives a usable scale from %s', (primary) => {
    const {primaryLight, deep} = resolveBrand({primary})
    expect(contrastRatio(primaryLight, NamedColor.Coal)).toBeGreaterThanOrEqual(
      7,
    )
    expect(contrastRatio(deep, NamedColor.Parchment)).toBeGreaterThanOrEqual(5)
    expect(lightness(primaryLight)).toBeGreaterThan(lightness(primary))
    expect(lightness(deep)).toBeLessThan(lightness(primary))
  })

  it.each(primaries)('keeps the hue of %s', (primary) => {
    const {primaryLight, deep} = resolveBrand({primary})
    for (const derived of [primaryLight, deep]) {
      const drift = Math.abs(hue(derived) - hue(primary))
      expect(Math.min(drift, 360 - drift)).toBeLessThan(6)
    }
  })

  it('returns hex strings and passes primary through', () => {
    const resolved = resolveBrand(sampleBrands.Blue)
    expect(resolved.primary).toBe('#3E7FD1')
    expect(resolved.primaryLight).toMatch(/^#[0-9A-F]{6}$/)
    expect(resolved.deep).toMatch(/^#[0-9A-F]{6}$/)
  })

  it('lets the app hand-tune either derived slot', () => {
    const tuned: BrandPalette = {
      primary: '#9C7A2E',
      primaryLight: '#D4AF6A',
    }
    const resolved = resolveBrand(tuned)
    expect(resolved.primaryLight).toBe('#D4AF6A')
    expect(resolved.deep).toBe(resolveBrand({primary: '#9C7A2E'}).deep)
    expect(buildTheme('dark', tuned).accentPrimary).toBe('#D4AF6A')
  })

  it('memoizes per brand object', () => {
    expect(resolveBrand(sampleBrands.Blue)).toBe(
      resolveBrand(sampleBrands.Blue),
    )
  })

  it.each([
    ['#E8B923', /too light to carry white text/],
    ['#F5D000', /too light to carry white text/],
  ])('rejects a primary that cannot carry white text: %s', (primary, msg) => {
    expect(() => resolveBrand({primary} as BrandPalette)).toThrow(msg)
  })

  it.each([
    [{primary: 'blue'}, '`primary`'],
    [{primary: '#3E7FD1', primaryLight: '#abc'}, '`primaryLight`'],
    [{primary: '#3E7FD1', deep: 'navy'}, '`deep`'],
  ])('rejects a malformed slot: %j', (brand, slot) => {
    expect(() => resolveBrand(brand as unknown as BrandPalette)).toThrow(
      new RegExp(`${slot} must be a #RRGGBB`),
    )
  })
})
