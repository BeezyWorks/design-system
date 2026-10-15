import React from 'react'
import type {Meta, StoryObj} from '@storybook/react-native-web-vite'
import {Button} from '../Button'
import {Stack} from '../Stack'
import {AccountCard} from './AccountCard'

const actions = (
  <Stack gap="xs">
    <Button title="Sign out" variant="outline" fullWidth onPress={() => {}} />
    <Button
      title="Delete account"
      variant="destructiveGhost"
      fullWidth
      onPress={() => {}}
    />
  </Stack>
)

const meta = {
  title: 'Auth/AccountCard',
  component: AccountCard,
  parameters: {layout: 'padded'},
  args: {onSignIn: () => {}},
} satisfies Meta<typeof AccountCard>
export default meta
type Story = StoryObj<typeof meta>

export const SignedOut: Story = {}
export const SignedIn: Story = {
  args: {
    user: {name: 'Rivka Cohen', email: 'rivka@example.com'},
    status: 'Synced just now',
    children: actions,
  },
}
export const NeedsUpdate: Story = {
  args: {
    user: {email: 'dovid@example.com'},
    status: 'Update the app to keep syncing',
    statusTone: 'warning',
    children: actions,
  },
}
