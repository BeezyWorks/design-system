import React from 'react'
import {
  BottomSheetHeaderProps,
  BottomSheetProps,
} from 'modal/components/bottomSheet.props'
import {LayoutChangeEvent, StyleSheet, View} from 'react-native'
import {useColors, Colors} from '../../colors'
import {layout} from '../../layout'
import {BottomSheetHeader} from '../BottomSheetHeader'

const borderRadius = 18

interface Props extends BottomSheetProps {
  header: BottomSheetHeaderProps
  translateY?: number
  onLayoutHeight: (height: number) => void
}

export const BottomSheet = ({
  children,
  header,
  translateY = 0,
  onLayoutHeight,
}: Props) => {
  const colors = useColors()
  const styles = styleCreator(colors)

  const onLayout = (event: LayoutChangeEvent) => {
    onLayoutHeight(event.nativeEvent.layout.height)
  }

  return (
    <View
      style={[styles.base, {transform: [{translateY}]}]}
      onLayout={onLayout}
    >
      <BottomSheetHeader {...header} />
      {children}
    </View>
  )
}

const styleCreator = (colors: Colors) =>
  StyleSheet.create({
    base: {
      borderTopEndRadius: borderRadius,
      borderTopStartRadius: borderRadius,
      backgroundColor: colors.backgroundColor,
      paddingBottom: 36,
      marginTop: layout.headerHeight + 36,
    },
  })
