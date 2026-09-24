import React from 'react'
import type {Meta, StoryObj} from '@storybook/react-native-web-vite'
import {SemanticColor} from '../../colors'
import {Stack} from '../Stack'
import {Text} from '../Text'
import {PagerFrame, PagerFrameProps} from './PagerFrame'

const meta = {
  title: 'Layout/PagerFrame',
  component: PagerFrame,
  parameters: {layout: 'padded'},
  args: {
    paddingBottom: 48,
    children: (
      <Stack
        grow
        align="center"
        justify="center"
        background={SemanticColor.AccentTint}
      >
        <Text color={SemanticColor.TextAccent}>Page content</Text>
      </Stack>
    ),
  },
  argTypes: {paddingBottom: {control: {type: 'range', min: 0, max: 120}}},
  render: (args: PagerFrameProps) => (
    <Stack height={240} background={SemanticColor.SurfaceCard}>
      <PagerFrame {...args} />
    </Stack>
  ),
} satisfies Meta<typeof PagerFrame>
export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}
