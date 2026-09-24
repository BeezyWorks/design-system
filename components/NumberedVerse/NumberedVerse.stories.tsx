import type {Meta, StoryObj} from '@storybook/react-native-web-vite'
import {NumberedVerse} from './NumberedVerse'

const meta = {
  title: 'Reader/NumberedVerse',
  component: NumberedVerse,
  parameters: {layout: 'padded'},
  args: {
    number: 'א',
    children: 'בראשית ברא אלהים את השמים ואת הארץ',
  },
} satisfies Meta<typeof NumberedVerse>
export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}
export const LaterVerse: Story = {args: {number: 'כג'}}
