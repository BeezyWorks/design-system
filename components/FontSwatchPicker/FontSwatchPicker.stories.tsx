import React, {useState} from 'react'
import type {Meta, StoryObj} from '@storybook/react-native-web-vite'
import {LatinTypeface, Typeface} from '../../typography'
import {FontOption, FontSwatchPicker} from './FontSwatchPicker'

const hebrew: FontOption<Typeface>[] = [
  {key: 'frank', label: 'Frank Ruhl Libre', typeface: Typeface.FrankRuhlLibre},
  {key: 'noto', label: 'Noto Serif Hebrew', typeface: Typeface.NotoSerifHebrew},
  {key: 'david', label: 'David', typeface: Typeface.David},
  {key: 'rubik', label: 'Rubik', typeface: Typeface.Rubik},
]

const latin: FontOption<LatinTypeface>[] = [
  {key: 'source', label: 'Source Serif 4', typeface: LatinTypeface.SourceSerif4},
  {key: 'crimson', label: 'Crimson Pro', typeface: LatinTypeface.CrimsonPro},
  {
    key: 'baskerville',
    label: 'Libre Baskerville',
    typeface: LatinTypeface.LibreBaskerville,
  },
  {key: 'inter', label: 'Inter', typeface: LatinTypeface.Inter},
]

const HebrewPicker = ({rtl}: {rtl?: boolean}) => {
  const [key, setKey] = useState(hebrew[0].key)
  return (
    <FontSwatchPicker
      script="hebrew"
      options={hebrew}
      selectedKey={key}
      onSelect={setKey}
      rtl={rtl}
    />
  )
}

const LatinPicker = () => {
  const [key, setKey] = useState(latin[0].key)
  return (
    <FontSwatchPicker
      script="latin"
      options={latin}
      selectedKey={key}
      onSelect={setKey}
    />
  )
}

const meta = {
  title: 'Controls/FontSwatchPicker',
  component: FontSwatchPicker,
  parameters: {layout: 'padded'},
  args: {
    script: 'hebrew',
    options: hebrew,
    selectedKey: 'frank',
    onSelect: () => {},
  },
} satisfies Meta<typeof FontSwatchPicker>
export default meta
type Story = StoryObj<typeof meta>

export const Hebrew: Story = {render: () => <HebrewPicker />}
export const HebrewRtl: Story = {render: () => <HebrewPicker rtl />}
export const Latin: Story = {render: () => <LatinPicker />}
