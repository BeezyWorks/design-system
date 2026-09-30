import React from 'react'
import {Card} from '../Card'
import {Text} from '../Text'
import {RtlScope} from '../../layout'

export interface SettingsCardProps {
  title?: string
  children?: React.ReactNode
  /** Grow to fill available row space — used when two cards sit side by
   * side in a wide layout. */
  grow?: boolean
}

/** A titled settings section — just `Card` with its own title row, so it
 * stays visually identical to every other card (the menu
 * sections included) by construction. Doesn't override `Card`'s own
 * padding/radius/border/background defaults — that's the point.
 *
 * Always right-to-left (an `RtlScope`): titles are a mix of Hebrew and
 * English, and each script aligning to its own side left the cards
 * ragged, so every card lays out RTL whatever the title's script. The
 * title uses `sectionHeader` (like `MenuSection`), whose Frank Ruhl Libre
 * draws Hebrew and Latin at a matched weight — the system font's Hebrew
 * fallback rendered noticeably lighter than its Latin. */
export const SettingsCard: React.FunctionComponent<SettingsCardProps> = ({
  title,
  children,
  grow,
}) => (
  <RtlScope>
    <Card grow={grow} gap="sm">
      {title && <Text variant="sectionHeader">{title}</Text>}
      {children}
    </Card>
  </RtlScope>
)
