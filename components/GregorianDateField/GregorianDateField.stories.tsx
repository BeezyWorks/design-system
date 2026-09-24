import React, {useState} from 'react'
import type {Meta, StoryObj} from '@storybook/react-native-web-vite'
import {Stack} from '../Stack'
import {GregorianDateField} from './GregorianDateField'

const Demo = () => {
  const [value, setValue] = useState(new Date(2026, 8, 23))
  return (
    <Stack width={260}>
      <GregorianDateField value={value} onChange={setValue} />
    </Stack>
  )
}

const meta = {
  title: 'Calendar/GregorianDateField',
  parameters: {layout: 'padded'},
} satisfies Meta
export default meta
type Story = StoryObj<typeof meta>

/** Web renders a native `<input type="date">`; native platforms use the OS picker. */
export const Default: Story = {render: () => <Demo />}
