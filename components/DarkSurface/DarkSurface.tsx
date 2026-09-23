import React from 'react'
import {StyleSheet, View} from 'react-native'
import {radius as radiusTokens, RadiusToken} from '../../radius'
import {useShadow, ShadowToken} from '../../shadows'
import {SemanticColor} from '../../colors'
import {useColorResolver} from '../../theme'

export interface DarkSurfaceProps {
  children?: React.ReactNode
  height?: number
  radius?: RadiusToken
  shadow?: ShadowToken
  /** Fills the remaining space of a flex parent instead of sizing to
   * `height`. */
  grow?: boolean
}

/** A rounded, clipped surface that's always dark, regardless of the app's
 * light/dark setting — the Luach iPad-grid panels and the desktop-web
 * tabbed content card both intentionally keep their light-on-dark panel
 * content (dashboard stats, zmanim, agenda, calendar) on a fixed-dark
 * background rather than following the theme toggle. Split into an outer
 * view (carries the shadow) and an inner one (clips to the rounded
 * corners) since a shadow and `overflow: hidden` can't both apply to the
 * same view. */
export const DarkSurface: React.FunctionComponent<DarkSurfaceProps> = ({
  children,
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
          backgroundColor: resolve(SemanticColor.SurfacePanel),
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
