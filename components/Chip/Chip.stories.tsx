import React, {useState} from 'react'
import type {Meta, StoryObj} from '@storybook/react-native-web-vite'
import {Stack} from '../Stack'
import {Chip} from './Chip'

const meta = {
  title: 'Controls/Chip',
  component: Chip,
  parameters: {layout: 'padded'},
  args: {label: 'Filter', selected: false, onPress: () => {}},
} satisfies Meta<typeof Chip>
export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}
export const Selected: Story = {args: {selected: true}}

const Strip = () => {
  const [page, setPage] = useState(1)
  return (
    <Stack direction="rowReverse" gap="xs">
      {['א', 'ב', 'ג', 'ד', 'ה'].map((label, i) => (
        <Chip
          key={label}
          label={label}
          selected={page === i + 1}
          onPress={() => setPage(i + 1)}
        />
      ))}
    </Stack>
  )
}
export const PageStrip: Story = {render: () => <Strip />}
