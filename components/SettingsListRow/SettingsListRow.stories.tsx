import React from 'react'
import type {Meta, StoryObj} from '@storybook/react-native-web-vite'
import {Card} from '../Card'
import {SettingsListRow, SettingsListRowProps} from './SettingsListRow'

const meta = {
  title: 'Settings/SettingsListRow',
  component: SettingsListRow,
  parameters: {layout: 'padded'},
  args: {title: 'Nusach', value: 'Ashkenaz', onPress: () => {}},
  render: (args: SettingsListRowProps) => (
    <Card>
      <SettingsListRow {...args} />
    </Card>
  ),
} satisfies Meta<typeof SettingsListRow>
export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}
export const Disabled: Story = {args: {disabled: true}}
