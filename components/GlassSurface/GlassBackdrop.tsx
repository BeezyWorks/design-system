import React from 'react'
import {Platform, StyleSheet, View} from 'react-native'
import {BlurView} from 'expo-blur'
import {LinearGradient} from 'expo-linear-gradient'
import {SemanticColor} from '../../colors'
import {useAppearance, useColorResolver} from '../../theme'
import {Stack} from '../Stack'

// Android only blurs with a separately-mounted blur target (expo-blur's
// `blurTarget`), which a generic panel can't assume — it gets the opaque
// tint instead, so text over a photo stays legible.
const canBlur = Platform.OS !== 'android'
const BLUR_INTENSITY = 60
// Where the sheen has faded out, as a fraction of the panel's height.
const SHEEN_END = 0.45

/** The frosted-glass fill behind `GlassSurface` and the glass
 * `SideNavRail`: a backdrop blur, the mode's glass tint and light catching
 * its top edge. Absolutely fills its parent, which clips it. On web it's a
 * plain CSS backdrop filter — expo-blur's web blur tops out at 20px and
 * lays its own white wash under the glass tint, which turns the glass
 * milky-opaque. The `style`/`colors` props are those libraries' own
 * contracts, derived from tokens here — not a style escape hatch. */
export const GlassBackdrop: React.FunctionComponent = () => {
  const resolve = useColorResolver()
  const appearance = useAppearance()
  return (
    <>
      {Platform.OS === 'web' ? (
        <View style={styles.webFrost} />
      ) : (
        canBlur && (
          <BlurView
            tint={
              appearance === 'dark'
                ? 'systemUltraThinMaterialDark'
                : 'systemUltraThinMaterialLight'
            }
            intensity={BLUR_INTENSITY}
            style={StyleSheet.absoluteFill}
          />
        )
      )}
      <Stack
        position="absoluteFill"
        background={
          canBlur
            ? SemanticColor.SurfaceGlass
            : SemanticColor.SurfaceGlassOpaque
        }
      />
      <LinearGradient
        colors={[
          resolve(SemanticColor.SurfaceGlassSheen),
          resolve(SemanticColor.SurfaceTransparent),
        ]}
        locations={[0, SHEEN_END]}
        style={styles.overlay}
      />
    </>
  )
}

const styles = StyleSheet.create({
  overlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    pointerEvents: 'none',
  },
  webFrost: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    // @ts-expect-error: a web-only style react-native-web passes through.
    backdropFilter: 'blur(36px) saturate(170%) brightness(1.04)',
  },
})
