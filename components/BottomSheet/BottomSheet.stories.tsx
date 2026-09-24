import React from 'react'
import type {Meta, StoryObj} from '@storybook/react-native-web-vite'
import {SemanticColor} from '../../colors'
import {Stack} from '../Stack'
import {Text} from '../Text'
import {BottomSheet} from './BottomSheet'

const meta = {
  title: 'Overlays/BottomSheet',
  component: BottomSheet,
  parameters: {layout: 'fullscreen'},
  args: {
    header: {title: 'Sheet title', onPan: () => {}, onPanRelease: () => {}},
    onLayoutHeight: () => {},
    children: (
      <Stack padding="md" gap="sm">
        <Text>Sheet content goes here.</Text>
        <Text variant="detail">
          The sheet paints its own surface and top radius.
        </Text>
      </Stack>
    ),
  },
  render: (args) => (
    <Stack height={420} justify="end" background={SemanticColor.OverlayScrim}>
      <BottomSheet {...args} />
    </Stack>
  ),
} satisfies Meta<typeof BottomSheet>
export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}
