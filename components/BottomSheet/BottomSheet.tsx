import React from 'react'
import {BottomSheetHeaderProps, BottomSheetProps} from './bottomSheet.props'
import {LayoutChangeEvent, StyleSheet, View} from 'react-native'
import {SemanticColor} from '../../colors'
import {useColorResolver, ColorResolver} from '../../theme'
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
  const resolve = useColorResolver()
  const styles = styleCreator(resolve)

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

const styleCreator = (resolve: ColorResolver) =>
  StyleSheet.create({
    base: {
      borderTopEndRadius: borderRadius,
      borderTopStartRadius: borderRadius,
      backgroundColor: resolve(SemanticColor.SurfaceBackground),
      paddingBottom: 36,
      marginTop: layout.headerHeight + 36,
    },
  })
