import React from 'react'
import type {Meta, StoryObj} from '@storybook/react-native-web-vite'
import {SemanticColor} from '../../colors'
import {Text} from '../Text'
import {Stack} from './Stack'

const Box = ({label}: {label: string}) => (
  <Stack
    background={SemanticColor.AccentTint}
    radius="sm"
    padding="sm"
    align="center"
    justify="center"
    width={72}
    height={56}
  >
    <Text variant="label" color={SemanticColor.TextAccent}>
      {label}
    </Text>
  </Stack>
)

const meta = {
  title: 'Primitives/Stack',
  component: Stack,
  parameters: {layout: 'padded'},
  args: {
    direction: 'row',
    gap: 'md',
    padding: 'md',
    background: SemanticColor.SurfaceCard,
    radius: 'md',
    children: (
      <>
        <Box label="1" />
        <Box label="2" />
        <Box label="3" />
      </>
    ),
  },
  argTypes: {
    direction: {
      control: 'select',
      options: ['row', 'rowReverse', 'column', 'columnReverse'],
    },
    align: {
      control: 'select',
      options: [undefined, 'start', 'center', 'end', 'stretch', 'baseline'],
    },
    justify: {
      control: 'select',
      options: [
        undefined,
        'start',
        'center',
        'end',
        'spaceBetween',
        'spaceAround',
        'spaceEvenly',
      ],
    },
    gap: {
      control: 'select',
      options: [undefined, 'xs', 'sm', 'md', 'lg', 'xl'],
    },
    padding: {
      control: 'select',
      options: [undefined, 'xs', 'sm', 'md', 'lg', 'xl'],
    },
    radius: {
      control: 'select',
      options: [undefined, 'xs', 'sm', 'md', 'lg', 'xl', 'full'],
    },
    shadow: {
      control: 'select',
      options: [undefined, 'card', 'raised', 'floating'],
    },
    background: {
      control: 'select',
      options: [
        undefined,
        SemanticColor.SurfaceBackground,
        SemanticColor.SurfaceCard,
        SemanticColor.SurfaceSelected,
        SemanticColor.AccentTint,
      ],
    },
  },
} satisfies Meta<typeof Stack>
export default meta
type Story = StoryObj<typeof meta>

export const Playground: Story = {}
export const Column: Story = {args: {direction: 'column', align: 'start'}}
export const SpaceBetween: Story = {
  args: {justify: 'spaceBetween', align: 'center'},
}
export const Wrapping: Story = {
  args: {
    wrap: true,
    width: 260,
    children: (
      <>
        {[1, 2, 3, 4, 5, 6].map((n) => (
          <Box key={n} label={String(n)} />
        ))}
      </>
    ),
  },
}
export const BorderedWithShadow: Story = {
  args: {
    shadow: 'card',
    borderWidth: 1,
    borderColor: SemanticColor.BorderDefault,
  },
}
