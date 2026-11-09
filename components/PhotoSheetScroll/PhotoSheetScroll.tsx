import React, {useRef, useState} from 'react'
import {
  Animated,
  ImageSourcePropType,
  NativeScrollEvent,
  NativeSyntheticEvent,
  Platform,
  ScrollView,
  StyleSheet,
  View,
  useWindowDimensions,
} from 'react-native'
import {useSafeAreaInsets} from 'react-native-safe-area-context'
import {SemanticColor} from '../../colors'
import {
  TAB_BAR_CONTENT_GAP,
  useIsWideLayout,
  useIsWideWebNav,
  useRtl,
  useSideNavWidth,
  useTabBarHeight,
} from '../../layout'
import {radius} from '../../radius'
import {useResolvedColor} from '../../theme'
import {PhotoBackground} from '../PhotoBackground'
import {isFloatingTabBar} from '../TabBarBackground'
import {Stack} from '../Stack'

export interface PhotoSheetScrollProps {
  /** The photo behind the hero (a `require`d asset or a `{uri}`). */
  source: ImageSourcePropType
  /** What sits over the photo — set text on it with `onPhoto` and panels
   * with `GlassSurface`. */
  hero: React.ReactNode
  /** The sheet's content, over the app's background. */
  children?: React.ReactNode
  /** Fires as the sheet's top reaches the status bar (`false`) and as it
   * leaves it (`true`) — flip the status-bar glyphs from it. Never fires on
   * a wide layout, which has no sheet. */
  onOverPhotoChange?: (overPhoto: boolean) => void
}

// How far the sheet rides up over the photo.
const SHEET_OVERLAP = 28
const SHEET_BOTTOM = 24
// How much of a phone's screen the hero takes, sheet overlap included.
const HERO_SHARE = 0.54
// Readable line length of the content, on either side.
const MAX_CONTENT_WIDTH = 720
// The hero column of a wide layout.
const WIDE_HERO_WIDTH = 440

/** A screen of a photo with a sheet that scrolls up over it. On a phone the
 * hero stays pinned (moved down by exactly what the list scrolls) while the
 * rounded sheet slides up over the photo, then its content scrolls; the
 * photo runs full height behind the sheet, so its corners always sit on the
 * photo. On a wide layout there is no sheet: the hero is a photo card in one
 * column and the content scrolls in a second beside it (the hero on the
 * start side). Ported from SiddurOneRN's tefila list.
 *
 * It does not draw the app's safe area, tab-bar clearance or side-rail gap
 * as `Screen` does: it runs the photo edge to edge, under the status bar
 * and (frosted) side rail, and reserves those itself. Don't nest it in
 * `Screen`. The `style`/animation values are derived from tokens and the
 * scroll position here — not a style escape hatch. */
export const PhotoSheetScroll: React.FunctionComponent<
  PhotoSheetScrollProps
> = ({source, hero, children, onOverPhotoChange}) => {
  const isWide = useIsWideLayout()
  const isWideWeb = useIsWideWebNav()
  const sideNavWidth = useSideNavWidth()
  const tabBarHeight = useTabBarHeight()
  const {height: windowHeight} = useWindowDimensions()
  const rtl = useRtl()
  // Room for the bottom pill, which floats over content only on iOS.
  const bottomInset =
    isFloatingTabBar && tabBarHeight ? tabBarHeight + TAB_BAR_CONTENT_GAP : 0
  // Web needs a concrete height to scroll within (see `Screen`); a docked
  // bottom bar on narrow web takes its own row out of the window.
  const rootHeight =
    Platform.OS === 'web'
      ? windowHeight - (isWideWeb ? 0 : (tabBarHeight ?? 0))
      : undefined

  const body = isWide ? (
    <WideLayout
      source={source}
      hero={hero}
      bottomInset={bottomInset}
      rtl={rtl}
    >
      {children}
    </WideLayout>
  ) : (
    <PhoneLayout
      source={source}
      hero={hero}
      bottomInset={bottomInset}
      onOverPhotoChange={onOverPhotoChange}
    >
      {children}
    </PhoneLayout>
  )

  return (
    <Stack
      direction="row"
      fill={rootHeight === undefined}
      height={rootHeight}
      background={SemanticColor.SurfaceBackground}
    >
      {isWideWeb ? <Stack width={sideNavWidth} /> : null}
      <Stack grow width={0}>
        {body}
      </Stack>
    </Stack>
  )
}

interface LayoutProps {
  source: ImageSourcePropType
  hero: React.ReactNode
  children?: React.ReactNode
  bottomInset: number
}

const WideLayout: React.FunctionComponent<LayoutProps & {rtl: boolean}> = ({
  source,
  hero,
  children,
  bottomInset,
  rtl,
}) => {
  const insets = useSafeAreaInsets()
  return (
    <Stack
      direction={rtl ? 'rowReverse' : 'row'}
      fill
      gap="lg"
      paddingHorizontal="lg"
      paddingTop={insets.top + 24}
      paddingBottom={bottomInset + 24}
    >
      <Stack width={WIDE_HERO_WIDTH}>
        <PhotoBackground source={source} radius="xl">
          <ScrollView showsVerticalScrollIndicator={false}>
            <Stack padding="lg" gap="md">
              {hero}
            </Stack>
          </ScrollView>
        </PhotoBackground>
      </Stack>
      <Stack grow width={0}>
        <ScrollView showsVerticalScrollIndicator={false}>
          <Stack
            width="100%"
            maxWidth={MAX_CONTENT_WIDTH}
            alignSelf="center"
            gap="lg"
          >
            {children}
          </Stack>
        </ScrollView>
      </Stack>
    </Stack>
  )
}

