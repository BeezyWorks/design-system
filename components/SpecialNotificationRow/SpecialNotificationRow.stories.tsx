import React, {useState} from 'react'
import type {Meta, StoryObj} from '@storybook/react-native-web-vite'
import {Card} from '../Card'
import {SpecialNotificationRow} from './SpecialNotificationRow'

const List = () => {
  const [omer, setOmer] = useState(true)
  const [eiruv, setEiruv] = useState(false)
  return (
    <Card>
      <SpecialNotificationRow
        name="ספירת העומר"
        description="A reminder each evening during the Omer"
        enabled={omer}
        onToggle={setOmer}
      />
      <SpecialNotificationRow
        name="עירוב תבשילין"
        description="Reminder on the erev of a Yom Tov that leads into Shabbos"
        enabled={eiruv}
        onToggle={setEiruv}
        isLast
      />
    </Card>
  )
}

const meta = {
  title: 'Rows/SpecialNotificationRow',
  parameters: {layout: 'padded'},
} satisfies Meta
export default meta
type Story = StoryObj<typeof meta>

export const InACard: Story = {render: () => <List />}
