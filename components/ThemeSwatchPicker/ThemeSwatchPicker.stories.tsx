import React, {useState} from 'react'
import type {Meta, StoryObj} from '@storybook/react-native-web-vite'
import {ThemeSwatchPicker, ThemeSwatchValue} from './ThemeSwatchPicker'

const Controlled = (
  props: Partial<React.ComponentProps<typeof ThemeSwatchPicker>>,
) => {
  const [value, setValue] = useState<ThemeSwatchValue>('system')
  return <ThemeSwatchPicker {...props} value={value} onChange={setValue} />
}

const meta = {
  title: 'Controls/ThemeSwatchPicker',
  component: ThemeSwatchPicker,
  parameters: {layout: 'padded'},
  args: {value: 'system', onChange: () => {}},
} satisfies Meta<typeof ThemeSwatchPicker>
export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {render: () => <Controlled />}
export const RelabeledRtl: Story = {
  render: () => (
    <Controlled rtl glyph="א" labels={{light: 'White', dark: 'Black'}} />
  ),
}
