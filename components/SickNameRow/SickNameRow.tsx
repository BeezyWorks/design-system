import React from 'react'
import {Stack} from '../Stack'
import {Text} from '../Text'
import {IconButton} from '../IconButton'

export interface SickNameRowProps {
  name: string
  onDelete: () => void
}

/** One entry in the Sick Names list — the name plus a trailing delete
 * action. */
export const SickNameRow: React.FunctionComponent<SickNameRowProps> = ({
  name,
  onDelete,
}) => (
  <Stack
    direction="row"
    align="center"
    justify="spaceBetween"
    paddingVertical="xs"
  >
    <Text variant="largeTitle">{name}</Text>
    <IconButton
      name="delete"
      tone="danger"
      onPress={onDelete}
      accessibilityLabel="Delete name"
    />
  </Stack>
)
