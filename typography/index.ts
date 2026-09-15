import {TextStyle} from 'react-native'
import {useSelector} from 'state/store'
import {getTextSettings} from '@selectors'
import {getFontFamilyName, TypeFace} from '@models'
import {useColors} from '../colors'

// Chrome (UI-label) type ramp — every raw `fontSize`/`fontWeight` the app
// used to spell out ad hoc, named by role and snapped to the sizes already
// in use across the app (12–22).
export const type = {
  caption: {fontSize: 12, fontWeight: '400'},
  label: {fontSize: 13, fontWeight: '500'},
  body: {fontSize: 14, fontWeight: '400'},
  bodyStrong: {fontSize: 14, fontWeight: '600'},
  subheader: {fontSize: 15, fontWeight: '400'},
  headline: {fontSize: 16, fontWeight: '600'},
  title: {fontSize: 18, fontWeight: '700'},
  titleLarge: {fontSize: 20, fontWeight: '700'},
  largeTitle: {fontSize: 22, fontWeight: '700'},
} as const satisfies Record<string, TextStyle>

export type TypeVariant = keyof typeof type

// Resolves a chrome type-ramp step to a concrete style, with the app's
// semantic text color mixed in (callers may still override color via a
// `tone` prop on `Text`, never via a raw style object).
export const useTypeStyle = (variant: TypeVariant): TextStyle => {
  const colors = useColors()
  return {...type[variant], color: colors.primaryTextColor}
}

// The davening/siddur reading content uses a *different*, user-configurable
// ramp (typeface, font size, line height all come from Settings) — this is
// the direct replacement for the old `useBaseTextStyle`.
export const useContentTypeStyle = (): TextStyle => {
  const {typeface, fontSize, lineHeight} = useSelector(getTextSettings)
  const colors = useColors()
  return {
    color: colors.primaryTextColor,
    fontSize,
    fontFamily: getFontFamilyName(typeface),
    lineHeight,
    textAlign: 'right',
  }
}

export const useTypefaceFontFamily = (typeface: TypeFace) =>
  getFontFamilyName(typeface)

export {AppFonts} from './fonts'
