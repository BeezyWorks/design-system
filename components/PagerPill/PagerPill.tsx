import React, {useLayoutEffect, useRef, useState} from 'react'
import {Animated, Easing, StyleSheet} from 'react-native'
import {SemanticColor} from '../../colors'
import {useReducedMotion, useRtl} from '../../layout'
import {GlassSurface} from '../GlassSurface'
import {Icon} from '../Icon'
import {IconButton} from '../IconButton'
import {Stack} from '../Stack'
import {Text} from '../Text'
import {Touchable} from '../Touchable'

export interface PagerPillProps {
  /** The current chapter's name. When it changes it slides in the paging
   * direction (the last of `onNext`/`onPrevious` pressed), or crossfades. */
  title: string
  /** The title is right-to-left text (Hebrew). */
  titleRtl?: boolean
  /** Undefined disables the chevron. */
  onPrevious?: () => void
  onNext?: () => void
  /** Makes the title a button (with a small chevron-down) — e.g. to open a
   * chapter picker. */
  onTitlePress?: () => void
  previousLabel: string
  nextLabel: string
  /** A glass capsule (default), or `false` for no surface at all — for a
   * modal header that already has its own. */
  glass?: boolean
}

type Dir = 'next' | 'previous'

const SLIDE = 36
const DURATION = 450
const TITLE_MAX_WIDTH = 220
// Forget a press that never changed the title.
const DIRECTION_TTL = 800

interface Shown {
  title: string
  outgoing?: string
  /** -1: the new title enters from the left; 1: from the right; 0: fades. */
  sign: number
  key: number
}

/** The chapter-navigation control for a header or floating bar: a chevron
 * each side of the chapter title, paging as a Hebrew book does — in an
 * `RtlScope` next is on the left and the next page arrives from the left.
 * Outside one it reads like a Latin book (next on the right). */
export const PagerPill: React.FunctionComponent<PagerPillProps> = ({
  title,
  titleRtl,
  onPrevious,
  onNext,
  onTitlePress,
  previousLabel,
  nextLabel,
  glass = true,
}) => {
  const rtl = useRtl()
  const reduceMotion = useReducedMotion()
  const lastPressed = useRef<{dir: Dir; at: number} | null>(null)

  const [shown, setShown] = useState<Shown>({title, sign: 0, key: 0})
  const progress = useRef(new Animated.Value(1)).current

  if (title !== shown.title) {
    const pressed = lastPressed.current
    lastPressed.current = null
    let sign = 0
    if (pressed && Date.now() - pressed.at < DIRECTION_TTL) {
      // The next page arrives from the reading-forward side: the left in RTL.
      const fromLeft = (pressed.dir === 'next') === rtl
      sign = fromLeft ? -1 : 1
    }
    setShown({
      title,
      outgoing: reduceMotion ? undefined : shown.title,
      sign,
      key: shown.key + 1,
    })
  }

  useLayoutEffect(() => {
    if (shown.key === 0 || !shown.outgoing) return
    const key = shown.key
    progress.setValue(0)
    Animated.timing(progress, {
      toValue: 1,
      duration: DURATION,
      easing: Easing.out(Easing.back(1.4)),
      useNativeDriver: true,
    }).start(({finished}) => {
      if (finished)
        setShown((s) => (s.key === key ? {...s, outgoing: undefined} : s))
    })
  }, [shown.key])

  const press = (dir: Dir, handler?: () => void) =>
    handler
      ? () => {
          lastPressed.current = {dir, at: Date.now()}
          handler()
        }
      : undefined

  const incoming = {
    opacity: progress.interpolate({
      inputRange: [0, 0.4, 1],
      outputRange: [0, 0, 1],
      extrapolate: 'clamp',
    }),
    transform: [
      {
        translateX: progress.interpolate({
          inputRange: [0, 1],
          outputRange: [shown.sign * SLIDE, 0],
        }),
      },
    ],
  }
  const outgoing = {
    opacity: progress.interpolate({
      inputRange: [0, 0.5, 1],
      outputRange: [1, 0, 0],
      extrapolate: 'clamp',
    }),
    transform: [
      {
        translateX: progress.interpolate({
          inputRange: [0, 1],
          outputRange: [0, -shown.sign * SLIDE],
        }),
      },
    ],
  }

  const label = (text: string) => (
    <Text
      variant="sectionHeader"
      rtl={titleRtl}
      align="center"
      numberOfLines={1}
    >
      {text}
    </Text>
  )

  const titleBlock = (
    <Stack
      direction="row"
      align="center"
      gap="xs"
      paddingHorizontal="sm"
      paddingVertical="xs"
    >
      <Stack maxWidth={TITLE_MAX_WIDTH} overflow="hidden" align="center">
        <Animated.View style={shown.outgoing ? incoming : undefined}>
          {label(shown.title)}
        </Animated.View>
        {shown.outgoing ? (
          <Animated.View
            pointerEvents="none"
            style={[styles.outgoing, outgoing]}
          >
            {label(shown.outgoing)}
          </Animated.View>
        ) : null}
      </Stack>
      {onTitlePress ? (
        <Icon
          name="chevron-down"
          size={14}
          color={SemanticColor.TextSecondary}
        />
      ) : null}
    </Stack>
  )

  // Physical order: in an RTL scope next sits on the left.
  const next = (
    <IconButton
      name={rtl ? 'chevron-left' : 'chevron-right'}
      size={22}
      color={SemanticColor.TextAccent}
      disabled={!onNext}
      onPress={press('next', onNext)}
      accessibilityLabel={nextLabel}
    />
  )
  const previous = (
    <IconButton
      name={rtl ? 'chevron-right' : 'chevron-left'}
      size={22}
      color={SemanticColor.TextAccent}
      disabled={!onPrevious}
      onPress={press('previous', onPrevious)}
      accessibilityLabel={previousLabel}
    />
  )
  const content = (
    <>
      {rtl ? next : previous}
      {onTitlePress ? (
        <Touchable
          onPress={onTitlePress}
          accessibilityRole="button"
          accessibilityLabel={title}
        >
          {titleBlock}
        </Touchable>
      ) : (
        titleBlock
      )}
      {rtl ? previous : next}
    </>
  )

  return glass ? (
    <GlassSurface
      direction="row"
      align="center"
      radius="full"
      paddingHorizontal="xs"
      alignSelf="center"
    >
      {content}
    </GlassSurface>
  ) : (
    <Stack direction="row" align="center" alignSelf="center">
      {content}
    </Stack>
  )
}

const styles = StyleSheet.create({
  outgoing: {position: 'absolute', left: 0, right: 0, top: 0},
})
