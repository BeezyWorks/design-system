import React, {useState} from 'react'
import type {Meta, StoryObj} from '@storybook/react-native-web-vite'
import {Stack} from '../Stack'
import {TextField, TextFieldProps} from './TextField'

const Controlled = (args: TextFieldProps) => {
  const [value, setValue] = useState(args.value ?? '')
  return (
    <Stack width={320}>
      <TextField {...args} value={value} onChangeText={setValue} />
    </Stack>
  )
}

const meta = {
  title: 'Controls/TextField',
  component: TextField,
  parameters: {layout: 'padded'},
  args: {placeholder: 'Name'},
  argTypes: {
    align: {control: 'inline-radio', options: ['left', 'right', 'center']},
  },
  render: (args) => <Controlled {...args} />,
} satisfies Meta<typeof TextField>
export default meta
type Story = StoryObj<typeof meta>

export const Empty: Story = {}
export const Filled: Story = {args: {value: 'Moshe ben Sarah'}}
export const RightAligned: Story = {
  args: {align: 'right', placeholder: 'שם', value: 'משה בן שרה'},
}
