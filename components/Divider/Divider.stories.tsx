import React from 'react'
import type {Meta, StoryObj} from '@storybook/react-native-web-vite'
import {SemanticColor} from '../../colors'
import {Stack} from '../Stack'
import {Text} from '../Text'
import {Divider} from './Divider'

const meta = {
  title: 'Primitives/Divider',
  component: Divider,
  parameters: {layout: 'padded'},
  argTypes: {color: {control: 'select', options: Object.values(SemanticColor)}},
  render: (args) => (
    <Stack gap="sm" width={320}>
      <Text>Above</Text>
      <Divider {...args} />
      <Text>Below</Text>
    </Stack>
  ),
} satisfies Meta<typeof Divider>
export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}
export const Strong: Story = {args: {color: SemanticColor.BorderStrong}}
