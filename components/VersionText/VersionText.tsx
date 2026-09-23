import React from 'react'
import {SemanticColor} from '../../colors'
import {Stack} from '../Stack'
import {Text} from '../Text'

export interface VersionTextProps {
  versionName: string
  buildNumber?: string
}

/** The small centered "vX.Y.Z (build)" footer shown at the bottom of the
 * settings screen. */
export const VersionText: React.FunctionComponent<VersionTextProps> = ({
  versionName,
  buildNumber,
}) => (
  <Stack align="center" paddingVertical="xs">
    <Text align="center" color={SemanticColor.TextSecondary}>
      v{versionName}
      {buildNumber ? ` (${buildNumber})` : ''}
    </Text>
  </Stack>
)
