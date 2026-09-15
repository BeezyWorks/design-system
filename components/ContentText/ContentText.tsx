import React from 'react'
import {Text as NativeText, TextProps as NativeTextProps} from 'react-native'
import {useContentTypeStyle} from '../../typography'
import {useColors} from '../../colors'

export type ContentTextWeight = 'regular' | 'bold'
export type ContentTextSize = 'normal' | 'large' | 'small'
export type ContentTextTone = 'normal' | 'special'

// The davening reader nudges the user's configured font size up/down for
// "Large"/"Small" word styling — matches the offset the old
// `useBaseTextStyle`-based rendering used.
const SIZE_STEP = 5

export interface ContentTextProps extends Pick<
  NativeTextProps,
  'onPress' | 'testID'
> {
  children?: React.ReactNode
  /** Default `regular`. */
  weight?: ContentTextWeight
  /** Default `normal`. */
  size?: ContentTextSize
  /** Default `normal` — `special` resolves to the theme's special-text
   * color (siddur instructional/highlighted text). */
  tone?: ContentTextTone
}

/** The siddur reading-text primitive: renders with the user-configurable
 * content typeface/size/line-height (see `useContentTypeStyle`) and layers
 * the davening reader's per-word bold/large/small/special-color styling on
 * top via semantic props — never a raw style object. Multiple `ContentText`
 * elements may be nested inside one another (as in `textElement.widget.tsx`)
 * to style individual runs of words within one flowing paragraph. */
export const ContentText: React.FunctionComponent<ContentTextProps> = ({
  children,
  weight = 'regular',
  size = 'normal',
  tone = 'normal',
  onPress,
  testID,
}) => {
  const base = useContentTypeStyle()
  const colors = useColors()

  const baseFontSize = (base.fontSize as number) ?? 0
  const fontSize =
    size === 'large'
      ? baseFontSize + SIZE_STEP
      : size === 'small'
        ? baseFontSize - SIZE_STEP
        : base.fontSize
  const color = tone === 'special' ? colors.specialTextColor : base.color

  return (
    <NativeText
      onPress={onPress}
      testID={testID}
      style={[
        base,
        {
          fontSize,
          color,
          fontWeight: weight === 'bold' ? 'bold' : undefined,
        },
      ]}
    >
      {children}
    </NativeText>
  )
}
