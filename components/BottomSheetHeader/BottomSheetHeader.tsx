import React, {useRef} from 'react'
import {PanResponder, StyleSheet, Text, View} from 'react-native'
import {BottomSheetHeaderProps} from 'modal/components/bottomSheet.props'
import {useColors, Colors} from '../../colors'
import {SlideIndicator} from '../SlideIndicator'

// Raw RN `Text` rather than `@design`'s `Text`: the title uses a legacy
// 600-weight 22px style with no equivalent step on the chrome type ramp.
export const BottomSheetHeader = ({
  title,
  titleNode,
  left,
  right,
  onPan,
  onPanRelease,
}: BottomSheetHeaderProps) => {
  const colors = useColors()
  const styles = styleCreator(colors)
  const panResponder = useRef(
    PanResponder.create({
      onMoveShouldSetPanResponder: () => true,
      onPanResponderMove: (e, gesture) => {
        onPan(gesture.dy)
      },
      onPanResponderRelease: () => {
        onPanRelease()
      },
    }),
  ).current

  return (
    <View style={styles.wrapper} {...panResponder.panHandlers}>
      <SlideIndicator />
      {(!!title || !!titleNode || !!left || !!right) && (
        // A plain 3-column flex row (left slot, growing centered title,
        // right slot) in real DOM/JSX order — not `position: absolute`
        // `left`/`right` offsets, which this environment was mirroring
        // (Cancel/Save rendered swapped) for reasons that didn't trace
        // back to any `dir`/`I18nManager` setting this app actually sets.
        // Explicit flex order sidesteps that entirely, matching how every
        // other row in this app already avoids relying on `left`/`right`.
        <View style={styles.base}>
          <View style={styles.side}>{left}</View>
          {titleNode ?? (
            <Text numberOfLines={1} style={styles.text}>
              {title}
            </Text>
          )}
          <View style={styles.side}>{right}</View>
        </View>
      )}
    </View>
  )
}

const styleCreator = (colors: Colors) =>
  StyleSheet.create({
    wrapper: {
      alignItems: 'stretch',
      minHeight: 36,
      gap: 16,
    },
    base: {
      paddingHorizontal: 8,
      paddingVertical: 8,
      flexGrow: 1,
      flexShrink: 1,
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
    },
    text: {
      flex: 1,
      fontSize: 22,
      fontWeight: '600',
      textAlign: 'center',
      color: colors.secondaryTextColor,
    },
    // Sized to its own content (a Cancel/Save button or nothing) rather
    // than a fixed width — the centered title's own `flex: 1` is what
    // actually balances the row.
    side: {
      justifyContent: 'center',
    },
  })
