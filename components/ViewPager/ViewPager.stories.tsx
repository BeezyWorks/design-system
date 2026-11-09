import React, {useState} from 'react'
import type {Meta, StoryObj} from '@storybook/react-native-web-vite'
import {SemanticColor} from '../../colors'
import {Stack} from '../Stack'
import {ScrollStack} from '../ScrollStack'
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

const DragStateDemo = (args: ViewPagerProps) => {
  const [dragging, setDragging] = useState(false)
  const [progress, setProgress] = useState('0 + 0.00')
  return (
    <Stack gap="sm">
      <Text variant="detail">
        {dragging ? 'Dragging' : 'Idle'} · page {progress}
      </Text>
      <Stack height={240} width={360}>
        <ViewPager
          {...args}
          onDraggingChange={setDragging}
          onPageScroll={(position, offset) =>
            setProgress(`${position} + ${offset.toFixed(2)}`)
          }
        />
      </Stack>
    </Stack>
  )
}

/** Reports drag state and continuous scroll progress. */
export const DragState: Story = {
  render: (args: ViewPagerProps) => <DragStateDemo {...args} />,
}

/** Each page holds a long vertical scroller; it scrolls inside the
 * fixed-height pager instead of stretching it. */
export const VerticalScrollInPages: Story = {
  render: (args: ViewPagerProps) => (
    <Stack height={240} width={360}>
      <ViewPager {...args}>
        {pages.map((background, p) => (
          <ScrollStack key={p} padding="md" gap="sm">
            {Array.from({length: 40}, (_, i) => (
              <Text key={i}>
                Page {p + 1} · row {i + 1}
              </Text>
            ))}
          </ScrollStack>
        ))}
      </ViewPager>
    </Stack>
  ),
}
