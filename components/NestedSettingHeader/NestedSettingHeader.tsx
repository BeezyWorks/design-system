import React from 'react'
import {Stack} from '../Stack'
import {Text} from '../Text'
import {Touchable} from '../Touchable'
import {Icon} from '../Icon'

export interface NestedSettingHeaderProps {
  title: string
  onPress: () => void
}

/** A tappable row that drills into a nested settings screen — title on one
 * side, a trailing chevron on the other. */
export const NestedSettingHeader: React.FunctionComponent<
  NestedSettingHeaderProps
> = ({title, onPress}) => (
  <Touchable onPress={onPress}>
    <Stack
      direction="row"
      justify="spaceBetween"
      align="center"
      paddingVertical="sm"
    >
      <Text variant="headline">{title}</Text>
      <Icon name="chevron-right" size={22} />
    </Stack>
  </Touchable>
)
