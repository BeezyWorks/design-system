import React, {useState} from 'react'
import type {Meta, StoryObj} from '@storybook/react-native-web-vite'
import {SemanticColor} from '../../colors'
import {Stack} from '../Stack'
import {MizrachCompass, MizrachCompassProps} from './MizrachCompass'

const Demo = (args: MizrachCompassProps) => {
  const [rotation, setRotation] = useState(args.rotation)
  return (
    // The needle is white — it sits on the always-dark Luach hero.
    <Stack
      padding="lg"
      background={SemanticColor.SurfacePanel}
      radius="md"
      align="center"
      width={120}
    >
      <MizrachCompass
        {...args}
        rotation={rotation}
        onPress={() => setRotation((r) => r + 90)}
      />
    </Stack>
  )
}

const meta = {
  title: 'Luach/MizrachCompass',
  component: MizrachCompass,
  parameters: {layout: 'padded'},
  args: {rotation: 45, onPress: () => {}},
  argTypes: {rotation: {control: {type: 'range', min: 0, max: 360, step: 5}}},
  render: (args) => <Demo {...args} />,
} satisfies Meta<typeof MizrachCompass>
export default meta
type Story = StoryObj<typeof meta>

/** Tap the needle to spin it 90° — it always takes the shortest path. */
export const Default: Story = {}
