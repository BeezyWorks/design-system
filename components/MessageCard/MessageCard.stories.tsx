import type {Meta, StoryObj} from '@storybook/react-native-web-vite'
import {MessageCard} from './MessageCard'

const meta = {
  title: 'Feedback/MessageCard',
  component: MessageCard,
  parameters: {layout: 'padded'},
  args: {message: 'Location is used to calculate zmanim accurately.'},
} satisfies Meta<typeof MessageCard>
export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}
