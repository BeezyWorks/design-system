import type {Meta, StoryObj} from '@storybook/react-native-web-vite'
import {SlideIndicator} from './SlideIndicator'

const meta = {
  title: 'Overlays/SlideIndicator',
  component: SlideIndicator,
  parameters: {layout: 'padded'},
} satisfies Meta<typeof SlideIndicator>
export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}
