import React from 'react'
import {StyleSheet, View} from 'react-native'
import {useColors} from '../../colors'
import {ThemeStyle} from '@models'

/** Hairline divider between rows in the Luach Zmanim panel — forced to the
 * dark palette's `secondaryTextColor`, matching `ZmanimRow`'s always-dark
 * theme. */
export const ZmanimSeparator: React.FunctionComponent = () => {
  const colors = useColors(ThemeStyle.Dark)
  return (
    <View style={[styles.line, {backgroundColor: colors.secondaryTextColor}]} />
  )
}

const styles = StyleSheet.create({
  line: {height: 1, alignSelf: 'stretch'},
})
