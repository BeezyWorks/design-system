import React from 'react'
import type {Meta, StoryObj} from '@storybook/react-native-web-vite'
import {SemanticColor} from '../../colors'
import {Stack} from '../Stack'
import {IconButton} from './IconButton'

const meta = {
  title: 'Primitives/IconButton',
  component: IconButton,
  parameters: {layout: 'padded'},
  args: {name: 'edit', accessibilityLabel: 'Edit', onPress: () => {}},
  argTypes: {
    color: {control: 'select', options: Object.values(SemanticColor)},
    padding: {control: 'select', options: ['xs', 'sm', 'md', 'lg']},
  },
} satisfies Meta<typeof IconButton>
export default meta
type Story = StoryObj<typeof meta>

export const Playground: Story = {}
export const Disabled: Story = {args: {disabled: true}}
export const Row: Story = {
  render: (args) => (
    <Stack direction="row">
      <IconButton {...args} name="edit" accessibilityLabel="Edit" />
      <IconButton
        {...args}
        name="delete"
        color={SemanticColor.TextDanger}
        accessibilityLabel="Delete"
      />
      <IconButton {...args} name="add" accessibilityLabel="Add" />
    </Stack>
  ),
}
