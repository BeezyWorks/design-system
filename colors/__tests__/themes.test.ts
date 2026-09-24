import {darkTheme, lightTheme, themes, resolveColor} from '../themes'
import {SemanticColor as S} from '../semantic'
import {NamedColor} from '../named'

describe('theme definitions', () => {
  it('define exactly the same tokens in light and dark', () => {
    expect(Object.keys(lightTheme).sort()).toEqual(
      Object.keys(darkTheme).sort(),
    )
    expect(Object.keys(lightTheme).sort()).toEqual(
      Object.values(S).slice().sort(),
    )
  })

  it('only map to named colors', () => {
    const named = new Set<string>(Object.values(NamedColor))
    for (const theme of [lightTheme, darkTheme]) {
      for (const value of Object.values(theme)) {
        expect(named.has(value)).toBe(true)
      }
    }
  })

  it('resolveColor reads the requested mode', () => {
    expect(resolveColor('light', S.SurfaceBackground)).toBe(NamedColor.Cream)
    expect(resolveColor('dark', S.SurfaceBackground)).toBe(NamedColor.Coal)
    expect(themes.light).toBe(lightTheme)
  })
})

// The resolved values are the app's look — pin them so a color can only
// change on purpose (the snapshot diff is the review).
describe('resolved themes', () => {
  it.each(['light', 'dark'] as const)('%s', (mode) => {
    const resolved = Object.fromEntries(
      Object.values(S).map((token) => [token, resolveColor(mode, token)]),
    )
    expect(resolved).toMatchSnapshot()
  })
})
