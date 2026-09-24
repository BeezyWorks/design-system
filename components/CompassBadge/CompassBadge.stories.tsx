import React from 'react'
import type {Meta, StoryObj} from '@storybook/react-native-web-vite'
import {SemanticColor} from '../../colors'
import {Icon} from '../Icon'
import {Stack} from '../Stack'
import {CompassBadge} from './CompassBadge'

const meta = {
  title: 'Layout/CompassBadge',
  component: CompassBadge,
  parameters: {layout: 'padded'},
  args: {
    children: (
      <Icon name="navigation" size={30} color={SemanticColor.AccentPrimary} />
    ),
  },
  render: (args) => (
    <Stack height={200} background={SemanticColor.SurfacePanel} radius="md">
      <CompassBadge {...args} />
    </Stack>
  ),
} satisfies Meta<typeof CompassBadge>
export default meta
type Story = StoryObj<typeof meta>

export const PinnedTopRight: Story = {}
