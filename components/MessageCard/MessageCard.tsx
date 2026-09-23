import React from 'react'
import {SemanticColor} from '../../colors'
import {Card} from '../Card'
import {Text} from '../Text'

interface Props {
  message: string
}
export const MessageCard = ({message}: Props) => {
  return (
    <Card background={SemanticColor.AccentTint}>
      <Text variant="detail" align="center" color={SemanticColor.TextAccent}>
        {message}
      </Text>
    </Card>
  )
}
