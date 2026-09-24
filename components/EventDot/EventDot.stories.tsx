import React from 'react'
import type {Meta, StoryObj} from '@storybook/react-native-web-vite'
import {SemanticColor} from '../../colors'
import {Stack} from '../Stack'
import {Text} from '../Text'
import {EventDot} from './EventDot'

const accents = Object.keys(SemanticColor).filter((key) =>
  key.startsWith('Accent'),
) as Array<keyof typeof SemanticColor>

const meta = {
  title: 'Primitives/EventDot',
  component: EventDot,
  parameters: {layout: 'padded'},
  args: {color: SemanticColor.AccentInfo, size: 8},
  argTypes: {
    color: {control: 'select', options: Object.values(SemanticColor)},
    size: {control: {type: 'range', min: 6, max: 32}},
  },
} satisfies Meta<typeof EventDot>
export default meta
type Story = StoryObj<typeof meta>

export const Playground: Story = {}
export const AllAccents: Story = {
  render: (args) => (
    <Stack gap="sm">
      {accents.map((name) => (
        <Stack key={name} direction="row" gap="sm" align="center">
          <EventDot {...args} color={SemanticColor[name]} size={12} />
          <Text variant="label" color={SemanticColor.TextPrimary}>
            {name}
          </Text>
        </Stack>
      ))}
    </Stack>
  ),
}
