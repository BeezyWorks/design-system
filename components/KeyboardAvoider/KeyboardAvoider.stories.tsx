import React, {useState} from 'react'
import type {Meta, StoryObj} from '@storybook/react-native-web-vite'
import {Stack} from '../Stack'
import {Text} from '../Text'
import {TextField} from '../TextField'
import {KeyboardAvoider, KeyboardAvoiderProps} from './KeyboardAvoider'

const Form = (args: KeyboardAvoiderProps) => {
  const [value, setValue] = useState('')
  return (
    <Stack height={320} width={320}>
      <KeyboardAvoider {...args}>
        <Stack fill justify="spaceBetween" padding="md">
          <Text variant="detail">
            On iOS/Android the field below rides above the keyboard. Web: a
            no-op.
          </Text>
          <TextField
            value={value}
            onChangeText={setValue}
            placeholder="Add a note"
          />
        </Stack>
      </KeyboardAvoider>
    </Stack>
  )
}

const meta = {
  title: 'Layout/KeyboardAvoider',
  component: KeyboardAvoider,
  parameters: {layout: 'padded'},
  args: {offset: 0, enabled: true, children: null},
  render: (args) => <Form {...args} />,
} satisfies Meta<typeof KeyboardAvoider>
export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}
export const Disabled: Story = {args: {enabled: false}}
