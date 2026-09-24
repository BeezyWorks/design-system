import React from 'react'
import type {Meta, StoryObj} from '@storybook/react-native-web-vite'
import {LatinTypeface, Typeface} from '../../typography'
import {Stack} from '../Stack'
import {FontSwatch} from './FontSwatch'

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

// The swatch fills its container (a grid cell), so give it a column width.
export const Hebrew: Story = {
  render: (args) => (
    <Stack width={96}>
      <FontSwatch {...args} />
    </Stack>
  ),
}
export const Latin: Story = {
  render: () => (
    <Stack width={96}>
      <FontSwatch
        script="latin"
        typeface={LatinTypeface.Inter}
        label="Inter"
        selected={false}
        onPress={() => {}}
      />
    </Stack>
  ),
}
