import React from 'react'
import {Platform} from 'react-native'
import {Picker} from '@react-native-picker/picker'
import {
  HEBREW_MONTH_OPTIONS,
  HebrewDateValue,
  HebrewMonthKey,
  getHebrewMonthOption,
} from 'siddurCalendar/models/hebrewMonthOptions'
import {formatGematriya} from 'siddurCalendar/hebcal.utils'
import {Stack} from '../Stack'
import {Text} from '../Text'
import {useColors} from '../../colors'
import {radius} from '../../radius'
import {spacing} from '../../spacing'

interface Props {
  value: HebrewDateValue
  onChange: (value: HebrewDateValue) => void
}

/** A day + month wheel picker locked to dates that actually exist on the
 * Hebrew calendar — the day options shrink to each month's maximum
 * possible length (e.g. no 30 Elul) whenever the month changes. */
export const HebrewDatePicker: React.FunctionComponent<Props> = ({
  value,
  onChange,
}) => {
  const colors = useColors()
  const option = getHebrewMonthOption(value.monthKey)
  const days = Array.from({length: option.maxDays}, (_, i) => i + 1)

  // The native (`Picker.ios`/`Picker.android`) wheel is OS-drawn chrome
  // that already looks right and mostly ignores box styling — but
  // `Picker.web` is a plain unstyled `<select>`, so it needs real CSS or
  // it looks like bare browser chrome next to the rest of this design
  // system.
  const webPickerStyle =
    Platform.OS === 'web'
      ? {
          fontSize: 16,
          paddingVertical: spacing.sm,
          paddingHorizontal: spacing.md,
          borderRadius: radius.sm,
          borderWidth: 1,
          borderColor: colors.border,
          backgroundColor: colors.backgroundColorDirty,
          color: colors.primaryTextColor,
        }
      : undefined

  const onMonthChange = (monthKey: HebrewMonthKey) => {
    const nextOption = getHebrewMonthOption(monthKey)
    onChange({day: Math.min(value.day, nextOption.maxDays), monthKey})
  }

  return (
    <Stack direction="row" gap="sm">
      <Stack width={90}>
        <Text variant="label" tone="secondaryTextColor" align="center">
          Day
        </Text>
        <Picker
          selectedValue={value.day}
          onValueChange={(day) => onChange({...value, day: Number(day)})}
          itemStyle={{color: colors.primaryTextColor}}
          style={webPickerStyle}
        >
          {days.map((day) => (
            <Picker.Item key={day} label={formatGematriya(day)} value={day} />
          ))}
        </Picker>
      </Stack>
      <Stack grow>
        <Text variant="label" tone="secondaryTextColor" align="center">
          Month
        </Text>
        <Picker
          selectedValue={value.monthKey}
          onValueChange={onMonthChange}
          itemStyle={{color: colors.primaryTextColor}}
          style={webPickerStyle}
        >
          {HEBREW_MONTH_OPTIONS.map(({key, label}) => (
            <Picker.Item key={key} label={label} value={key} />
          ))}
        </Picker>
      </Stack>
    </Stack>
  )
}
