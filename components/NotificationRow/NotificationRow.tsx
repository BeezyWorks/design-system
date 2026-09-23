import React from 'react'
import {SemanticColor} from '../../colors'
import {Stack} from '../Stack'
import {Text} from '../Text'
import {IconButton} from '../IconButton'
import {ToggleSwitch} from '../ToggleSwitch'

export interface NotificationRowProps {
  zmanLabel: string
  offsetLabel: string
  timeLabel: string
  enabled: boolean
  onToggle: (enabled: boolean) => void
  onEdit: () => void
  onDelete: () => void
  /** Omits the bottom divider — set on the last row in a card. */
  isLast?: boolean
}

/** One user-created zman notification: leading enable toggle, the zman
 * name/offset, the computed clock time, then edit/delete. The whole row
 * dims to 50% when disabled but every control stays tappable. */
export const NotificationRow: React.FunctionComponent<NotificationRowProps> = ({
  zmanLabel,
  offsetLabel,
  timeLabel,
  enabled,
  onToggle,
  onEdit,
  onDelete,
  isLast,
}) => (
  <Stack
    direction="row"
    align="center"
    gap="sm"
    paddingVertical="sm"
    borderBottomWidth={isLast ? 'none' : 1}
    borderColor={SemanticColor.BorderDefault}
    opacity={enabled ? 1 : 0.5}
  >
    <ToggleSwitch value={enabled} onValueChange={onToggle} />
    {/* `width={0}` alongside `grow` — see SpecialNotificationRow for why:
        without it this column doesn't shrink/wrap, it just overflows the
        row past the trailing time/icons. */}
    <Stack grow width={0} gap="xs">
      <Text variant="itemHeader">{zmanLabel}</Text>
      <Text variant="detail">{offsetLabel}</Text>
    </Stack>
    <Text variant="supplemental" align="right">
      {timeLabel}
    </Text>
    <Stack direction="row">
      <IconButton
        name="edit"
        size={20}
        color={SemanticColor.TextSecondary}
        onPress={onEdit}
        accessibilityLabel="Edit notification"
      />
      <IconButton
        name="delete"
        size={20}
        color={SemanticColor.TextSecondary}
        onPress={onDelete}
        accessibilityLabel="Delete notification"
      />
    </Stack>
  </Stack>
)
