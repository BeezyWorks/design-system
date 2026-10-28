import React from 'react'
import {SemanticColor} from '../../colors'
import {useRtl} from '../../layout'
import {Stack} from '../Stack'
import {Text} from '../Text'

export interface TimeTileProps {
  /** What the time is (always the zman's Hebrew name). */
  label: string
  /** Which day it falls on, when that isn't understood (one night of a
   * Yom Tov that runs several days). */
  day?: string
  time: string
  /** Washed in the brand tint — the times you act on (candle lighting) —
   * rather than the quiet fill. */
  highlighted?: boolean
  /** Right-to-left (default: the nearest `RtlScope`'s). */
  rtl?: boolean
}

/** A time in a tile: its name small above it, for a grid of a Shabbos's or
 * a Yom Tov's times. */
export const TimeTile: React.FunctionComponent<TimeTileProps> = ({
  label,
  day,
  time,
  highlighted,
  rtl: rtlProp,
}) => {
  const rtl = useRtl(rtlProp)
  return (
    <Stack
      radius="md"
      paddingVertical="sm"
      paddingHorizontal={12}
      background={
        highlighted ? SemanticColor.AccentTint : SemanticColor.SurfaceSelected
      }
      align={rtl ? 'end' : 'start'}
    >
      <Stack direction={rtl ? 'rowReverse' : 'row'} align="baseline" gap="xs">
        <Text variant="labelSerif">{label}</Text>
        {day ? (
          <Text variant="caption" color={SemanticColor.TextSecondary}>
            {day}
          </Text>
        ) : null}
      </Stack>
      <Text variant="timeLarge" color={SemanticColor.TextPrimary}>
        {time}
      </Text>
    </Stack>
  )
}
