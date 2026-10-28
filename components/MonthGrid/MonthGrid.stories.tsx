import type {Meta, StoryObj} from '@storybook/react-native-web-vite'
import {SemanticColor} from '../../colors'
import {MonthGrid} from './MonthGrid'

const meta = {
  title: 'Calendar/MonthGrid',
  component: MonthGrid,
  parameters: {layout: 'padded'},
  args: {
    month: new Date(2026, 9, 28, 12),
    today: new Date(2026, 9, 28, 12),
    selected: new Date(2026, 9, 29, 12),
    weekdayLabels: ['S', 'M', 'T', 'W', 'T', 'F', 'S'],
    marks: {
      '2026-10-03': [SemanticColor.EventHoliday],
      '2026-10-11': [SemanticColor.EventMinor],
      '2026-10-12': [SemanticColor.EventMinor, SemanticColor.EventFast],
      '2026-10-29': [SemanticColor.EventPersonal],
    },
    onDayPress: () => {},
  },
} satisfies Meta<typeof MonthGrid>
export default meta
type Story = StoryObj<typeof meta>

export const Month: Story = {}
export const Week: Story = {args: {mode: 'week'}}
export const Picker: Story = {
  args: {
    size: 'large',
    filled: 'selected',
    selected: new Date(2026, 9, 30, 12),
  },
}
export const Roomy: Story = {
  args: {
    size: 'roomy',
    labels: {
      '2026-10-03': [{text: 'שמיני עצרת', kind: 'holiday'}],
      '2026-10-10': [{text: 'נח'}],
      '2026-10-11': [{text: 'ראש חודש חשון', kind: 'minor'}],
      '2026-10-12': [
        {text: 'ראש חודש חשון', kind: 'minor'},
        {text: 'תענית שני', kind: 'fast'},
      ],
      '2026-10-29': [{text: 'Yahrzeit · Reb Yaakov', kind: 'personal'}],
    },
  },
  parameters: {layout: 'fullscreen'},
}
