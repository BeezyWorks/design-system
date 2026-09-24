import type {Meta, StoryObj} from '@storybook/react-native-web-vite'
import {eventCategoryColors} from '../../colors'
import {CalendarGrid} from './CalendarGrid'

const meta = {
  title: 'Luach/CalendarGrid',
  component: CalendarGrid,
  parameters: {layout: 'padded'},
  args: {current: '2026-09-01'},
} satisfies Meta<typeof CalendarGrid>
export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}
export const MarkedDates: Story = {
  args: {
    markedDates: {
      '2026-09-12': {marked: true, dotColor: eventCategoryColors.fastDay},
      '2026-09-23': {selected: true},
    },
  },
}
