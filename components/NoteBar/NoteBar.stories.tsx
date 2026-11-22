import React, {useState} from 'react'
import type {Meta, StoryObj} from '@storybook/react-native-web-vite'
import {Stack} from '../Stack'
import {NoteBar, NoteBarProps} from './NoteBar'

const Stateful = (args: NoteBarProps) => {
  const [note, setNote] = useState(args.note)
  return (
    <Stack height={240}>
      <NoteBar
        {...args}
        note={note}
        onSave={(text) =>
          setNote(text.trim() ? {text, updatedAt: Date.now()} : undefined)
        }
        onDelete={() => setNote(undefined)}
      />
    </Stack>
  )
}

const meta = {
  title: 'Feedback/NoteBar',
  component: NoteBar,
  parameters: {layout: 'fullscreen'},
  args: {onSave: () => {}, onDelete: () => {}},
  render: (args) => <Stateful {...args} />,
} satisfies Meta<typeof NoteBar>
export default meta
type Story = StoryObj<typeof meta>

export const Empty: Story = {}
export const WithNote: Story = {
  args: {
    note: {
      text: 'The Rambam holds like Rabbi Yehuda here; compare the sugya in Pesachim.',
      updatedAt: 1_700_000_000_000,
    },
  },
}
