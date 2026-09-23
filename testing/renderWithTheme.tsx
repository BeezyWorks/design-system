import React from 'react'
import {act, create, ReactTestRenderer} from 'react-test-renderer'
import {ThemeStyle} from '@models'
import {ThemeRoot} from 'theme/themeRoot'
import {useAppStore} from 'state/store'
import {UserPrefActions} from '@actions'

const mounted = new Set<ReactTestRenderer>()

/**
 * Registers a renderer for automatic unmounting after the current test. Trees
 * left mounted stay subscribed to the store, so every later store update would
 * re-render all of them.
 */
export const track = (renderer: ReactTestRenderer) => {
  mounted.add(renderer)
  return renderer
}

if (typeof afterEach === 'function') {
  afterEach(() => {
    act(() => {
      mounted.forEach((renderer) => renderer.unmount())
    })
    mounted.clear()
  })
}

export type ConcreteTheme = Exclude<ThemeStyle, 'system'>

export const themes: ConcreteTheme[] = ['light', 'dark']

/**
 * Renders `ui` under the real `ThemeRoot`, driven by the real store, so
 * components resolve their colors exactly as they do in the app. Returns the
 * renderer once the theme effect has settled.
 */
export const renderWithTheme = (
  ui: React.ReactElement,
  theme: ConcreteTheme = 'light',
): ReactTestRenderer => {
  act(() => {
    useAppStore.getState().dispatch(UserPrefActions.setTheme(theme))
  })
  let renderer!: ReactTestRenderer
  act(() => {
    renderer = create(<ThemeRoot>{ui}</ThemeRoot>)
  })
  return track(renderer)
}

/**
 * Every `Pressable` in the tree, in render order. Matched by name because
 * React Native wraps `Pressable` in memo/forwardRef, so the imported
 * component is not the same reference as the rendered node's `type`.
 */
export const pressables = (renderer: ReactTestRenderer) =>
  renderer.root.findAll((node) => {
    if (typeof node.type === 'string') return false
    const {displayName, name} = node.type as {
      displayName?: string
      name?: string
    }
    return (displayName ?? name) === 'Pressable'
  })
