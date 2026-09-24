import React from 'react'
import type {Meta, StoryObj} from '@storybook/react-native-web-vite'
import {Card} from '../Card'
import {SickNameRow, SickNameRowProps} from './SickNameRow'

const meta = {
  title: 'Rows/SickNameRow',
  component: SickNameRow,
  parameters: {layout: 'padded'},
  args: {name: 'רפאל בן שרה', onDelete: () => {}},
  render: (args: SickNameRowProps) => (
    <Card>
      <SickNameRow {...args} />
    </Card>
  ),
} satisfies Meta<typeof SickNameRow>
export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}
