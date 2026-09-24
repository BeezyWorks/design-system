import React from 'react'
import type {Meta, StoryObj} from '@storybook/react-native-web-vite'
import {SemanticColor} from '../../colors'
import {Stack} from '../Stack'
import {Text} from '../Text'
import {Touchable} from '../Touchable'
import {BottomSheetHeader} from './BottomSheetHeader'

const action = (label: string) => (
  <Touchable onPress={() => {}}>
    <Stack padding="sm">
      <Text variant="headline" color={SemanticColor.TextAccent}>
        {label}
      </Text>
    </Stack>
  </Touchable>
)

const meta = {
  title: 'Overlays/BottomSheetHeader',
  component: BottomSheetHeader,
  parameters: {layout: 'padded'},
  args: {onPan: () => {}, onPanRelease: () => {}},
} satisfies Meta<typeof BottomSheetHeader>
export default meta
type Story = StoryObj<typeof meta>

export const TitleOnly: Story = {args: {title: 'Pick a zman'}}
export const WithActions: Story = {
  args: {
    title: 'New notification',
    left: action('Cancel'),
    right: action('Save'),
  },
}
export const HandleOnly: Story = {}
