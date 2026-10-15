import type {Meta, StoryObj} from '@storybook/react-native-web-vite'
import {Avatar} from './Avatar'

const meta = {
  title: 'Auth/Avatar',
  component: Avatar,
  parameters: {layout: 'padded'},
  args: {name: 'Rivka Cohen'},
} satisfies Meta<typeof Avatar>
export default meta
type Story = StoryObj<typeof meta>

export const Initials: Story = {}
export const EmailOnly: Story = {args: {name: null, email: 'dovid@example.com'}}
export const Large: Story = {args: {size: 72}}
export const BrokenImage: Story = {
  args: {imageUrl: 'https://invalid.example/missing.png'},
}
