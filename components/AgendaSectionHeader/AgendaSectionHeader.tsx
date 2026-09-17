import React from 'react'
import {StyleSheet, Text as RNText, View} from 'react-native'
import {useColors} from '../../colors'
import {spacing} from '../../spacing'
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
    alignSelf: 'stretch',
    justifyContent: 'space-between',
    paddingVertical: 8,
    // Escapes the Luach panel's own horizontal gutter (the phone swiper
    // wraps every panel in `paddingHorizontal="md"`) so this bar's
    // *background* runs edge to edge like a real section divider, while
    // the extra padding keeps the text itself sitting where the old inset
    // put it instead of also sliding out to the edge. In the wide/grid
    // layouts, where the panel has no such gutter, `DarkSurface`'s own
    // clipped `overflow: hidden` absorbs the negative margin with no
    // visual difference.
    paddingHorizontal: 8 + spacing.md,
    marginHorizontal: -spacing.md,
  },
  text: {marginHorizontal: 4, fontWeight: 'bold'},
})
