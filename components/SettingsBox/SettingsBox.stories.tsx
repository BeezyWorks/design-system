import React from 'react'
import type {Meta, StoryObj} from '@storybook/react-native-web-vite'
import {Text} from '../Text'
import {SettingsBox} from './SettingsBox'

const meta = {
  title: 'Settings/SettingsBox',
  component: SettingsBox,
  parameters: {layout: 'padded'},
  args: {children: <Text>A compact cluster of rows.</Text>},
} satisfies Meta<typeof SettingsBox>
export default meta
type Story = StoryObj<typeof meta>

export const Titled: Story = {args: {title: 'Shabbos'}}
export const Untitled: Story = {}
