import React from 'react'
import {Stack} from '../Stack'
import {Text} from '../Text'
import {Touchable} from '../Touchable'
import {ChevronLeft, ChevronRight} from 'lucide-react-native'
import {SemanticColor} from '../../colors'
import {useColorResolver} from '../../theme'
import {useRtl} from '../../layout'

export interface NestedSettingHeaderProps {
  title: string
  onPress: () => void
}

/** A tappable row that drills into a nested settings screen — title on one
 * side, a trailing chevron on the other (mirrored in an `RtlScope`). */
export const NestedSettingHeader: React.FunctionComponent<
  NestedSettingHeaderProps
> = ({title, onPress}) => {
  const rtl = useRtl()
  const resolve = useColorResolver()
  const Chevron = rtl ? ChevronLeft : ChevronRight
  return (
    <Touchable onPress={onPress}>
      <Stack
        direction={rtl ? 'rowReverse' : 'row'}
        justify="spaceBetween"
        align="center"
        paddingVertical="sm"
      >
        <Text variant="rowLabel">{title}</Text>
        <Stack opacity={0.35}>
          <Chevron size={14} color={resolve(SemanticColor.TextPrimary)} />
        </Stack>
      </Stack>
    </Touchable>
  )
}
