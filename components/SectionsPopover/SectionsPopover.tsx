import React, {useRef} from 'react'
import {
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
  ViewStyle,
  useWindowDimensions,
} from 'react-native'
import {SemanticColor} from '../../colors'
import {ColorResolver, useColorResolver} from '../../theme'
import {layout, useIsWideLayout} from '../../layout'
import {useShadow} from '../../shadows'
import {FontFamily} from '../../typography'

export const SECTION_ROW_HEIGHT = 44

const CARD_PADDING = 8
const PHONE_INSET = 32
const WIDE_MAX_WIDTH = 360
const BOTTOM_MARGIN = 16
const CARET = 14

export interface PopoverSection {
  key: string
  label: string
}

export interface SectionsPopoverProps {
  visible: boolean
  onDismiss: () => void
  sections: PopoverSection[]
  currentSectionKey?: string
  onSelectSection: (key: string) => void
  /** `top` hangs under the header title with the caret pointing up;
   * `bottom` rises from the bottom of its container with the caret pointing
   * down at the control that opened it (a floating `PagerPill`). */
  placement?: 'top' | 'bottom'
  /** Distance from the anchored edge to the card; defaults to just under the
   * header for `top`. */
  edgeOffset?: number
}

/** The section picker of SiddurOneRN's readers (davening sections, parsha
 * aliyos, Pirkei Avos chapters): a card anchored to the header title or the
 * floating pager pill, with a caret pointing at it, over a soft scrim. It is
 * as tall as its rows, up to the space available, scrolls inside, and opens
 * scrolled so the current section sits near the middle. Rows are Hebrew
 * (right-aligned, Frank Ruhl Libre); the current one is tinted and dotted.
 * Render it as a child of the screen (`bottom`) or the header (`top`). */
export const SectionsPopover: React.FunctionComponent<SectionsPopoverProps> = ({
  visible,
  onDismiss,
  sections,
  currentSectionKey,
  onSelectSection,
  placement = 'top',
  edgeOffset,
}) => {
  const resolve = useColorResolver()
  const shadow = useShadow('card')
  const isWide = useIsWideLayout()
  const {height: windowHeight, width: windowWidth} = useWindowDimensions()
  const scrollRef = useRef<ScrollView>(null)
  const styles = styleCreator(resolve, shadow)

  if (!visible) return null

  const bottomUp = placement === 'bottom'
  const offset = edgeOffset ?? layout.headerHeight + 8
  const reserved = bottomUp ? offset + layout.headerHeight : offset
  const width = isWide
    ? Math.min(WIDE_MAX_WIDTH, windowWidth - PHONE_INSET * 2)
    : windowWidth - PHONE_INSET * 2
  const contentHeight = sections.length * SECTION_ROW_HEIGHT + CARD_PADDING * 2
  const cardHeight = Math.max(
    SECTION_ROW_HEIGHT,
    Math.min(contentHeight, windowHeight - reserved - BOTTOM_MARGIN),
  )
  const currentIndex = Math.max(
    0,
    sections.findIndex(({key}) => key === currentSectionKey),
  )
  const centerOffset =
    CARD_PADDING +
    currentIndex * SECTION_ROW_HEIGHT +
    SECTION_ROW_HEIGHT / 2 -
    cardHeight / 2
  const initialY = Math.max(
    0,
    Math.min(centerOffset, contentHeight - cardHeight),
  )

  return (
    <View
      // A header child is a short box: reach past it with the window
      // height. At the bottom, fill the screen it's a child of instead.
      style={[
        styles.fullScreen,
        bottomUp ? styles.fill : {height: windowHeight},
      ]}
      pointerEvents="box-none"
    >
      <Pressable
        accessibilityLabel="Close"
        style={[StyleSheet.absoluteFill, styles.scrim]}
        onPress={onDismiss}
      />
      <View
        style={[styles.anchor, bottomUp ? {bottom: offset} : {top: offset}]}
        pointerEvents="box-none"
      >
        <View style={{width}}>
          <View
            style={[styles.caret, bottomUp ? styles.caretDown : styles.caretUp]}
          />
          <View style={[styles.card, {height: cardHeight}]}>
            <ScrollView
              ref={scrollRef}
              bounces={false}
              overScrollMode="never"
              contentOffset={{x: 0, y: initialY}}
              // web and Android ignore `contentOffset`; set it once laid out
              onLayout={() =>
                scrollRef.current?.scrollTo({y: initialY, animated: false})
              }
              contentContainerStyle={{padding: CARD_PADDING}}
            >
              {sections.map((section) => {
                const active = section.key === currentSectionKey
                return (
                  <Pressable
                    key={section.key}
                    accessibilityRole="button"
                    accessibilityState={{selected: active}}
                    onPress={() => onSelectSection(section.key)}
                    style={({pressed}) => [
                      styles.row,
                      active && styles.rowActive,
                      !active && pressed && styles.rowPressed,
                    ]}
                  >
                    <View style={[styles.dot, active && styles.dotActive]} />
                    <Text
                      style={[styles.label, active && styles.labelActive]}
                      numberOfLines={1}
                      ellipsizeMode="tail"
                    >
                      {section.label}
                    </Text>
                  </Pressable>
                )
              })}
            </ScrollView>
          </View>
        </View>
      </View>
    </View>
  )
}

