import React from 'react'
import type {Meta, StoryObj} from '@storybook/react-native-web-vite'
import {Chip} from '../Chip'
import {Text} from '../Text'
import {DetailOverlay} from './DetailOverlay'

const meta = {
  title: 'Overlays/DetailOverlay',
  component: DetailOverlay,
  args: {
    visible: true,
    title: 'Detail',
    onClose: () => {},
    children: (
      <Text content="latin">
        A panel docked beside the list on a wide window (resize the canvas), a
        page sheet over it on a phone.
      </Text>
    ),
  },
} satisfies Meta<typeof DetailOverlay>
export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}

/** `headerCenter` replaces the title, centered on the bar. */
export const HeaderCenter: Story = {
  args: {
    title: undefined,
    headerCenter: <Chip label="משנה א׳" selected onPress={() => {}} />,
  },
}
