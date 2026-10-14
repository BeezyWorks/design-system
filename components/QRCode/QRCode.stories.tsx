import type {Meta, StoryObj} from '@storybook/react-native-web-vite'
import {QRCode} from './QRCode'

const logo = {
  uri: 'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 10 10"><circle cx="5" cy="5" r="5" fill="%23B3541E"/></svg>',
}

const meta = {
  title: 'Primitives/QRCode',
  component: QRCode,
  parameters: {layout: 'padded'},
  args: {value: 'https://siddur.one', size: 220, logo},
} satisfies Meta<typeof QRCode>
export default meta
type Story = StoryObj<typeof meta>

export const WithLogo: Story = {}
export const Plain: Story = {args: {logo: false}}
export const Small: Story = {args: {size: 120}}
