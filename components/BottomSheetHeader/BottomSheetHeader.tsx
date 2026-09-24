import React, {useRef} from 'react'
import {PanResponder, StyleSheet, Text, View} from 'react-native'
import {BottomSheetHeaderProps} from '../BottomSheet/bottomSheet.props'
import {SemanticColor} from '../../colors'
import {useColorResolver, ColorResolver} from '../../theme'
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
  const resolve = useColorResolver()
  const styles = styleCreator(resolve)
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
          <View style={styles.sideLeft}>{left}</View>
          {titleNode ?? (
            <Text numberOfLines={1} style={styles.text}>
              {title}
            </Text>
          )}
          <View style={styles.sideRight}>{right}</View>
        </View>
      )}
    </View>
  )
}

const styleCreator = (resolve: ColorResolver) =>
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
    },
    text: {
      fontSize: 22,
      fontWeight: '600',
      textAlign: 'center',
      color: resolve(SemanticColor.TextSecondary),
    },
    // Both sides share the same `flex: 1`, so they always take up equal
    // width regardless of how wide their own content is (e.g. "Cancel"
    // vs "Save") — that equal split is what actually keeps the title
    // (sized to its own content, not flexed) centered on the row. Giving
    // the title itself `flex: 1` instead — the previous approach — made
    // it center within whatever space was left over from two unequal-
    // width sides, which visibly skewed it toward the wider one.
    sideLeft: {
      flex: 1,
      flexShrink: 1,
      flexDirection: 'row',
      justifyContent: 'flex-start',
    },
    sideRight: {
      flex: 1,
      flexShrink: 1,
      flexDirection: 'row',
      justifyContent: 'flex-end',
    },
  })
