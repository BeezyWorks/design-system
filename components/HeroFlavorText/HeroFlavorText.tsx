import React from 'react'
import {StyleSheet, Text as RNText} from 'react-native'
import {Stack} from '../Stack'
import {useColors} from '../../colors'
import {getFontFamilyName, ThemeStyle} from '@models'

export interface HeroFlavorTextProps {
  children?: React.ReactNode
  /** `end` (default): right-aligned block, used by the phone and iPad-grid
   * heroes. `center`: centered block, used by the desktop-web hero card. */
  align?: 'end' | 'center'
}

/** The Luach hero's "flavor text" line (today's date/parsha teaser) shown
 * over the kotel photo. Always rendered in the forced *light*-theme text
 * color, matching `LuachHeroBackground`'s scrim. Always requests the full
 * width of its parent so `align` can pin it to an edge regardless of the
 * parent's own alignment (mirrors the original `alignSelf: 'flex-end'`). */
export const HeroFlavorText: React.FunctionComponent<HeroFlavorTextProps> = ({
  children,
  align = 'end',
}) => {
  const colors = useColors(ThemeStyle.Light)
  return (
    <Stack
      width="100%"
      align={align === 'center' ? 'center' : 'end'}
      paddingHorizontal={align === 'center' ? 'lg' : 'md'}
      paddingBottom={align === 'center' ? 'lg' : 'md'}
      paddingTop={align === 'center' ? undefined : 'md'}
    >
      <RNText
        style={[
          styles.text,
          {
            color: colors.primaryTextColor,
            textAlign: align === 'center' ? 'center' : 'right',
          },
        ]}
      >
        {children}
      </RNText>
    </Stack>
  )
}

const styles = StyleSheet.create({
  text: {
    fontFamily: getFontFamilyName('Frank'),
    fontSize: 18,
    fontWeight: '800',
  },
})
