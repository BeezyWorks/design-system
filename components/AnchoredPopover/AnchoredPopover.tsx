import React from 'react'
import {
  Pressable,
  ScrollView,
  StyleSheet,
  View,
  useWindowDimensions,
} from 'react-native'
import {useColors, Colors, Black, withOpacity} from '../../colors'
import {layout} from '../../layout'
import {shadows} from '../../shadows'

export interface AnchoredPopoverProps {
  visible: boolean
  onDismiss: () => void
  // 'center': under the header title. 'end': under the trailing-edge icon
  // row (zmanim/settings) — "end" rather than "right" since that row sits
  // on whichever side is RTL-start.
  align: 'center' | 'end'
  // Card width caps out at maxWidth, but never exceeds widthPercent of the
  // window — matches each popover's own min(Npt, M% of screen) spec.
  maxWidth?: number
  widthPercent?: number
  // Rows that already carry their own generous padding (the sections list)
  // want a tighter outer inset than free-floating content (zmanim/settings).
  contentPadding?: number
  children: React.ReactNode
}

// Wide-layout-only replacement for a bottom sheet: a small card anchored
// under the header instead of covering the screen, dismissed by tapping
// anywhere outside it.
export const AnchoredPopover: React.FunctionComponent<AnchoredPopoverProps> = ({
  visible,
  onDismiss,
  align,
  maxWidth = 320,
  widthPercent = 0.9,
  contentPadding = 16,
  children,
}) => {
  const colors = useColors()
  const {height: windowHeight, width: windowWidth} = useWindowDimensions()
  const styles = styleCreator(colors)

  if (!visible) return null

  const width = Math.min(maxWidth, windowWidth * widthPercent)

  // This renders as a child of the header (a fixed ~64pt bar), not of the
  // full screen — `StyleSheet.absoluteFill`'s `bottom: 0` would resolve
  // against that 64pt box and clip the dismiss-scrim to it. An explicit
  // height reaching past the header (rendered content overflows its
  // parent's box just fine in RN) keeps the whole screen tappable-to-close.
  return (
    <View
      style={[styles.fullScreen, {height: windowHeight}]}
      pointerEvents="box-none"
    >
      <Pressable
        style={[StyleSheet.absoluteFill, styles.scrim]}
        onPress={onDismiss}
      />
      <View
        style={[
          styles.anchor,
          align === 'center' ? styles.anchorCenter : styles.anchorEnd,
        ]}
        pointerEvents="box-none"
      >
        <View style={[styles.card, {width, maxHeight: windowHeight * 0.65}]}>
          <ScrollView
            bounces={false}
            contentContainerStyle={{padding: contentPadding}}
          >
            {children}
          </ScrollView>
        </View>
      </View>
    </View>
  )
}

const styleCreator = (colors: Colors) =>
  StyleSheet.create({
    fullScreen: {
      position: 'absolute',
      top: 0,
      left: 0,
      right: 0,
      // This is nested inside the header, an *earlier* sibling of the
      // reading pane/rail below it — without a z-index, that later sibling
      // still paints on top of it (sibling stacking order wins over a
      // descendant's position:absolute once each has its own implicit
      // stacking context), leaving the popover legible-looking in the
      // element tree but visually buried under the page content.
      zIndex: 1000,
      elevation: 24,
    },
    scrim: {
      backgroundColor: withOpacity(Black, 0.15),
    },
    anchor: {
      position: 'absolute',
      top: layout.headerHeight + 8,
      left: 0,
      right: 0,
    },
    anchorCenter: {
      alignItems: 'center',
    },
    anchorEnd: {
      alignItems: 'flex-end',
      paddingRight: 16,
    },
    card: {
      backgroundColor: colors.backgroundColor,
      borderRadius: 14,
      overflow: 'hidden',
      borderWidth: StyleSheet.hairlineWidth,
      borderColor: colors.scrimColor,
      ...shadows.card,
    },
  })
