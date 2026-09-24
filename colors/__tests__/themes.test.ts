import {
  buildTheme,
  darkTheme,
  lightTheme,
  sepiaTheme,
  themes,
  resolveColor,
} from '../themes'
import {SemanticColor as S} from '../semantic'
import {NamedColor} from '../named'
import {Brand} from '../brands'

const modes = ['light', 'sepia', 'dark'] as const
const brands = Object.entries(Brand)

describe('theme definitions', () => {
  it('define every token, and only those, in every mode and brand', () => {
    const tokens = Object.values(S).slice().sort()
    for (const [, brand] of brands) {
      for (const mode of modes) {
        expect(Object.keys(buildTheme(mode, brand)).sort()).toEqual(tokens)
      }
    }
  })

  it('only map to named colors', () => {
    const named = new Set<string>(Object.values(NamedColor))
    for (const [, brand] of brands) {
      for (const mode of modes) {
        for (const value of Object.values(buildTheme(mode, brand))) {
          expect(named.has(value)).toBe(true)
        }
      }
    }
  })

  it('share every non-brand token across brands', () => {
    const brandTokens = new Set<string>([
      S.TextAccent,
      S.SurfaceHighlight,
      S.AccentPrimary,
      S.AccentPrimaryBright,
      S.AccentPrimaryDeep,
      S.AccentPrimaryStrong,
      S.AccentTabActive,
      S.AccentTint,
      S.AccentTintSelected,
    ])
    for (const mode of modes) {
      const blue = buildTheme(mode, Brand.Blue)
      const gold = buildTheme(mode, Brand.Gold)
      for (const token of Object.values(S)) {
        if (!brandTokens.has(token)) expect(gold[token]).toBe(blue[token])
      }
    }
  })

  it('resolveColor reads the requested mode and brand', () => {
    expect(resolveColor('light', S.SurfaceBackground)).toBe(NamedColor.Cream)
    expect(resolveColor('sepia', S.SurfaceBackground)).toBe(
      NamedColor.SepiaPaper,
    )
    expect(resolveColor('dark', S.SurfaceBackground)).toBe(NamedColor.Coal)
    expect(resolveColor('light', S.AccentPrimary)).toBe(NamedColor.BrandBlue)
    expect(resolveColor('light', S.AccentPrimary, Brand.Gold)).toBe(
      NamedColor.BrandGold,
    )
    expect(themes.light).toBe(lightTheme)
    expect(themes.sepia).toBe(sepiaTheme)
    expect(themes.dark).toBe(darkTheme)
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
