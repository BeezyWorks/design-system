import React from 'react'
import {Switch} from 'react-native'
import {ConcreteThemeStyle} from '@models'
import {useThemeContext} from 'theme/themeRoot'
import {
  useColors,
  White,
  ToggleTrackOff,
  ToggleTrackOffDark,
} from '../../colors'

export interface ToggleSwitchProps {
  value: boolean
  onValueChange: (value: boolean) => void
  disabled?: boolean
}

// Flat (non-opacity) off-track color — the redesign's "no green, ACCENT is
// the only 'on' color" rule needs a real off color to pair it with rather
// than an opacity wash.
const trackOffColor = ToggleTrackOff
const trackOffColorDark = ToggleTrackOffDark

/** The one switch every toggle in the app renders through — wraps RN's
 * built-in `Switch` (not a hand-rolled pill) so native accessibility/
 * platform behavior stays intact, but resolves both track colors from a
 * single place so "ACCENT on, no other on-color" holds everywhere at once. */
export const ToggleSwitch: React.FunctionComponent<ToggleSwitchProps> = ({
  value,
  onValueChange,
  disabled,
}) => {
  const colors = useColors()
  const {themeStyle} = useThemeContext()
  const off =
    themeStyle === ConcreteThemeStyle.Dark ? trackOffColorDark : trackOffColor

  const props = {
    trackColor: {false: off, true: colors.accent},
    // RN's own `thumbColor` covers the "off" thumb everywhere and the "on"
    // thumb on native, but react-native-web draws the "on" thumb from a
    // *separate* `activeThumbColor` (defaulting to a system green if it's
    // left unset) — not in RN's own type declarations since it's a
    // web-only extension, but a real prop react-native-web reads. Both
    // need pinning to white or the redesign's "no green, ACCENT-only"
    // rule quietly breaks on web.
    activeThumbColor: White,
    thumbColor: White,
    ios_backgroundColor: off,
    onValueChange,
    value,
    disabled,
  } as React.ComponentProps<typeof Switch> & {activeThumbColor?: string}

  return <Switch {...props} />
}
