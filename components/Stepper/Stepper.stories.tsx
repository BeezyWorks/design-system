import React, {useState} from 'react'
import type {Meta, StoryObj} from '@storybook/react-native-web-vite'
import {Stepper} from './Stepper'

const Counter = ({min, max}: {min: number; max: number}) => {
  const [value, setValue] = useState(Math.round((min + max) / 2))
  return (
    <Stepper
      label={`${value} min`}
      decrementDisabled={value <= min}
      incrementDisabled={value >= max}
      onDecrement={() => setValue((v) => Math.max(min, v - 1))}
      onIncrement={() => setValue((v) => Math.min(max, v + 1))}
    />
  )
}

const meta = {
  title: 'Controls/Stepper',
  parameters: {layout: 'padded'},
} satisfies Meta
export default meta
type Story = StoryObj<typeof meta>

/** Tap steps once; press-and-hold repeats, accelerating after 1.5s. */
export const Default: Story = {render: () => <Counter min={0} max={60} />}
export const HitsBounds: Story = {render: () => <Counter min={0} max={3} />}
