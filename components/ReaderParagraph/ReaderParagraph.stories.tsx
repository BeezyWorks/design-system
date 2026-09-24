import type {Meta, StoryObj} from '@storybook/react-native-web-vite'
import {ReaderParagraph} from './ReaderParagraph'

const mishna =
  'משה קבל תורה מסיני ומסרה ליהושע, ויהושע לזקנים, וזקנים לנביאים, ונביאים מסרוה לאנשי כנסת הגדולה.'

const meta = {
  title: 'Reader/ReaderParagraph',
  component: ReaderParagraph,
  parameters: {layout: 'padded'},
  args: {children: mishna},
} satisfies Meta<typeof ReaderParagraph>
export default meta
type Story = StoryObj<typeof meta>

export const WithHeading: Story = {args: {heading: 'משנה א'}}
export const Continuous: Story = {}
