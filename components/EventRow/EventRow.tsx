import React from 'react'
import {ListRow} from '../ListRow'

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
  // `hebrewDate` is pure Hebrew script (gematriya + month name) — RN's
  // default "natural" text alignment reads that as RTL and floats it to the
  // right edge of the text column even though the layout itself is LTR, so
  // it is pinned `left` to actually sit under `description`.
  <ListRow
    title={description}
    subtitle={hebrewDate}
    subtitleAlign="left"
    value={nextOccurrenceDate}
    actions={[{icon: 'delete', label: 'Delete event', onPress: onDelete}]}
    isLast={isLast}
  />
)
