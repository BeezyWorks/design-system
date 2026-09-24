import React, {useState} from 'react'
import type {Meta, StoryObj} from '@storybook/react-native-web-vite'
import {Stack} from '../Stack'
import {Text} from '../Text'
import {HebrewDatePicker} from './HebrewDatePicker'

type Value = React.ComponentProps<typeof HebrewDatePicker>['value']

const Demo = ({initial}: {initial: Value}) => {
  const [value, setValue] = useState(initial)
  return (
    <Stack gap="md" width={360}>
      <HebrewDatePicker value={value} onChange={setValue} />
      <Text variant="detail">{JSON.stringify(value)}</Text>
    </Stack>
  )
}

const meta = {
  title: 'Luach/HebrewDatePicker',
  parameters: {layout: 'padded'},
} satisfies Meta
export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  render: () => <Demo initial={{day: 15, monthKey: 'Adar'}} />,
}
