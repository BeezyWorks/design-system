import React from 'react'
import type {Meta, StoryObj} from '@storybook/react-native-web-vite'
import {SemanticColor} from '../../colors'
import {ThemeScope} from '../../theme'
import {Text} from '../Text'
import {Surface} from './Surface'

const meta = {
  title: 'Layout/Surface',
  component: Surface,
  parameters: {layout: 'padded'},
  args: {
    height: 140,
    children: <Text>On a surface</Text>,
  },
  argTypes: {
    radius: {control: 'select', options: ['sm', 'md', 'lg', 'xl']},
    shadow: {
      control: 'select',
      options: ['none', 'card', 'raised', 'floating'],
    },
  },
} satisfies Meta<typeof Surface>
export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}
export const Raised: Story = {args: {shadow: 'raised'}}

/** A panel that stays dark whatever the app's mode — the panel color plus a
 * dark `ThemeScope`, so text inside resolves for a dark background. */
export const AlwaysDarkPanel: Story = {
  render: (args) => (
    <ThemeScope mode="dark">
      <Surface {...args} background={SemanticColor.SurfacePanel}>
        <Text>Stays dark in light mode</Text>
      </Surface>
    </ThemeScope>
  ),
}
