import type {Meta, StoryObj} from '@storybook/react-native-web-vite'
import {TabBarIcon} from './TabBarIcon'

const meta = {
  title: 'Navigation/TabBarIcon',
  component: TabBarIcon,
  parameters: {layout: 'padded'},
  args: {name: 'calendar-today'},
  argTypes: {
    name: {
      control: 'select',
      options: ['calendar-today', 'book', 'bookshelf', 'cog'],
    },
  },
} satisfies Meta<typeof TabBarIcon>
export default meta
type Story = StoryObj<typeof meta>

export const Focused: Story = {args: {focused: true}}
export const Inactive: Story = {args: {focused: false}}
