import React from 'react'
import {Stack} from '../Stack'
import {Text} from '../Text'
import {Touchable} from '../Touchable'
import {ToggleSwitch} from '../ToggleSwitch'

export interface ToggleSettingProps {
  title: string
  enabled: boolean
  onSwitch: (enabled: boolean) => void
  titleOn?: string
  titleOff?: string
  disabled?: boolean
}

/** A titled row with a trailing switch — the whole row is tappable, the
 * `Switch` itself is purely a visual reflection of `enabled` (its own taps
 * are disabled via `pointerEvents="none"` so a tap never double-fires). */
export const ToggleSetting: React.FunctionComponent<ToggleSettingProps> = ({
  title,
  enabled,
  onSwitch,
  titleOn = '',
  titleOff = '',
  disabled,
}) => {
  return (
    <Touchable disabled={disabled} onPress={() => onSwitch(!enabled)}>
      <Stack
        direction="row"
        justify="spaceBetween"
        align="center"
        paddingVertical="sm"
        opacity={disabled ? 0.5 : undefined}
      >
        <Text variant="bodyStrong">
          {title + (enabled ? titleOn : titleOff)}
        </Text>
        <Stack pointerEvents="none">
          <ToggleSwitch
            value={enabled}
            onValueChange={onSwitch}
            disabled={disabled}
          />
        </Stack>
      </Stack>
    </Touchable>
  )
}
