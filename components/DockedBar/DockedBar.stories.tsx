import React from 'react'
import type {Meta, StoryObj} from '@storybook/react-native-web-vite'
import {Artwork} from '../Artwork'
import {ProgressBar} from '../ProgressBar'
import {Stack} from '../Stack'
import {Text} from '../Text'
import {TransportButton} from '../TransportButton'
import {DockedBar} from './DockedBar'

const meta = {
  title: 'Layout/DockedBar',
  component: DockedBar,
  parameters: {layout: 'fullscreen'},
  render: (args) => (
    <Stack height={240}>
      <DockedBar {...args}>
        <Artwork name="Daf Yomi" size={40} />
        <Stack grow width={0}>
          <Text variant="itemHeader" numberOfLines={1}>
            Berachos 12
          </Text>
          <Text variant="detail" numberOfLines={1}>
            Daf Yomi
          </Text>
        </Stack>
        <TransportButton kind="skip-back" size="sm" label="Back 15" />
        <TransportButton kind="play" size="sm" label="Play" />
      </DockedBar>
    </Stack>
  ),
} satisfies Meta<typeof DockedBar>
export default meta
type Story = StoryObj<typeof meta>

export const MiniPlayer: Story = {
  args: {footer: <ProgressBar progress={0.4} size="sm" />},
}
export const Lifted: Story = {args: {bottomOffset: 56}}
