import React from 'react'
import {Platform, StyleSheet} from 'react-native'
import {BlurView} from 'expo-blur'
import {LinearGradient} from 'expo-linear-gradient'
import {SemanticColor} from '../../colors'
import {RadiusToken} from '../../radius'
import {useAppearance, useColorResolver} from '../../theme'
import {Stack, StackProps} from '../Stack'

export interface GlassSurfaceProps extends Pick<
  StackProps,
  | 'children'
  | 'direction'
  | 'align'
  | 'justify'
  | 'gap'
  | 'padding'
  | 'paddingHorizontal'
  | 'paddingVertical'
  | 'paddingTop'
  | 'paddingBottom'
  | 'grow'
  | 'width'
  | 'height'
  | 'minHeight'
  | 'alignSelf'
  | 'accessibilityRole'
  | 'accessibilityLabel'
> {
  /** Default `xl`. */
  radius?: RadiusToken
  /** Lifts the panel off its backdrop with a soft shadow. Default `true`. */
  raised?: boolean
}

// Android only blurs with a separately-mounted blur target (expo-blur's
// `blurTarget`), which a generic panel can't assume — it gets the opaque
// tint instead, so text over a photo stays legible.
const canBlur = Platform.OS !== 'android'
const BLUR_INTENSITY = 60
// Where the sheen has faded out, as a fraction of the panel's height.
const SHEEN_END = 0.45

/** A frosted-glass panel: a backdrop blur, the mode's glass tint, light
 * catching its top edge and a bright hairline border. It follows the mode
 * (frosted in light/sepia, smoky in dark); wrap it in a dark `ThemeScope`
 * for always-smoky glass over a photo. `BlurView`'s and `LinearGradient`'s
 * `style`/`colors` are those libraries' own contracts, derived from tokens
 * here — not a style escape hatch. */
export const GlassSurface: React.FunctionComponent<GlassSurfaceProps> = ({
  children,
  radius = 'xl',
  raised = true,
  ...layout
}) => {
  const resolve = useColorResolver()
  const appearance = useAppearance()
  return (
    <Stack
      radius={radius}
      shadow={raised ? 'card' : undefined}
      grow={layout.grow}
      width={layout.width}
      height={layout.height}
      minHeight={layout.minHeight}
      alignSelf={layout.alignSelf}
    >
      <Stack
        fill
        radius={radius}
        overflow="hidden"
        borderWidth={1}
        borderColor={SemanticColor.BorderGlass}
      >
        {canBlur && (
          <BlurView
            tint={
              appearance === 'dark'
                ? 'systemUltraThinMaterialDark'
                : 'systemUltraThinMaterialLight'
            }
            intensity={BLUR_INTENSITY}
            style={StyleSheet.absoluteFill}
          />
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
          style={StyleSheet.absoluteFill}
          pointerEvents="none"
        />
        <Stack
          grow
          direction={layout.direction}
          align={layout.align}
          justify={layout.justify}
          gap={layout.gap}
          padding={layout.padding}
          paddingHorizontal={layout.paddingHorizontal}
          paddingVertical={layout.paddingVertical}
          paddingTop={layout.paddingTop}
          paddingBottom={layout.paddingBottom}
          accessibilityRole={layout.accessibilityRole}
          accessibilityLabel={layout.accessibilityLabel}
        >
          {children}
        </Stack>
      </Stack>
    </Stack>
  )
}
