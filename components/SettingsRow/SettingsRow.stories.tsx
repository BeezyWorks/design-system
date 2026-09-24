import React, {useState} from 'react'
import type {Meta, StoryObj} from '@storybook/react-native-web-vite'
import {Card} from '../Card'
import {SegmentedControl} from '../SegmentedControl'
import {Stepper} from '../Stepper'
import {TypefaceChips} from '@components'
import {Typeface} from '../../typography'
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
  const [key, setKey] = useState('frank')
  return (
    <SettingsStackedRow title="Typeface">
      <TypefaceChips
        items={[
          {key: 'frank', label: 'Frank', face: Typeface.Frank},
          {key: 'david', label: 'David', face: Typeface.David},
          {key: 'ezra', label: 'Ezra', face: Typeface.Ezra},
        ]}
        selectedKey={key}
        onSelect={setKey}
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
