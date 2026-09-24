import React from 'react'
import type {Meta, StoryObj} from '@storybook/react-native-web-vite'
import {SemanticColor} from '../../colors'
import {Stack} from '../Stack'
import {TabBarIcon} from '../TabBarIcon'
import {TabBarBackground, TabBarBackgroundProps} from './TabBarBackground'

// Real Liquid Glass is iOS-only; on web `GlassView` degrades to a plain view,
// so this shows the pill's shape and content rather than the glass itself.
const meta = {
  title: 'Navigation/TabBarBackground',
  component: TabBarBackground,
  parameters: {layout: 'padded'},
  render: (args: TabBarBackgroundProps) => (
    <Stack
      height={120}
      justify="end"
      align="center"
      background={SemanticColor.SurfaceCard}
      padding="md"
    >
      <Stack
        width={280}
        height={64}
        direction="row"
        align="center"
        justify="spaceAround"
      >
        <TabBarBackground {...args} />
        <TabBarIcon name="calendar-today" focused />
        <TabBarIcon name="book" focused={false} />
        <TabBarIcon name="cog" focused={false} />
      </Stack>
    </Stack>
  ),
} satisfies Meta<typeof TabBarBackground>
export default meta
type Story = StoryObj<typeof meta>

export const Light: Story = {}
export const Dark: Story = {args: {dark: true}}
