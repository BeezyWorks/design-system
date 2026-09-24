import React from 'react'
import type {Meta, StoryObj} from '@storybook/react-native-web-vite'
import {SemanticColor} from '../../colors'
import {Stack} from '../Stack'
import {Text} from '../Text'
import {LuachPhoneSplit, LuachPhoneSplitProps} from './LuachPhoneSplit'

const Region = ({
  label,
  background,
}: {
  label: string
  background: SemanticColor
}) => (
  <Stack fill align="center" justify="center" background={background}>
    <Text>{label}</Text>
  </Stack>
)

const meta = {
  title: 'Layout/LuachPhoneSplit',
  component: LuachPhoneSplit,
  parameters: {layout: 'padded'},
  args: {
    direction: 'column',
    top: <Region label="top (5)" background={SemanticColor.AccentTint} />,
    bottom: (
      <Region label="bottom (4)" background={SemanticColor.SurfaceCard} />
    ),
  },
  argTypes: {
    direction: {
      control: 'inline-radio',
      options: ['column', 'columnReverse', 'row'],
    },
  },
  render: (args: LuachPhoneSplitProps) => (
    <Stack height={360} width={320}>
      <LuachPhoneSplit {...args} />
    </Stack>
  ),
} satisfies Meta<typeof LuachPhoneSplit>
export default meta
type Story = StoryObj<typeof meta>

export const Column: Story = {}
export const ColumnReverse: Story = {args: {direction: 'columnReverse'}}
export const Row: Story = {args: {direction: 'row'}}
