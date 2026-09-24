import React from 'react'
import {ListRow} from '../ListRow'
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
  <ListRow
    leading={<ToggleSwitch value={enabled} onValueChange={onToggle} />}
    title={zmanLabel}
    subtitle={offsetLabel}
    value={timeLabel}
    actions={[
      {icon: 'edit', label: 'Edit notification', onPress: onEdit},
      {icon: 'delete', label: 'Delete notification', onPress: onDelete},
    ]}
    dimmed={!enabled}
    isLast={isLast}
  />
)
