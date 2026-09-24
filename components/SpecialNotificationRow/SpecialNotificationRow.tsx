import React from 'react'
import {ListRow} from '../ListRow'
import {ToggleSwitch} from '../ToggleSwitch'

export interface SpecialNotificationRowProps {
  name: string
  description: string
  enabled: boolean
  onToggle: (enabled: boolean) => void
  /** Omits the bottom divider — set on the last row in a card. */
  isLast?: boolean
}

/** A fixed, non-configurable opt-in row (Sefirat HaOmer / Eiruv Tavshilin)
 * — same toggle pattern as `NotificationRow`, minus the offset/time/edit/
 * delete affordances since these aren't user-editable. */
export const SpecialNotificationRow: React.FunctionComponent<
  SpecialNotificationRowProps
> = ({name, description, enabled, onToggle, isLast}) => (
  <ListRow
    leading={<ToggleSwitch value={enabled} onValueChange={onToggle} />}
    title={name}
    subtitle={description}
    isLast={isLast}
  />
)
