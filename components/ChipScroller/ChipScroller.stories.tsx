import React, {useState} from 'react'
import type {Meta, StoryObj} from '@storybook/react-native-web-vite'
import {RtlScope} from '../../layout'
import {Chip} from '../Chip'
import {ChipScroller} from './ChipScroller'

const meta = {
  title: 'Controls/ChipScroller',
  component: ChipScroller,
  parameters: {layout: 'padded'},
} satisfies Meta<typeof ChipScroller>
export default meta
type Story = StoryObj<typeof meta>

const OPTIONS = [
  'ברכות',
  'שבת',
  'עירובין',
  'פסחים',
  'שקלים',
  'יומא',
  'סוכה',
  'ביצה',
  'ראש השנה',
  'תענית',
]

const Filters = (args: React.ComponentProps<typeof ChipScroller>) => {
  const [on, setOn] = useState<string[]>(['שבת'])
  const toggle = (o: string) =>
    setOn((cur) => (cur.includes(o) ? cur.filter((x) => x !== o) : [...cur, o]))
  return (
    <ChipScroller {...args}>
      {OPTIONS.map((o) => (
        <Chip
          key={o}
          label={o}
          check
          selected={on.includes(o)}
          onPress={() => toggle(o)}
        />
      ))}
    </ChipScroller>
  )
}

/** Multi-select filters: selected chips carry a check; the strip fades on
 * the side that has more. */
export const MultiSelect: Story = {render: (args) => <Filters {...args} />}
export const RightToLeft: Story = {
  render: (args) => (
    <RtlScope>
      <Filters {...args} />
    </RtlScope>
  ),
}
