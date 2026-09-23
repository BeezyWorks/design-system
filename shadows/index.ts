import {useMemo} from 'react'
import {ViewStyle} from 'react-native'
import {SemanticColor} from '../colors/semantic'
import {useResolvedColor} from '../theme'

// React Native's shadow is a set of discrete props, not a single value —
// each named level below bundles them so components never spell out
// shadowColor/shadowOffset/shadowOpacity/shadowRadius/elevation by hand.
// The color is the theme's `OverlayShadow`, so `useShadow` is a hook.
interface ShadowLevel {
  offsetHeight: number
  opacity: number
  blurRadius: number
  elevation: number
}

const levels = {
  none: null,
  card: {offsetHeight: 2, opacity: 0.25, blurRadius: 3.84, elevation: 6},
  raised: {offsetHeight: 3, opacity: 0.3, blurRadius: 8, elevation: 6},
  /** Soft, wide shadow for chrome that floats over content — e.g. the
   * bottom tab bar pill. */
  floating: {offsetHeight: 4, opacity: 0.15, blurRadius: 12, elevation: 8},
} as const satisfies Record<string, ShadowLevel | null>

export type ShadowToken = keyof typeof levels

/** The style for a named shadow level, in the current mode. */
export const useShadow = (token: ShadowToken): ViewStyle => {
  const shadowColor = useResolvedColor(SemanticColor.OverlayShadow)
  return useMemo(() => {
    const level = levels[token]
    if (!level) return {}
    return {
      shadowColor,
      shadowOffset: {width: 0, height: level.offsetHeight},
      shadowOpacity: level.opacity,
      shadowRadius: level.blurRadius,
      elevation: level.elevation,
    }
  }, [token, shadowColor])
}
