import React from 'react'
import type {Meta, StoryObj} from '@storybook/react-native-web-vite'
import {Stack} from '../Stack'
import {Text} from '../Text'
import {PanelScroll, PanelScrollProps} from './PanelScroll'

const lines = Array.from({length: 24}, (_, i) => `Line ${i + 1}`)

const meta = {
  title: 'Layout/PanelScroll',
  component: PanelScroll,
  parameters: {layout: 'padded'},
  args: {
    paddingVertical: 12,
    paddingHorizontal: 16,
    children: lines.map((line) => <Text key={line}>{line}</Text>),
  },
  render: (args: PanelScrollProps) => (
    <Stack height={260} width={320}>
      <PanelScroll {...args} />
    </Stack>
  ),
} satisfies Meta<typeof PanelScroll>
export default meta
type Story = StoryObj<typeof meta>

export const Scrolling: Story = {}
export const CenteredWhenShort: Story = {
  args: {
    centerContent: true,
    children: <Text>Short content stays centered</Text>,
  },
}
