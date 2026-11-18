import React, {useEffect, useMemo, useRef, useState} from 'react'
import {Animated, Easing, StyleSheet} from 'react-native'
import {Gesture, GestureDetector} from 'react-native-gesture-handler'
import {SemanticColor} from '../../colors'
import {useReducedMotion, useRtl} from '../../layout'
import {Icon} from '../Icon'
import {Stack} from '../Stack'
import {Text} from '../Text'

export interface SortableItem {
  /** Stable identity; the order reported back is a list of these. */
  key: string
  label: string
  /** The label is right-to-left text (Hebrew): right-aligned, RTL. */
  rtl?: boolean
}

export interface SortableListProps {
  /** In display order. Controlled: pass the new order back after
   * `onReorder`. */
  items: SortableItem[]
  /** Called once when a drop (or a Move up/down action) changes the order,
   * with every key in the new order. */
  onReorder: (keys: string[]) => void
  /** Accessibility action names. Defaults are English. */
  moveUpLabel?: string
  moveDownLabel?: string
}

const ROW_HEIGHT = 52
const LIFT_SCALE = 1.03
const SETTLE_MS = 180

const clamp = (n: number, min: number, max: number) =>
  Math.min(max, Math.max(min, n))

interface DragHandlers {
  begin: (key: string) => void
  update: (key: string, dy: number) => void
  end: (key: string) => void
  move: (key: string, delta: number) => void
}

interface RowProps {
  item: SortableItem
  position: number
  y: Animated.Value
  lift: Animated.Value
  active: boolean
  rtl: boolean
  moveUpLabel: string
  moveDownLabel: string
  handlers: React.MutableRefObject<DragHandlers>
}

const SortableRow: React.FunctionComponent<RowProps> = ({
  item,
  position,
  y,
  lift,
  active,
  rtl,
  moveUpLabel,
  moveDownLabel,
  handlers,
}) => {
  const {key} = item
  const pan = useMemo(
    () =>
      Gesture.Pan()
        .runOnJS(true)
        // Claim the touch the instant it moves: inside the screen's
        // ScrollView, the default 10pt threshold loses the race to the
        // scroll's own pan and the page scrolls instead of the row moving.
        .minDistance(0)
        .shouldCancelWhenOutside(false)
        .onStart(() => handlers.current.begin(key))
        .onUpdate((e) => handlers.current.update(key, e.translationY))
        .onFinalize(() => handlers.current.end(key)),
    [key, handlers],
  )
  const scale = lift.interpolate({
    inputRange: [0, 1],
    outputRange: [1, LIFT_SCALE],
  })
  // Arrow keys on the grip are the keyboard fallback where there are no
  // accessibility actions to invoke (web).
  const keyboard = {
    onKeyDown: (e: {key?: string; nativeEvent?: {key?: string}}) => {
      const k = e.key ?? e.nativeEvent?.key
      if (k === 'ArrowUp') handlers.current.move(key, -1)
      if (k === 'ArrowDown') handlers.current.move(key, 1)
    },
  }
  return (
    <Animated.View
      accessible
      accessibilityLabel={item.label}
      accessibilityActions={[
        {name: 'moveUp', label: moveUpLabel},
        {name: 'moveDown', label: moveDownLabel},
      ]}
      onAccessibilityAction={(e) => {
        if (e.nativeEvent.actionName === 'moveUp')
          handlers.current.move(key, -1)
        if (e.nativeEvent.actionName === 'moveDown')
          handlers.current.move(key, 1)
      }}
      style={[
        styles.row,
        {
          zIndex: active ? 10 : 0,
          transform: [{translateY: y}, ...(active ? [{scale}] : [])],
        },
      ]}
    >
      <Stack
        direction={rtl ? 'rowReverse' : 'row'}
        align="center"
        gap="sm"
        height={ROW_HEIGHT}
        paddingHorizontal="sm"
        radius="md"
        background={active ? SemanticColor.SurfaceCard : undefined}
        shadow={active ? 'raised' : undefined}
        borderWidth={active ? 2 : undefined}
        borderColor={active ? SemanticColor.AccentPrimary : undefined}
      >
        <Stack width={24} align="center">
          <Text variant="caption" color={SemanticColor.TextSecondary}>
            {position + 1}
          </Text>
        </Stack>
        <Stack grow>
          <Text
            variant="rowLabel"
            rtl={item.rtl}
            align={item.rtl ? 'right' : undefined}
            numberOfLines={1}
          >
            {item.label}
          </Text>
        </Stack>
        <GestureDetector gesture={pan}>
          <Stack
            padding="sm"
            accessible={false}
            {...({...keyboard, focusable: true} as any)}
          >
            <Icon
              name="grip-vertical"
              size={20}
              color={SemanticColor.TextSecondary}
            />
          </Stack>
        </GestureDetector>
      </Stack>
    </Animated.View>
  )
}

