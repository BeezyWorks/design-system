import React from 'react'
import {act, create, ReactTestRenderer} from 'react-test-renderer'
import {DesignSystemProvider} from '../theme'
import type {ThemeMode} from '../colors'

const mounted = new Set<ReactTestRenderer>()

/**
 * Registers a renderer for automatic unmounting after the current test, so
 * trees left mounted don't accumulate across tests.
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

export type ConcreteTheme = ThemeMode

export const themes: ConcreteTheme[] = ['light', 'dark']

/** Renders `ui` under the design system's provider for one mode. */
export const renderWithTheme = (
  ui: React.ReactElement,
  theme: ConcreteTheme = 'light',
): ReactTestRenderer => {
  let renderer!: ReactTestRenderer
  act(() => {
    renderer = create(
      <DesignSystemProvider mode={theme}>{ui}</DesignSystemProvider>,
    )
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
