import React from 'react'
import {SemanticColor} from '../../colors'
import {Stack} from '../Stack'
import {Text} from '../Text'
import {Icon, IconName} from '../Icon'

/** `neutral` — a plain count; `accent` — brand-tinted (in progress, a
 * call to action); `success` — done; `onAccent` — laid over a brand fill
 * such as `GradientCard`. */
export type BadgeTone = 'neutral' | 'accent' | 'success' | 'onAccent'

const toneColors: Record<
  BadgeTone,
  {background: SemanticColor; label: SemanticColor}
> = {
  neutral: {
    background: SemanticColor.SurfaceSelected,
    label: SemanticColor.TextSecondary,
  },
  accent: {
    background: SemanticColor.AccentTintSelected,
    label: SemanticColor.TextAccent,
  },
  success: {
    background: SemanticColor.SurfaceSuccess,
    label: SemanticColor.TextSuccess,
  },
  onAccent: {
    background: SemanticColor.SurfaceOnAccent,
    label: SemanticColor.TextOnAccent,
  },
}

export interface BadgeProps {
  label: string
  tone?: BadgeTone
  /** A small glyph after the label (e.g. a "go" chevron on a CTA pill). */
  icon?: IconName
}

/** A small pill label — counts, status tags, and pill-shaped calls to
 * action inside a tappable card. Not itself tappable. */
export const Badge: React.FunctionComponent<BadgeProps> = ({
  label,
  tone = 'neutral',
  icon,
}) => {
  const {background, label: labelColor} = toneColors[tone]
  return (
    <Stack
      direction="row"
      align="center"
      gap="xs"
      radius="full"
      paddingHorizontal="sm"
      paddingVertical="xs"
      background={background}
    >
      <Text variant="label" color={labelColor}>
        {label}
      </Text>
      {!!icon && <Icon name={icon} size={14} color={labelColor} />}
    </Stack>
  )
}
