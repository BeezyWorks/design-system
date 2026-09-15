import React from 'react'
import {Stack} from '../Stack'
import {Text} from '../Text'

export interface ReaderParagraphProps {
  /** Optional label above the paragraph (e.g. "משנה א") — omitted for
   * screens that render continuous text with no per-paragraph heading. */
  heading?: string
  children?: React.ReactNode
}

/** A single reading-content paragraph, optionally preceded by a bold
 * section heading — the Pirkei Avos reader's "משנה N" + text block. */
export const ReaderParagraph: React.FunctionComponent<ReaderParagraphProps> = ({
  heading,
  children,
}) => (
  <Stack>
    {heading ? (
      <Stack paddingTop="md">
        <Text variant="headline" tone="primaryColor" align="right">
          {heading}
        </Text>
      </Stack>
    ) : null}
    <Text content>{children}</Text>
  </Stack>
)
