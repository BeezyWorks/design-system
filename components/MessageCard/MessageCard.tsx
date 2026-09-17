import React from 'react'
import {Card} from '../Card'
import {Text} from '../Text'

interface Props {
  message: string
}
export const MessageCard = ({message}: Props) => {
  return (
    <Card background="tintAccent">
      <Text variant="detail" align="center" tone="accent">
        {message}
      </Text>
    </Card>
  )
}
