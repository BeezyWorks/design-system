import React from 'react'
import {
  TouchableHighlight,
  TouchableNativeFeedback,
  TouchableOpacity,
  TouchableWithoutFeedbackProps,
  Platform,
} from 'react-native'
import {useColors} from '../../colors'

export interface TouchableProps extends Pick<
  TouchableWithoutFeedbackProps,
  | 'onPress'
  | 'onLongPress'
  | 'disabled'
  | 'accessibilityLabel'
  | 'accessibilityRole'
  | 'accessibilityState'
  | 'testID'
  | 'hitSlop'
> {
  children?: React.ReactNode
}

/** Platform-appropriate press feedback with no styling of its own — wrap a
 * `Stack`/`Card` for layout, this only supplies the touch ripple/highlight. */
export const Touchable: React.FunctionComponent<TouchableProps> = (props) => {
  const {children} = props
  const colors = useColors()
  if (Platform.OS === 'android') {
    return (
      <TouchableNativeFeedback {...props}>{children}</TouchableNativeFeedback>
    )
  } else if (Platform.OS === 'ios') {
    return (
      <TouchableHighlight
        {...props}
        underlayColor={colors.backgroundColorDirty}
      >
        {children}
      </TouchableHighlight>
    )
  }
  return <TouchableOpacity {...props}>{children}</TouchableOpacity>
}
