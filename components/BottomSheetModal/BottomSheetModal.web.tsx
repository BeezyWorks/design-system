import React, {useEffect, useRef} from 'react'
import {
  Animated,
  Pressable,
  StyleSheet,
  Text,
  View,
  useWindowDimensions,
} from 'react-native'
import {useModalContext} from 'modal/context/modal-context'
import {BottomSheetProps} from 'modal/components/bottomSheet.props'
import {SIDE_NAV_BREAKPOINT} from 'navigation/tabBar.constants'
import {useColors, Colors, Black, SemanticColor} from '../../colors'
import {Icon} from '../Icon'

const PANEL_WIDTH = 380

// Above the same breakpoint the app shell switches to a persistent side
// nav (SIDE_NAV_BREAKPOINT), a sheet sliding up over the middle of the
// screen reads oddly next to that docked chrome — so every modal that
// goes through BottomSheetModal (section picker, zman sheet, the reader's
// settings sheet, the Luach day-detail popup) becomes a toggle-able panel
// docked to the right edge instead. Below it, a narrow web viewport is
// almost always a touch device in portrait, where a sheet rising from the
// bottom is the familiar mobile-web pattern — a right-edge panel there
// would have nowhere to dock but nearly the whole screen anyway. Same
// setModal/dismiss/dismissed contract as the native version, and the same
// enter/exit slide, just driven by RN's Animated (web has no pan gesture
// to drive a spring off of, and no drag handle — dismiss is tap-X or
// tap-scrim, so the header carries an explicit close icon native omits).
export const BottomSheetModal = ({
  title,
  titleNode,
  headerLeft,
  headerRight,
  children,
}: BottomSheetProps) => {
  const {dismiss, dismissed, setModal} = useModalContext()
  // See the native `BottomSheetModal`'s identical comment: guards against
  // a stale close-animation callback clearing a sheet that was reopened
  // while the previous one was still animating out.
  const dismissedRef = useRef(dismissed)
  useEffect(() => {
    dismissedRef.current = dismissed
  }, [dismissed])
  const colors = useColors()
  const {width: windowWidth, height: windowHeight} = useWindowDimensions()
  const isWide = windowWidth >= SIDE_NAV_BREAKPOINT
  const sheetMaxHeight = windowHeight * 0.85
  const panelWidth = Math.min(PANEL_WIDTH, windowWidth * 0.92)
  const styles = styleCreator(colors, panelWidth, sheetMaxHeight)

  // 0 = offscreen (right for the panel, below for the sheet), 1 = settled.
  const progress = useRef(new Animated.Value(0)).current

  useEffect(() => {
    Animated.timing(progress, {
      toValue: 1,
      duration: 180,
      useNativeDriver: true,
    }).start()
    // Mount-only: this is the enter animation, dismiss below owns the exit.
  }, [])

  useEffect(() => {
    if (!dismissed) {
      // Reopen-while-closing race (see the native version's comment): a
      // new sheet shown before the previous close animation finished
      // would otherwise stay parked off-screen with nothing to bring it
      // back — also fires harmlessly on first mount.
      Animated.timing(progress, {
        toValue: 1,
        duration: 160,
        useNativeDriver: true,
      }).start()
      return
    }
    Animated.timing(progress, {
      toValue: 0,
      duration: 160,
      useNativeDriver: true,
    }).start(({finished}) => {
      if (finished && dismissedRef.current) setModal()
    })
  }, [dismissed, progress, setModal])

  const translate = progress.interpolate({
    inputRange: [0, 1],
    outputRange: [isWide ? panelWidth : sheetMaxHeight, 0],
  })

  return (
    <View style={[StyleSheet.absoluteFill, styles.base]}>
      <Animated.View
        style={[StyleSheet.absoluteFill, styles.scrim, {opacity: progress}]}
      >
        <Pressable style={StyleSheet.absoluteFill} onPress={dismiss} />
      </Animated.View>
      <Animated.View
        style={[
          isWide ? styles.panel : styles.sheet,
          {
            transform: [
              isWide ? {translateX: translate} : {translateY: translate},
            ],
          },
        ]}
      >
        <View style={styles.header}>
          {headerLeft || headerRight ? (
            // `header`'s `flexDirection` is `row-reverse` (below) — visual
            // left-to-right order is the *reverse* of JSX order, so
            // headerRight has to come first in JSX to land on the visual
            // right, headerLeft last to land on the visual left.
            <>
              {headerRight}
              <View style={styles.titleCentered}>
                {titleNode ?? (
                  <Text
                    style={[styles.title, styles.titleCenteredText]}
                    numberOfLines={1}
                  >
                    {title}
                  </Text>
                )}
              </View>
              {headerLeft}
            </>
          ) : (
            <>
              {titleNode ?? (
                <Text style={styles.title} numberOfLines={1}>
                  {title}
                </Text>
              )}
              <Icon
                name="close"
                size={22}
                color={SemanticColor.TextPrimary}
                onPress={dismiss}
              />
            </>
          )}
        </View>
        <View style={styles.content}>{children}</View>
      </Animated.View>
    </View>
  )
}

const styleCreator = (
  colors: Colors,
  panelWidth: number,
  sheetMaxHeight: number,
) =>
  StyleSheet.create({
    base: {
      zIndex: 1000,
    },
    scrim: {
      backgroundColor: colors.scrimColor,
    },
    panel: {
      position: 'absolute',
      top: 0,
      right: 0,
      bottom: 0,
      width: panelWidth,
      backgroundColor: colors.backgroundColor,
      borderLeftWidth: StyleSheet.hairlineWidth,
      borderLeftColor: colors.scrimColor,
      shadowColor: Black,
      shadowOffset: {width: -2, height: 0},
      shadowOpacity: 0.15,
      shadowRadius: 12,
    },
    sheet: {
      position: 'absolute',
      left: 0,
      right: 0,
      bottom: 0,
      maxHeight: sheetMaxHeight,
      backgroundColor: colors.backgroundColor,
      borderTopLeftRadius: 16,
      borderTopRightRadius: 16,
      overflow: 'hidden',
      shadowColor: Black,
      shadowOffset: {width: 0, height: -2},
      shadowOpacity: 0.15,
      shadowRadius: 12,
    },
    header: {
      flexDirection: 'row-reverse',
      alignItems: 'center',
      justifyContent: 'space-between',
      paddingHorizontal: 20,
      height: 64,
      borderBottomWidth: StyleSheet.hairlineWidth,
      borderBottomColor: colors.scrimColor,
    },
    title: {
      fontSize: 18,
      fontWeight: '700',
      color: colors.primaryTextColor,
      flex: 1,
      textAlign: 'right',
      marginLeft: 12,
    },
    // Cancel/Save header variant: the title sits centered between the two
    // actions rather than right-aligned against a single close icon.
    titleCentered: {
      flex: 1,
      alignItems: 'center',
    },
    titleCenteredText: {
      flex: undefined,
      textAlign: 'center',
      marginLeft: 0,
    },
    content: {
      flex: 1,
    },
  })
