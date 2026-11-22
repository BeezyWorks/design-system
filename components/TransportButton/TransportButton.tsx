import React from 'react'
import {SemanticColor} from '../../colors'
import {Icon} from '../Icon'
import {Stack} from '../Stack'
import {Text} from '../Text'
import {Touchable} from '../Touchable'

export type TransportKind = 'play' | 'pause' | 'skip-back' | 'skip-forward'

export interface TransportButtonProps {
  kind: TransportKind
  /** Screen-reader label ("Play", "Back 15 seconds"). */
  label: string
  /** The skip distance, printed over a skip arrow. */
  seconds?: number
  size?: 'sm' | 'md' | 'lg'
  disabled?: boolean
  onPress?: () => void
}

const DIAMETER = {sm: 36, md: 48, lg: 72} as const
const GLYPH = {sm: 18, md: 24, lg: 36} as const

/** A media-transport button: play/pause as a solid brand circle, skips as a
 * bare circular arrow with its distance in seconds over it (not on `sm`). */
export const TransportButton: React.FunctionComponent<TransportButtonProps> = ({
  kind,
  label,
  seconds,
  size = 'md',
  disabled,
  onPress,
}) => {
  const primary = kind === 'play' || kind === 'pause'
  const dim = DIAMETER[size]
  return (
    <Touchable
      onPress={onPress}
      disabled={disabled}
      accessibilityLabel={label}
      accessibilityRole="button"
      accessibilityState={{disabled: !!disabled}}
    >
      <Stack
        width={dim}
        height={dim}
        radius="full"
        align="center"
        justify="center"
        opacity={disabled ? 0.4 : undefined}
        background={primary ? SemanticColor.AccentPrimary : undefined}
      >
        <Icon
          name={kind}
          size={GLYPH[size]}
          color={
            primary ? SemanticColor.TextInverse : SemanticColor.TextPrimary
          }
        />
        {!primary && seconds !== undefined && size !== 'sm' ? (
          <Stack position="absoluteFill" align="center" justify="center">
            <Text variant="caption" color={SemanticColor.TextPrimary}>
              {String(seconds)}
            </Text>
          </Stack>
        ) : null}
      </Stack>
    </Touchable>
  )
}
