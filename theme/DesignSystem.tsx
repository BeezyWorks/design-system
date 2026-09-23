import React, {createContext, useCallback, useContext, useMemo} from 'react'
import {SemanticColor} from '../colors/semantic'
import {resolveColor, ThemeMode} from '../colors/themes'
import {
  ContentSelection,
  ResolvedContentText,
  defaultContentSelection,
  resolveContentText,
} from '../typography/content'

// The one piece of state the design system needs from an app: which mode to
// render in (already resolved — the app accounts for "system" and any
// per-context rules before passing it down) and the user's reading-text
// selection. Everything else the DL derives.

interface DesignSystemValue {
  mode: ThemeMode
  content: ResolvedContentText
}

const DesignSystemContext = createContext<DesignSystemValue | null>(null)

const useDesignSystem = (): DesignSystemValue => {
  const value = useContext(DesignSystemContext)
  if (!value) {
    throw new Error(
      'Design system hooks must be used inside <DesignSystemProvider>.',
    )
  }
  return value
}

export interface DesignSystemProviderProps {
  /** Concrete mode. The app resolves "system"/night-mode rules before this. */
  mode: ThemeMode
  /** The user's reading-text choice; defaults to the DL's defaults. */
  content?: ContentSelection
  children?: React.ReactNode
}

/** Mount once at the app root. */
export const DesignSystemProvider: React.FunctionComponent<
  DesignSystemProviderProps
> = ({mode, content = defaultContentSelection, children}) => {
  const {typeface, size, leading} = content
  const value = useMemo<DesignSystemValue>(
    () => ({mode, content: resolveContentText({typeface, size, leading})}),
    [mode, typeface, size, leading],
  )
  return (
    <DesignSystemContext.Provider value={value}>
      {children}
    </DesignSystemContext.Provider>
  )
}

export interface ThemeScopeProps {
  mode: ThemeMode
  children?: React.ReactNode
}

/** Forces a subtree to a mode regardless of the app's — e.g. an always-dark
 * photo panel. Everything inside (semantic colors, resolved colors) follows
 * the scope; reading-text settings pass through unchanged. Scopes nest. */
export const ThemeScope: React.FunctionComponent<ThemeScopeProps> = ({
  mode,
  children,
}) => {
  const parent = useDesignSystem()
  const value = useMemo<DesignSystemValue>(
    () => ({...parent, mode}),
    [parent, mode],
  )
  return (
    <DesignSystemContext.Provider value={value}>
      {children}
    </DesignSystemContext.Provider>
  )
}

/** The mode in effect here (respects the nearest `ThemeScope`). */
export const useThemeMode = (): ThemeMode => useDesignSystem().mode

export type ColorResolver = (token: SemanticColor) => string

/** A resolver for several tokens at once (third-party APIs that want plain
 * color strings: status bar, calendar themes, navigation theme, …). */
export const useColorResolver = (): ColorResolver => {
  const {mode} = useDesignSystem()
  return useCallback(
    (token: SemanticColor) => resolveColor(mode, token),
    [mode],
  )
}

/** One semantic token as a plain color string for the current mode. Prefer
 * passing the token itself to a DL component; use this only where a raw
 * string is unavoidable. */
export const useResolvedColor = (token: SemanticColor): string =>
  resolveColor(useDesignSystem().mode, token)

/** The user's reading-text selection, resolved to concrete values. */
export const useContentText = (): ResolvedContentText =>
  useDesignSystem().content
