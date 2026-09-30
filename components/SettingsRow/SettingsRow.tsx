import React from 'react'
import {Stack} from '../Stack'
import {Text} from '../Text'
import {useRtl} from '../../layout'

export interface SettingsRowProps {
  title: string
  children?: React.ReactNode
}

/** Label + inline control on one line — used for compact controls
 * (segmented control, stepper) inside a settings card. */
export const SettingsRow: React.FunctionComponent<SettingsRowProps> = ({
  title,
  children,
}) => (
  <Stack
    direction={useRtl() ? 'rowReverse' : 'row'}
    align="center"
    gap="sm"
    paddingVertical="sm"
  >
    <Stack grow>
      <Text variant="rowLabel">{title}</Text>
    </Stack>
    {children}
  </Stack>
)

/** Label above a full-width control — used when the control (e.g. wrapping
 * typeface chips) needs the whole row's width rather than sitting beside
 * the label. */
export const SettingsStackedRow: React.FunctionComponent<SettingsRowProps> = ({
  title,
  children,
}) => (
  <Stack gap="sm" paddingVertical="sm">
    <Text variant="rowLabel">{title}</Text>
    {children}
  </Stack>
)
