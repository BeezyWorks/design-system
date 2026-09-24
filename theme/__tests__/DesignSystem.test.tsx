import React from 'react'
import {act, create} from 'react-test-renderer'
import {SemanticColor as S} from '../../colors/semantic'
import {buildTheme} from '../../colors/themes'
import {testBrand} from '../../colors/sampleBrands'
import {ContentSize, Leading, Typeface} from '../../typography/content'
import {
  DesignSystemProvider,
  ThemeScope,
  useColorResolver,
  useContentText,
  useResolvedColor,
  useThemeMode,
} from '..'

// Renders `hook` under `tree` and returns what it saw on the latest render.
const run = <T,>(
  hook: () => T,
  wrap: (probe: React.ReactElement) => React.ReactElement,
) => {
  const seen: {current?: T} = {}
  const Probe = () => {
    seen.current = hook()
    return null
  }
  act(() => {
    create(wrap(<Probe />))
  })
  return seen.current as T
}

describe('DesignSystemProvider', () => {
  it('provides the mode and resolves semantic colors for it', () => {
    const useProbe = () => ({
      mode: useThemeMode(),
      bg: useResolvedColor(S.SurfaceBackground),
    })
    const light = run(useProbe, (p) => (
      <DesignSystemProvider mode="light" brand={testBrand}>
        {p}
      </DesignSystemProvider>
    ))
    const dark = run(useProbe, (p) => (
      <DesignSystemProvider mode="dark" brand={testBrand}>
        {p}
      </DesignSystemProvider>
    ))
    expect(light).toEqual({
      mode: 'light',
      bg: buildTheme('light', testBrand)[S.SurfaceBackground],
    })
    expect(dark).toEqual({
      mode: 'dark',
      bg: buildTheme('dark', testBrand)[S.SurfaceBackground],
    })
  })

  it('resolves the reading-text selection to concrete values', () => {
    const text = run(useContentText, (p) => (
      <DesignSystemProvider
        mode="light"
        brand={testBrand}
        content={{
          typeface: Typeface.Cardo,
          size: ContentSize.Large,
          leading: Leading.Double,
        }}
      >
        {p}
      </DesignSystemProvider>
    ))
    expect(text).toEqual({
      typeface: 'Cardo',
      fontFamily: 'Cardo_400Regular',
      fontSize: 28,
      lineHeight: 28 + 28 * 1.8,
      latinTypeface: 'Source Serif 4',
      letterSpacing: 0,
    })
  })

  it('falls back to default reading text when none is given', () => {
    const text = run(useContentText, (p) => (
      <DesignSystemProvider mode="light" brand={testBrand}>
        {p}
      </DesignSystemProvider>
    ))
    expect(text.typeface).toBe(Typeface.Frank)
    expect(text.fontSize).toBe(24)
  })

  it('throws a clear error when a hook runs outside the provider', () => {
    const spy = jest.spyOn(console, 'error').mockImplementation(() => {})
    try {
      expect(() => run(useThemeMode, (p) => p)).toThrow(
        /inside <DesignSystemProvider>/,
      )
    } finally {
      spy.mockRestore()
    }
  })

  it('useColorResolver resolves any token for the current mode', () => {
    const resolve = run(useColorResolver, (p) => (
      <DesignSystemProvider mode="dark" brand={testBrand}>
        {p}
      </DesignSystemProvider>
    ))
    expect(resolve(S.TextPrimary)).toBe(
      buildTheme('dark', testBrand)[S.TextPrimary],
    )
    expect(resolve(S.AccentSuccess)).toBe(
      buildTheme('dark', testBrand)[S.AccentSuccess],
    )
  })
})

describe('ThemeScope', () => {
  it('forces its subtree to a mode, leaving the outside alone', () => {
    const seen: string[] = []
    const Probe = ({label}: {label: string}) => {
      seen.push(`${label}:${useThemeMode()}`)
      return null
    }
    act(() => {
      create(
        <DesignSystemProvider mode="light" brand={testBrand}>
          <Probe label="outer" />
          <ThemeScope mode="dark">
            <Probe label="scoped" />
          </ThemeScope>
        </DesignSystemProvider>,
      )
    })
    expect(seen).toEqual(['outer:light', 'scoped:dark'])
  })

  it('resolves colors against the scope, not the app mode', () => {
    const color = run(
      () => useResolvedColor(S.SurfaceBackground),
      (p) => (
        <DesignSystemProvider mode="light" brand={testBrand}>
          <ThemeScope mode="dark">{p}</ThemeScope>
        </DesignSystemProvider>
      ),
    )
    expect(color).toBe(buildTheme('dark', testBrand)[S.SurfaceBackground])
  })

  it('nests, innermost scope wins', () => {
    const mode = run(useThemeMode, (p) => (
      <DesignSystemProvider mode="dark" brand={testBrand}>
        <ThemeScope mode="light">
          <ThemeScope mode="dark">
            <ThemeScope mode="light">{p}</ThemeScope>
          </ThemeScope>
        </ThemeScope>
      </DesignSystemProvider>
    ))
    expect(mode).toBe('light')
  })

  it('passes the reading-text selection through unchanged', () => {
    const text = run(useContentText, (p) => (
      <DesignSystemProvider
        mode="light"
        brand={testBrand}
        content={{
          typeface: Typeface.Ezra,
          size: ContentSize.Small,
          leading: Leading.Single,
        }}
      >
        <ThemeScope mode="dark">{p}</ThemeScope>
      </DesignSystemProvider>
    ))
    expect(text.typeface).toBe('Ezra')
    expect(text.fontSize).toBe(20)
    expect(text.lineHeight).toBe(40)
  })

  it('requires an enclosing provider', () => {
    const spy = jest.spyOn(console, 'error').mockImplementation(() => {})
    try {
      expect(() =>
        act(() => {
          create(<ThemeScope mode="dark">{null}</ThemeScope>)
        }),
      ).toThrow(/DesignSystemProvider/)
    } finally {
      spy.mockRestore()
    }
  })
})
