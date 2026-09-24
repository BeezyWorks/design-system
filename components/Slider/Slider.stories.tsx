import React, {useState} from 'react'
import type {Meta, StoryObj} from '@storybook/react-native-web-vite'
import {GestureHandlerRootView} from 'react-native-gesture-handler'
import {Slider} from './Slider'

const Controlled = () => {
  const [value, setValue] = useState(19)
  return (
    <GestureHandlerRootView>
      <Slider
        value={value}
        min={14}
        max={28}
        onValueChange={setValue}
        accessibilityLabel="Font size"
      />
    </GestureHandlerRootView>
  )
}

const meta = {
  title: 'Controls/Slider',
  component: Slider,
  parameters: {layout: 'padded'},
  args: {
    value: 19,
    min: 14,
    max: 28,
    onValueChange: () => {},
    accessibilityLabel: 'Font size',
  },
} satisfies Meta<typeof Slider>
export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {render: () => <Controlled />}
