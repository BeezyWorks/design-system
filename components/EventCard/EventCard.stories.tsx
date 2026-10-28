import React from 'react'
import type {Meta, StoryObj} from '@storybook/react-native-web-vite'
import {RtlScope} from '../../layout'
import {Stack} from '../Stack'
import {EventCard} from './EventCard'

const meta = {
  title: 'Calendar/EventCard',
  component: EventCard,
  parameters: {layout: 'padded'},
  args: {kind: 'minor', lines: ['ראש חודש כסלו']},
  argTypes: {
    kind: {
      control: 'select',
      options: [undefined, 'holiday', 'minor', 'fast', 'personal'],
    },
  },
  decorators: [
    (Story) => (
      <RtlScope>
        <Story />
      </RtlScope>
    ),
  ],
} satisfies Meta<typeof EventCard>
export default meta
type Story = StoryObj<typeof meta>

export const Playground: Story = {}

export const EveryKind: Story = {
  render: () => (
    <Stack gap="sm">
      <EventCard kind="holiday" lines={['שבועות']} />
      <EventCard kind="minor" lines={['חנוכה: ח נרות']} />
      <EventCard
        kind="fast"
        lines={['עשרה בטבת']}
        times={[
          {label: 'עלות השחר', time: '5:47 AM'},
          {label: 'סיום הצום', time: '5:04 PM'},
        ]}
      />
      <EventCard kind="personal" lines={['Yahrzeit · Reb Yaakov']} />
      <EventCard lines={['מוריד הגשם', 'ותן טל ומטר']} />
    </Stack>
  ),
}
