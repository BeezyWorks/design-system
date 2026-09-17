import React from 'react'
import {Card} from '../Card'
import {Text} from '../Text'
import {Stack} from '../Stack'
import {MenuItemRow} from '../MenuItemRow'

export interface MenuItem {
  key: string
  label: string
  onPress: () => void
}

export interface MenuSectionProps {
  title: string
  items: MenuItem[]
}

/** A titled card of tappable rows — the Books/Siddur menu pattern. Built on
 * the shared `Card` primitive so it's visually identical to a Settings
 * section. */
export const MenuSection: React.FunctionComponent<MenuSectionProps> = ({
  title,
  items,
}) => (
  <Card gap="xs">
    <Text variant="sectionHeader" align="right">
      {title}
    </Text>
    <Stack>
      {items.map((item, index) => (
        <MenuItemRow
          key={item.key}
          label={item.label}
          onPress={item.onPress}
          isLast={index === items.length - 1}
        />
      ))}
    </Stack>
  </Card>
)
