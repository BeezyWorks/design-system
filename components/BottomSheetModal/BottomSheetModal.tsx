import React, {useRef, useEffect} from 'react'
import {StyleSheet, View, useWindowDimensions} from 'react-native'
import {useSpring, animated} from '@react-spring/native'
import {useSheetHost} from './SheetHost'
import {BottomSheetProps} from '../BottomSheet/bottomSheet.props'
import {AnimatedScrim} from '../Scrim'
import {BottomSheet} from '../BottomSheet'

const AnimatedBottomSheet = animated(BottomSheet)

export const BottomSheetModal = ({
  title,
  titleNode,
  headerLeft,
  headerRight,
  children,
}: BottomSheetProps) => {
  const {height: screenHeight} = useWindowDimensions()
  const contentHeight = useRef(0)
  const {onClosed, dismissed, dismiss} = useSheetHost()
  // `dismissed` as read at the moment the close animation actually
  // *finishes* — not as captured in the effect's closure below. Without
  // this, a `showModal()` call for a brand-new sheet that lands while a
  // previous sheet's close animation is still resolving gets clobbered:
  // the stale `onResolve` still fires and clears the config that was just
  // set for the *new* sheet, since it unconditionally calls `onClosed()`
  // with no argument. Guarding on the current (not closed-over) value
  // means a reopen that happens mid-close leaves the newer config alone.
  const dismissedRef = useRef(dismissed)
  useEffect(() => {
    dismissedRef.current = dismissed
  }, [dismissed])

  const [animation, api] = useSpring(() => ({
    from: {translateY: screenHeight},
    to: {translateY: 0},
  }))

  useEffect(() => {
    if (dismissed) {
      api.start({
        to: {translateY: screenHeight},
        onResolve: () => {
          if (dismissedRef.current) onClosed()
        },
      })
    } else {
      // Covers the same reopen-while-closing race from the other side:
      // if a new sheet gets shown while the old one's close animation is
      // still mid-flight, that animation still runs to completion and
      // leaves `translateY` parked off-screen — nothing else would ever
      // animate it back open for the new content. Also fires harmlessly
      // on first mount, where it's already headed here regardless.
      api.start({to: {translateY: 0}})
    }
  }, [dismissed, api, screenHeight, onClosed])

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
        header={{
          title,
          titleNode,
          left: headerLeft,
          right: headerRight,
          onPan,
          onPanRelease,
        }}
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
