import React from 'react'
import type {Meta, StoryObj} from '@storybook/react-native-web-vite'
import {GradientCard} from '../GradientCard'
import {Badge} from './Badge'

const meta = {
  title: 'Primitives/Badge',
  component: Badge,
  parameters: {layout: 'padded'},
  args: {label: '3/9', tone: 'neutral'},
  argTypes: {
    tone: {
      control: 'select',
      options: ['neutral', 'accent', 'success', 'onAccent'],
    },
  },
} satisfies Meta<typeof Badge>
export default meta
type Story = StoryObj<typeof meta>

export const Neutral: Story = {}
export const Accent: Story = {
  args: {tone: 'accent', label: 'Learn', icon: 'chevron-left'},
}
export const Success: Story = {args: {tone: 'success', label: '9/9'}}
export const OnAccent: Story = {
  args: {tone: 'onAccent', label: 'Resume', icon: 'chevron-left'},
  render: (args) => (
    <GradientCard>
      <Badge {...args} />
    </GradientCard>
  ),
}
