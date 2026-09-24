import React, {createContext, useCallback, useContext, useMemo} from 'react'
import {SemanticColor} from '../colors/semantic'
import {resolveColor, ThemeMode} from '../colors/themes'
import {BrandPalette} from '../colors/brands'
import {
  ContentSelection,
  ResolvedContentText,
  defaultContentSelection,
  resolveContentText,
} from '../typography/content'

// The state the design system needs from an app: which mode to render in
// (already resolved — the app accounts for "system" and any per-context
// rules before passing it down), the app's brand, and the user's
// reading-text selection. Everything else the DL derives.

interface DesignSystemValue {
  mode: ThemeMode
  brand: BrandPalette
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
  /** The app's brand: three hex colors it owns. Define it once at module
   * scope — the themes are memoized per object. */
  brand: BrandPalette
  /** The user's reading-text choice; defaults to the DL's defaults. */
  content?: ContentSelection
  children?: React.ReactNode
}

/** Mount once at the app root. */
export const DesignSystemProvider: React.FunctionComponent<
  DesignSystemProviderProps
> = ({mode, brand, content = defaultContentSelection, children}) => {
  const {typeface, size, leading, latinTypeface, tracking} = content
  const value = useMemo<DesignSystemValue>(
    () => ({
      mode,
      brand,
      content: resolveContentText({
        typeface,
        size,
        leading,
        latinTypeface,
        tracking,
      }),
    }),
    [mode, brand, typeface, size, leading, latinTypeface, tracking],
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
 * photo panel, or a preview of another mode in a theme picker. Everything
 * inside (semantic colors, resolved colors) follows the scope; the brand and
 * reading-text settings pass through unchanged. Scopes nest. */
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

/** Light or dark — the mode collapsed to what native APIs understand
 * (pickers, glass, blur, the status bar). Sepia is a light appearance. */
export type Appearance = 'light' | 'dark'

export const useAppearance = (): Appearance =>
  useDesignSystem().mode === 'dark' ? 'dark' : 'light'

export type ColorResolver = (token: SemanticColor) => string

/** A resolver for several tokens at once (third-party APIs that want plain
 * color strings: status bar, calendar themes, navigation theme, …). */
export const useColorResolver = (): ColorResolver => {
  const {mode, brand} = useDesignSystem()
  return useCallback(
    (token: SemanticColor) => resolveColor(mode, token, brand),
    [mode, brand],
  )
}

/** One semantic token as a plain color string for the current mode. Prefer
 * passing the token itself to a DL component; use this only where a raw
 * string is unavoidable. */
export const useResolvedColor = (token: SemanticColor): string => {
  const {mode, brand} = useDesignSystem()
  return resolveColor(mode, token, brand)
}

/** The user's reading-text selection, resolved to concrete values. */
export const useContentText = (): ResolvedContentText =>
  useDesignSystem().content
