import type {Meta, StoryObj} from '@storybook/react-native-web-vite'
import {PillButton} from './PillButton'

const meta = {
  title: 'Controls/PillButton',
  component: PillButton,
  parameters: {layout: 'padded'},
  args: {title: 'Open', onPress: () => {}},
} satisfies Meta<typeof PillButton>
export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}
export const Hebrew: Story = {args: {title: 'ברכת המזון', rtl: true}}
export const Outline: Story = {args: {variant: 'outline'}}
export const NoChevron: Story = {args: {chevron: false}}
export const Disabled: Story = {args: {disabled: true}}
