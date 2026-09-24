import React, {useState} from 'react'
import type {Meta, StoryObj} from '@storybook/react-native-web-vite'
import {SegmentedControl, SegmentOption} from './SegmentedControl'

const themeOptions: SegmentOption<'light' | 'dark' | 'system'>[] = [
  {key: 'light', label: 'Light'},
  {key: 'dark', label: 'Dark'},
  {key: 'system', label: 'System'},
]

const Themed = ({initial}: {initial: 'light' | 'dark' | 'system'}) => {
  const [value, setValue] = useState(initial)
  return (
    <SegmentedControl
      options={themeOptions}
      value={value}
      onChange={setValue}
    />
  )
}

const TwoOptions = () => {
  const [value, setValue] = useState<'12' | '24'>('12')
  return (
    <SegmentedControl
      options={[
        {key: '12', label: '12 hour'},
        {key: '24', label: '24 hour'},
      ]}
      value={value}
      onChange={setValue}
    />
  )
}

const meta = {
  title: 'Controls/SegmentedControl',
  parameters: {layout: 'padded'},
} satisfies Meta
export default meta
type Story = StoryObj<typeof meta>

export const ThreeOptions: Story = {render: () => <Themed initial="system" />}
export const TwoOption: Story = {render: () => <TwoOptions />}
