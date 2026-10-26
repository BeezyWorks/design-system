import React, {useState} from 'react'
import {PressableProps, StyleSheet} from 'react-native'
import {SemanticColor} from '../../colors'
import {RadiusToken} from '../../radius'
import {Stack} from '../Stack'

/** Hover and press state for a filled, tappable surface (a card, a tile, a
 * chip), whose own background would hide a wash painted on its `Pressable`.
 * Spread `pressableProps` on the `Pressable`, and put a `StateLayer` as the
 * surface's first child: hovered or pressed, it washes the surface under
 * its content; pressed, the surface also dips. `onHoverIn`/`onHoverOut`
 * fire for a web pointer and an iPad's, never for a finger. */
export const usePressFeedback = () => {
  const [hovered, setHovered] = useState(false)
  const pressableProps: Pick<
    PressableProps,
    'onHoverIn' | 'onHoverOut' | 'style'
  > = {
    onHoverIn: () => setHovered(true),
    onHoverOut: () => setHovered(false),
    style: ({pressed}) => (pressed ? styles.pressed : undefined),
  }
  return {hovered, pressableProps}
}

/** The translucent ink wash `usePressFeedback` lays over a surface — ink,
 * not a solid fill, so it shows on any background, the accent included. */
export const StateLayer: React.FunctionComponent<{
  visible: boolean
  radius?: RadiusToken
}> = ({visible, radius}) =>
  visible ? (
    <Stack
      position="absoluteFill"
      radius={radius}
      background={SemanticColor.SurfaceHover}
      pointerEvents="none"
    />
  ) : null

const styles = StyleSheet.create({
  pressed: {transform: [{scale: 0.97}]},
})
