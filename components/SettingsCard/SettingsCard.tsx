import React from 'react'
import {Card} from '../Card'
import {Text} from '../Text'

export interface SettingsCardProps {
  title?: string
  children?: React.ReactNode
  /** Grow to fill available row space — used when two cards sit side by
   * side in a wide layout. */
  grow?: boolean
}

/** A titled settings section — the design-system replacement for the old
 * bordered `SettingsCard` widget. Renders as an elevated `Card` (tokenized
 * shadow instead of a hand-rolled border). */
export const SettingsCard: React.FunctionComponent<SettingsCardProps> = ({
  title,
  children,
  grow,
}) => (
  <Card grow={grow} radius="lg" padding="lg" gap="sm">
    {title && (
      <Text variant="label" tone="secondaryTextColor">
        {title}
      </Text>
    )}
    {children}
  </Card>
)
