import React from 'react'
import type {Meta, StoryObj} from '@storybook/react-native-web-vite'
import {Stack} from '../Stack'
import {ScreenLoader} from './ScreenLoader'

const meta = {
  title: 'Feedback/ScreenLoader',
  component: ScreenLoader,
  parameters: {layout: 'fullscreen'},
  // Absolutely positioned — needs a sized, positioned parent.
  render: () => (
    <Stack height={320}>
      <ScreenLoader />
    </Stack>
  ),
} satisfies Meta<typeof ScreenLoader>
export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}
