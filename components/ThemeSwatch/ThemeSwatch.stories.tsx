import React, {useState} from 'react'
import type {Meta, StoryObj} from '@storybook/react-native-web-vite'
import {Stack} from '../Stack'
import {ThemeSwatch, ThemeSwatchProps} from './ThemeSwatch'

const options: {mode: ThemeSwatchProps['mode']; label: string}[] = [
  {mode: 'light', label: 'Light'},
  {mode: 'sepia', label: 'Sepia'},
  {mode: 'dark', label: 'Dark'},
  {mode: 'system', label: 'System'},
]

const Picker = () => {
  const [selected, setSelected] = useState<ThemeSwatchProps['mode']>('system')
  return (
    <Stack direction="row" gap="md">
      {options.map((option) => (
        <ThemeSwatch
          key={option.mode}
          {...option}
          selected={selected === option.mode}
          onPress={() => setSelected(option.mode)}
        />
      ))}
    </Stack>
  )
}

const meta = {
  title: 'Controls/ThemeSwatch',
  component: ThemeSwatch,
  parameters: {layout: 'padded'},
  args: {mode: 'sepia', label: 'Sepia', selected: true, onPress: () => {}},
} satisfies Meta<typeof ThemeSwatch>
export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}
export const AppearancePicker: Story = {render: () => <Picker />}
