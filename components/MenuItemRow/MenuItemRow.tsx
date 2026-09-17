import React from 'react'
import {ChevronLeft} from 'lucide-react-native'
import {Stack} from '../Stack'
import {Text} from '../Text'
import {Touchable} from '../Touchable'
import {useColors} from '../../colors'

export interface MenuItemRowProps {
  label: string
  onPress: () => void
  /** Omits the bottom divider — set on the last row in a section. */
  isLast?: boolean
}

/** A single tappable row in a `MenuSection` card — the Books/Siddur menu
 * list pattern. RTL layout (label on the right, chevron on the left),
 * hairline divider between rows, omitted on the last one. */
export const MenuItemRow: React.FunctionComponent<MenuItemRowProps> = ({
  label,
  onPress,
  isLast,
}) => {
  const colors = useColors()
  return (
    <Touchable onPress={onPress}>
      <Stack
        direction="rowReverse"
        align="center"
        justify="spaceBetween"
        paddingVertical={13}
        borderBottomWidth={isLast ? 'none' : 1}
        borderColor="border"
      >
        <Text variant="item">{label}</Text>
        <Stack opacity={0.35}>
          <ChevronLeft size={14} color={colors.ink} />
        </Stack>
      </Stack>
    </Touchable>
  )
}
