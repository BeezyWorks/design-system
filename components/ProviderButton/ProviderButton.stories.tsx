import type {Meta, StoryObj} from '@storybook/react-native-web-vite'
import {ProviderButton} from './ProviderButton'

const meta = {
  title: 'Auth/ProviderButton',
  component: ProviderButton,
  parameters: {layout: 'padded'},
  args: {provider: 'google', onPress: () => {}},
} satisfies Meta<typeof ProviderButton>
export default meta
type Story = StoryObj<typeof meta>

export const Google: Story = {}
export const Apple: Story = {args: {provider: 'apple'}}
export const Loading: Story = {args: {loading: true}}
export const Translated: Story = {
  args: {provider: 'apple', label: 'המשך עם Apple'},
}
