import React from 'react'
import {StyleSheet, View} from 'react-native'
import {radius as radiusTokens, RadiusToken} from '../../radius'
import {useShadow, ShadowToken} from '../../shadows'
import {SemanticColor} from '../../colors'
import {useColorResolver} from '../../theme'

export interface SurfaceProps {
  children?: React.ReactNode
  /** Default `SurfaceCard`. */
  background?: SemanticColor
  height?: number
  radius?: RadiusToken
  shadow?: ShadowToken
  /** Fills the remaining space of a flex parent instead of sizing to
   * `height`. */
  grow?: boolean
}

/** A rounded, clipped surface with a shadow — a panel that holds content on
 * a colored background. Split into an outer view (carries the shadow) and an
 * inner one (clips to the rounded corners) since a shadow and
 * `overflow: hidden` can't both apply to the same view. For an always-dark or
 * always-light panel, wrap it (and its content) in a `ThemeScope`. */
export const Surface: React.FunctionComponent<SurfaceProps> = ({
  children,
  background = SemanticColor.SurfaceCard,
  height,
  radius = 'lg',
  shadow = 'none',
  grow,
}) => {
  const resolve = useColorResolver()
  const shadowStyle = useShadow(shadow)
  return (
    <View
      style={[
        {
          height,
          flexGrow: grow ? 1 : undefined,
          borderRadius: radiusTokens[radius],
          backgroundColor: resolve(background),
        },
        shadowStyle,
      ]}
    >
      <View style={[styles.inner, {borderRadius: radiusTokens[radius]}]}>
        {children}
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  inner: {flex: 1, overflow: 'hidden'},
})
