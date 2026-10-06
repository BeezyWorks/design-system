import React from 'react'
import type {Meta, StoryObj} from '@storybook/react-native-web-vite'
import {GradientCard} from '../GradientCard'
import {Text} from '../Text'
import {GlassSurface} from './GlassSurface'

const meta = {
  title: 'Surfaces/GlassSurface',
  component: GlassSurface,
  parameters: {layout: 'padded'},
  args: {padding: 'lg', gap: 'sm'},
  render: (args) => (
    // Any busy backdrop shows the blur; the brand gradient stands in for a
    // photo.
    <GradientCard padding="xl">
      <GlassSurface {...args}>
        <Text variant="sectionHeader">Frosted</Text>
        <Text variant="rowLabel">
          Follows the mode: frosted in light and sepia, smoky in dark.
        </Text>
      </GlassSurface>
    </GradientCard>
  ),
} satisfies Meta<typeof GlassSurface>
export default meta
type Story = StoryObj<typeof meta>

export const Raised: Story = {}
export const Flat: Story = {args: {raised: false}}
