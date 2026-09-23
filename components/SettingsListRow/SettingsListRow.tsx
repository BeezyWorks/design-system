import React from 'react'
import {SemanticColor} from '../../colors'
import {Stack} from '../Stack'
import {Text} from '../Text'
import {Touchable} from '../Touchable'

export interface SettingsListRowProps {
  title: string
  /** Current value label, shown trailing the title (e.g. the selected
   * option, or a number). */
  value: string
  onPress: () => void
  disabled?: boolean
}

/** A tappable title/value row that opens a picker — shared by list-option
 * settings (`ListSetting`) and numeric settings (`NumberSettingWidget`). */
export const SettingsListRow: React.FunctionComponent<SettingsListRowProps> = ({
  title,
  value,
  onPress,
  disabled,
}) => (
  <Touchable onPress={onPress} disabled={disabled}>
    <Stack
      direction="row"
      justify="spaceBetween"
      align="center"
      paddingVertical="sm"
      opacity={disabled ? 0.5 : undefined}
    >
      <Text variant="bodyStrong">{title}</Text>
      <Text color={SemanticColor.TextSecondary}>{value}</Text>
    </Stack>
  </Touchable>
)
