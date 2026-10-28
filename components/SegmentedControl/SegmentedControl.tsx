import React, {useEffect, useRef, useState} from 'react'
import {
  AccessibilityInfo,
  I18nManager,
  LayoutChangeEvent,
  Platform,
  Pressable,
  StyleSheet,
  Text as RNText,
  TextStyle,
  View,
} from 'react-native'
import {animated, useSpring} from '@react-spring/native'
import {SemanticColor} from '../../colors'
import {radius} from '../../radius'
import {useShadow} from '../../shadows'
import {useResolvedColor} from '../../theme'
import {FontFamily} from '../../typography'
import {useRtl} from '../../layout'

export interface SegmentOption<T extends string> {
  key: T
  label: string
}

export interface SegmentedControlProps<T extends string> {
  options: SegmentOption<T>[]
  value: T
  onChange: (key: T) => void
  /** Accessible name for the whole group (e.g. "Theme"). */
  accessibilityLabel?: string
  /** Stretch across the parent, segments sharing it evenly, instead of
   * sizing to the longest label. */
  fullWidth?: boolean
  /** `large`: a taller track with labels in the UI face — a screen's own
   * top-level switch rather than a setting's options. Default `medium`. */
  size?: 'medium' | 'large'
}

// Track padding and the thumb/track radii are concentric:
// track radius = thumb radius + padding.
const metrics = {
  medium: {padding: 2, thumbRadius: radius.sm, segmentHeight: 32},
  large: {padding: 3, thumbRadius: 9, segmentHeight: 36},
}
// 32pt segment + 2 * 6 = the 44pt minimum touch target.
const HIT_SLOP = {top: 6, bottom: 6}
const PRESSED_OPACITY = 0.6
const isAndroid = Platform.OS === 'android'

// Critically damped (friction ≈ 2·√tension): a quick glide that settles
// without overshoot, like UISegmentedControl, rather than a bouncy wobble.
const springConfig = {tension: 500, friction: 45}

const useReduceMotion = () => {
  const [reduce, setReduce] = useState(false)
  useEffect(() => {
    let active = true
    AccessibilityInfo.isReduceMotionEnabled?.()
      ?.then((enabled) => active && setReduce(enabled))
      .catch(() => {})
    const sub = AccessibilityInfo.addEventListener?.(
      'reduceMotionChanged',
      setReduce,
    )
    return () => {
      active = false
      sub?.remove?.()
    }
  }, [])
  return reduce
}

/**
 * A recessed track of mutually-exclusive options (e.g. theme, time format)
 * with a raised thumb that slides to the selected segment, in the iOS
 * `UISegmentedControl` idiom.
 *
 * Use 2-4 options (5 at most) with short labels; segments are equal width and
 * the control is sized to fit the longest label, which shrinks
 * (down to 0.8x) rather than wrapping when space runs out.
 *
 * In an `RtlScope` the first option sits on the right.
 */
