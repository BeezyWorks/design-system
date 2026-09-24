import React, {useState} from 'react'
import type {Meta, StoryObj} from '@storybook/react-native-web-vite'
import {ToggleSwitch, ToggleSwitchProps} from './ToggleSwitch'

const Controlled = (args: ToggleSwitchProps) => {
  const [value, setValue] = useState(args.value)
  return <ToggleSwitch {...args} value={value} onValueChange={setValue} />
}

const meta = {
  title: 'Controls/ToggleSwitch',
  component: ToggleSwitch,
  parameters: {layout: 'padded'},
  args: {value: true, onValueChange: () => {}},
  render: (args) => <Controlled {...args} />,
} satisfies Meta<typeof ToggleSwitch>
export default meta
type Story = StoryObj<typeof meta>

export const On: Story = {}
export const Off: Story = {args: {value: false}}
export const Disabled: Story = {args: {disabled: true}}
