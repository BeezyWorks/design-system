import React from 'react'
import {Stack} from '../Stack'
import {Text} from '../Text'
import {IconButton} from '../IconButton'

export interface EventRowProps {
  description: string
  gregorianDate: string
  hebrewDate: string
  thisYearGregorianDate: string
  onDelete: () => void
}

/** One row in the User Events list: description, the event's Gregorian and
 * Hebrew dates, this (Hebrew) year's matching Gregorian date, and a
 * trailing delete action. */
export const EventRow: React.FunctionComponent<EventRowProps> = ({
  description,
  gregorianDate,
  hebrewDate,
  thisYearGregorianDate,
  onDelete,
}) => (
  <Stack direction="row" justify="spaceBetween" paddingVertical="xs">
    <Stack>
      <Text variant="label" tone="secondaryTextColor" align="left">
        {description}
      </Text>
      <Text variant="subheader" align="left">
        {gregorianDate}
      </Text>
      <Stack direction="row" gap="xs">
        <Text variant="subheader" align="left">
          {hebrewDate}
        </Text>
        <Text variant="caption" tone="secondaryTextColor" align="left">
          ({thisYearGregorianDate})
        </Text>
      </Stack>
    </Stack>
    <Stack justify="end">
      <IconButton
        name="delete"
        tone="danger"
        onPress={onDelete}
        accessibilityLabel="Delete event"
      />
    </Stack>
  </Stack>
)
