import React from 'react'
import {View} from 'react-native'
import {radius} from '../../radius'
import {SemanticColor} from '../../colors'
import {useColorResolver} from '../../theme'

export interface EventDotProps {
  color: SemanticColor
  size?: number
}

/** A small round color marker — a calendar event, a status. Usually one of
 * the `Accent*` colors. */
export const EventDot: React.FunctionComponent<EventDotProps> = ({
  color,
  size = 8,
}) => {
  const resolve = useColorResolver()
  return (
    <View
      style={{
        width: size,
        height: size,
        borderRadius: radius.full,
        backgroundColor: resolve(color),
      }}
    />
  )
}
