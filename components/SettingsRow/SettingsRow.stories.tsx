import React, {useState} from 'react'
import type {Meta, StoryObj} from '@storybook/react-native-web-vite'
import {Card} from '../Card'
import {SegmentedControl} from '../SegmentedControl'
import {Stepper} from '../Stepper'
import {SettingsRow, SettingsStackedRow} from './SettingsRow'

const Inline = () => {
  const [minutes, setMinutes] = useState(18)
  return (
    <SettingsRow title="Candle lighting">
      <Stepper
        label={`${minutes} min`}
        onDecrement={() => setMinutes((m) => m - 1)}
        onIncrement={() => setMinutes((m) => m + 1)}
      />
    </SettingsRow>
  )
}

const Stacked = () => {
  const [key, setKey] = useState<'frank' | 'david' | 'ezra'>('frank')
  return (
    <SettingsStackedRow title="Typeface">
      <SegmentedControl
        options={[
          {key: 'frank', label: 'Frank'},
          {key: 'david', label: 'David'},
          {key: 'ezra', label: 'Ezra'},
        ]}
        value={key}
        onChange={setKey}
      />
    </SettingsStackedRow>
  )
}

const WithSegments = () => {
  const [value, setValue] = useState<'12' | '24'>('12')
  return (
    <SettingsRow title="Time format">
      <SegmentedControl
        options={[
          {key: '12', label: '12h'},
          {key: '24', label: '24h'},
        ]}
        value={value}
        onChange={setValue}
      />
    </SettingsRow>
  )
}

const meta = {
  title: 'Settings/SettingsRow',
  parameters: {layout: 'padded'},
} satisfies Meta
export default meta
type Story = StoryObj<typeof meta>

export const InlineControl: Story = {
  render: () => (
    <Card>
      <Inline />
      <WithSegments />
    </Card>
  ),
}
export const StackedControl: Story = {
  render: () => (
    <Card>
      <Stacked />
    </Card>
  ),
}
