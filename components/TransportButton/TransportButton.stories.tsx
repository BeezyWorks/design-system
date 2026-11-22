import React from 'react'
import type {Meta, StoryObj} from '@storybook/react-native-web-vite'
import {Stack} from '../Stack'
import {TransportButton} from './TransportButton'

const meta = {
  title: 'Media/TransportButton',
  component: TransportButton,
  parameters: {layout: 'padded'},
  args: {kind: 'play', label: 'Play', size: 'md'},
} satisfies Meta<typeof TransportButton>
export default meta
type Story = StoryObj<typeof meta>

export const Play: Story = {}
export const Pause: Story = {args: {kind: 'pause', label: 'Pause'}}
export const Skip: Story = {
  args: {kind: 'skip-back', label: 'Back 15 seconds', seconds: 15},
}

export const Player: Story = {
  render: () => (
    <Stack direction="row" align="center" gap="md">
      <TransportButton kind="skip-back" seconds={15} label="Back 15 seconds" />
      <TransportButton kind="pause" size="lg" label="Pause" />
      <TransportButton
        kind="skip-forward"
        seconds={30}
        label="Forward 30 seconds"
      />
    </Stack>
  ),
}
