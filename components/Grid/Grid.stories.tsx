import React from 'react'
import type {Meta, StoryObj} from '@storybook/react-native-web-vite'
import {Card} from '../Card'
import {Text} from '../Text'
import {Grid} from './Grid'

const cells = ['1', '2', '3', '4', '5'].map((n) => (
  <Card key={n}>
    <Text variant="title">{n}</Text>
  </Card>
))

const meta = {
  title: 'Layout/Grid',
  component: Grid,
  parameters: {layout: 'padded'},
  args: {columns: 3, children: cells},
} satisfies Meta<typeof Grid>
export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}
export const RightToLeft: Story = {args: {rtl: true}}
