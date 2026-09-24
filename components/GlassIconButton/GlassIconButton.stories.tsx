import React from 'react'
import type {Meta, StoryObj} from '@storybook/react-native-web-vite'
import {Stack} from '../Stack'
import {GlassIconButton} from './GlassIconButton'

// Liquid Glass needs iOS 26; web (and Android) get the solid circular fallback.
const meta = {
  title: 'Navigation/GlassIconButton',
  component: GlassIconButton,
  parameters: {layout: 'padded'},
  args: {name: 'add', accessibilityLabel: 'Add', onPress: () => {}},
  argTypes: {
    name: {
      control: 'select',
      options: ['add', 'arrow-back', 'chevron-back', 'close', 'edit'],
    },
  },
} satisfies Meta<typeof GlassIconButton>
export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}
export const BackAndAdd: Story = {
  render: (args) => (
    <Stack direction="row" gap="sm">
      <GlassIconButton
        {...args}
        name="chevron-back"
        accessibilityLabel="Back"
      />
      <GlassIconButton {...args} name="add" accessibilityLabel="Add" />
    </Stack>
  ),
}
