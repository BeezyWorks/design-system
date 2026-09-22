import React from 'react'
import {Stack} from '../Stack'
import {Text} from '../Text'
import {Button} from '../Button'

export interface EmptyStateProps {
  title: string
  subtitle?: string
  actionLabel?: string
  onAction?: () => void
}

/** Centered title + subtext + an accent CTA — for a list screen's
 * no-content state (e.g. the Notifications list before any are added). */
export const EmptyState: React.FunctionComponent<EmptyStateProps> = ({
  title,
  subtitle,
  actionLabel,
  onAction,
}) => (
  <Stack align="center" justify="center" gap="sm" paddingVertical="xl">
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
