import React from 'react'
import {ActivityIndicator} from 'react-native'
import {Stack} from '../Stack'
import {useColors, SemanticColor} from '../../colors'

export const ScreenLoader: React.FunctionComponent = () => {
  const colors = useColors()
  return (
    <Stack
      position="absoluteFill"
      background={SemanticColor.SurfaceBackground}
      align="center"
      justify="center"
    >
      <ActivityIndicator color={colors.primaryColor} />
    </Stack>
  )
}