export const SegmentedControl = <T extends string>({
  options: optionsProp,
  value,
  onChange,
  accessibilityLabel,
  fullWidth,
  size = 'medium',
}: SegmentedControlProps<T>) => {
  const {padding, thumbRadius, segmentHeight} = metrics[size]
  const trackRadius = thumbRadius + padding
  const labelStyle = size === 'large' ? uiLabelStyle : serifLabelStyle
  const isRTL = I18nManager.isRTL
  // Reversing the order (rather than the flex direction) keeps the thumb's
  // left-anchored translate math unchanged.
  const scopedRtl = useRtl()
  const options = scopedRtl ? [...optionsProp].reverse() : optionsProp
  const reduceMotion = useReduceMotion()
  const trackColor = useResolvedColor(SemanticColor.SurfaceTrack)
  const thumbColor = useResolvedColor(SemanticColor.SurfaceTrackThumb)
  // Like UISegmentedControl, every label is primary ink; weight marks the
  // selection. TextSecondary over the tinted track falls below 4.5:1.
  const labelColor = useResolvedColor(SemanticColor.TextPrimary)
  const thumbShadow = useShadow('thumb')
  // Android's elevation shadow is too faint to lift the thumb (and gone in
  // dark mode), so there the thumb gets a hairline edge and the selected
  // label takes the accent.
  const thumbBorderColor = useResolvedColor(SemanticColor.BorderDefault)
  const selectedLabelColor = useResolvedColor(SemanticColor.AccentPrimary)

  const [trackWidth, setTrackWidth] = useState(0)
  const [labelWidth, setLabelWidth] = useState(0)
  const count = options.length
  const index = Math.max(
    0,
    options.findIndex((o) => o.key === value),
  )
  const segmentWidth = trackWidth > 0 ? (trackWidth - padding * 2) / count : 0

  const [spring, api] = useSpring(() => ({x: 0, config: springConfig}))
  const placed = useRef(false)
  useEffect(() => {
    if (segmentWidth <= 0) return
    const x = (isRTL ? -1 : 1) * index * segmentWidth
    // The first placement (and reduce-motion) snaps instead of sliding in
    // from 0.
    api.start({x, immediate: !placed.current || reduceMotion})
    placed.current = true
  }, [index, segmentWidth, isRTL, reduceMotion, api])

  const onTrackLayout = (e: LayoutChangeEvent) =>
    setTrackWidth(e.nativeEvent.layout.width)
  // Every label is measured unconstrained, in its (wider) selected style, in
  // a hidden row; the widest sets every segment's minimum, so all segments
  // are equal and fit the longest label. Measuring the visible labels
  // instead is circular: on web they report their already-truncated width.
  const onLabelLayout = (e: LayoutChangeEvent) => {
    // +1: layout reports whole px (37) while text renders at 37.1, and that
    // sub-pixel overflow is enough to trigger the ellipsis.
    const w = Math.ceil(e.nativeEvent.layout.width) + 1
    setLabelWidth((prev) => (w > prev ? w : prev))
  }

  return (
    <View
      style={[
        styles.wrapper,
        scopedRtl && styles.wrapperRtl,
        fullWidth && styles.wrapperFull,
      ]}
      accessibilityRole="radiogroup"
      accessibilityLabel={accessibilityLabel}
    >
      <View
        style={[
          styles.track,
          {padding, borderRadius: trackRadius, backgroundColor: trackColor},
        ]}
        onLayout={onTrackLayout}
      >
        <animated.View
          pointerEvents="none"
          style={[
            styles.thumb,
            {
              top: padding,
              bottom: padding,
              start: padding,
              width: segmentWidth,
              opacity: segmentWidth > 0 ? 1 : 0,
              transform: [{translateX: spring.x}],
            },
          ]}
        >
          <View
            style={[
              styles.thumbFill,
              {borderRadius: thumbRadius},
              thumbShadow,
              {backgroundColor: thumbColor},
              isAndroid && {
                borderWidth: StyleSheet.hairlineWidth * 2,
                borderColor: thumbBorderColor,
              },
            ]}
          />
        </animated.View>
        {options.map((option) => {
          const selected = option.key === value
          return (
            <Pressable
              key={option.key}
              accessibilityRole="radio"
              accessibilityState={{selected}}
              accessibilityLabel={option.label}
              hitSlop={HIT_SLOP}
              onPress={() => {
                if (option.key !== value) onChange(option.key)
              }}
              style={[
                styles.segment,
                {minHeight: segmentHeight, borderRadius: thumbRadius},
                labelWidth > 0 && {minWidth: labelWidth + 16},
              ]}
            >
              {({pressed}) => (
                <RNText
                  numberOfLines={1}
                  adjustsFontSizeToFit
                  minimumFontScale={0.8}
                  maxFontSizeMultiplier={1.6}
                  style={[
                    styles.label,
                    labelStyle(selected),
                    {
                      color:
                        isAndroid && selected ? selectedLabelColor : labelColor,
                      opacity: pressed ? PRESSED_OPACITY : 1,
                    },
                  ]}
                >
                  {option.label}
                </RNText>
              )}
            </Pressable>
          )
        })}
      </View>
      <View
        style={styles.measureClip}
        pointerEvents="none"
        aria-hidden
        importantForAccessibility="no-hide-descendants"
      >
        <View style={styles.measureRow}>
          {options.map((option) => (
            <RNText
              key={option.key}
              maxFontSizeMultiplier={1.6}
              onLayout={onLabelLayout}
              style={[styles.label, labelStyle(true)]}
            >
              {option.label}
            </RNText>
          ))}
        </View>
      </View>
    </View>
  )
}

// Frank Ruhl Libre for every label, like the settings row labels around it:
// it draws Hebrew and Latin at a matched weight, so 'After הלל' and
// 'Fast Days' look like one family.
const serifLabelStyle = (selected: boolean): TextStyle => ({
  fontFamily: selected
    ? FontFamily.FrankRuhlLibreBold
    : FontFamily.FrankRuhlLibre,
  fontSize: 16,
})

// The UI face, like the screen chrome around a large control.
const uiLabelStyle = (selected: boolean): TextStyle => ({
  fontSize: 15,
  fontWeight: selected ? '600' : '500',
})

const styles = StyleSheet.create({
  // On web the parent card can be very wide; keep the track compact (sized
  // to its labels) instead of stretching every segment across it.
  wrapper: {
    ...(Platform.OS === 'web' ? {alignSelf: 'flex-start' as const} : null),
    maxWidth: '100%',
  },
  wrapperRtl: Platform.OS === 'web' ? {alignSelf: 'flex-end'} : {},
  wrapperFull: {alignSelf: 'stretch'},
  track: {flexDirection: 'row'},
  thumb: {position: 'absolute'},
  thumbFill: {flex: 1},
  // flex: 1 (basis 0) shares the row evenly; the minWidth (set from the
  // longest measured label) stops it collapsing on web.
  segment: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 8,
  },
  label: {textAlign: 'center'},
  // Zero-size clip so the wide measuring row never affects layout/scroll.
  measureClip: {
    position: 'absolute',
    width: 0,
    height: 0,
    overflow: 'hidden',
    opacity: 0,
  },
  measureRow: {
    position: 'absolute',
    width: 10000,
    flexDirection: 'row',
    alignItems: 'flex-start',
  },
})
