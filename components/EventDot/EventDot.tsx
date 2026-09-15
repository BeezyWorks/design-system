import React from 'react'
import {View} from 'react-native'
import {radius} from '../../radius'
import {eventCategoryColors, EventCategory} from '../../colors'

export interface EventDotProps {
  category: EventCategory
  size?: number
}

/** The small calendar-event color marker — the one place
 * `eventCategoryColors` is read, so a category name is the only thing any
 * screen ever has to pass in. */
export const EventDot: React.FunctionComponent<EventDotProps> = ({
  category,
  size = 8,
}) => (
  <View
    style={{
      width: size,
      height: size,
      borderRadius: radius.full,
      backgroundColor: eventCategoryColors[category],
    }}
  />
)
