import React from 'react'
import type {Meta, StoryObj} from '@storybook/react-native-web-vite'
import {Card} from '../Card'
import {Stack} from '../Stack'
import {Text} from '../Text'
import {ScrollStack, ScrollStackProps} from './ScrollStack'

const rows = Array.from({length: 20}, (_, i) => `Row ${i + 1}`)

const meta = {
  title: 'Layout/ScrollStack',
  component: ScrollStack,
  parameters: {layout: 'padded'},
  args: {
    padding: 'md',
    gap: 'sm',
    children: rows.map((label) => (
      <Card key={label} paddingVertical={12}>
        <Text>{label}</Text>
      </Card>
    )),
  },
  argTypes: {
    padding: {control: 'select', options: [undefined, 'sm', 'md', 'lg']},
    gap: {control: 'select', options: [undefined, 'xs', 'sm', 'md', 'lg']},
  },
  render: (args: ScrollStackProps) => (
    <Stack height={360}>
      <ScrollStack {...args} />
    </Stack>
  ),
} satisfies Meta<typeof ScrollStack>
export default meta
type Story = StoryObj<typeof meta>

export const Vertical: Story = {}
