import React from 'react'
import {Pressable} from 'react-native'
import {SemanticColor} from '../../colors'
import {Icon} from '../Icon'
import {IconButton} from '../IconButton'
import {Stack} from '../Stack'
import {Text} from '../Text'
import {StateLayer, usePressFeedback} from '../Touchable/pressFeedback'

export interface DatePagerProps {
  /** The day of the week, in the UI language ("Fri"). */
  weekday: string
  /** The Hebrew date, the title proper. */
  hebrewDate: string
  /** The civil date under it. */
  civilDate: string
  onPrevious: () => void
  onNext: () => void
  /** Opens a picker to jump to any date. */
  onPressDate: () => void
  previousLabel: string
  nextLabel: string
  /** Read for the date button, e.g. "Choose a date". */
  pickDateLabel: string
}

/** Steps a day at a time through dates, with the date between the arrows as
 * a button that opens a picker. Laid out left-to-right in every language,
 * like the civil calendar it steps through. */
export const DatePager: React.FunctionComponent<DatePagerProps> = ({
  weekday,
  hebrewDate,
  civilDate,
  onPrevious,
  onNext,
  onPressDate,
  previousLabel,
  nextLabel,
  pickDateLabel,
}) => {
  const {hovered, pressableProps} = usePressFeedback()
  return (
    <Stack direction="row" align="center" gap="sm">
      <IconButton
        name="chevron-left"
        variant="filled"
        size={18}
        onPress={onPrevious}
        accessibilityLabel={previousLabel}
      />
      <Stack grow width={0}>
        <Pressable
          onPress={onPressDate}
          accessibilityRole="button"
          accessibilityLabel={`${pickDateLabel}: ${weekday} ${hebrewDate}, ${civilDate}`}
          {...pressableProps}
        >
          {({pressed}) => (
            <Stack align="center" paddingVertical="xs" radius="md">
              <StateLayer visible={hovered || pressed} radius="md" />
              <Stack direction="row" align="center" gap="xs">
                <Text variant="headline" color={SemanticColor.TextPrimary}>
                  {weekday}
                </Text>
                <Text variant="headline" color={SemanticColor.TextSecondary}>
                  ·
                </Text>
                <Text variant="itemHeader" rtl>
                  {hebrewDate}
                </Text>
                <Icon
                  name="chevron-down"
                  size={14}
                  color={SemanticColor.TextAccent}
                />
              </Stack>
              <Text variant="detail">{civilDate}</Text>
            </Stack>
          )}
        </Pressable>
      </Stack>
      <IconButton
        name="chevron-right"
        variant="filled"
        size={18}
        onPress={onNext}
        accessibilityLabel={nextLabel}
      />
    </Stack>
  )
}
