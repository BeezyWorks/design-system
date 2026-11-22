import type {Meta, StoryObj} from '@storybook/react-native-web-vite'
import {Artwork} from './Artwork'

const meta = {
  title: 'Media/Artwork',
  component: Artwork,
  parameters: {layout: 'padded'},
  args: {size: 64},
} satisfies Meta<typeof Artwork>
export default meta
type Story = StoryObj<typeof meta>

export const Image: Story = {
  args: {imageUrl: 'https://picsum.photos/id/1018/200/200'},
}
export const Initials: Story = {args: {name: 'Daf Yomi'}}
export const PlaceholderIcon: Story = {}
export const Large: Story = {args: {size: 160, radius: 'md', name: 'Shas'}}
