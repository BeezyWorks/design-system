import React from 'react'
import {ActivityIndicator} from 'react-native'
import {Stack} from '../Stack'
import {useColors} from '../../colors'

export const ScreenLoader: React.FunctionComponent = () => {
  const colors = useColors()
  return (
    <Stack
      position="absoluteFill"
      background="backgroundColor"
      align="center"
      justify="center"
    >
      <ActivityIndicator color={colors.primaryColor} />
    </Stack>
  )
}
