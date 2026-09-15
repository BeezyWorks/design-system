import React from 'react'
import {View} from 'react-native'
import {spacing, SpacingToken} from '../../spacing'

export interface SpacerProps {
  size?: SpacingToken
  /** Grows to fill remaining space along the parent's main axis. */
  grow?: boolean
}

/** A fixed or flexible gap — use instead of a bare `margin` on a sibling. */
export const Spacer: React.FunctionComponent<SpacerProps> = ({
  size = 'md',
  grow,
}) => (
  <View
    style={grow ? {flexGrow: 1} : {width: spacing[size], height: spacing[size]}}
  />
)
