import React from 'react'
import type {Meta, StoryObj} from '@storybook/react-native-web-vite'
import {Stack} from '../Stack'
import {Text} from '../Text'
import {AlertCard} from './AlertCard'

const meta = {
  title: 'Overlays/AlertCard',
  component: AlertCard,
  parameters: {layout: 'fullscreen'},
  args: {
    title: 'Delete notification?',
    onDismissBackground: () => {},
    children: (
      <Stack padding="md">
        <Text>This can't be undone.</Text>
      </Stack>
    ),
  },
  render: (args) => (
    <Stack height={480}>
      <AlertCard {...args} />
    </Stack>
  ),
} satisfies Meta<typeof AlertCard>
export default meta
type Story = StoryObj<typeof meta>

export const Titled: Story = {}
export const Untitled: Story = {args: {title: undefined}}
