import React from 'react'
import type {Meta, StoryObj} from '@storybook/react-native-web-vite'
import {Grid} from '../Grid'
import {StatCard} from './StatCard'

const meta = {
  title: 'Primitives/StatCard',
  component: StatCard,
  parameters: {layout: 'padded'},
  args: {value: 12, label: 'day streak'},
} satisfies Meta<typeof StatCard>
export default meta
type Story = StoryObj<typeof meta>

export const Large: Story = {}
export const CompactRow: Story = {
  render: () => (
    <Grid columns={3}>
      <StatCard value={12} label="day streak" size="compact" />
      <StatCard value={40} label="chapters learned" size="compact" />
      <StatCard value="34%" label="done" size="compact" />
    </Grid>
  ),
}
