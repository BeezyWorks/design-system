import React, {useRef} from 'react'
import {PanResponder, StyleSheet, Text, View} from 'react-native'
import {BottomSheetHeaderProps} from 'modal/components/bottomSheet.props'
import {useColors, Colors} from '../../colors'
import {SlideIndicator} from '../SlideIndicator'

// Raw RN `Text` rather than `@design`'s `Text`: the title uses a legacy
// 600-weight 22px style with no equivalent step on the chrome type ramp.
export const BottomSheetHeader = ({
  title,
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
      {!!title && (
        <View style={styles.base}>
          <Text numberOfLines={1} style={styles.text}>
            {title}
          </Text>
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
    },
    base: {
      padding: 8,
      flexGrow: 1,
      flexShrink: 1,
      flexDirection: 'row',
      justifyContent: 'center',
      borderBottomWidth: 1,
      borderBottomColor: colors.secondaryTextColor,
    },
    text: {
      fontSize: 22,
      fontWeight: '600',
      textAlign: 'center',
      color: colors.secondaryTextColor,
    },
  })
