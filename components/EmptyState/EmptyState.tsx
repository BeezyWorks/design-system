import React from 'react'
import {Stack} from '../Stack'
import {Text} from '../Text'
import {Button} from '../Button'
import {Icon, IconName} from '../Icon'
import {SemanticColor} from '../../colors'

export interface EmptyStateProps {
  /** A large, quiet glyph above the title. */
  icon?: IconName
  title: string
  subtitle?: string
  actionLabel?: string
  onAction?: () => void
}

/** Centered title + subtext + an accent CTA — for a list screen's
 * no-content state (e.g. the Notifications list before any are added). */
export const EmptyState: React.FunctionComponent<EmptyStateProps> = ({
  icon,
  title,
  subtitle,
  actionLabel,
  onAction,
}) => (
  <Stack align="center" justify="center" gap="sm" paddingVertical="xl">
    {!!icon && (
      <Icon name={icon} size={32} color={SemanticColor.TextSecondary} />
    )}
    <Text variant="headline" align="center">
      {title}
    </Text>
    {!!subtitle && (
      <Text variant="detail" align="center">
        {subtitle}
      </Text>
    )}
    {!!actionLabel && !!onAction && (
      <Stack paddingTop="sm">
        <Button title={actionLabel} onPress={onAction} variant="outline" />
      </Stack>
    )}
  </Stack>
)
