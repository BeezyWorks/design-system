import React from 'react'
import type {Meta, StoryObj} from '@storybook/react-native-web-vite'
import {Stack} from '../Stack'
import {Button, ButtonSize, ButtonVariant} from './Button'

const variants: ButtonVariant[] = [
  'primary',
  'secondary',
  'ghost',
  'destructive',
  'outline',
]
const sizes: ButtonSize[] = ['sm', 'md', 'lg']

const meta = {
  title: 'Primitives/Button',
  component: Button,
  parameters: {layout: 'padded'},
  args: {title: 'Save', onPress: () => {}},
  argTypes: {
    variant: {control: 'select', options: variants},
    size: {control: 'inline-radio', options: sizes},
    icon: {control: 'select', options: [undefined, 'add', 'download', 'edit']},
  },
} satisfies Meta<typeof Button>
export default meta
type Story = StoryObj<typeof meta>

export const Playground: Story = {}
export const WithIcon: Story = {args: {icon: 'download', title: 'Download'}}
export const Loading: Story = {args: {loading: true}}
export const Disabled: Story = {args: {disabled: true}}

export const VariantsAndSizes: Story = {
  render: (args) => (
    <Stack gap="md" align="start">
      {variants.map((variant) => (
        <Stack key={variant} direction="row" gap="md" align="center">
          {sizes.map((size) => (
            <Button
              key={size}
              {...args}
              variant={variant}
              size={size}
              title={`${variant} ${size}`}
            />
          ))}
        </Stack>
      ))}
    </Stack>
  ),
}
