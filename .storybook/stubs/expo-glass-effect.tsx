import React from 'react'
import {View, ViewProps} from 'react-native'

// Liquid Glass is iOS-only; on web `GlassView` is a plain View and the effect
// is reported unavailable, so components take their solid fallback.
export const isLiquidGlassAvailable = () => false

export const GlassView: React.FunctionComponent<
  ViewProps & {
    glassEffectStyle?: 'regular' | 'clear'
    isInteractive?: boolean
    colorScheme?: 'light' | 'dark' | 'auto'
  }
> = ({glassEffectStyle: _s, isInteractive: _i, colorScheme: _c, ...props}) => (
  <View {...props} />
)
