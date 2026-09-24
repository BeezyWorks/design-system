import React from 'react'
import {SemanticColor} from '../../colors'
import {Card} from '../Card'
import {Text} from '../Text'

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
 * padding/radius/border/background defaults — that's the point. */
export const SettingsCard: React.FunctionComponent<SettingsCardProps> = ({
  title,
  children,
  grow,
}) => (
  <Card grow={grow} gap="sm">
    {title && (
      <Text variant="label" color={SemanticColor.TextSecondary}>
        {title}
      </Text>
    )}
    {children}
  </Card>
)
