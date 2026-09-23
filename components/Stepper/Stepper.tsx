import React, {useEffect, useRef} from 'react'
import {Pressable} from 'react-native'
import {radius} from '../../radius'
import {SemanticColor} from '../../colors'
import {useColorResolver} from '../../theme'
import {Stack} from '../Stack'
import {Text} from '../Text'

export interface StepperProps {
  label: string
  onDecrement: () => void
  onIncrement: () => void
  decrementDisabled?: boolean
  incrementDisabled?: boolean
}

// 44px — the spec's minimum touch target, not `spacing.xl` (32px), which
// was too small a hit target for a control tapped repeatedly.
const buttonSize = 44
const holdDelayMs = 400
// One tick per 400ms is slow enough to stop on an exact minute; after
// holding for a full second and a half (the point where you're clearly
// trying to cover distance, not dial in a value) it speeds up so reaching
// the far end of the range doesn't take forever.
const initialRepeatMs = 400
const acceleratedRepeatMs = 100
const accelerateAfterMs = 1500

/** Fires `onTick` once per tap; holding past `holdDelayMs` instead repeats
 * it (self-rescheduling rather than `setInterval`, so it always reads the
 * latest `onTick` — a stale closure here previously meant a long hold kept
 * re-applying the value from the moment the hold started instead of
 * actually counting up/down). The single-tap fire is suppressed once a
 * hold has actually kicked in, so a long press doesn't also fire one
 * extra tick on release. */
const useHoldToRepeat = (onTick: () => void) => {
  const onTickRef = useRef(onTick)
  onTickRef.current = onTick

  const timeout = useRef<ReturnType<typeof setTimeout>>(undefined)
  const didRepeat = useRef(false)
  const holdStartedAt = useRef(0)

  const clear = () => clearTimeout(timeout.current)

  useEffect(() => clear, [])

  const scheduleNextRepeat = () => {
    const heldFor = Date.now() - holdStartedAt.current
    const delay =
      heldFor > accelerateAfterMs ? acceleratedRepeatMs : initialRepeatMs
    timeout.current = setTimeout(() => {
      onTickRef.current()
      scheduleNextRepeat()
    }, delay)
  }

  return {
    onPressIn: () => {
      // Defensive: guarantees a stray leftover timer from a previous
      // press can never stack with this one.
      clear()
      didRepeat.current = false
      holdStartedAt.current = Date.now()
      timeout.current = setTimeout(() => {
        didRepeat.current = true
        onTickRef.current()
        scheduleNextRepeat()
      }, holdDelayMs)
    },
    onPressOut: clear,
    onPress: () => {
      if (!didRepeat.current) onTickRef.current()
    },
  }
}

/** A −/value/+ control for stepping through a numeric range or a fixed,
 * ordered list of values. Tap steps once; press-and-hold repeats. */
export const Stepper: React.FunctionComponent<StepperProps> = ({
  label,
  onDecrement,
  onIncrement,
  decrementDisabled,
  incrementDisabled,
}) => {
  const resolve = useColorResolver()
  const decrementHold = useHoldToRepeat(onDecrement)
  const incrementHold = useHoldToRepeat(onIncrement)

  return (
    <Stack direction="row" align="center">
      <Pressable
        {...decrementHold}
        disabled={decrementDisabled}
        style={({pressed}) => ({
          width: buttonSize,
          height: buttonSize,
          alignItems: 'center',
          justifyContent: 'center',
          borderWidth: 1.5,
          borderColor: resolve(SemanticColor.BorderDefault),
          borderTopLeftRadius: radius.sm,
          borderBottomLeftRadius: radius.sm,
          opacity: decrementDisabled ? 0.4 : 1,
          backgroundColor:
            pressed && !decrementDisabled
              ? resolve(SemanticColor.SurfaceCard)
              : undefined,
        })}
      >
        <Text variant="headline">−</Text>
      </Pressable>
      <Stack width={56} align="center" justify="center">
        <Text align="center">{label}</Text>
      </Stack>
      <Pressable
        {...incrementHold}
        disabled={incrementDisabled}
        style={({pressed}) => ({
          width: buttonSize,
          height: buttonSize,
          alignItems: 'center',
          justifyContent: 'center',
          borderWidth: 1.5,
          borderColor: resolve(SemanticColor.BorderDefault),
          borderTopRightRadius: radius.sm,
          borderBottomRightRadius: radius.sm,
          marginStart: -1.5,
          opacity: incrementDisabled ? 0.4 : 1,
          backgroundColor:
            pressed && !incrementDisabled
              ? resolve(SemanticColor.SurfaceCard)
              : undefined,
        })}
      >
        <Text variant="headline">+</Text>
      </Pressable>
    </Stack>
  )
}
