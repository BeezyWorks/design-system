import React from 'react'
import {SemanticColor} from '../../colors'
import {useRtl} from '../../layout'
import {Card} from '../Card'
import {Text} from '../Text'

interface Props {
  message: string
}

/** A quiet tinted note, usually nested inside another card — so it is flat
 * (no shadow or border). Text is `TextPrimary`: `TextAccent` on the accent
 * tint is below 4.5:1 in every theme. Right-aligned inside an `RtlScope`,
 * centered otherwise. */
export const MessageCard = ({message}: Props) => {
  const rtl = useRtl()
  return (
    <Card background={SemanticColor.AccentTint} shadow="none" borderWidth={0}>
      <Text
        variant="detail"
        align={rtl ? 'right' : 'center'}
        color={SemanticColor.TextPrimary}
      >
        {message}
      </Text>
    </Card>
  )
}
