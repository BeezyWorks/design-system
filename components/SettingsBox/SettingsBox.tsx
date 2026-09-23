import React from 'react'
import {SemanticColor} from '../../colors'
import {Stack} from '../Stack'
import {Text} from '../Text'

export interface SettingsBoxProps {
  title?: string
  children?: React.ReactNode
}

/** A lightweight, untitled-by-default grouping surface — used for compact
 * clusters of rows (e.g. a notification entry) inside a screen that
 * already sits on a `SettingsCard`/`Screen` background. */
export const SettingsBox: React.FunctionComponent<SettingsBoxProps> = ({
  title,
  children,
}) => (
  <Stack gap="xs">
    {title && (
      <Text variant="label" color={SemanticColor.TextSecondary}>
        {title}
      </Text>
    )}
    <Stack background={SemanticColor.SurfaceCard} radius="sm" padding="sm">
      {children}
    </Stack>
  </Stack>
)
