import React, {useState} from 'react'
import type {Meta, StoryObj} from '@storybook/react-native-web-vite'
import {Stack} from '../Stack'
import {BookNavigator, BookNavigatorProps} from './BookNavigator'

const Demo = (args: BookNavigatorProps) => {
  const [chapter, setChapter] = useState(args.chapter)
  return (
    <Stack height={200}>
      <BookNavigator
        {...args}
        chapter={chapter}
        onNext={() => setChapter((c) => Math.min(args.lastChapter, c + 1))}
        onPrevious={() => setChapter((c) => Math.max(0, c - 1))}
      />
    </Stack>
  )
}

const meta = {
  title: 'Navigation/BookNavigator',
  component: BookNavigator,
  parameters: {layout: 'fullscreen'},
  args: {
    chapter: 2,
    lastChapter: 5,
    onNext: () => {},
    onPrevious: () => {},
    titleClick: () => {},
  },
  render: (args) => <Demo {...args} />,
} satisfies Meta<typeof BookNavigator>
export default meta
type Story = StoryObj<typeof meta>

/** Chevrons disappear at the first/last chapter. */
export const Default: Story = {}
export const FirstChapter: Story = {args: {chapter: 0}}
export const CustomTitle: Story = {args: {title: 'פרקי אבות'}}
