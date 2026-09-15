import React from 'react'
import {TouchableWithoutFeedback} from 'react-native'
import {useSpring, animated} from '@react-spring/native'
import {Stack} from '../Stack'

const scrimOpacity = 0.8

export interface ScrimProps {
  opacity?: number
  onPress?: () => void
}

interface AnimatedScrimProps extends ScrimProps {
  reverse?: boolean
  onResolve?: () => void
}

export const Scrim: React.FunctionComponent<ScrimProps> = ({
  opacity,
  onPress,
}) => {
  return (
    <TouchableWithoutFeedback onPress={onPress}>
      <Stack
        position="absoluteFill"
        background="scrimColor"
        opacity={opacity ?? scrimOpacity}
      />
    </TouchableWithoutFeedback>
  )
}

const InnerAnimatedScrim = animated(Scrim)

export const AnimatedScrim: React.FunctionComponent<AnimatedScrimProps> = ({
  reverse,
  onResolve,
  onPress,
}) => {
  const {opacity} = useSpring({
    to: {opacity: scrimOpacity},
    from: {opacity: 0},
    reverse,
    onResolve,
  })
  return <InnerAnimatedScrim opacity={opacity} onPress={onPress} />
}
