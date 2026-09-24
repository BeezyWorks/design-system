import type {Meta, StoryObj} from '@storybook/react-native-web-vite'
import {Header} from './Header'

const noop = () => {}

const meta = {
  title: 'Navigation/Header',
  component: Header,
  parameters: {layout: 'fullscreen'},
  args: {
    title: 'Shacharis',
    subtitle: 'Birchos HaShachar',
    onTitlePress: noop,
    onBack: noop,
    actions: [
      {icon: 'clock-outline', onPress: noop},
      {icon: 'settings', onPress: noop},
    ],
  },
} satisfies Meta<typeof Header>
export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}

/** The roomier layout for wide windows: the title becomes a button with a
 * chevron, and icons get padded hit areas. */
export const Wide: Story = {args: {wide: true}}

export const TitleOnly: Story = {
  args: {
    subtitle: undefined,
    onTitlePress: undefined,
    onBack: undefined,
    actions: [],
  },
}
