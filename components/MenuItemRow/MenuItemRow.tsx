import React from 'react'
import {ChevronLeft} from 'lucide-react-native'
import {Stack} from '../Stack'
import {Text} from '../Text'
import {Touchable} from '../Touchable'
import {SemanticColor} from '../../colors'
import {useColorResolver} from '../../theme'

export interface MenuItemRowProps {
  label: string
  /** A quieter second line under the label (a count, a summary). */
  detail?: string
  onPress: () => void
  /** Omits the bottom divider — set on the last row in a section. */
  isLast?: boolean
}

/** A single tappable row in a `MenuSection` card — the menu
 * list pattern. RTL layout (label on the right, chevron on the left, an
 * optional `detail` line under the label),
 * hairline divider between rows, omitted on the last one. */
export const MenuItemRow: React.FunctionComponent<MenuItemRowProps> = ({
  label,
  detail,
  onPress,
  isLast,
}) => {
  const resolve = useColorResolver()
  return (
    <Touchable onPress={onPress}>
      <Stack
        direction="rowReverse"
        align="center"
        justify="spaceBetween"
        paddingVertical={13}
        borderBottomWidth={isLast ? 'none' : 1}
        borderColor={SemanticColor.BorderDefault}
      >
        <Stack gap="xs">
          <Text variant="item" rtl>{label}</Text>
          {detail !== undefined && <Text variant="detail" rtl>{detail}</Text>}
        </Stack>
        <Stack opacity={0.35}>
          <ChevronLeft size={14} color={resolve(SemanticColor.TextPrimary)} />
        </Stack>
      </Stack>
    </Touchable>
  )
}
