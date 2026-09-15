import React from 'react'
import {Pressable} from 'react-native'
import {spacing} from '../../spacing'
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

const buttonSize = spacing.xl

/** A −/value/+ control for stepping through a numeric range or a fixed,
 * ordered list of values. */
export const Stepper: React.FunctionComponent<StepperProps> = ({
  label,
  onDecrement,
  onIncrement,
  decrementDisabled,
  incrementDisabled,
}) => {
  const colors = useColors()

  return (
    <Stack direction="row" align="center">
      <Pressable
        onPress={onDecrement}
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
        onPress={onIncrement}
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
