import React from 'react'
import type {Meta, StoryObj} from '@storybook/react-native-web-vite'
import {Card} from '../Card'
import {EventRow, EventRowProps} from './EventRow'

const meta = {
  title: 'Rows/EventRow',
  component: EventRow,
  parameters: {layout: 'padded'},
  args: {
    description: 'Yahrtzeit — Zeide',
    hebrewDate: 'ט״ו אדר',
    nextOccurrenceDate: 'Mar 14, 2027',
    onDelete: () => {},
  },
  render: (args: EventRowProps) => (
    <Card>
      <EventRow {...args} />
    </Card>
  ),
} satisfies Meta<typeof EventRow>
export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}
export const LongDescription: Story = {
  args: {
    description:
      'Yahrtzeit of my grandfather of blessed memory, observed at the Hebrew date',
  },
}
