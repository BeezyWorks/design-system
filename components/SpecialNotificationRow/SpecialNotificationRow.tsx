import React from 'react'
import {Stack} from '../Stack'
import {Text} from '../Text'
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
  <Stack
    direction="row"
    align="center"
    gap="sm"
    paddingVertical="sm"
    borderBottomWidth={isLast ? 'none' : 1}
    borderColor="border"
  >
    <ToggleSwitch value={enabled} onValueChange={onToggle} />
    {/* `width={0}` alongside `grow`: RN's yoga defaults to `flexShrink: 0`
        (unlike web flexbox), so a plain `grow` Stack won't shrink below its
        Hebrew/English text's natural width — it just overflows the row
        instead of wrapping. Starting the flex-basis at 0 forces it to size
        purely from its grow share, so the text wraps within that instead. */}
    <Stack grow width={0} gap="xs">
      <Text variant="itemHeader">{name}</Text>
      <Text variant="detail">{description}</Text>
    </Stack>
  </Stack>
)
