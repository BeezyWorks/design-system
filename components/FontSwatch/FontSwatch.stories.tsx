import React, {useState} from 'react'
import type {Meta, StoryObj} from '@storybook/react-native-web-vite'
import {LatinTypeface, Typeface} from '../../typography'
import {Stack} from '../Stack'
import {FontSwatch} from './FontSwatch'

const hebrew = [
  {label: 'Frank Ruhl Libre', typeface: Typeface.FrankRuhlLibre},
  {label: 'Noto Serif Hebrew', typeface: Typeface.NotoSerifHebrew},
  {label: 'David', typeface: Typeface.David},
  {label: 'Rubik', typeface: Typeface.Rubik},
]

const latin = [
  {label: 'Source Serif 4', typeface: LatinTypeface.SourceSerif4},
  {label: 'Crimson Pro', typeface: LatinTypeface.CrimsonPro},
  {label: 'Libre Baskerville', typeface: LatinTypeface.LibreBaskerville},
  {label: 'Inter', typeface: LatinTypeface.Inter},
]

const HebrewPicker = () => {
  const [selected, setSelected] = useState(hebrew[0].label)
  return (
    <Stack direction="row" gap="sm">
      {hebrew.map((option) => (
        <FontSwatch
          key={option.label}
          script="hebrew"
          {...option}
          selected={selected === option.label}
          onPress={() => setSelected(option.label)}
        />
      ))}
    </Stack>
  )
}

const LatinPicker = () => {
  const [selected, setSelected] = useState(latin[0].label)
  return (
    <Stack direction="row" gap="sm">
      {latin.map((option) => (
        <FontSwatch
          key={option.label}
          script="latin"
          {...option}
          selected={selected === option.label}
          onPress={() => setSelected(option.label)}
        />
      ))}
    </Stack>
  )
}

const meta = {
  title: 'Controls/FontSwatch',
  component: FontSwatch,
  parameters: {layout: 'padded'},
  args: {
    script: 'hebrew',
    label: 'Frank Ruhl Libre',
    typeface: Typeface.FrankRuhlLibre,
    selected: true,
    onPress: () => {},
  },
} satisfies Meta<typeof FontSwatch>
export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}
export const HebrewPickerRow: Story = {render: () => <HebrewPicker />}
export const LatinPickerRow: Story = {render: () => <LatinPicker />}
