import React from 'react'
import type {Meta, StoryObj} from '@storybook/react-native-web-vite'
import {SemanticColor} from '../../colors'
import {useResolvedColor} from '../../theme'
import {CalendarGrid} from './CalendarGrid'

const meta = {
  title: 'Calendar/CalendarGrid',
  component: CalendarGrid,
  parameters: {layout: 'padded'},
  args: {current: '2026-09-01'},
} satisfies Meta<typeof CalendarGrid>
export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}

const Marked = (args: React.ComponentProps<typeof CalendarGrid>) => {
  // The calendar library wants a plain color string for its dots.
  const dotColor = useResolvedColor(SemanticColor.AccentDanger)
  return (
    <CalendarGrid
      {...args}
      markedDates={{
        '2026-09-12': {marked: true, dotColor},
        '2026-09-23': {selected: true},
      }}
    />
  )
}
export const MarkedDates: Story = {render: (args) => <Marked {...args} />}
