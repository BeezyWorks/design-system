import React from 'react'
import {StyleSheet, Text as RNText, View} from 'react-native'
import {removeUglyHebCalChars} from '../../hebrewDate'
import {useColors} from '../../colors/useColors'

export interface DashboardRowProps {
  title: string
  value?: string
}

/** One stat line in the Luach Dashboard panel (today's date, zmanim,
 * holidays, parsha, daf yomi…) — value on one side, label on the other. */
export const DashboardRow: React.FunctionComponent<DashboardRowProps> = ({
  title,
  value,
}) => {
  const colors = useColors()
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
