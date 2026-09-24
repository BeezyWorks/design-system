import React from 'react'
import {Switch} from 'react-native'
import {SemanticColor} from '../../colors'
import {useColorResolver} from '../../theme'

export interface ToggleSwitchProps {
  value: boolean
  onValueChange: (value: boolean) => void
  disabled?: boolean
  accessibilityLabel?: string
}

/** The one switch every toggle in the app renders through — wraps RN's
 * built-in `Switch` (not a hand-rolled pill) so native accessibility/
 * platform behavior stays intact, but resolves both track colors from a
 * single place so "ACCENT on, no other on-color" holds everywhere at once. */
export const ToggleSwitch: React.FunctionComponent<ToggleSwitchProps> = ({
  value,
  onValueChange,
  disabled,
  accessibilityLabel,
}) => {
  const resolve = useColorResolver()
  // Flat (non-opacity) off-track color — the redesign's "no green, ACCENT is
  // the only 'on' color" rule needs a real off color to pair it with rather
  // than an opacity wash.
  const off = resolve(SemanticColor.SurfaceTrackOff)
  const thumb = resolve(SemanticColor.SurfaceThumb)

  const props = {
    trackColor: {false: off, true: resolve(SemanticColor.AccentPrimary)},
    // RN's own `thumbColor` covers the "off" thumb everywhere and the "on"
    // thumb on native, but react-native-web draws the "on" thumb from a
    // *separate* `activeThumbColor` (defaulting to a system green if it's
    // left unset) — not in RN's own type declarations since it's a
    // web-only extension, but a real prop react-native-web reads. Both
    // need pinning to white or the redesign's "no green, ACCENT-only"
    // rule quietly breaks on web.
    activeThumbColor: thumb,
    thumbColor: thumb,
    ios_backgroundColor: off,
    onValueChange,
    value,
    disabled,
    accessibilityLabel,
  } as React.ComponentProps<typeof Switch> & {activeThumbColor?: string}

  return <Switch {...props} />
}
