import React from 'react'
import {Calendar, CalendarProps} from 'react-native-calendars'

export type CalendarGridProps = CalendarProps

/** Thin wrapper around `react-native-calendars`' single-month `Calendar`.
 *
 * Deliberately NOT `CalendarList` (the multi-month virtualized version):
 * on a real native build (New Architecture/Fabric, confirmed via an actual
 * iOS Simulator run, not just Chrome) `CalendarList`'s internal `FlatList`
 * renders completely blank — no header, no day grid, nothing — regardless
 * of size/props/markedDates. A bare, propless `Calendar` in the exact same
 * spot renders correctly.
 *
 * Also deliberately does NOT give `Calendar` a `flex: 1`/stretching style,
 * unlike the old `CalendarList` wrapper this replaced: confirmed on-device
 * that `flex: 1` (or any style that stretches `Calendar` to fill a taller
 * parent) makes its own header's month title silently render nothing —
 * arrows still show, day grid still shows, only the title text vanishes.
 * `Calendar` sizes itself from its content (weeks × row height) and must
 * be left to do that; the caller positions/centers the resulting block
 * instead of stretching it. */
export const CalendarGrid: React.FunctionComponent<CalendarGridProps> = (
  props,
) => <Calendar {...props} />
