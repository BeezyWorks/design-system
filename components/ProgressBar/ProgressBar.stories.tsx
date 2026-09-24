import type {Meta, StoryObj} from '@storybook/react-native-web-vite'
import {ProgressBar} from './ProgressBar'

const meta = {
  title: 'Primitives/ProgressBar',
  component: ProgressBar,
  parameters: {layout: 'padded'},
  args: {progress: 0.4},
  argTypes: {progress: {control: {type: 'range', min: 0, max: 1, step: 0.05}}},
} satisfies Meta<typeof ProgressBar>
export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}
export const Done: Story = {args: {progress: 1, tone: 'success', size: 'md'}}
