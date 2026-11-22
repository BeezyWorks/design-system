import React from 'react'
import type {Meta, StoryObj} from '@storybook/react-native-web-vite'
import {Stack} from '../Stack'
import {Toast} from './Toast'

const meta = {
  title: 'Feedback/Toast',
  component: Toast,
  parameters: {layout: 'fullscreen'},
  args: {
    visible: true,
    message: 'Marked כב. learned',
    actionLabel: 'Undo',
    onAction: () => {},
    // Stays up in the story.
    duration: 0,
    bottomOffset: 24,
  },
  render: (args) => (
    <Stack height={240}>
      <Toast {...args} />
    </Stack>
  ),
} satisfies Meta<typeof Toast>
export default meta
type Story = StoryObj<typeof meta>

export const WithAction: Story = {}
export const MessageOnly: Story = {args: {actionLabel: undefined}}
export const Hebrew: Story = {
  args: {message: 'סומן פרק א כנלמד', actionLabel: 'בטל', rtl: true},
}
