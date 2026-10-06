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
import {useRtl} from '../../layout'
import {
  FontFamily,
  LatinTypeface,
  Typeface,
  latinTypefaceFontFamily,
  typefaceFontFamily,
} from '../../typography'

export type TextAlign = 'auto' | 'left' | 'right' | 'center' | 'justify'

const HAS_LATIN = /[A-Za-z]/

const photoShadow = {
  textShadowOffset: {width: 0, height: 1},
  textShadowRadius: 10,
}
// Left-to-right mark: sets the paragraph direction of a mixed label from its
// first strong character on every platform (`writingDirection` is iOS-only).
const LRM = '\u200E'

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
  /** Text laid directly over a photo: `TextOnPhoto` (unless `color` says
   * otherwise) with a soft dark halo so it stays legible over light parts
   * of the image. */
  onPhoto?: boolean
  align?: TextAlign
  bold?: boolean
  italic?: boolean
  /** Right-to-left text (Hebrew in an otherwise LTR layout): sets the
   * writing direction, and right-aligns unless `align` says otherwise.
   * Inside an `RtlScope` text right-aligns by default; a label containing
   * any Latin is an English sentence with Hebrew terms in it, so it's laid
   * out left-to-right — "מזרח Calculation" reads in order instead of
   * flipping to "Calculation מזרח". */
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
  onPhoto,
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
  const scopedRtl = useRtl()

  // Only plain-string labels: content text and nested runs keep the
  // platform's own bidi handling.
  const latinLabel =
    scopedRtl &&
    !rtl &&
    !content &&
    typeof children === 'string' &&
    HAS_LATIN.test(children)

  const base = content ? contentStyle : chromeStyle
  const resolvedColor = color
    ? resolve(color)
    : onPhoto
      ? resolve(SemanticColor.TextOnPhoto)
      : base.color

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
          ...(scopedRtl && {textAlign: 'right'}),
          ...(latinLabel && {writingDirection: 'ltr'}),
          ...(rtl && {writingDirection: 'rtl', textAlign: 'right'}),
          ...(italic && {fontStyle: 'italic'}),
          ...(onPhoto && {
            ...photoShadow,
            textShadowColor: resolve(SemanticColor.OverlayPhotoScrim),
          }),
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
      {latinLabel ? LRM + children : children}
    </NativeText>
  )
}
