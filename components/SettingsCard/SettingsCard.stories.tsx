import React from 'react'
import type {Meta, StoryObj} from '@storybook/react-native-web-vite'
import {Text} from '../Text'
import {SettingsListRow} from '../SettingsListRow'
import {ToggleSetting} from '../ToggleSetting'
import {SettingsCard} from './SettingsCard'

const meta = {
  title: 'Settings/SettingsCard',
  component: SettingsCard,
  parameters: {layout: 'padded'},
  args: {
    title: 'Display',
    children: (
      <>
        <ToggleSetting title="Show nekudos" enabled onSwitch={() => {}} />
        <SettingsListRow title="Text size" value="Large" onPress={() => {}} />
      </>
    ),
  },
} satisfies Meta<typeof SettingsCard>
export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}
export const Untitled: Story = {
  args: {title: undefined, children: <Text>Just content in a card.</Text>},
}
