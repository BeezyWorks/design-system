import React from 'react'
import {act, create, ReactTestRenderer} from 'react-test-renderer'
import {ThemeRoot} from 'theme/themeRoot'
import {ModalRoot} from '@modal'
import {useAppStore} from 'state/store'
import {appReducer, AnyAction} from 'state/reducers'
import {TempSettingsActions} from '@actions'
import {dbReady} from 'database/local'
import {ConcreteTheme, track} from './renderWithTheme'

/** Tue 16 Jun 2020, 10:00 local — 24 Sivan 5780. An ordinary weekday: no
 * yom tov, fast, omer or Rosh Chodesh, so screens show their default state. */
export const FIXED_NOW = new Date(2020, 5, 16, 10, 0, 0)

const REAL_TIMER_APIS = [
  'hrtime',
  'nextTick',
  'performance',
  'queueMicrotask',
  'requestAnimationFrame',
  'cancelAnimationFrame',
  'requestIdleCallback',
  'cancelIdleCallback',
  'setImmediate',
  'clearImmediate',
  'setInterval',
  'clearInterval',
  'setTimeout',
  'clearTimeout',
] as const

/**
 * Freezes `Date` (and only `Date` — timers stay real so async loading still
 * works) so anything that reads "now" is deterministic. Call once at the top
 * level of a test file.
 */
export const freezeDate = (now: Date = FIXED_NOW) => {
  beforeAll(() => {
    jest.useFakeTimers({now, doNotFake: [...REAL_TIMER_APIS]})
  })
  afterAll(() => {
    jest.useRealTimers()
  })
}

export interface ScreenOptions {
  theme?: ConcreteTheme
  /** The date the app should treat as "today". */
  date?: Date
  /** Any extra store actions to apply before rendering (preferences, tefila…). */
  actions?: AnyAction[]
  /** Suppress the ModalRoot wrapper for screens that don't open modals. */
  withoutModals?: boolean
}

/** Lets pending promises (db lookups, effects that set state) resolve. */
export const settle = async (rounds = 6) => {
  for (let i = 0; i < rounds; i++) {
    await act(async () => {
      await new Promise((resolve) => setTimeout(resolve, 0))
    })
  }
}

/**
 * Renders a full screen the way the app does — real store, real `ThemeRoot`,
 * real `ModalRoot`, real database — from a known starting state, then waits
 * for asynchronous data to load.
 */
export const renderScreen = async (
  ui: React.ReactElement,
  {
    theme = 'light',
    date = FIXED_NOW,
    actions = [],
    withoutModals,
  }: ScreenOptions = {},
): Promise<ReactTestRenderer> => {
  await dbReady

  act(() => {
    const store = useAppStore
    store.setState(appReducer(undefined, {type: '@@reset'}))
    const {dispatch} = store.getState()
    dispatch({type: 'userPrefs setTheme', payload: theme})
    dispatch(TempSettingsActions.SetDebugDate(date))
    dispatch(TempSettingsActions.setDate(date))
    actions.forEach(dispatch)
  })

  let renderer!: ReactTestRenderer
  await act(async () => {
    renderer = create(
      <ThemeRoot>{withoutModals ? ui : <ModalRoot>{ui}</ModalRoot>}</ThemeRoot>,
    )
  })
  track(renderer)
  await settle()
  return renderer
}

/**
 * Every piece of text a rendered tree shows, in order, one per line. Ignores
 * all styling and structure, so it survives layout/design refactors and only
 * changes when the actual content does.
 */
export const textContent = (renderer: ReactTestRenderer): string => {
  const lines: string[] = []
  const walk = (node: ReturnType<ReactTestRenderer['toJSON']>) => {
    if (node === null) return
    if (Array.isArray(node)) return node.forEach(walk)
    if (typeof node === 'string') {
      lines.push(node)
      return
    }
    const parts: string[] = []
    const collect = (child: unknown) => {
      if (typeof child === 'string') parts.push(child)
      else if (child && typeof child === 'object') walk(child as never)
    }
    ;(node.children ?? []).forEach((child) => {
      if (typeof child === 'string') parts.push(child)
      else {
        if (parts.length) lines.push(parts.splice(0).join(''))
        collect(child)
      }
    })
    if (parts.length) lines.push(parts.join(''))
  }
  walk(renderer.toJSON())
  return lines.join('\n')
}
