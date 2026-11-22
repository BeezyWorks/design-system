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
/** The default blur, on expo-blur's 0-100 scale. */
export const GLASS_BLUR_INTENSITY = 60
// Where the sheen has faded out, as a fraction of the panel's height.
const SHEEN_END = 0.45

export interface GlassBackdropProps {
  /** How strongly the backdrop blurs, 0-100. Default 60. */
  intensity?: number
  /** How much of the glass shows, 0-1: below 1 the whole fill (blur, tint
   * and sheen) fades toward what is behind it. Default 1. */
  opacity?: number
}

/** The frosted-glass fill behind `GlassSurface` and the glass
 * `SideNavRail`: a backdrop blur, the mode's glass tint and light catching
 * its top edge. Absolutely fills its parent, which clips it. On web it's a
 * plain CSS backdrop filter — expo-blur's web blur tops out at 20px and
 * lays its own white wash under the glass tint, which turns the glass
 * milky-opaque. The `style`/`colors` props are those libraries' own
 * contracts, derived from tokens here — not a style escape hatch. */
export const GlassBackdrop: React.FunctionComponent<GlassBackdropProps> = ({
  intensity = GLASS_BLUR_INTENSITY,
  opacity = 1,
}) => {
  const resolve = useColorResolver()
  const appearance = useAppearance()
  const webBlur = Math.round((36 * intensity) / GLASS_BLUR_INTENSITY)
  const layers = (
    <>
      {Platform.OS === 'web' ? (
        <View
          style={[
            styles.webFrost,
            // Same CSS-passthrough contract as `webFrost` below.
            {
              backdropFilter: `blur(${webBlur}px) saturate(170%) brightness(1.04)`,
            } as {},
          ]}
        />
      ) : (
        canBlur && (
          <BlurView
            tint={
              appearance === 'dark'
                ? 'systemUltraThinMaterialDark'
                : 'systemUltraThinMaterialLight'
            }
            intensity={intensity}
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
  // Only a faded backdrop needs its own layer to fade as one.
  return opacity < 1 ? (
    <Stack position="absoluteFill" opacity={opacity} pointerEvents="none">
      {layers}
    </Stack>
  ) : (
    layers
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
    // A web-only style react-native-web passes through. Spread from a plain
    // object: some react-native versions type `backdropFilter`, some don't,
    // so neither a bare key nor `@ts-expect-error` typechecks in both.
    ...({backdropFilter: 'blur(36px) saturate(170%) brightness(1.04)'} as {}),
  },
})
