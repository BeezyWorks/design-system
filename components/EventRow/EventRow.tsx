import React from 'react'
import {Stack} from '../Stack'
import {Text} from '../Text'
import {IconButton} from '../IconButton'

export interface EventRowProps {
  description: string
  hebrewDate: string
  /** The Gregorian date of this event's next upcoming occurrence — not
   * the date it was originally saved with. */
  nextOccurrenceDate: string
  onDelete: () => void
  /** Omits the bottom divider — set on the last row in a card. */
  isLast?: boolean
}

/** One user event: title/Hebrew date, the next Gregorian occurrence
 * trailing on the right, then delete — same layout as `NotificationRow`,
 * minus the enable toggle and edit action neither of which events have
 * yet. */
export const EventRow: React.FunctionComponent<EventRowProps> = ({
  description,
  hebrewDate,
  nextOccurrenceDate,
  onDelete,
  isLast,
}) => (
  <Stack
    direction="row"
    align="center"
    gap="sm"
    paddingVertical="sm"
    borderBottomWidth={isLast ? 'none' : 1}
    borderColor="border"
  >
    <Stack grow width={0} gap="xs">
      <Text variant="itemHeader">{description}</Text>
      {/* `hebrewDate` is pure Hebrew script (gematriya + month name) — RN's
          default "natural" text alignment reads that as RTL and floats it
          to the right edge of this column even though the layout itself is
          LTR, so it needs to be pinned `left` to actually sit under
          `description` instead of drifting away from it. */}
      <Text variant="detail" align="left">
        {hebrewDate}
      </Text>
    </Stack>
    <Text variant="supplemental" align="right">
      {nextOccurrenceDate}
    </Text>
    <Stack direction="row">
      <IconButton
        name="delete"
        size={20}
        tone="secondaryTextColor"
        onPress={onDelete}
        accessibilityLabel="Delete event"
      />
    </Stack>
  </Stack>
)
