import React from 'react'
import {Text as NativeText, TextProps as NativeTextProps} from 'react-native'
import {TypeVariant, useTypeStyle, useContentTypeStyle} from '../../typography'
import {useColors, Colors} from '../../colors'
import {TypeFace, getFontFamilyName} from '@models'

export type Tone = keyof Colors
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
  tone?: Tone
  align?: TextAlign
  bold?: boolean
  /** Decorative font family override (e.g. the Hebrew display faces),
   * independent of the content/user-settings typeface. */
  typeface?: TypeFace
}

export const Text: React.FunctionComponent<TextProps> = ({
  children,
  variant = 'body',
  content,
  tone,
  align,
  bold,
  typeface,
  ...textProps
}) => {
  const chromeStyle = useTypeStyle(variant)
  const contentStyle = useContentTypeStyle()
  const colors = useColors()

  const base = content ? contentStyle : chromeStyle
  const color = tone ? colors[tone] : base.color

  return (
    <NativeText
      {...textProps}
      style={[
        base,
        {color},
        align ? {textAlign: align} : null,
        bold ? {fontWeight: '700'} : null,
        typeface ? {fontFamily: getFontFamilyName(typeface)} : null,
      ]}
    >
      {children}
    </NativeText>
  )
}
