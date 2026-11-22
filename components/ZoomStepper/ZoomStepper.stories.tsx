import React, {useState} from 'react'
import type {Meta, StoryObj} from '@storybook/react-native-web-vite'
import {ZoomStepper, ZoomStepperProps} from './ZoomStepper'

const Controlled = (args: ZoomStepperProps) => {
  const [zoom, setZoom] = useState(args.zoom)
  const clamp = (z: number) => Math.min(args.max, Math.max(args.min, z))
  return (
    <ZoomStepper
      {...args}
      zoom={zoom}
      onZoomIn={() => setZoom((z) => clamp(z + 0.25))}
      onZoomOut={() => setZoom((z) => clamp(z - 0.25))}
      onFit={() => setZoom(1)}
    />
  )
}

const meta = {
  title: 'Controls/ZoomStepper',
  component: ZoomStepper,
  parameters: {layout: 'padded'},
  args: {
    zoom: 1,
    min: 0.5,
    max: 3,
    onZoomIn: () => {},
    onZoomOut: () => {},
    onFit: () => {},
  },
  render: (args) => <Controlled {...args} />,
} satisfies Meta<typeof ZoomStepper>
export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}
export const Zoomed: Story = {args: {zoom: 1.5}}
export const AtMax: Story = {args: {zoom: 3}}
