import React from 'react'
import type {Meta, StoryObj} from '@storybook/react-native-web-vite'
import {Card} from '../Card'
import {MenuItemRow, MenuItemRowProps} from './MenuItemRow'

const meta = {
  title: 'Menus/MenuItemRow',
  component: MenuItemRow,
  parameters: {layout: 'padded'},
  args: {label: 'שחרית', onPress: () => {}},
  render: (args: MenuItemRowProps) => (
    <Card>
      <MenuItemRow {...args} />
    </Card>
  ),
} satisfies Meta<typeof MenuItemRow>
export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}
export const LastRowNoDivider: Story = {args: {isLast: true}}
