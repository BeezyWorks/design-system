import React from 'react'
import {StyleSheet, Text as RNText, View} from 'react-native'
import {useColors} from '../../colors'
import {ThemeStyle} from '@models'

export interface AgendaSectionHeaderProps {
  gregorianDate: string
  hebrewDate: string
}

/** The date header above each day's events in the Luach Agenda panel.
 * Always renders on the dark kotel-photo hero (the panel forces the dark
 * theme unconditionally), independent of the app's actual setting. */
export const AgendaSectionHeader: React.FunctionComponent<
  AgendaSectionHeaderProps
> = ({gregorianDate, hebrewDate}) => {
  const colors = useColors(ThemeStyle.Dark)
  return (
    <View style={[styles.box, {backgroundColor: colors.backgroundColor}]}>
      <RNText style={[styles.text, {color: colors.secondaryTextColor}]}>
        {gregorianDate}
      </RNText>
      <RNText style={[styles.text, {color: colors.secondaryTextColor}]}>
        {hebrewDate}
      </RNText>
    </View>
  )
}

const styles = StyleSheet.create({
  box: {
    flexDirection: 'row',
    flex: 1,
    alignSelf: 'stretch',
    justifyContent: 'space-between',
    padding: 8,
  },
  text: {marginHorizontal: 4, fontWeight: 'bold'},
})