/** A drag-to-reorder list for a settings card. Each row shows its position,
 * its label and a grip at the trailing edge; dragging the grip lifts the
 * row (shadow, accent outline) while the others slide out of its way, and
 * dropping commits. Every row also offers "Move up" / "Move down"
 * accessibility actions (and arrow keys on the grip on web). Honours
 * reduced motion by snapping. */
export const SortableList: React.FunctionComponent<SortableListProps> = ({
  items,
  onReorder,
  moveUpLabel = 'Move up',
  moveDownLabel = 'Move down',
}) => {
  const rtl = useRtl()
  const reduceMotion = useReducedMotion()
  const keys = items.map((i) => i.key)
  const keysId = keys.join('\u0000')

  const [order, setOrder] = useState(keys)
  const [activeKey, setActiveKey] = useState<string | null>(null)
  const orderRef = useRef(keys)
  const startOrder = useRef<string[]>(keys)
  const startSlot = useRef(0)
  const dragging = useRef<string | null>(null)
  const ys = useRef<Record<string, Animated.Value>>({}).current
  const lift = useRef(new Animated.Value(0)).current

  const yOf = (key: string) => {
    if (!ys[key])
      ys[key] = new Animated.Value(
        Math.max(0, orderRef.current.indexOf(key)) * ROW_HEIGHT,
      )
    return ys[key]
  }

  const animateTo = (key: string, slot: number) => {
    const y = yOf(key)
    y.stopAnimation()
    if (reduceMotion) return y.setValue(slot * ROW_HEIGHT)
    Animated.timing(y, {
      toValue: slot * ROW_HEIGHT,
      duration: SETTLE_MS,
      easing: Easing.out(Easing.cubic),
      useNativeDriver: true,
    }).start()
  }

  // The parent is the source of truth: follow it whenever its order moves.
  useEffect(() => {
    if (dragging.current) return
    orderRef.current = keys
    setOrder(keys)
    keys.forEach((k, i) => yOf(k).setValue(i * ROW_HEIGHT))
  }, [keysId])

  const handlers = useRef<DragHandlers>(null as unknown as DragHandlers)
  handlers.current = {
    begin: (key) => {
      dragging.current = key
      startOrder.current = orderRef.current
      startSlot.current = orderRef.current.indexOf(key)
      yOf(key).stopAnimation()
      setActiveKey(key)
      if (reduceMotion) lift.setValue(1)
      else
        Animated.timing(lift, {
          toValue: 1,
          duration: 120,
          useNativeDriver: true,
        }).start()
    },
    update: (key, dy) => {
      if (dragging.current !== key) return
      const last = (orderRef.current.length - 1) * ROW_HEIGHT
      const y = clamp(startSlot.current * ROW_HEIGHT + dy, 0, last)
      yOf(key).setValue(y)
      const target = Math.round(y / ROW_HEIGHT)
      if (target !== orderRef.current.indexOf(key)) {
        const next = orderRef.current.filter((k) => k !== key)
        next.splice(target, 0, key)
        orderRef.current = next
        setOrder(next)
        next.forEach((k, i) => k !== key && animateTo(k, i))
      }
    },
    end: (key) => {
      if (dragging.current !== key) return
      dragging.current = null
      animateTo(key, orderRef.current.indexOf(key))
      if (reduceMotion) lift.setValue(0)
      else
        Animated.timing(lift, {
          toValue: 0,
          duration: 120,
          useNativeDriver: true,
        }).start()
      setActiveKey(null)
      setOrder(orderRef.current)
      if (orderRef.current.join('\u0000') !== startOrder.current.join('\u0000'))
        onReorder(orderRef.current)
    },
    move: (key, delta) => {
      const from = orderRef.current.indexOf(key)
      const to = clamp(from + delta, 0, orderRef.current.length - 1)
      if (from < 0 || to === from) return
      const next = orderRef.current.filter((k) => k !== key)
      next.splice(to, 0, key)
      orderRef.current = next
      setOrder(next)
      next.forEach((k, i) => animateTo(k, i))
      onReorder(next)
    },
  }

  return (
    <Stack height={items.length * ROW_HEIGHT}>
      {items.map((item) => (
        <SortableRow
          key={item.key}
          item={item}
          position={Math.max(0, order.indexOf(item.key))}
          y={yOf(item.key)}
          lift={lift}
          active={activeKey === item.key}
          rtl={rtl}
          moveUpLabel={moveUpLabel}
          moveDownLabel={moveDownLabel}
          handlers={handlers}
        />
      ))}
    </Stack>
  )
}

const styles = StyleSheet.create({
  row: {position: 'absolute', top: 0, left: 0, right: 0, height: ROW_HEIGHT},
})
