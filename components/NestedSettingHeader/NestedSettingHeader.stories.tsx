import React from 'react'
import type {Meta, StoryObj} from '@storybook/react-native-web-vite'
import {Card} from '../Card'
import {
  NestedSettingHeader,
  NestedSettingHeaderProps,
} from './NestedSettingHeader'

const meta = {
  title: 'Settings/NestedSettingHeader',
  component: NestedSettingHeader,
  parameters: {layout: 'padded'},
  args: {title: 'Notifications', onPress: () => {}},
  render: (args: NestedSettingHeaderProps) => (
    <Card>
      <NestedSettingHeader {...args} />
    </Card>
  ),
} satisfies Meta<typeof NestedSettingHeader>
export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}
