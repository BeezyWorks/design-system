import React, {useState} from 'react'
import type {Meta, StoryObj} from '@storybook/react-native-web-vite'
import {Stack} from '../Stack'
import {TabBarIcon} from '../TabBarIcon'
import {SideNavItem} from './SideNavItem'

const tabs = [
  {label: 'Home', icon: 'calendar-today'},
  {label: 'Library', icon: 'book'},
  {label: 'Books', icon: 'bookshelf'},
  {label: 'Settings', icon: 'cog'},
] as const

const Rail = () => {
  const [focused, setFocused] = useState(0)
  return (
    <Stack width={220} gap="xs">
      {tabs.map((tab, index) => (
        <SideNavItem
          key={tab.label}
          label={tab.label}
          focused={index === focused}
          onPress={() => setFocused(index)}
          icon={<TabBarIcon name={tab.icon} focused={index === focused} />}
        />
      ))}
    </Stack>
  )
}

const meta = {
  title: 'Navigation/SideNavItem',
  parameters: {layout: 'padded'},
} satisfies Meta
export default meta
type Story = StoryObj<typeof meta>

export const Items: Story = {render: () => <Rail />}