const PhoneLayout: React.FunctionComponent<
  LayoutProps & {onOverPhotoChange?: (overPhoto: boolean) => void}
> = ({source, hero, children, bottomInset, onOverPhotoChange}) => {
  const insets = useSafeAreaInsets()
  const sheetColor = useResolvedColor(SemanticColor.SurfaceBackground)
  const isWeb = Platform.OS === 'web'
  // The scroll view's own height, not the window's: tab bars and headers
  // take some of the window, and a sheet sized to the window would scroll
  // up past the top of what's visible.
  const [viewportHeight, setViewportHeight] = useState(0)
  const [heroHeight, setHeroHeight] = useState(0)
  const scrollY = useRef(new Animated.Value(0)).current
  const overPhoto = useRef(true)

  // The scroll offset at which the sheet's top meets the status bar.
  const stripStart = Math.max(1, heroHeight - SHEET_OVERLAP - insets.top)

  const onScroll = Animated.event(
    [{nativeEvent: {contentOffset: {y: scrollY}}}],
    {
      useNativeDriver: !isWeb,
      listener: (e: NativeSyntheticEvent<NativeScrollEvent>) => {
        const next = e.nativeEvent.contentOffset.y < stripStart
        if (next !== overPhoto.current) {
          overPhoto.current = next
          onOverPhotoChange?.(next)
        }
      },
    },
  )

  return (
    <View style={styles.fill}>
      <Animated.ScrollView
        showsVerticalScrollIndicator={false}
        onScroll={onScroll}
        scrollEventThrottle={16}
        // The hero is drawn from the screen's top, so iOS mustn't inset the
        // list by the status bar.
        contentInsetAdjustmentBehavior="never"
        onLayout={(e) => setViewportHeight(e.nativeEvent.layout.height)}
        style={isWeb ? styles.noOverscroll : undefined}
      >
        {/* Clipping keeps the pinned hero and its full-height photo from
            adding to the scrollable area: on web a transformed or sticky
            child extends it. `clip` rather than `hidden`, which would make
            it the sticky hero's scroller. */}
        <View style={isWeb ? styles.clip : undefined}>
          {/* The browser's own scrolling outruns a transform set from scroll
              events, so on web the hero is pinned by CSS. */}
          <Animated.View
            style={
              isWeb ? styles.heroSticky : {transform: [{translateY: scrollY}]}
            }
            onLayout={(e) => setHeroHeight(e.nativeEvent.layout.height)}
          >
            <View style={[styles.photo, {height: viewportHeight}]}>
              <PhotoBackground source={source} height={viewportHeight} />
            </View>
            <Stack
              paddingTop={insets.top + 16}
              paddingBottom={SHEET_OVERLAP + 20}
              paddingHorizontal="md"
              minHeight={viewportHeight * HERO_SHARE}
              justify="end"
            >
              <Stack
                width="100%"
                maxWidth={MAX_CONTENT_WIDTH}
                alignSelf="center"
                gap="md"
              >
                {hero}
              </Stack>
            </Stack>
          </Animated.View>
          <View style={styles.sheet}>
            {/* Only the sheet's top corners are rounded: this squares the
                bottom, and hangs a screen past it so iOS's bounce shows
                sheet rather than the photo behind. */}
            <View
              style={[
                styles.sheetFoot,
                {
                  backgroundColor: sheetColor,
                  height: radius.xl + viewportHeight,
                  bottom: -viewportHeight,
                },
              ]}
            />
            <Stack
              minHeight={viewportHeight - insets.top}
              radius="xl"
              background={SemanticColor.SurfaceBackground}
              paddingTop="lg"
              paddingBottom={bottomInset + SHEET_BOTTOM}
              paddingHorizontal="md"
            >
              <Stack
                width="100%"
                maxWidth={MAX_CONTENT_WIDTH}
                alignSelf="center"
                gap="lg"
              >
                {children}
              </Stack>
            </Stack>
          </View>
        </View>
      </Animated.ScrollView>
      {/* The status bar's strip turns to sheet as the sheet reaches it, so
          the glyphs never sit on the photo once they've flipped. */}
      {insets.top > 0 && heroHeight > 0 ? (
        <Animated.View
          pointerEvents="none"
          style={[
            styles.statusStrip,
            {
              height: insets.top,
              backgroundColor: sheetColor,
              opacity: scrollY.interpolate({
                inputRange: [stripStart - 1, stripStart],
                outputRange: [0, 1],
                extrapolate: 'clamp',
              }),
            },
          ]}
        />
      ) : null}
    </View>
  )
}

const styles = StyleSheet.create({
  fill: {flex: 1},
  heroSticky: {position: 'sticky' as 'relative', top: 0},
  // No rubber-band past the top, which would pull the photo down off it.
  noOverscroll: {overscrollBehaviorY: 'none'} as object,
  clip: {overflow: 'clip' as 'hidden'},
  photo: {position: 'absolute', top: 0, left: 0, right: 0},
  sheet: {marginTop: -SHEET_OVERLAP, zIndex: 1},
  sheetFoot: {position: 'absolute', left: 0, right: 0},
  statusStrip: {position: 'absolute', top: 0, left: 0, right: 0},
})
