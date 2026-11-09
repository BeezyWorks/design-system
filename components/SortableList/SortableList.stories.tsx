import React, {useState} from 'react'
import type {Meta, StoryObj} from '@storybook/react-native-web-vite'
import {SettingsCard} from '../SettingsCard'
import {SortableList} from './SortableList'

const meta = {
  title: 'Settings/SortableList',
  component: SortableList,
  parameters: {layout: 'padded'},
  args: {items: [], onReorder: () => {}},
} satisfies Meta<typeof SortableList>
export default meta
type Story = StoryObj<typeof meta>

const COMMENTARIES = [
  {key: 'bartenura', label: 'ברטנורא', rtl: true},
  {key: 'rambam', label: 'רמב״ם', rtl: true},
  {key: 'yachin', label: 'יכין', rtl: true},
  {key: 'tyt', label: 'עיקר תוספות יום טוב', rtl: true},
]

const Demo = () => {
  const [items, setItems] = useState(COMMENTARIES)
  return (
    <SettingsCard title="סדר הפירושים">
      <SortableList
        items={items}
        onReorder={(keys) =>
          setItems(keys.map((k) => items.find((i) => i.key === k)!))
        }
      />
    </SettingsCard>
  )
}

/** Drag a grip, or focus it and press the arrow keys. */
export const InSettingsCard: Story = {render: () => <Demo />}

export const LeftToRight: Story = {
  args: {
    items: [
      {key: 'a', label: 'Bartenura'},
      {key: 'b', label: 'Rambam'},
      {key: 'c', label: 'Yachin'},
    ],
  },
}
