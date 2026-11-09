import React from 'react'
import {View, StyleSheet} from 'react-native'
import type {KeyboardAvoiderProps} from './KeyboardAvoider'

export type {KeyboardAvoiderProps}

/** Web: the browser brings a focused field into view, so this only fills its
 * parent like the native variant does. */
export const KeyboardAvoider: React.FunctionComponent<KeyboardAvoiderProps> = ({
  children,
}) => <View style={styles.fill}>{children}</View>

const styles = StyleSheet.create({
  fill: {flex: 1},
})
