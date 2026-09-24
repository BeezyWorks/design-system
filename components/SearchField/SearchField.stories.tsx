import React, {useState} from 'react'
import type {Meta, StoryObj} from '@storybook/react-native-web-vite'
import {Stack} from '../Stack'
import {SearchField, SearchFieldProps} from './SearchField'

const Controlled = (args: SearchFieldProps) => {
  const [value, setValue] = useState(args.value ?? '')
  return (
    <Stack width={320}>
      <SearchField {...args} value={value} onChangeText={setValue} />
    </Stack>
  )
}

const meta = {
  title: 'Controls/SearchField',
  component: SearchField,
  parameters: {layout: 'padded'},
  args: {placeholder: 'Search'},
  render: (args) => <Controlled {...args} />,
} satisfies Meta<typeof SearchField>
export default meta
type Story = StoryObj<typeof meta>

export const Empty: Story = {}
export const Filled: Story = {args: {value: 'berakhot'}}
export const Hebrew: Story = {args: {placeholder: 'חיפוש', value: 'ברכות'}}
