import React from 'react'
import type {Meta, StoryObj} from '@storybook/react-native-web-vite'
import {Card} from '../Card'
import {ConfirmPrompt} from './ConfirmPrompt'

const wait = (ms: number) =>
  new Promise<void>((resolve) => setTimeout(resolve, ms))

const meta = {
  title: 'Auth/ConfirmPrompt',
  component: ConfirmPrompt,
  parameters: {layout: 'padded'},
  decorators: [
    (Story) => (
      <Card maxWidth={420}>
        <Story />
      </Card>
    ),
  ],
  args: {
    title: 'Delete your account?',
    message:
      'This deletes your account for every app that uses it, along with everything saved to it. Your settings stay on this device.',
    confirmLabel: 'Delete account',
    destructive: true,
    onConfirm: () => wait(800),
    onCancel: () => {},
  },
} satisfies Meta<typeof ConfirmPrompt>
export default meta
type Story = StoryObj<typeof meta>

export const DeleteAccount: Story = {}
export const ReplaceSettings: Story = {
  args: {
    title: 'Use your account’s settings?',
    message:
      'This account already has settings saved. Signing in will replace the settings on this device with them.',
    confirmLabel: 'Replace my settings',
    destructive: false,
    secondaryAction: {
      title: 'Export this device’s settings',
      onPress: () => wait(500),
    },
  },
}
