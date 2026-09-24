import React from 'react'
import type {Meta, StoryObj} from '@storybook/react-native-web-vite'
import {Text} from '../Text'
import {Screen, ScreenProps} from './Screen'

const meta = {
  title: 'Layout/Screen',
  component: Screen,
  parameters: {layout: 'fullscreen'},
  args: {
    children: (
      <>
        <Text variant="pageHeader">Screen</Text>
        <Text variant="detail">
          Safe-area handling, surface background and (on web) the reading-width
          cap. Outside a tab navigator it reserves no tab-bar room.
        </Text>
      </>
    ),
  },
  render: (args: ScreenProps) => <Screen {...args} />,
} satisfies Meta<typeof Screen>
export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}
