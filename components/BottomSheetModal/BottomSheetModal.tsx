import React, {useRef, useEffect} from 'react'
import {StyleSheet, Text, View, useWindowDimensions} from 'react-native'
import {useSafeAreaInsets} from 'react-native-safe-area-context'
import {useSpring, animated} from '@react-spring/native'
import {useSheetHost} from './SheetHost'
import {BottomSheetProps} from '../BottomSheet/bottomSheet.props'
import {AnimatedScrim} from '../Scrim'
import {BottomSheet} from '../BottomSheet'
import {Icon} from '../Icon'
import {SemanticColor} from '../../colors'
import {useColorResolver} from '../../theme'

const AnimatedBottomSheet = animated(BottomSheet)

export const BottomSheetModal = ({
  title,
  titleNode,
  headerLeft,
  headerRight,
  fullScreen,
  children,
}: BottomSheetProps) => {
  const insets = useSafeAreaInsets()
  const resolve = useColorResolver()
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

  if (fullScreen) {
    // No pan-to-dismiss here: a full-screen surface has no drag handle, and
    // the explicit X is the way out.
    return (
      <View style={styles.base}>
        <animated.View
          style={[
            styles.full,
            {
              backgroundColor: resolve(SemanticColor.SurfaceBackground),
              paddingTop: insets.top,
              paddingBottom: insets.bottom,
              transform: [{translateY: animation.translateY}],
            },
          ]}
        >
          <View style={styles.fullHeader}>
            <View style={styles.fullSide}>
              <Icon
                name="close"
                size={26}
                color={SemanticColor.TextPrimary}
                onPress={dismiss}
              />
            </View>
            {titleNode ?? (
              <Text
                numberOfLines={1}
                style={[
                  styles.fullTitle,
                  {color: resolve(SemanticColor.TextPrimary)},
                ]}
              >
                {title}
              </Text>
            )}
            <View style={[styles.fullSide, styles.fullSideEnd]}>
              {headerRight}
            </View>
          </View>
          <View style={styles.fullContent}>{children}</View>
        </animated.View>
      </View>
    )
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
  full: {
    ...StyleSheet.absoluteFill,
  },
  fullHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    height: 56,
    paddingHorizontal: 8,
  },
  fullSide: {
    width: 44,
    height: 44,
    alignItems: 'center',
    justifyContent: 'center',
  },
  fullSideEnd: {
    width: undefined,
    minWidth: 44,
  },
  fullTitle: {
    flex: 1,
    fontSize: 20,
    fontWeight: '600',
    textAlign: 'center',
  },
  fullContent: {
    flex: 1,
  },
})
