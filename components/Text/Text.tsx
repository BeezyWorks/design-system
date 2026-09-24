import React from 'react'
import {Text as NativeText, TextProps as NativeTextProps} from 'react-native'
import {
  ContentScript,
  TypeVariant,
  useTypeStyle,
  useContentTypeStyle,
} from '../../typography'
import {SemanticColor} from '../../colors'
import {useColorResolver, useContentText} from '../../theme'
import {
  FontFamily,
  LatinTypeface,
  Typeface,
  latinTypefaceFontFamily,
  typefaceFontFamily,
} from '../../typography'

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
  /** Renders with the user-configurable reading typeface/size/line
   * height/tracking instead of the chrome type ramp. `true` (or
   * `'hebrew'`) uses the Hebrew reading typeface; `'latin'` the Latin one,
   * for translations. */
  content?: boolean | ContentScript
  /** A step below the main reading size (commentary, glosses). Only
   * meaningful with `content`. */
  secondary?: boolean
  /** Overrides the variant's default color with a semantic token. */
  color?: SemanticColor
  align?: TextAlign
  bold?: boolean
  italic?: boolean
  /** Right-to-left text (Hebrew in an otherwise LTR layout): sets the
   * writing direction, and right-aligns unless `align` says otherwise. */
  rtl?: boolean
  /** Decorative font family override (e.g. the Hebrew display faces),
   * independent of the content/user-settings typeface. */
  typeface?: Typeface
  /** Latin face override — e.g. a font picker previewing each option. */
  latinTypeface?: LatinTypeface
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
  secondary,
  color,
  align,
  bold,
  italic,
  rtl,
  typeface,
  latinTypeface,
  rashiScript,
  ...textProps
}) => {
  const script: ContentScript = content === 'latin' ? 'latin' : 'hebrew'
  const chromeStyle = useTypeStyle(variant)
  const contentStyle = useContentTypeStyle(script, secondary)
  const {latinTypeface: selectedLatin} = useContentText()
  const resolve = useColorResolver()

  const base = content ? contentStyle : chromeStyle
  const resolvedColor = color ? resolve(color) : base.color

  // Latin faces ship real bold/italic cuts — switch family rather than
  // asking the platform to synthesize them (which custom fonts on iOS
  // silently ignore).
  const latin =
    latinTypeface ?? (content === 'latin' ? selectedLatin : undefined)
  const latinFamily = latin
    ? latinTypefaceFontFamily[latin][
        bold ? 'bold' : italic ? 'italic' : 'regular'
      ]
    : undefined

  return (
    <NativeText
      {...textProps}
      style={[
        base,
        {
          color: resolvedColor,
          ...(rtl && {writingDirection: 'rtl', textAlign: 'right'}),
          ...(italic && {fontStyle: 'italic'}),
        },
        align ? {textAlign: align} : null,
        bold ? {fontWeight: '700'} : null,
        typeface || latinFamily
          ? {
              fontFamily: typeface ? typefaceFontFamily[typeface] : latinFamily,
            }
          : null,
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