const styleCreator = (resolve: ColorResolver, shadow: ViewStyle) =>
  StyleSheet.create({
    fullScreen: {
      position: 'absolute',
      top: 0,
      left: 0,
      right: 0,
      zIndex: 1000,
      elevation: 24,
    },
    fill: {bottom: 0},
    scrim: {
      backgroundColor: resolve(SemanticColor.OverlayScrimSoft),
    },
    anchor: {
      position: 'absolute',
      left: 0,
      right: 0,
      alignItems: 'center',
    },
    card: {
      backgroundColor: resolve(SemanticColor.SurfaceBackground),
      borderRadius: 14,
      overflow: 'hidden',
      borderWidth: StyleSheet.hairlineWidth,
      borderColor: resolve(SemanticColor.BorderStrong),
      ...shadow,
    },
    // A rotated square peeking out above the card, under the title.
    caret: {
      position: 'absolute',
      alignSelf: 'center',
      width: CARET,
      height: CARET,
      backgroundColor: resolve(SemanticColor.SurfaceBackground),
      borderColor: resolve(SemanticColor.BorderStrong),
      transform: [{rotate: '45deg'}],
      zIndex: 1,
    },
    // Peeking out above the card, under the header title.
    caretUp: {
      top: -CARET / 2,
      borderTopWidth: StyleSheet.hairlineWidth,
      borderLeftWidth: StyleSheet.hairlineWidth,
    },
    // Under the card, pointing down at the pill.
    caretDown: {
      bottom: -CARET / 2,
      borderBottomWidth: StyleSheet.hairlineWidth,
      borderRightWidth: StyleSheet.hairlineWidth,
    },
    row: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: 10,
      height: SECTION_ROW_HEIGHT,
      paddingHorizontal: 16,
      borderRadius: 9,
    },
    // An accent tint on light, a neutral wash on dark — one semantic color.
    rowActive: {backgroundColor: resolve(SemanticColor.SurfaceHighlight)},
    rowPressed: {backgroundColor: resolve(SemanticColor.SurfaceCard)},
    dot: {
      width: 6,
      height: 6,
      borderRadius: 3,
      backgroundColor: 'transparent',
    },
    dotActive: {backgroundColor: resolve(SemanticColor.AccentPrimary)},
    label: {
      flex: 1,
      fontSize: 18,
      fontFamily: FontFamily.FrankRuhlLibre,
      color: resolve(SemanticColor.TextPrimary),
      textAlign: 'right',
    },
    labelActive: {
      color: resolve(SemanticColor.AccentPrimary),
      fontFamily: FontFamily.FrankRuhlLibreBold,
      fontWeight: '700',
    },
  })
