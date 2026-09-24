import React from 'react'
import type {Meta, StoryObj} from '@storybook/react-native-web-vite'
import {SemanticColor} from '../../colors'
import {Stack} from '../Stack'
import {Text} from '../Text'
import {ViewPager, ViewPagerProps} from './ViewPager'

const pages = [
  SemanticColor.AccentTint,
  SemanticColor.SurfaceCard,
  SemanticColor.SurfaceSelected,
]

const meta = {
  title: 'Layout/ViewPager',
  component: ViewPager,
  parameters: {layout: 'padded'},
  args: {
    scrollEnabled: true,
    initialPage: 0,
    children: pages.map((background, index) => (
      <Stack
        key={index}
        fill
        align="center"
        justify="center"
        background={background}
      >
        <Text variant="title">Page {index + 1}</Text>
      </Stack>
    )),
  },
  render: (args: ViewPagerProps) => (
    <Stack height={240} width={360}>
      <ViewPager {...args} />
    </Stack>
  ),
} satisfies Meta<typeof ViewPager>
export default meta
type Story = StoryObj<typeof meta>

/** Web uses the paginated-ScrollView variant (`ViewPager.web.tsx`). */
export const Default: Story = {}
export const Locked: Story = {args: {scrollEnabled: false}}
