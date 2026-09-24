import type {Meta, StoryObj} from '@storybook/react-native-web-vite'
import {SectionHeader} from './SectionHeader'

const meta = {
  title: 'Reader/SectionHeader',
  component: SectionHeader,
  parameters: {layout: 'padded'},
} satisfies Meta<typeof SectionHeader>
export default meta
type Story = StoryObj<typeof meta>

export const Titled: Story = {args: {title: 'ברכות קריאת שמע'}}
/** No title still reserves the leading gap under the sticky header. */
export const Untitled: Story = {}
