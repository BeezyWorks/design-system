import React, {useEffect, useState} from 'react'
import {SemanticColor} from '../../colors'
import {Button} from '../Button'
import {Card} from '../Card'
import {Icon} from '../Icon'
import {IconButton} from '../IconButton'
import {Stack} from '../Stack'
import {Text} from '../Text'
import {TextField} from '../TextField'

export interface NoteBarProps {
  /** The saved note, if any. */
  note?: {text: string; updatedAt: number}
  /** Called with the draft on Done. Empty text should remove the note —
   * the bar leaves that to you. */
  onSave: (text: string) => void
  /** Called by the trash button in the editor (shown only for a saved
   * note). */
  onDelete: () => void
  /** Resets the editor when it changes (the segment the note belongs to):
   * paging to another note closes it. */
  noteKey?: string
  /** `Add a note…` */
  addLabel?: string
  /** Accessibility label of the edit target. Default `Edit note`. */
  editLabel?: string
  /** Label of the text field. Default `Note`. */
  fieldLabel?: string
  deleteLabel?: string
  doneLabel?: string
  /** Prefix of the last-edited line. Default `Edited`. */
  editedLabel?: string
  /** Position over the bottom of the parent. Default `true`; `false` for a
   * bar placed in flow. */
  floating?: boolean
}

const formatEdited = (t: number) =>
  new Date(t).toLocaleDateString(undefined, {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  })

/** A segment's note as a bar floating at the bottom of a detail. No note: a
 * quiet "Add a note…" row. A note: an accent-tinted card with its first
 * lines and when it was edited. Tapping either opens an editor card (Done;
 * empty text is yours to treat as removal). Presentational — the app owns
 * the store; ported from mishna-app / mikros-baderech / limud-baderech
 * `NoteBar`. */
export const NoteBar: React.FunctionComponent<NoteBarProps> = ({
  note,
  onSave,
  onDelete,
  noteKey,
  addLabel = 'Add a note…',
  editLabel = 'Edit note',
  fieldLabel = 'Note',
  deleteLabel = 'Delete note',
  doneLabel = 'Done',
  editedLabel = 'Edited',
  floating = true,
}) => {
  const [editing, setEditing] = useState(false)
  const [draft, setDraft] = useState('')

  useEffect(() => setEditing(false), [noteKey])

  const startEditing = () => {
    setDraft(note?.text ?? '')
    setEditing(true)
  }

  const frame = (children: React.ReactNode) =>
    floating ? (
      <Stack position="absolute" bottom="md" left="md" right="md" zIndex={10}>
        {children}
      </Stack>
    ) : (
      <Stack>{children}</Stack>
    )

  if (editing) {
    return frame(
      <Card padding="md" gap="sm" shadow="raised">
        <TextField
          variant="boxed"
          value={draft}
          onChangeText={setDraft}
          placeholder={addLabel}
          accessibilityLabel={fieldLabel}
          multiline
          autoFocus
        />
        <Stack direction="row" align="center" justify="spaceBetween">
          {note ? (
            <IconButton
              name="delete"
              size={20}
              color={SemanticColor.TextSecondary}
              accessibilityLabel={deleteLabel}
              onPress={() => {
                onDelete()
                setEditing(false)
              }}
            />
          ) : (
            <Stack />
          )}
          <Button
            title={doneLabel}
            size="sm"
            onPress={() => {
              onSave(draft)
              setEditing(false)
            }}
          />
        </Stack>
      </Card>,
    )
  }

  return frame(
    note ? (
      <Card
        padding="none"
        shadow="raised"
        onPress={startEditing}
        accessibilityLabel={editLabel}
      >
        <Stack
          padding="md"
          gap="xs"
          radius="lg"
          background={SemanticColor.AccentTint}
        >
          <Text numberOfLines={2}>{note.text}</Text>
          <Text variant="caption" color={SemanticColor.TextSecondary}>
            {`${editedLabel} ${formatEdited(note.updatedAt)}`}
          </Text>
        </Stack>
      </Card>
    ) : (
      <Card
        padding="md"
        direction="row"
        align="center"
        gap="sm"
        shadow="raised"
        onPress={startEditing}
        accessibilityLabel={addLabel}
      >
        <Icon name="edit" size={18} color={SemanticColor.TextSecondary} />
        <Text color={SemanticColor.TextSecondary}>{addLabel}</Text>
      </Card>
    ),
  )
}
