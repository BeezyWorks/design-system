import React from 'react'
import type {Meta, StoryObj} from '@storybook/react-native-web-vite'
import {Stack} from '../Stack'
import {Text} from '../Text'
import {Scrim} from './Scrim'

const meta = {
  title: 'Overlays/Scrim',
  component: Scrim,
  parameters: {layout: 'padded'},
  args: {onPress: () => {}},
  argTypes: {opacity: {control: {type: 'range', min: 0, max: 1, step: 0.05}}},
  render: (args) => (
    <Stack
      height={200}
      align="center"
      justify="center"
      radius="md"
      overflow="hidden"
    >
      <Text>Content underneath the scrim</Text>
      <Scrim {...args} />
    </Stack>
  ),
} satisfies Meta<typeof Scrim>
export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}
export const Light: Story = {args: {opacity: 0.3}}
