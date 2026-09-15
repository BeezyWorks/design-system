import {Platform} from 'react-native'
import {ThemeColors} from '@models'

// The raw palette + light/dark theme maps. This is the one static (non-hook)
// entry point into the color system — `useTheme`/`useColors` are how every
// component should actually read colors; this file exists so those hooks
// (and a couple of native-module config spots, e.g. splash/status-bar setup)
// have something non-circular to resolve against.
export const ColorPrimary = '#2196f3'
export const ColorPrimaryDark = '#0069c0'
export const ColorPrimaryLight = '#6ec6ff'

export const ColorSecondary = '#fdd835'
export const ColorSecondaryLight = '#ffff6b'
export const ColorSecondaryDark = '#c6a700'

export const WarningColor = '#f44336'

export const BackgroundLight = '#fff'
export const BackgroundLightDirty = '#efefef'

export const BackgroundDark = '#313131'
export const BackgroundDarkDirty = '#515151'

export const DarkTheme: ThemeColors = {
  primaryColor: ColorPrimaryDark,
  secondaryColor: ColorSecondary,
  headerTextColor: Platform.OS === 'ios' ? ColorPrimary : BackgroundLightDirty,
  primaryTextColor: '#ffffff',
  specialTextColor: ColorSecondary,
  secondaryTextColor: '#BBBBBB',
  backgroundColor: BackgroundDark,
  backgroundColorDirty: BackgroundDarkDirty,
  scrimColor: 'rgba(187,187,187,.6)',
  tabOffColor: BackgroundLightDirty,
  warningColor: WarningColor,
}

export const LightTheme: ThemeColors = {
  primaryColor: ColorPrimary,
  secondaryColor: ColorSecondary,
  specialTextColor: ColorPrimary,
  headerTextColor: Platform.OS === 'ios' ? ColorPrimary : BackgroundLightDirty,
  primaryTextColor: '#000000',
  secondaryTextColor: '#515759',
  backgroundColor: BackgroundLight,
  backgroundColorDirty: BackgroundLightDirty,
  scrimColor: 'rgba(171,171,171,.8)',
  tabOffColor: BackgroundDarkDirty,
  warningColor: WarningColor,
}
