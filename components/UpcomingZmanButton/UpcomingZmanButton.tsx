import React from 'react'
import {StyleSheet, Text as RNText, View} from 'react-native'
import {Touchable} from '../Touchable'
import {useColors, NextTefilaPill} from '../../colors'
import {shadows} from '../../shadows'
import {getFontFamilyName, ThemeStyle} from '@models'

export interface UpcomingZmanButtonProps {
  /** The single-letter tefila glyph (ש/מ/ע). */
  tefilaLabel: string
  zmanName: string
  zmanTime: string
  onPress?: () => void
  accessibilityLabel?: string
}

// Fixed brand-accent blue for the round "next tefila" button — deliberately
// the same in light and dark mode.
const PILL_BACKGROUND = NextTefilaPill
const PILL_SIZE = 180

/** The Luach hero's round "next tefila" button — always sits on the dark
 * kotel-photo hero, so its label always renders in the forced dark-theme
 * text color, independent of the app's actual light/dark setting (matches
 * the original `useTheme(ThemeStyle.Dark)`). */
export const UpcomingZmanButton: React.FunctionComponent<
  UpcomingZmanButtonProps
> = ({tefilaLabel, zmanName, zmanTime, onPress, accessibilityLabel}) => {
  const colors = useColors(ThemeStyle.Dark)
  return (
    <Touchable
      onPress={onPress}
      accessibilityRole="button"
      accessibilityLabel={accessibilityLabel ?? zmanName}
    >
      <View style={[styles.pill, shadows.raised]}>
        <RNText style={[styles.tefilaLabel, {color: colors.primaryTextColor}]}>
          {tefilaLabel}
        </RNText>
        <View style={styles.zmanBox}>
          <RNText style={{color: colors.primaryTextColor}}>{zmanName}</RNText>
          <RNText style={{color: colors.primaryTextColor}}>{zmanTime}</RNText>
        </View>
      </View>
    </Touchable>
  )
}

const styles = StyleSheet.create({
  pill: {
    width: PILL_SIZE,
    height: PILL_SIZE,
    backgroundColor: PILL_BACKGROUND,
    borderRadius: PILL_SIZE / 2,
    alignItems: 'center',
    justifyContent: 'center',
  },
  tefilaLabel: {
    fontFamily: getFontFamilyName('Mekorot Vilna'),
    fontSize: 75,
  },
  zmanBox: {alignItems: 'center'},
})
