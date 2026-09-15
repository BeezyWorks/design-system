import React from 'react'
import {Stack} from '../Stack'
import {Text} from '../Text'
import {Touchable} from '../Touchable'

export interface MenuItem {
  key: string
  label: string
  onPress: () => void
}

export interface MenuSectionProps {
  title: string
  items: MenuItem[]
}

/** A titled list of tappable rows with a trailing accent bar — the RTL menu
 * pattern shared by the Books and Siddur (tefila) list screens. */
export const MenuSection: React.FunctionComponent<MenuSectionProps> = ({
  title,
  items,
}) => (
  <Stack>
    <Text variant="titleLarge" tone="secondaryTextColor" align="right">
      {title}{' '}
    </Text>
    <Stack direction="rowReverse" paddingBottom="xl">
      <Stack grow>
        {items.map((item) => (
          <Touchable key={item.key} onPress={item.onPress}>
            <Stack paddingVertical="md" paddingEnd="md">
              <Text align="right">{item.label}</Text>
            </Stack>
          </Touchable>
        ))}
      </Stack>
      <Stack
        width={3}
        radius="sm"
        background="secondaryTextColor"
        position="absolute"
        top="md"
        bottom="md"
        left="none"
      />
    </Stack>
  </Stack>
)
