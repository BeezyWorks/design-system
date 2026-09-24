import React from 'react'
import type {Meta, StoryObj} from '@storybook/react-native-web-vite'
import {SemanticColor} from '../../colors'
import {Text} from '../Text'
import {DarkSurface} from './DarkSurface'

const meta = {
  title: 'Layout/DarkSurface',
  component: DarkSurface,
  parameters: {layout: 'padded'},
  args: {
    height: 140,
    children: (
      <Text color={SemanticColor.TextOnPhoto}>On the dark panel surface</Text>
    ),
  },
  argTypes: {
    radius: {control: 'select', options: ['sm', 'md', 'lg', 'xl']},
    shadow: {
      control: 'select',
      options: ['none', 'card', 'raised', 'floating'],
    },
  },
} satisfies Meta<typeof DarkSurface>
export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}
export const Raised: Story = {args: {shadow: 'raised'}}
