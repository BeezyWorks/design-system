import React, {useState} from 'react'
import type {Meta, StoryObj} from '@storybook/react-native-web-vite'
import {Button} from '../Button'
import {Stack} from '../Stack'
import {Text} from '../Text'
import {AnchoredPopover, AnchoredPopoverProps} from './AnchoredPopover'

const Demo = (args: AnchoredPopoverProps) => {
  const [visible, setVisible] = useState(args.visible)
  return (
    <Stack height={420} padding="md" align="start">
      <Button title="Toggle popover" onPress={() => setVisible((v) => !v)} />
      <AnchoredPopover
        {...args}
        visible={visible}
        onDismiss={() => setVisible(false)}
      >
        <Text variant="headline">Popover</Text>
        <Text variant="detail">
          Anchored under the sticky header; tap outside to dismiss.
        </Text>
      </AnchoredPopover>
    </Stack>
  )
}

const meta = {
  title: 'Overlays/AnchoredPopover',
  component: AnchoredPopover,
  parameters: {layout: 'fullscreen'},
  args: {visible: true, align: 'center', onDismiss: () => {}, children: null},
  argTypes: {align: {control: 'inline-radio', options: ['center', 'end']}},
  render: (args) => <Demo {...args} />,
} satisfies Meta<typeof AnchoredPopover>
export default meta
type Story = StoryObj<typeof meta>

export const Centered: Story = {}
export const EndAligned: Story = {args: {align: 'end'}}
