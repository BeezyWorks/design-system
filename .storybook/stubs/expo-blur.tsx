import React from 'react'
import {View, ViewProps} from 'react-native'
import {SemanticColor} from '../../colors/semantic'
import {useResolvedColor} from '../../theme'

// The real expo-blur pulls in expo-modules-core, which Vite can't bundle.
// Web's blur is just CSS `backdrop-filter` over a translucent surface, so
// draw that directly (tinted by the current theme rather than `tint`).
export const BlurView: React.FunctionComponent<
  ViewProps & {tint?: string; intensity?: number}
> = ({tint: _tint, intensity = 50, style, ...props}) => {
  const surface = useResolvedColor(SemanticColor.SurfaceBackground)
  return (
    <View
      {...props}
      style={[
        style,
        {
          backdropFilter: `blur(${intensity / 4}px)`,
          backgroundColor: `color-mix(in srgb, ${surface} 60%, transparent)`,
        } as object,
      ]}
    />
  )
}
