import React from 'react'
import {StyleSheet, View} from 'react-native'
import {Plus} from 'lucide-react-native'
import {BackgroundLight, ColorPrimary} from '../../colors'
import {shadows} from '../../shadows'
import {Touchable} from '../Touchable'

export interface FloatingActionButtonProps {
  onPress: () => void
}

const fabSize = 42

// A circular accent-color button, always `ColorPrimary`/white regardless of
// theme (matching the reader header's wide-title accent) — genuinely not a
// semantic-token case, so it keeps the raw palette constants rather than
// `useColors()`. Lives under `src/design/components/` so — like
// `Stack`/`Card` — it builds its shape from a raw `View`+`StyleSheet` (the
// fixed circular size/position/shadow), reaching for `@design`'s
// `Touchable` only for the actual press feedback and `shadows.card` in
// place of the old `shadowStyle` object.
export const FloatingActionButton: React.FunctionComponent<
  FloatingActionButtonProps
> = ({onPress}) => (
  <View style={styles.base}>
    <Touchable onPress={onPress}>
      <View style={styles.plusButton}>
        <Plus size={20} color={BackgroundLight} />
      </View>
    </Touchable>
  </View>
)

const styles = StyleSheet.create({
  base: {
    position: 'absolute',
    right: 32,
    bottom: 32,
    width: fabSize,
    height: fabSize,
    borderRadius: fabSize / 2,
    backgroundColor: ColorPrimary,
    overflow: 'hidden',
    ...shadows.card,
  },
  plusButton: {
    width: fabSize,
    height: fabSize,
    justifyContent: 'center',
    alignItems: 'center',
  },
})
