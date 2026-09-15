import React from 'react'
import {StyleSheet, Text as RNText, View} from 'react-native'
import {removeUglyHebCalChars} from 'siddurCalendar/hebcal.utils'
import {useColors} from '../../colors'
import {ThemeStyle} from '@models'

export interface DashboardRowProps {
  title: string
  value?: string
  /** Forces a specific theme regardless of the app's actual setting — the
   * Luach swiper/grid panels always force `Dark`; the calendar day-tap
   * modal leaves it unset to follow the app's current theme. Mirrors the
   * original `Dashboard`/`DashboardItem`'s `theme?: ThemeStyle` prop. */
  themeOverride?: ThemeStyle
}

/** One stat line in the Luach Dashboard panel (today's date, zmanim,
 * holidays, parsha, daf yomi…) — value on one side, label on the other. */
export const DashboardRow: React.FunctionComponent<DashboardRowProps> = ({
  title,
  value,
  themeOverride,
}) => {
  const colors = useColors(themeOverride)
  return (
    <View style={styles.row}>
      <RNText style={[styles.text, {color: colors.primaryTextColor}]}>
        {value}
      </RNText>
      <RNText style={[styles.title, {color: colors.primaryTextColor}]}>
        {removeUglyHebCalChars(title)}
      </RNText>
    </View>
  )
}

const styles = StyleSheet.create({
  row: {
    alignSelf: 'center',
    flexDirection: 'row',
    width: 180,
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    paddingVertical: 6,
  },
  text: {fontSize: 18},
  title: {fontSize: 18, fontWeight: 'bold'},
})
