import {ViewStyle} from 'react-native'

// React Native's shadow is a set of discrete props, not a single value —
// each named level below bundles them so components never spell out
// shadowColor/shadowOffset/shadowOpacity/shadowRadius/elevation by hand.
const level = (
  offsetHeight: number,
  opacity: number,
  blurRadius: number,
  elevation: number,
): ViewStyle => ({
  shadowColor: '#000',
  shadowOffset: {width: 0, height: offsetHeight},
  shadowOpacity: opacity,
  shadowRadius: blurRadius,
  elevation,
})

export const shadows = {
  none: {},
  card: level(2, 0.25, 3.84, 6),
  raised: level(3, 0.3, 8, 6),
  /** Soft, wide shadow for chrome that floats over content — e.g. the
   * bottom tab bar pill. */
  floating: level(4, 0.15, 12, 8),
} as const

export type ShadowToken = keyof typeof shadows
