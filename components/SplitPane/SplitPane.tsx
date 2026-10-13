import React, {useMemo, useRef, useState} from 'react'
import {
  LayoutChangeEvent,
  PanResponder,
  ScrollView,
  StyleSheet,
  View,
} from 'react-native'
import {SemanticColor} from '../../colors'
import {spacing} from '../../spacing'
import {useColorResolver} from '../../theme'

const HANDLE_HEIGHT = 28
const MIN_TOP = 56
const TAP_SLOP = 4

export interface SplitPaneProps {
  /** The pinned pane (e.g. the pasuk a detail sheet is about). Sized to its
   * content up to the current cap; past that it scrolls on its own. */
  top: React.ReactNode
  /** The main pane — what the sheet is really for. Fills the rest; supply
   * its own scroller. */
  children: React.ReactNode
  /** The cap on the top pane as a fraction of the SplitPane's height. */
  ratio?: number
  /** Called when the user drags (or taps) the divider to a new cap. */
  onRatioChange?: (ratio: number) => void
  /** Used until the user has resized. Default 0.35. */
  defaultRatio?: number
  /** Largest cap the divider can be dragged to. Default 0.7. */
  maxRatio?: number
  background?: SemanticColor
}

/**
 * A resizable pinned pane over a main pane, for detail sheets whose
 * reference text (a pasuk, a verse, a passage) must stay visible but whose
 * real content is underneath. Short top content takes only what it needs;
 * long content is capped, scrolls internally, and the cap is dragged taller
 * or shorter by the divider. Tapping the divider collapses to a single
 * peek-height strip and back. Dragging is confined to the divider so it
 * never competes with either pane's scroll.
 */
export const SplitPane: React.FunctionComponent<SplitPaneProps> = ({
  top,
  children,
  ratio: controlledRatio,
  onRatioChange,
  defaultRatio = 0.35,
  maxRatio = 0.7,
  background = SemanticColor.SurfaceHighlight,
}) => {
  const resolve = useColorResolver()
  const [localRatio, setLocalRatio] = useState(defaultRatio)
  const ratio = controlledRatio ?? localRatio
  const [containerHeight, setContainerHeight] = useState(0)
  const [contentHeight, setContentHeight] = useState(0)

  const minPx = MIN_TOP
  const maxPx = Math.max(minPx, containerHeight * maxRatio)
  const capPx = Math.min(maxPx, Math.max(minPx, containerHeight * ratio))
  const topHeight = contentHeight > 0 ? Math.min(contentHeight, capPx) : capPx
  // Only offer resizing when there is something to resize.
  const resizable = containerHeight > 0 && contentHeight > minPx

  // The responder is created once; it reads the latest numbers through here.
  const live = useRef({topHeight, containerHeight, minPx, maxPx, ratio, startHeight: 0})
  live.current = {...live.current, topHeight, containerHeight, minPx, maxPx, ratio}
  const commit = (next: number) => {
    setLocalRatio(next)
    onRatioChange?.(next)
  }
  const commitRef = useRef(commit)
  commitRef.current = commit

  const pan = useMemo(
    () =>
      PanResponder.create({
        onStartShouldSetPanResponder: () => true,
        onPanResponderTerminationRequest: () => false,
        onPanResponderGrant: () => {
          live.current.startHeight = live.current.topHeight
        },
        onPanResponderMove: (_, g) => {
          const {startHeight, containerHeight: h, minPx: lo, maxPx: hi} = live.current
          if (!h) return
          const px = Math.min(hi, Math.max(lo, startHeight + g.dy))
          commitRef.current(px / h)
        },
        onPanResponderRelease: (_, g) => {
          if (Math.abs(g.dy) > TAP_SLOP) return
          const {containerHeight: h, minPx: lo, topHeight: current} = live.current
          if (!h) return
          // Tap: collapse to the peek strip, or open back to the default.
          const collapsed = current <= lo + 8
          commitRef.current(collapsed ? defaultRatio : lo / h)
        },
      }),
    [defaultRatio],
  )

  const onLayout = (e: LayoutChangeEvent) =>
    setContainerHeight(e.nativeEvent.layout.height)

  return (
    <View style={styles.fill} onLayout={onLayout}>
      <View
        style={{
          height: topHeight || undefined,
          backgroundColor: resolve(background),
        }}
      >
        <ScrollView
          nestedScrollEnabled
          showsVerticalScrollIndicator={resizable}
          onContentSizeChange={(_, h) => setContentHeight(h)}
        >
          {top}
        </ScrollView>
      </View>
      <View
        {...(resizable ? pan.panHandlers : null)}
        accessibilityRole={resizable ? 'adjustable' : undefined}
        accessibilityLabel={resizable ? 'Resize pasuk pane' : undefined}
        style={[
          styles.handle,
          {
            backgroundColor: resolve(background),
            borderBottomColor: resolve(SemanticColor.BorderStrong),
          },
          resizable && (styles.handleActive as object),
        ]}
      >
        {resizable ? (
          <View
            style={[
              styles.grip,
              {backgroundColor: resolve(SemanticColor.TextSecondary)},
            ]}
          />
        ) : null}
      </View>
      <View style={styles.fill}>{children}</View>
    </View>
  )
}

const styles = StyleSheet.create({
  fill: {flex: 1},
  handle: {
    height: HANDLE_HEIGHT,
    alignItems: 'center',
    justifyContent: 'center',
    borderBottomWidth: StyleSheet.hairlineWidth,
    paddingHorizontal: spacing.md,
  },
  // Web-only: row-resize cursor, and stop the browser claiming the touch
  // for page scroll so the drag reaches the responder.
  handleActive: {cursor: 'row-resize', touchAction: 'none'} as object,
  grip: {width: 36, height: 4, borderRadius: 2, opacity: 0.5},
})
