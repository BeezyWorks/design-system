import React from 'react'
import type {Meta, StoryObj} from '@storybook/react-native-web-vite'
import {SemanticColor} from '../../colors'
import {Text} from '../Text'
import {Card} from './Card'

const meta = {
  title: 'Primitives/Card',
  component: Card,
  parameters: {layout: 'padded'},
  args: {
    gap: 'xs',
    children: (
      <>
        <Text variant="headline">Card title</Text>
        <Text variant="detail">
          The one raised-surface primitive — surface, hairline border, radius
          and shadow come from tokens.
        </Text>
      </>
    ),
  },
  argTypes: {
    shadow: {
      control: 'select',
      options: ['none', 'card', 'raised', 'floating'],
    },
    radius: {control: 'select', options: ['sm', 'md', 'lg', 'xl']},
    background: {
      control: 'select',
      options: [
        SemanticColor.SurfaceCard,
        SemanticColor.SurfaceBackground,
        SemanticColor.AccentTint,
      ],
    },
  },
} satisfies Meta<typeof Card>
export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}
export const Flat: Story = {args: {shadow: 'none'}}
export const Tinted: Story = {args: {background: SemanticColor.AccentTint}}
