import React, {useState} from 'react'
import type {Meta, StoryObj} from '@storybook/react-native-web-vite'
import {RtlScope} from '../../layout'
import {PageDots} from './PageDots'

const meta = {
  title: 'Primitives/PageDots',
  component: PageDots,
  parameters: {layout: 'padded'},
  args: {count: 4, index: 1},
} satisfies Meta<typeof PageDots>
export default meta
type Story = StoryObj<typeof meta>

export const Static: Story = {}
const TappableDots = (args: React.ComponentProps<typeof PageDots>) => {
  const [index, setIndex] = useState(args.index)
  return <PageDots {...args} index={index} onSelect={setIndex} />
}

export const Tappable: Story = {render: (args) => <TappableDots {...args} />}
export const RightToLeft: Story = {
  render: (args) => (
    <RtlScope>
      <PageDots {...args} />
    </RtlScope>
  ),
}
