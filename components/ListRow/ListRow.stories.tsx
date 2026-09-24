import React, {useState} from 'react'
import type {Meta, StoryObj} from '@storybook/react-native-web-vite'
import {Card} from '../Card'
import {ToggleSwitch} from '../ToggleSwitch'
import {ListRow} from './ListRow'

const meta = {
  title: 'Rows/ListRow',
  component: ListRow,
  parameters: {layout: 'padded'},
  args: {
    title: 'Sunset',
    subtitle: '10 minutes before',
    value: '7:42 PM',
  },
  decorators: [
    (Story) => (
      <Card>
        <Story />
      </Card>
    ),
  ],
} satisfies Meta<typeof ListRow>
export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {args: {isLast: true}}

export const WithActions: Story = {
  args: {
    isLast: true,
    actions: [
      {icon: 'edit', label: 'Edit', onPress: () => {}},
      {icon: 'delete', label: 'Delete', onPress: () => {}},
    ],
  },
}

const WithToggle = () => {
  const [on, setOn] = useState(true)
  return (
    <ListRow
      leading={<ToggleSwitch value={on} onValueChange={setOn} />}
      title="Sefirat HaOmer"
      subtitle="Remind me each evening"
      dimmed={!on}
      isLast
    />
  )
}

/** With a leading control; the whole row dims while it's off. */
export const WithLeadingToggle: Story = {render: () => <WithToggle />}

export const TitleOnly: Story = {
  args: {subtitle: undefined, value: undefined, isLast: true},
}
