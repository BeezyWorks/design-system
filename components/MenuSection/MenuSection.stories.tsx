import type {Meta, StoryObj} from '@storybook/react-native-web-vite'
import {MenuSection} from './MenuSection'

const items = ['שחרית', 'מנחה', 'מעריב', 'ברכת המזון'].map((label) => ({
  key: label,
  label,
  onPress: () => {},
}))

const meta = {
  title: 'Menus/MenuSection',
  component: MenuSection,
  parameters: {layout: 'padded'},
  args: {title: 'תפילות', items},
} satisfies Meta<typeof MenuSection>
export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}
export const SingleItem: Story = {args: {items: items.slice(0, 1)}}
export const WithDetails: Story = {
  args: {items: items.map((item, i) => ({...item, detail: `${i + 5} פרקים`}))},
}
