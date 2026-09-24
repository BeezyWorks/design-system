import React from 'react'
import {ImageBackground, StyleSheet, View} from 'react-native'
import {kotelImage} from '@images'
import {Stack} from '../Stack'
import {RadiusToken} from '../../radius'
import {useColors} from '../../colors/useColors'
import {ThemeStyle} from '@models'

export interface LuachHeroBackgroundProps {
  children?: React.ReactNode
  width?: number | `${number}%`
  height?: number | `${number}%`
  radius?: RadiusToken
  overflow?: 'visible' | 'hidden'
}

/** The kotel-photo hero shared by all three Luach layouts (phone full-bleed
 * background, iPad-grid banner, desktop-web hero card) — same image and
 * scrim, sized/rounded differently per layout via props. The scrim always
 * reads the app's *light*-theme scrim color, matching the original screen's
 * top-level `useTheme('light')` override for the whole hero chrome —
 * independent of the app's actual light/dark setting. */
export const LuachHeroBackground: React.FunctionComponent<
  LuachHeroBackgroundProps
> = ({children, width = '100%', height = '100%', radius, overflow}) => {
  const colors = useColors(ThemeStyle.Light)
  return (
    <Stack width={width} height={height} radius={radius} overflow={overflow}>
      <ImageBackground source={kotelImage} style={styles.image}>
        <View style={[styles.scrim, {backgroundColor: colors.scrimColor}]} />
        {children}
      </ImageBackground>
    </Stack>
  )
}

const styles = StyleSheet.create({
  image: {flex: 1, width: '100%', height: '100%'},
  scrim: {position: 'absolute', top: 0, left: 0, right: 0, bottom: 0},
})
