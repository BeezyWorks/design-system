import React from 'react'
import {Pressable} from 'react-native'
import {SemanticColor} from '../../colors'
import {formatGematriya, toHebrewMoment} from '../../hebrewDate'
import {EventDot} from '../EventDot'
import {Stack} from '../Stack'
import {Text} from '../Text'
import {StateLayer, usePressFeedback} from '../Touchable/pressFeedback'

const DAYS_IN_WEEK = 7
// Every month is drawn six weeks tall, so paging months never jumps the
// layout under it.
const WEEKS_IN_MONTH = 6
const MAX_DOTS = 3

/** A day's key in `marks`: its local civil date as `YYYY-MM-DD`. */
export const dayKey = (date: Date) =>
  `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')}`

const sameDay = (a?: Date, b?: Date) => !!a && !!b && dayKey(a) === dayKey(b)

const addDays = (date: Date, days: number) =>
  new Date(date.getFullYear(), date.getMonth(), date.getDate() + days, 12)

/** The Sunday on or before `date`. */
const startOfWeek = (date: Date) => addDays(date, -date.getDay())

export interface MonthGridProps {
  /** Any day in the month to draw (Gregorian). */
  month: Date
  /** `week` draws only the week holding `focus` (default `month`). */
  mode?: 'month' | 'week'
  /** The week drawn in `week` mode (default `today`, else `month`). */
  focus?: Date
  today?: Date
  selected?: Date
  /** Which of `today` and `selected` is filled with the brand; the other is
   * ringed. A calendar fills today and rings the day you tapped; a date
   * picker fills its choice. Default `today`. */
  filled?: 'today' | 'selected'
  /** Event colors per day, keyed by `dayKey` — a dot each, three at most. */
  marks?: Record<string, SemanticColor[]>
  /** The weekday initials, Sunday first, in the UI language. */
  weekdayLabels: string[]
  /** `large` for a picker: bigger figures in taller cells. */
  size?: 'compact' | 'large'
  onDayPress?: (date: Date) => void
  onDayLongPress?: (date: Date) => void
  /** Read for each day, e.g. its full civil and Hebrew date. */
  dayAccessibilityLabel?: (date: Date) => string
}

/** A month (or one week) of the civil calendar, each day's figure over its
 * Hebrew date in small gematria, with a dot for each of its events. Always
 * left-to-right, Sunday first, like a printed luach's civil grid. */
export const MonthGrid: React.FunctionComponent<MonthGridProps> = ({
  month,
  mode = 'month',
  focus,
  today,
  selected,
  filled = 'today',
  marks = {},
  weekdayLabels,
  size = 'compact',
  onDayPress,
  onDayLongPress,
  dayAccessibilityLabel,
}) => {
  const first =
    mode === 'week'
      ? startOfWeek(focus ?? today ?? month)
      : startOfWeek(new Date(month.getFullYear(), month.getMonth(), 1, 12))
  const weeks = mode === 'week' ? 1 : WEEKS_IN_MONTH
  const rows = Array.from({length: weeks}, (_, week) =>
    Array.from({length: DAYS_IN_WEEK}, (__, day) =>
      addDays(first, week * DAYS_IN_WEEK + day),
    ),
  )
  const filledDay = filled === 'today' ? today : selected
  const ringedDay = filled === 'today' ? selected : today

  return (
    <Stack gap={2}>
      <Stack direction="row">
        {weekdayLabels.map((label, i) => (
          <Stack key={i} grow width={0} align="center" paddingBottom={2}>
            <Text variant="caption" color={SemanticColor.TextSecondary}>
              {label}
            </Text>
          </Stack>
        ))}
      </Stack>
      {rows.map((days) => (
        <Stack key={dayKey(days[0])} direction="row" gap={1}>
          {days.map((date) => (
            <DayCell
              key={dayKey(date)}
              date={date}
              size={size}
              outside={mode === 'month' && date.getMonth() !== month.getMonth()}
              isFilled={sameDay(date, filledDay)}
              isRinged={sameDay(date, ringedDay) && !sameDay(date, filledDay)}
              dots={(marks[dayKey(date)] ?? []).slice(0, MAX_DOTS)}
              onPress={onDayPress}
              onLongPress={onDayLongPress}
              accessibilityLabel={dayAccessibilityLabel?.(date)}
            />
          ))}
        </Stack>
      ))}
    </Stack>
  )
}

interface DayCellProps {
  date: Date
  size: 'compact' | 'large'
  outside: boolean
  isFilled: boolean
  isRinged: boolean
  dots: SemanticColor[]
  onPress?: (date: Date) => void
  onLongPress?: (date: Date) => void
  accessibilityLabel?: string
}

const DayCell: React.FunctionComponent<DayCellProps> = ({
  date,
  size,
  outside,
  isFilled,
  isRinged,
  dots,
  onPress,
  onLongPress,
  accessibilityLabel,
}) => {
  const {hovered, pressableProps} = usePressFeedback()
  const large = size === 'large'
  const ink = isFilled ? SemanticColor.TextOnAccent : SemanticColor.TextPrimary
  const hebrewDay = formatGematriya(toHebrewMoment(date).day)
  return (
    <Stack grow width={0} opacity={outside ? 0.38 : 1}>
      <Pressable
        onPress={onPress && (() => onPress(date))}
        onLongPress={onLongPress && (() => onLongPress(date))}
        disabled={!onPress && !onLongPress}
        accessibilityRole="button"
        accessibilityLabel={accessibilityLabel}
        accessibilityState={{selected: isFilled || isRinged}}
        {...pressableProps}
      >
        {({pressed}) => (
          <Stack
            height={large ? 54 : 50}
            align="center"
            justify="center"
            gap={1}
            radius="md"
            background={
              isFilled ? SemanticColor.AccentPrimaryStrong : undefined
            }
            borderWidth={isRinged ? 2 : undefined}
            borderColor={isRinged ? SemanticColor.AccentPrimary : undefined}
          >
            <StateLayer visible={hovered || pressed} radius="md" />
            <Text variant={large ? 'titleLarge' : 'headline'} color={ink}>
              {String(date.getDate())}
            </Text>
            <Text variant="caption" color={ink} rtl align="center">
              {hebrewDay}
            </Text>
            <Stack direction="row" gap={2} height={5}>
              {dots.map((color, i) => (
                <EventDot key={i} color={color} size={5} />
              ))}
            </Stack>
          </Stack>
        )}
      </Pressable>
    </Stack>
  )
}
