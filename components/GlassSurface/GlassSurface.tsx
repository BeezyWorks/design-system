import React from 'react'
import {SemanticColor} from '../../colors'
import {RadiusToken} from '../../radius'
import {Stack, StackProps} from '../Stack'
import {GlassBackdrop} from './GlassBackdrop'

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

/** A frosted-glass panel: a backdrop blur, the mode's glass tint, light
 * catching its top edge and a bright hairline border. It follows the mode
 * (frosted in light/sepia, smoky in dark); wrap it in a dark `ThemeScope`
 * for always-smoky glass over a photo. The fill is `GlassBackdrop`. */
export const GlassSurface: React.FunctionComponent<GlassSurfaceProps> = ({
  children,
  radius = 'xl',
  raised = true,
  ...layout
}) => {
  // The clipped panel fills the outer box only when that box is sized (a
  // `height`, or growing in its parent); otherwise both size to the
  // content. (A `fill` here would resolve 100% against whatever ancestor
  // has a height and swallow the screen.)
  const sized =
    !!layout.grow ||
    layout.height !== undefined ||
    layout.minHeight !== undefined
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
        grow={sized}
        radius={radius}
        overflow="hidden"
        borderWidth={1}
        borderColor={SemanticColor.BorderGlass}
      >
        <GlassBackdrop />
        <Stack
          grow={sized}
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
