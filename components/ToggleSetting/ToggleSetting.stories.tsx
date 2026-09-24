import React, {useState} from 'react'
import type {Meta, StoryObj} from '@storybook/react-native-web-vite'
import {Card} from '../Card'
import {ToggleSetting, ToggleSettingProps} from './ToggleSetting'

const Controlled = (args: ToggleSettingProps) => {
  const [enabled, setEnabled] = useState(args.enabled)
  return (
    <Card>
      <ToggleSetting {...args} enabled={enabled} onSwitch={setEnabled} />
    </Card>
  )
}

const meta = {
  title: 'Controls/ToggleSetting',
  component: ToggleSetting,
  parameters: {layout: 'padded'},
  args: {title: 'Show nekudos', enabled: true, onSwitch: () => {}},
  render: (args) => <Controlled {...args} />,
} satisfies Meta<typeof ToggleSetting>
export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}
export const Disabled: Story = {args: {disabled: true}}
export const WithStateSuffix: Story = {
  args: {title: 'Notifications: ', titleOn: 'on', titleOff: 'off'},
}
