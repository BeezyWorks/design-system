import React from 'react'
import {StyleSheet} from 'react-native'
import {CalendarList, CalendarListProps} from 'react-native-calendars'

export type CalendarGridProps = CalendarListProps

/** Thin styling wrapper around `react-native-calendars`' `CalendarList` —
 * the one place this third-party component's own `style` prop (which it
 * requires for its internal flex sizing) is set, so `calendar.widget.tsx`
 * itself never has to pass a literal style object. */
export const CalendarGrid: React.FunctionComponent<CalendarGridProps> = (
  props,
) => <CalendarList {...props} style={styles.list} />

const styles = StyleSheet.create({list: {flex: 1}})
