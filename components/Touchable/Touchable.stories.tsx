import React from 'react'
import type {Meta, StoryObj} from '@storybook/react-native-web-vite'
import {SemanticColor} from '../../colors'
import {Stack} from '../Stack'
import {Text} from '../Text'
import {Touchable} from './Touchable'

const meta = {
  title: 'Primitives/Touchable',
  component: Touchable,
  parameters: {layout: 'padded'},
  args: {onPress: () => {}},
  render: (args) => (
    <Touchable {...args}>
      <Stack
        padding="md"
        radius="md"
        background={SemanticColor.SurfaceCard}
        borderWidth={1}
        borderColor={SemanticColor.BorderDefault}
      >
        <Text>Press me — a hover/press wash appears on the row</Text>
      </Stack>
    </Touchable>
  ),
} satisfies Meta<typeof Touchable>
export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}
export const Disabled: Story = {args: {disabled: true}}
