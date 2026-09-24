import type {Meta, StoryObj} from '@storybook/react-native-web-vite'
import {EmptyState} from './EmptyState'

const meta = {
  title: 'Feedback/EmptyState',
  component: EmptyState,
  parameters: {layout: 'padded'},
  args: {title: 'No notifications yet'},
} satisfies Meta<typeof EmptyState>
export default meta
type Story = StoryObj<typeof meta>

export const TitleOnly: Story = {}
export const WithSubtitle: Story = {
  args: {
    subtitle: 'Get reminded before candle lighting, sof zman krias shema…',
  },
}
export const WithAction: Story = {
  args: {
    subtitle: 'Get reminded before candle lighting.',
    actionLabel: 'Add notification',
    onAction: () => {},
  },
}
