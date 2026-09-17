import React, {useEffect, useRef} from 'react'
import {Pressable} from 'react-native'
import {radius} from '../../radius'
import {useColors} from '../../colors'
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
const repeatIntervalMs = 100

/** Fires `onTick` once per tap; holding past `holdDelayMs` instead repeats
 * it on `repeatIntervalMs` until release. The single-tap fire is
 * suppressed once a hold has actually kicked in, so a long press doesn't
 * also fire one extra tick on release. */
const useHoldToRepeat = (onTick: () => void) => {
  const holdTimeout = useRef<ReturnType<typeof setTimeout>>(undefined)
  const repeatInterval = useRef<ReturnType<typeof setInterval>>(undefined)
  const didRepeat = useRef(false)

  const clear = () => {
    clearTimeout(holdTimeout.current)
    clearInterval(repeatInterval.current)
  }

  useEffect(() => clear, [])

  return {
    onPressIn: () => {
      didRepeat.current = false
      holdTimeout.current = setTimeout(() => {
        didRepeat.current = true
        onTick()
        repeatInterval.current = setInterval(onTick, repeatIntervalMs)
      }, holdDelayMs)
    },
    onPressOut: clear,
    onPress: () => {
      if (!didRepeat.current) onTick()
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
  const colors = useColors()
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
          borderColor: colors.border,
          borderTopLeftRadius: radius.sm,
          borderBottomLeftRadius: radius.sm,
          opacity: decrementDisabled ? 0.4 : 1,
          backgroundColor:
            pressed && !decrementDisabled
              ? colors.backgroundColorDirty
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
          borderColor: colors.border,
          borderTopRightRadius: radius.sm,
          borderBottomRightRadius: radius.sm,
          marginStart: -1.5,
          opacity: incrementDisabled ? 0.4 : 1,
          backgroundColor:
            pressed && !incrementDisabled
              ? colors.backgroundColorDirty
              : undefined,
        })}
      >
        <Text variant="headline">+</Text>
      </Pressable>
    </Stack>
  )
}
