import React from 'react'
import {Text as NativeText} from 'react-native'
import {useContentTypeStyle} from '../../typography'

export interface NumberedVerseProps {
  /** Pre-formatted verse number (gematriya), rendered bold and slightly
   * smaller than the surrounding reading text. */
  number: string
  children?: React.ReactNode
}

/** A single Tanach verse: a bold gematriya number inline with the
 * user-configurable reading-content text — the plain-book reader's
 * per-verse numbering convention. Uses the raw content style (rather than
 * `<Text content>`) because the number needs a derived size/weight the
 * `Text` component's props don't expose. */
export const NumberedVerse: React.FunctionComponent<NumberedVerseProps> = ({
  number,
  children,
}) => {
  const contentStyle = useContentTypeStyle()
  const numberStyle = {
    ...contentStyle,
    fontWeight: 'bold' as const,
    fontSize: (contentStyle.fontSize ?? 12) - 3,
  }
  return (
    <NativeText style={contentStyle}>
      <NativeText style={numberStyle}>{number}: </NativeText>
      {children}
    </NativeText>
  )
}
