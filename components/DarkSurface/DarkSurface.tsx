import React from 'react'
import {StyleSheet, View} from 'react-native'
import {radius as radiusTokens, RadiusToken} from '../../radius'
import {shadows, ShadowToken} from '../../shadows'
import {BackgroundDark} from '../../colors'

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
}) => (
  <View
    style={[
      {
        height,
        flexGrow: grow ? 1 : undefined,
        borderRadius: radiusTokens[radius],
        backgroundColor: BackgroundDark,
      },
      shadows[shadow],
    ]}
  >
    <View style={[styles.inner, {borderRadius: radiusTokens[radius]}]}>
      {children}
    </View>
  </View>
)

const styles = StyleSheet.create({
  inner: {flex: 1, overflow: 'hidden'},
})
