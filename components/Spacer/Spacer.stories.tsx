import React from 'react'
import type {Meta, StoryObj} from '@storybook/react-native-web-vite'
import {SemanticColor} from '../../colors'
import {Stack} from '../Stack'
import {Text} from '../Text'
import {Spacer} from './Spacer'

const meta = {
  title: 'Primitives/Spacer',
  component: Spacer,
  parameters: {layout: 'padded'},
  argTypes: {
    size: {
      control: 'select',
      options: ['none', 'xs', 'sm', 'md', 'lg', 'xl', 'xxl'],
    },
  },
} satisfies Meta<typeof Spacer>
export default meta
type Story = StoryObj<typeof meta>

const Chip = ({label}: {label: string}) => (
  <Stack background={SemanticColor.AccentTint} padding="sm" radius="sm">
    <Text variant="label" color={SemanticColor.TextAccent}>
      {label}
    </Text>
  </Stack>
)

export const Fixed: Story = {
  args: {size: 'lg'},
  render: (args) => (
    <Stack direction="row" align="center">
      <Chip label="before" />
      <Spacer {...args} />
      <Chip label="after" />
    </Stack>
  ),
}

export const GrowPushesApart: Story = {
  args: {grow: true},
  render: (args) => (
    <Stack direction="row" align="center" width={360}>
      <Chip label="start" />
      <Spacer {...args} />
      <Chip label="end" />
    </Stack>
  ),
}
