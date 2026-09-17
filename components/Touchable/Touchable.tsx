import React from 'react'
import {Platform, Pressable, PressableProps} from 'react-native'
import {useColors} from '../../colors'

export interface TouchableProps extends Pick<
  PressableProps,
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
 * `Stack`/`Card` for layout, this only supplies the touch ripple/highlight.
 * Built on `Pressable` (not the legacy `TouchableHighlight`/
 * `TouchableNativeFeedback`), which is what React Native itself recommends
 * now, and which — confirmed on device — already respects whatever the
 * parent's `alignItems` says (`stretch` for a full-width row, `center` for
 * something meant to size to its own content) with no style of its own.
 * Forcing `alignSelf: 'stretch'` here once seemed harmless but isn't: it
 * overrides a parent's `center` too, so anything meant to size/center
 * itself (a circular icon button, say) gets stretched full-width instead. */
export const Touchable: React.FunctionComponent<TouchableProps> = ({
  children,
  ...props
}) => {
  const colors = useColors()
  return (
    <Pressable
      {...props}
      android_ripple={{color: colors.surfaceHover}}
      style={({pressed}) =>
        // Android shows its own native ripple via `android_ripple` above —
        // an extra background here would just double up on top of it.
        // `surfaceHover` (a translucent ink wash, not a solid fill) is used
        // rather than `backgroundColorDirty` specifically because it stays
        // visible no matter what the row's own background already is — a
        // solid fill disappears entirely on a row that's already
        // `backgroundColorDirty` itself, e.g. a card row on `surfaceCard`.
        pressed && Platform.OS !== 'android'
          ? {backgroundColor: colors.surfaceHover}
          : undefined
      }
    >
      {children}
    </Pressable>
  )
}
