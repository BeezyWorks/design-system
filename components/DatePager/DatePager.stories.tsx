import type {Meta, StoryObj} from '@storybook/react-native-web-vite'
import {DatePager} from './DatePager'

const noop = () => {}

const meta = {
  title: 'Calendar/DatePager',
  component: DatePager,
  parameters: {layout: 'padded'},
  args: {
    weekday: 'Fri',
    hebrewDate: 'יט חשון',
    civilDate: '30 October 2026',
    onPrevious: noop,
    onNext: noop,
    onPressDate: noop,
    previousLabel: 'Previous day',
    nextLabel: 'Next day',
    pickDateLabel: 'Choose a date',
  },
} satisfies Meta<typeof DatePager>
export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}
