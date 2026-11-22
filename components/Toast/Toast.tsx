import React, {useEffect} from 'react'
import {SemanticColor} from '../../colors'
import {Stack} from '../Stack'
import {Text} from '../Text'
import {Touchable} from '../Touchable'

export interface ToastProps {
  /** Whether the toast is showing. Render it always; it draws nothing while
   * `false`. */
  visible: boolean
  message: string
  /** Label of the action beside the message (`Undo`). Omit for a message
   * only. */
  actionLabel?: string
  onAction?: () => void
  /** Called when the toast times out (after `duration`). Hide it from here. */
  onDismiss?: () => void
  /** Milliseconds before `onDismiss`. Default 5000. `0` never times out. */
  duration?: number
  /** Changing it restarts the timer — pass an id that bumps when the same
   * toast is raised again. */
  restartKey?: string | number
  /** Lifts the toast above a bottom bar or tab bar, in points. */
  bottomOffset?: number
  /** A right-to-left (Hebrew) message: the action sits on the left. */
  rtl?: boolean
}

const DEFAULT_DURATION = 5000
const MAX_WIDTH = 420

/** A transient message with one optional action ("Marked learned · Undo"),
 * floating over the bottom of its parent and clearing itself after
 * `duration`. Absolutely positioned: mount it at the end of a screen. It
 * does not clear the safe area — pass it in `bottomOffset`
 * (e.g. `useScreenBottomInset() + 8`). Ported from mishna-app's
 * `LearnedToast`. */
export const Toast: React.FunctionComponent<ToastProps> = ({
  visible,
  message,
  actionLabel,
  onAction,
  onDismiss,
  duration = DEFAULT_DURATION,
  restartKey,
  bottomOffset = 0,
  rtl,
}) => {
  useEffect(() => {
    if (!visible || !duration || !onDismiss) return
    const timer = setTimeout(onDismiss, duration)
    return () => clearTimeout(timer)
  }, [visible, duration, onDismiss, restartKey])

  if (!visible) return null

  return (
    <Stack
      position="absolute"
      left="none"
      right="none"
      bottom="none"
      paddingHorizontal="md"
      paddingBottom={bottomOffset}
      align="center"
      pointerEvents="box-none"
    >
      <Stack
        direction={rtl ? 'rowReverse' : 'row'}
        align="center"
        gap="md"
        maxWidth={MAX_WIDTH}
        background={SemanticColor.SurfaceCard}
        borderWidth={1}
        borderColor={SemanticColor.BorderDefault}
        shadow="floating"
        radius="md"
        paddingVertical="sm"
        paddingHorizontal="md"
        accessibilityRole="alert"
      >
        <Text variant="item" rtl={rtl}>
          {message}
        </Text>
        {actionLabel ? (
          <Touchable
            accessibilityRole="button"
            accessibilityLabel={actionLabel}
            onPress={onAction}
          >
            <Stack paddingVertical="xs" paddingHorizontal="sm">
              <Text
                variant="bodyStrong"
                color={SemanticColor.TextAccent}
                rtl={rtl}
              >
                {actionLabel}
              </Text>
            </Stack>
          </Touchable>
        ) : null}
      </Stack>
    </Stack>
  )
}
