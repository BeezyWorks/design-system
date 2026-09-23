import {darkTheme, lightTheme, themes, resolveColor} from '../themes'
import {SemanticColor as S} from '../semantic'
import {NamedColor} from '../named'
import {withOpacity} from '../withOpacity'
import {eventCategoryColors} from '..'
import * as legacy from '../palette'

// The three-tier tokens must reproduce every color the app shipped with
// before the refactor. These assertions compare against the legacy palette,
// so a value can only change deliberately (in a later "unification" pass),
// never by accident during migration. Delete this file's legacy comparisons
// together with `palette.ts` once the migration is complete.

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

describe.each([
  ['light', lightTheme, legacy.LightTheme],
  ['dark', darkTheme, legacy.DarkTheme],
] as const)('%s theme matches the legacy palette', (_mode, next, old) => {
  it('text', () => {
    expect(next[S.TextPrimary]).toBe(old.primaryTextColor)
    expect(next[S.TextSecondary]).toBe(old.secondaryTextColor)
    expect(next[S.TextTabInactive]).toBe(old.tabOffColor)
    expect(next[S.TextAccent]).toBe(old.specialTextColor)
    expect(next[S.TextDanger]).toBe(old.warningColor)
    expect(next[S.TextSecondaryMedium]).toBe(
      withOpacity(old.primaryTextColor, 0.55),
    )
    expect(next[S.TextSecondaryStrong]).toBe(
      withOpacity(old.primaryTextColor, 0.65),
    )
  })

  it('surfaces, borders and overlays', () => {
    expect(next[S.SurfaceBackground]).toBe(old.backgroundColor)
    expect(next[S.SurfaceCard]).toBe(old.backgroundColorDirty)
    expect(next[S.SurfaceSelected]).toBe(old.tintColor)
    expect(next[S.SurfaceHover]).toBe(withOpacity(old.primaryTextColor, 0.04))
    expect(next[S.SurfaceTransparent]).toBe(withOpacity('#fff', 0))
    expect(next[S.BorderDefault]).toBe(old.borderColor)
    expect(next[S.OverlayScrim]).toBe(old.scrimColor)
    // Border colors that historically borrowed the scrim color.
    expect(next[S.BorderStrong]).toBe(old.scrimColor)
  })

  it('accents', () => {
    expect(next[S.AccentPrimary]).toBe(old.primaryColor)
    expect(next[S.AccentTint]).toBe(old.tintAccent)
  })
})

describe('mode-independent colors match the legacy fixed exports', () => {
  it.each([lightTheme, darkTheme])('%#', (theme) => {
    expect(theme[S.AccentPrimaryFixed]).toBe(legacy.ColorPrimary)
    expect(theme[S.AccentTabActive]).toBe(legacy.ColorPrimary)
    expect(theme[S.AccentPrimaryBright]).toBe(legacy.ColorPrimaryLight)
    expect(theme[S.AccentPrimaryDeep]).toBe(legacy.NextTefilaPill)
    expect(theme[S.AccentTintFixed]).toBe(withOpacity(legacy.ColorPrimary, 0.1))
    expect(theme[S.SurfacePanel]).toBe(legacy.BackgroundDark)
    expect(theme[S.SurfaceThumb]).toBe(legacy.White)
    expect(theme[S.TextOnAccent]).toBe(legacy.White)
    expect(theme[S.TextOnPhoto]).toBe(legacy.White)
    expect(theme[S.SurfaceSwatchLight]).toBe(legacy.BackgroundLight)
    expect(theme[S.SurfaceSwatchDark]).toBe(legacy.BackgroundDark)
    expect(theme[S.SurfaceSwatchSystem]).toBe(legacy.ThemeSwatchSystem)
    expect(theme[S.OverlayShadow]).toBe(legacy.Black)
    expect(theme[S.OverlayScrimSoft]).toBe(withOpacity(legacy.Black, 0.15))
  })

  it('toggle tracks', () => {
    expect(lightTheme[S.SurfaceTrackOff]).toBe(legacy.ToggleTrackOff)
    expect(darkTheme[S.SurfaceTrackOff]).toBe(legacy.ToggleTrackOffDark)
  })

  it('reader-list selected row (theme-dependent, as before)', () => {
    expect(lightTheme[S.SurfaceHighlight]).toBe(
      withOpacity(legacy.ColorPrimary, 0.1),
    )
    expect(darkTheme[S.SurfaceHighlight]).toBe(withOpacity(legacy.White, 0.08))
  })

  it('typeface-chip selected fill follows the theme accent at 10%', () => {
    expect(lightTheme[S.AccentTintSelected]).toBe(
      withOpacity(legacy.LightTheme.primaryColor, 0.1),
    )
    expect(darkTheme[S.AccentTintSelected]).toBe(
      withOpacity(legacy.DarkTheme.primaryColor, 0.1),
    )
  })
})

describe('event category accents', () => {
  it.each([lightTheme, darkTheme])(
    '%# matches eventCategoryColors',
    (theme) => {
      expect(theme[S.AccentDanger]).toBe(eventCategoryColors.fastDay)
      expect(theme[S.AccentAlertFaded]).toBe(
        eventCategoryColors.erevMinorHoliday,
      )
      expect(theme[S.AccentAlert]).toBe(eventCategoryColors.minorHoliday)
      expect(theme[S.AccentAlert]).toBe(eventCategoryColors.roshChodesh)
      expect(theme[S.AccentWarning]).toBe(eventCategoryColors.unspecified)
      expect(theme[S.AccentInfo]).toBe(eventCategoryColors.yomTov)
      expect(theme[S.AccentInfoFaded]).toBe(eventCategoryColors.erevYomTov)
      expect(theme[S.AccentSuccess]).toBe(eventCategoryColors.userEvent)
    },
  )
})
