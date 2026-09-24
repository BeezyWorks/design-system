import React from 'react'
import type {Meta, StoryObj} from '@storybook/react-native-web-vite'
import {SemanticColor} from '../../colors'
import {TypeVariant, Typeface} from '../../typography'
import {Stack} from '../Stack'
import {Text} from './Text'

const variants: TypeVariant[] = [
  'caption',
  'label',
  'body',
  'bodyStrong',
  'subheader',
  'headline',
  'title',
  'titleLarge',
  'largeTitle',
  'pageHeader',
  'sectionHeader',
  'item',
  'itemHeader',
  'detail',
  'supplemental',
  'sheetTitle',
  'menuOption',
  'menuOptionSelected',
]

const meta = {
  title: 'Primitives/Text',
  component: Text,
  parameters: {layout: 'padded'},
  args: {children: 'The quick brown fox — שמע ישראל'},
  argTypes: {
    variant: {control: 'select', options: variants},
    color: {control: 'select', options: Object.values(SemanticColor)},
    align: {
      control: 'inline-radio',
      options: ['auto', 'left', 'right', 'center', 'justify'],
    },
    typeface: {
      control: 'select',
      options: [undefined, ...Object.values(Typeface)],
    },
  },
} satisfies Meta<typeof Text>
export default meta
type Story = StoryObj<typeof meta>

export const Playground: Story = {}

export const TypeRamp: Story = {
  render: (args) => (
    <Stack gap="sm">
      {variants.map((variant) => (
        <Stack key={variant} direction="row" gap="md" align="baseline">
          <Stack width={140}>
            <Text variant="caption" color={SemanticColor.TextSecondary}>
              {variant}
            </Text>
          </Stack>
          <Text {...args} variant={variant} />
        </Stack>
      ))}
    </Stack>
  ),
}

export const TextColors: Story = {
  render: (args) => (
    <Stack gap="xs">
      {Object.entries(SemanticColor)
        .filter(([name]) => name.startsWith('Text'))
        .map(([name, token]) => (
          <Text key={name} {...args} color={token}>
            {name}
          </Text>
        ))}
    </Stack>
  ),
}

export const Bold: Story = {args: {bold: true}}

/** The user-configurable reading face — driven by the provider's `content`
 * selection, not the chrome type ramp. */
export const ReadingContent: Story = {
  args: {content: true, children: 'בראשית ברא אלהים את השמים ואת הארץ'},
}

export const HebrewTypefaces: Story = {
  render: (args) => (
    <Stack gap="sm">
      {Object.values(Typeface).map((face) => (
        <Stack key={face} direction="row" gap="md" align="baseline">
          <Stack width={120}>
            <Text variant="caption" color={SemanticColor.TextSecondary}>
              {face}
            </Text>
          </Stack>
          <Text {...args} typeface={face} variant="titleLarge">
            בראשית ברא אלהים
          </Text>
        </Stack>
      ))}
    </Stack>
  ),
}

export const RashiScript: Story = {
  args: {rashiScript: true, children: 'פירוש רש״י על התורה'},
}
