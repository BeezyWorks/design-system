import React from 'react'
import type {Meta, StoryObj} from '@storybook/react-native-web-vite'
import {useThemeMode} from '../../theme'
import {Stack} from '../Stack'
import {TabBarIcon} from '../TabBarIcon'
import {SideNavItem} from '../SideNavItem'
import {SideNavRail} from './SideNavRail'

const Demo = ({width}: {width: number}) => {
  const mode = useThemeMode()
  return (
    <Stack height={360}>
      <SideNavRail
        width={width}
        blurTint={
          mode === 'dark'
            ? 'systemChromeMaterialDark'
            : 'systemChromeMaterialLight'
        }
      >
        <SideNavItem
          label="Luach"
          focused
          onPress={() => {}}
          icon={<TabBarIcon name="calendar-today" focused />}
        />
        <SideNavItem
          label="Siddur"
          focused={false}
          onPress={() => {}}
          icon={<TabBarIcon name="book" focused={false} />}
        />
      </SideNavRail>
    </Stack>
  )
}

const meta = {
  title: 'Navigation/SideNavRail',
  parameters: {layout: 'fullscreen'},
} satisfies Meta
export default meta
type Story = StoryObj<typeof meta>

export const Expanded: Story = {render: () => <Demo width={220} />}
export const Narrow: Story = {render: () => <Demo width={160} />}
