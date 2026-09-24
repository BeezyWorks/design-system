import type {Meta, StoryObj} from '@storybook/react-native-web-vite'
import {VersionText} from './VersionText'

const meta = {
  title: 'Settings/VersionText',
  component: VersionText,
  parameters: {layout: 'padded'},
  args: {versionName: '2.4.0'},
} satisfies Meta<typeof VersionText>
export default meta
type Story = StoryObj<typeof meta>

export const WithBuild: Story = {args: {buildNumber: '318'}}
export const VersionOnly: Story = {}
