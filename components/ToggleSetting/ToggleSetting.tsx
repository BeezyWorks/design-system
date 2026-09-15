import React from 'react'
import {Switch} from 'react-native'
import {useColors, withOpacity} from '../../colors'
import {Stack} from '../Stack'
import {Text} from '../Text'
import {Touchable} from '../Touchable'

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
  const colors = useColors()
  const trackOnColor = colors.primaryColor
  const trackOffColor = withOpacity(colors.primaryColor, 0.3)

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
          <Switch
            trackColor={{false: trackOffColor, true: trackOnColor}}
            ios_backgroundColor={trackOffColor}
            onValueChange={onSwitch}
            value={enabled}
            disabled={disabled}
          />
        </Stack>
      </Stack>
    </Touchable>
  )
}
