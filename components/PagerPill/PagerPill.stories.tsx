import React, {useState} from 'react'
import type {Meta, StoryObj} from '@storybook/react-native-web-vite'
import {RtlScope} from '../../layout'
import {PagerPill} from './PagerPill'

const noop = () => {}
const CHAPTERS = ['פרק א׳', 'פרק ב׳', 'פרק ג׳', 'פרק ד׳']

const meta = {
  title: 'Navigation/PagerPill',
  component: PagerPill,
  parameters: {layout: 'padded'},
  args: {
    title: 'פרק ב׳',
    titleRtl: true,
    onPrevious: noop,
    onNext: noop,
    onTitlePress: noop,
    previousLabel: 'Previous chapter',
    nextLabel: 'Next chapter',
  },
} satisfies Meta<typeof PagerPill>
export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  render: (args) => (
    <RtlScope>
      <PagerPill {...args} />
    </RtlScope>
  ),
}

const Live = (args: React.ComponentProps<typeof PagerPill>) => {
  const [i, setI] = useState(1)
  return (
    <PagerPill
      {...args}
      title={CHAPTERS[i]}
      onPrevious={i > 0 ? () => setI(i - 1) : undefined}
      onNext={i < CHAPTERS.length - 1 ? () => setI(i + 1) : undefined}
    />
  )
}

/** Press a chevron: the title slides in from the side the page arrives. */
export const Paging: Story = {
  render: (args) => (
    <RtlScope>
      <Live {...args} />
    </RtlScope>
  ),
}
export const LeftToRight: Story = {
  args: {title: 'Chapter 2', titleRtl: false},
  render: (args) => <PagerPill {...args} />,
}
export const EndOfBook: Story = {
  args: {onNext: undefined},
  render: (args) => (
    <RtlScope>
      <PagerPill {...args} />
    </RtlScope>
  ),
}
/** No glass: for a header that already has its own surface. */
export const Plain: Story = {
  args: {glass: false},
  render: (args) => (
    <RtlScope>
      <PagerPill {...args} />
    </RtlScope>
  ),
}
