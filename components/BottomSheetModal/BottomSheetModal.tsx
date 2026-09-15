import React, {useRef, useEffect} from 'react'
import {StyleSheet, View} from 'react-native'
import {useSpring, animated} from '@react-spring/native'
import {useDimensions} from '@hooks'
import {useModalContext} from 'modal/context/modal-context'
import {BottomSheetProps} from 'modal/components/bottomSheet.props'
import {AnimatedScrim} from '../Scrim'
import {BottomSheet} from '../BottomSheet'

const AnimatedBottomSheet = animated(BottomSheet)

export const BottomSheetModal = ({title, children}: BottomSheetProps) => {
  const {height: screenHeight} = useDimensions()
  const contentHeight = useRef(0)
  const {setModal, dismissed, dismiss} = useModalContext()

  const [animation, api] = useSpring(() => ({
    from: {translateY: screenHeight},
    to: {translateY: 0},
  }))

  useEffect(() => {
    if (dismissed) {
      api.start({
        to: {translateY: screenHeight},
        onResolve: () => setModal(),
      })
    }
  }, [dismissed, api, screenHeight, setModal])

  const onPan = (dy: number) => {
    api.start({immediate: true, translateY: Math.max(dy, 0)})
  }

  const onPanRelease = () => {
    const lastHeight = animation.translateY.get()
    const dif = contentHeight.current - lastHeight
    const shouldClose = dif <= contentHeight.current * 0.66
    const snapTo = shouldClose ? screenHeight : 0
    api.start({translateY: snapTo})
    if (shouldClose) dismiss()
  }

  const onLayoutHeight = (layoutHeight: number) => {
    contentHeight.current = layoutHeight
  }

  return (
    <View style={styles.base}>
      <AnimatedScrim onPress={dismiss} reverse={dismissed} />
      <AnimatedBottomSheet
        onLayoutHeight={onLayoutHeight}
        header={{title, onPan, onPanRelease}}
        translateY={animation.translateY}
      >
        {children}
      </AnimatedBottomSheet>
    </View>
  )
}

const styles = StyleSheet.create({
  base: {
    ...StyleSheet.absoluteFill,
    justifyContent: 'flex-end',
  },
})
