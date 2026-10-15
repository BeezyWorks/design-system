import {buildTheme, resolveColor} from '../themes'
import {SemanticColor as S, categoryColor, categoryColors} from '../semantic'
import {NamedColor} from '../named'
import {sampleBrands as Brand} from '../sampleBrands'
import type {BrandPalette} from '../brands'
import {contrastRatio, resolveBrand} from '../derive'

const modes = ['light', 'sepia', 'dark'] as const
const brands = Object.entries(Brand)

// The tokens a brand decides; every other token is shared by the family.
const brandTokens = new Set<string>([
  S.TextAccent,
  S.TextMarker,
  S.SurfaceHighlight,
  S.AccentPrimary,
  S.AccentPrimaryDeep,
  S.AccentPrimaryStrong,
  S.AccentTabActive,
  S.AccentTint,
  S.AccentTintSelected,
])
// Categorical washes are derived from a named hue, so they are not named.
const derivedTokens = new Set<string>([
  ...brandTokens,
  ...categoryColors.map((c) => c.tint),
])

describe('theme definitions', () => {
  it('define every token, and only those, in every mode and brand', () => {
    const tokens = Object.values(S).slice().sort()
    for (const [, brand] of brands) {
      for (const mode of modes) {
        expect(Object.keys(buildTheme(mode, brand)).sort()).toEqual(tokens)
      }
    }
  })

  it('map every shared token to a named color', () => {
    const named = new Set<string>(Object.values(NamedColor))
    for (const [, brand] of brands) {
      for (const mode of modes) {
        for (const [token, value] of Object.entries(buildTheme(mode, brand))) {
          if (!derivedTokens.has(token)) expect(named.has(value)).toBe(true)
        }
      }
    }
  })

  it('derive the washes from the brand', () => {
    const rgb = (hex: string) =>
      [1, 3, 5].map((i) => parseInt(hex.slice(i, i + 2), 16)).join(', ')
    for (const [, brand] of brands) {
      expect(buildTheme('light', brand)[S.AccentTint]).toBe(
        `rgba(${rgb(brand.primary)}, 0.08)`,
      )
      expect(buildTheme('dark', brand)[S.AccentTint]).toBe(
        `rgba(${rgb(resolveBrand(brand).primaryLight)}, 0.16)`,
      )
    }
  })

  it('share every non-brand token across brands', () => {
    for (const mode of modes) {
      const blue = buildTheme(mode, Brand.Blue)
      const gold = buildTheme(mode, Brand.Gold)
      for (const token of Object.values(S)) {
        if (!brandTokens.has(token)) expect(gold[token]).toBe(blue[token])
      }
    }
  })

  it('resolveColor reads the requested mode and brand', () => {
    const blue = Brand.Blue
    expect(resolveColor('light', S.SurfaceBackground, blue)).toBe(
      NamedColor.Cream,
    )
    expect(resolveColor('sepia', S.SurfaceBackground, blue)).toBe(
      NamedColor.SepiaPaper,
    )
    expect(resolveColor('dark', S.SurfaceBackground, blue)).toBe(
      NamedColor.Coal,
    )
    expect(resolveColor('light', S.AccentPrimary, blue)).toBe(blue.primary)
    expect(resolveColor('dark', S.AccentPrimary, blue)).toBe(
      resolveBrand(blue).primaryLight,
    )
    expect(resolveColor('light', S.AccentPrimary, Brand.Gold)).toBe(
      Brand.Gold.primary,
    )
  })

  it('memoizes per brand object', () => {
    expect(buildTheme('light', Brand.Blue)).toBe(
      buildTheme('light', Brand.Blue),
    )
  })

  it('rejects a brand that is not #RRGGBB', () => {
    const bad = {...Brand.Blue, deep: 'navy'} as unknown as BrandPalette
    expect(() => buildTheme('light', bad)).toThrow(/`deep` must be a #RRGGBB/)
  })
})

// The resolved values are the apps' look — pin them so a color can only
// change on purpose (the snapshot diff is the review).
describe('resolved themes', () => {
  it.each(
    modes.flatMap((mode) =>
      brands.map(([name]) => [mode, name] as [string, keyof typeof Brand]),
    ),
  )('%s / %s', (mode, name) => {
    const resolved = Object.fromEntries(
      Object.values(S).map((token) => [
        token,
        resolveColor(mode as (typeof modes)[number], token, Brand[name]),
      ]),
    )
    expect(resolved).toMatchSnapshot()
  })
})

describe('categorical colors', () => {
  it('assign by index and wrap', () => {
    expect(categoryColor(0)).toBe(categoryColors[0])
    expect(categoryColor(categoryColors.length)).toBe(categoryColors[0])
    expect(categoryColor(-1)).toBe(categoryColors[categoryColors.length - 1])
  })

  it('are all distinct in every mode', () => {
    for (const mode of modes) {
      const theme = buildTheme(mode, Brand.Blue)
      const texts = categoryColors.map((c) => theme[c.text])
      expect(new Set(texts).size).toBe(texts.length)
    }
  })

  it.each([
    ['light', 4.5],
    ['sepia', 4.5],
    ['dark', 7],
  ] as const)('read as text on %s surfaces', (mode, min) => {
    const theme = buildTheme(mode, Brand.Blue)
    for (const { text } of categoryColors) {
      expect(
        contrastRatio(theme[text], theme[S.SurfaceBackground]),
      ).toBeGreaterThanOrEqual(min)
      expect(
        contrastRatio(theme[text], theme[S.SurfaceCard]),
      ).toBeGreaterThanOrEqual(min)
    }
  })
})

describe('segmented control contrast', () => {
  it.each(modes)('selected label reads on the thumb in %s', (mode) => {
    const theme = buildTheme(mode, Brand.Blue)
    expect(
      contrastRatio(theme[S.TextPrimary], theme[S.SurfaceCard]),
    ).toBeGreaterThanOrEqual(4.5)
  })
})
