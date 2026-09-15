import React from 'react'
import {Stack} from '../Stack'
import {Text} from '../Text'
import {IconButton} from '../IconButton'

export interface NotificationRowProps {
  zmanLabel: string
  timeLabel: string
  onZmanPress: () => void
  onTimePress: () => void
  onDelete: () => void
  deleteAccessibilityLabel?: string
}

/** One scheduled-notification entry: the zman + offset, tap either to open
 * its picker, with a trailing delete action. */
export const NotificationRow: React.FunctionComponent<NotificationRowProps> = ({
  zmanLabel,
  timeLabel,
  onZmanPress,
  onTimePress,
  onDelete,
  deleteAccessibilityLabel = 'Delete notification',
}) => (
  <Stack direction="row" justify="spaceBetween" align="center">
    <Stack>
      <Text variant="titleLarge" tone="primaryColor" onPress={onZmanPress}>
        {zmanLabel}
      </Text>
      <Text variant="subheader" tone="primaryColor" onPress={onTimePress}>
        {timeLabel}
      </Text>
    </Stack>
    <IconButton
      name="delete"
      size={25}
      tone="danger"
      onPress={onDelete}
      accessibilityLabel={deleteAccessibilityLabel}
    />
  </Stack>
)
