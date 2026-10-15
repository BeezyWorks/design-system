import React from 'react'
import {SemanticColor} from '../../colors'
import {useRtl} from '../../layout'
import {Stack} from '../Stack'
import {Text} from '../Text'
import {Button} from '../Button'

export interface ConfirmPromptAction {
  title: string
  onPress: () => Promise<void> | void
}

export interface ConfirmPromptProps {
  title: string
  message: string
  confirmLabel: string
  /** Async: the prompt stays busy until it settles. A rejection's message
   * is shown under the buttons. */
  onConfirm: () => Promise<void> | void
  cancelLabel?: string
  onCancel?: () => void
  /** A red confirm button — deleting, overwriting. */
  destructive?: boolean
  /** An extra, non-final step offered before deciding ("Export settings
   * first"). Doesn't close the prompt. */
  secondaryAction?: ConfirmPromptAction
  /** Extra content between the message and the buttons. */
  children?: React.ReactNode
}

/** The body of a "are you sure?" sheet or dialog: a title, an explanation,
 * an optional side action, then confirm and cancel. Put it in whatever
 * container the app presents (a `BottomSheetModal`, an alert card). */
export const ConfirmPrompt: React.FunctionComponent<ConfirmPromptProps> = ({
  title,
  message,
  confirmLabel,
  onConfirm,
  cancelLabel = 'Cancel',
  onCancel,
  destructive,
  secondaryAction,
  children,
}) => {
  const rtl = useRtl()
  const align = rtl ? 'right' : 'left'
  const [busy, setBusy] = React.useState<'confirm' | 'secondary' | null>(null)
  const [error, setError] = React.useState<string | null>(null)
  const mounted = React.useRef(true)
  React.useEffect(
    () => () => {
      mounted.current = false
    },
    [],
  )

  const run = async (
    which: 'confirm' | 'secondary',
    action: () => Promise<void> | void,
  ) => {
    setBusy(which)
    setError(null)
    try {
      await action()
    } catch (e) {
      if (mounted.current)
        setError(e instanceof Error && e.message ? e.message : null)
    } finally {
      if (mounted.current) setBusy(null)
    }
  }

  return (
    <Stack gap="lg">
      <Stack gap="sm">
        <Text variant="title" align={align}>
          {title}
        </Text>
        <Text variant="body" secondary align={align}>
          {message}
        </Text>
      </Stack>
      {children}
      <Stack gap="sm">
        {secondaryAction && (
          <Button
            title={secondaryAction.title}
            variant="outline"
            fullWidth
            loading={busy === 'secondary'}
            disabled={!!busy && busy !== 'secondary'}
            onPress={() => run('secondary', secondaryAction.onPress)}
            testID="confirm-secondary"
          />
        )}
        <Button
          title={confirmLabel}
          variant={destructive ? 'destructive' : 'primary'}
          fullWidth
          loading={busy === 'confirm'}
          disabled={!!busy && busy !== 'confirm'}
          onPress={() => run('confirm', onConfirm)}
          testID="confirm-confirm"
        />
        {onCancel && (
          <Button
            title={cancelLabel}
            variant="ghost"
            fullWidth
            disabled={!!busy}
            onPress={onCancel}
            testID="confirm-cancel"
          />
        )}
        {!!error && (
          <Text variant="detail" color={SemanticColor.TextDanger} align={align}>
            {error}
          </Text>
        )}
      </Stack>
    </Stack>
  )
}
