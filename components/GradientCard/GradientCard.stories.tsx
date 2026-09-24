import React from 'react'
import type {Meta, StoryObj} from '@storybook/react-native-web-vite'
import {SemanticColor} from '../../colors'
import {Badge} from '../Badge'
import {Stack} from '../Stack'
import {Text} from '../Text'
import {GradientCard} from './GradientCard'

const meta = {
  title: 'Primitives/GradientCard',
  component: GradientCard,
  parameters: {layout: 'padded'},
  args: {
    onPress: () => {},
    children: (
      <Stack direction="row" justify="spaceBetween" align="end">
        <Stack gap="xs">
          <Text variant="sectionHeader" color={SemanticColor.TextOnAccent}>
            Continue learning
          </Text>
          <Text variant="titleLarge" color={SemanticColor.TextOnAccent}>
            Chapter 3
          </Text>
        </Stack>
        <Badge label="Resume" tone="onAccent" icon="chevron-right" />
      </Stack>
    ),
  },
} satisfies Meta<typeof GradientCard>
export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}
