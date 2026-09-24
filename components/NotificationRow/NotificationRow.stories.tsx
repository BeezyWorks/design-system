import React, {useState} from 'react'
import type {Meta, StoryObj} from '@storybook/react-native-web-vite'
import {Card} from '../Card'
import {NotificationRow} from './NotificationRow'

const List = () => {
  const [enabled, setEnabled] = useState([true, false, true])
  const rows = [
    ['שקיעה', '10 minutes before', '7:42 PM'],
    ['צאת הכוכבים', 'at time', '8:21 PM'],
    ['חצות', '5 minutes after', '12:47 AM'],
  ]
  return (
    <Card>
      {rows.map(([zmanLabel, offsetLabel, timeLabel], i) => (
        <NotificationRow
          key={zmanLabel}
          zmanLabel={zmanLabel}
          offsetLabel={offsetLabel}
          timeLabel={timeLabel}
          enabled={enabled[i]}
          onToggle={(value) =>
            setEnabled((prev) => prev.map((v, j) => (j === i ? value : v)))
          }
          onEdit={() => {}}
          onDelete={() => {}}
          isLast={i === rows.length - 1}
        />
      ))}
    </Card>
  )
}

const meta = {
  title: 'Rows/NotificationRow',
  parameters: {layout: 'padded'},
} satisfies Meta
export default meta
type Story = StoryObj<typeof meta>

/** Disabled rows dim to 50% but every control stays tappable. */
export const InACard: Story = {render: () => <List />}
