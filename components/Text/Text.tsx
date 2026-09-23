import React from 'react'
import {Text as NativeText, TextProps as NativeTextProps} from 'react-native'
import {TypeVariant, useTypeStyle, useContentTypeStyle} from '../../typography'
import {SemanticColor} from '../../colors'
import {useColorResolver} from '../../theme'
import {FontFamily, Typeface, typefaceFontFamily} from '../../typography'

export type TextAlign = 'auto' | 'left' | 'right' | 'center' | 'justify'

export interface TextProps extends Pick<
  NativeTextProps,
  | 'numberOfLines'
  | 'ellipsizeMode'
  | 'selectable'
  | 'testID'
  | 'accessibilityLabel'
  | 'allowFontScaling'
  | 'onPress'
> {
  children?: React.ReactNode
  /** Chrome type-ramp step. Default `body`. Ignored when `content` is set. */
  variant?: TypeVariant
  /** Renders with the user-configurable siddur reading typeface/size/line
   * height instead of the chrome type ramp — the replacement for the old
   * `useBaseTextStyle`. */
  content?: boolean
  /** Overrides the variant's default color with a semantic token. */
  color?: SemanticColor
  align?: TextAlign
  bold?: boolean
  /** Decorative font family override (e.g. the Hebrew display faces),
   * independent of the content/user-settings typeface. */
  typeface?: Typeface
  /** Renders in Noto Rashi Hebrew (ktav Rashi/semi-cursive script) instead
   * of whatever `typeface`/content font would otherwise apply. Used for
   * peirush text (Rashi, Targum, or a plain-pasuk repeat standing in for
   * commentary) when the user has ktav Rashi enabled — independent of
   * `typeface` since it's a script choice, not a Hebrew display face. */
  rashiScript?: boolean
}

export const Text: React.FunctionComponent<TextProps> = ({
  children,
  variant = 'body',
  content,
  color,
  align,
  bold,
  typeface,
  rashiScript,
  ...textProps
}) => {
  const chromeStyle = useTypeStyle(variant)
  const contentStyle = useContentTypeStyle()
  const resolve = useColorResolver()

  const base = content ? contentStyle : chromeStyle
  const resolvedColor = color ? resolve(color) : base.color

  return (
    <NativeText
      {...textProps}
      style={[
        base,
        {color: resolvedColor},
        align ? {textAlign: align} : null,
        bold ? {fontWeight: '700'} : null,
        typeface ? {fontFamily: typefaceFontFamily[typeface]} : null,
        rashiScript
          ? {
              fontFamily: bold
                ? FontFamily.NotoRashiHebrewBold
                : FontFamily.NotoRashiHebrew,
            }
          : null,
      ]}
    >
      {children}
    </NativeText>
  )
}
