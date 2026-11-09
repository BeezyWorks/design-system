import React from 'react'
import {KeyboardAvoidingView, Platform, StyleSheet} from 'react-native'

export interface KeyboardAvoiderProps {
  /** Extra distance between the top of the keyboard and the bottom of the
   * avoider, in points — for chrome that sits below it (a tab bar) or the
   * distance from the top of the screen when something sits above it. */
  offset?: number
  /** Turn avoidance off without unmounting the children. */
  enabled?: boolean
  children: React.ReactNode
}

/** Lifts its content above the software keyboard so a focused field isn't
 * covered: bottom padding the height of the keyboard. Fills its parent, so
 * put it around the screen/sheet body that holds the fields. Works inside a
 * `BottomSheetModal fullScreen` body (which fills the screen); a partial
 * sheet is not lifted. A no-op on web, where the browser scrolls the
 * focused field into view itself.
 *
 * Padding is used on both native platforms: the app is edge-to-edge on
 * Android, so the window no longer resizes for the keyboard and `height`
 * would do nothing useful. */
export const KeyboardAvoider: React.FunctionComponent<KeyboardAvoiderProps> = ({
  offset = 0,
  enabled = true,
  children,
}) => (
  <KeyboardAvoidingView
    style={styles.fill}
    behavior={
      Platform.OS === 'ios' || Platform.OS === 'android' ? 'padding' : undefined
    }
    keyboardVerticalOffset={offset}
    enabled={enabled}
  >
    {children}
  </KeyboardAvoidingView>
)

const styles = StyleSheet.create({
  fill: {flex: 1},
})
