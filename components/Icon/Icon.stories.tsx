import React from 'react'
import type {Meta, StoryObj} from '@storybook/react-native-web-vite'
import {SemanticColor} from '../../colors'
import {Stack} from '../Stack'
import {Text} from '../Text'
import {Icon, IconName} from './Icon'

const names: IconName[] = [
  'calendar-today',
  'book',
  'bookshelf',
  'cog',
  'settings',
  'chevron-left',
  'chevron-right',
  'chevron-back',
  'chevron-down',
  'arrow-back',
  'delete',
  'navigation',
  'add',
  'clock-outline',
  'close',
  'edit',
  'download',
]

const meta = {
  title: 'Primitives/Icon',
  component: Icon,
  parameters: {layout: 'padded'},
  args: {name: 'book', size: 24},
  argTypes: {
    name: {control: 'select', options: names},
    color: {control: 'select', options: Object.values(SemanticColor)},
    size: {control: {type: 'range', min: 12, max: 64, step: 2}},
  },
} satisfies Meta<typeof Icon>
export default meta
type Story = StoryObj<typeof meta>

export const Playground: Story = {}

export const AllIcons: Story = {
  render: (args) => (
    <Stack direction="row" wrap gap="lg">
      {names.map((name) => (
        <Stack key={name} align="center" gap="xs" width={96}>
          <Icon {...args} name={name} />
          <Text variant="caption" color={SemanticColor.TextSecondary}>
            {name}
          </Text>
        </Stack>
      ))}
    </Stack>
  ),
}

export const Tinted: Story = {args: {color: SemanticColor.TextAccent, size: 32}}
