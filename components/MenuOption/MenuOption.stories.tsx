import React, {useState} from 'react'
import type {Meta, StoryObj} from '@storybook/react-native-web-vite'
import {Card} from '../Card'
import {MenuOption} from './MenuOption'

const labels = ['עלות השחר', 'הנץ החמה', 'סוף זמן קריאת שמע', 'חצות']

const List = () => {
  const [selected, setSelected] = useState(1)
  return (
    <Card padding="none">
      {labels.map((label, index) => (
        <MenuOption
          key={label}
          label={label}
          selected={index === selected}
          isLast={index === labels.length - 1}
          onPress={() => setSelected(index)}
        />
      ))}
    </Card>
  )
}

const meta = {
  title: 'Menus/MenuOption',
  parameters: {layout: 'padded'},
} satisfies Meta
export default meta
type Story = StoryObj<typeof meta>

export const SelectableList: Story = {render: () => <List />}
