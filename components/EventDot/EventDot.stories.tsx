import React from 'react'
import type {Meta, StoryObj} from '@storybook/react-native-web-vite'
import {SemanticColor, eventCategoryColors, EventCategory} from '../../colors'
import {Stack} from '../Stack'
import {Text} from '../Text'
import {EventDot} from './EventDot'

const categories = Object.keys(eventCategoryColors) as EventCategory[]

const meta = {
  title: 'Primitives/EventDot',
  component: EventDot,
  parameters: {layout: 'padded'},
  args: {category: 'yomTov', size: 8},
  argTypes: {
    category: {control: 'select', options: categories},
    size: {control: {type: 'range', min: 6, max: 32}},
  },
} satisfies Meta<typeof EventDot>
export default meta
type Story = StoryObj<typeof meta>

export const Playground: Story = {}
export const AllCategories: Story = {
  render: (args) => (
    <Stack gap="sm">
      {categories.map((category) => (
        <Stack key={category} direction="row" gap="sm" align="center">
          <EventDot {...args} category={category} size={12} />
          <Text variant="label" color={SemanticColor.TextPrimary}>
            {category}
          </Text>
        </Stack>
      ))}
    </Stack>
  ),
}
