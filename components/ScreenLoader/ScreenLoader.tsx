import React from 'react'
import {ActivityIndicator} from 'react-native'
import {Stack} from '../Stack'
import {SemanticColor} from '../../colors'
import {useColorResolver} from '../../theme'

export const ScreenLoader: React.FunctionComponent = () => {
  const resolve = useColorResolver()
  return (
    <Stack
      position="absoluteFill"
      background={SemanticColor.SurfaceBackground}
      align="center"
      justify="center"
    >
      <ActivityIndicator color={resolve(SemanticColor.AccentPrimary)} />
    </Stack>
  )
}
