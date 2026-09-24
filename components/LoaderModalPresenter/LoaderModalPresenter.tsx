import React from 'react'
import {ActivityIndicator} from 'react-native'
import {LoaderModalConfig} from '@models'
import {SemanticColor} from '../../colors'
import {useColors} from '../../colors/useColors'
import {Stack} from '../Stack'

export const LoaderModalPresenter = ({}: LoaderModalConfig) => {
  const colors = useColors()
  return (
    <Stack
      position="absoluteFill"
      background={SemanticColor.OverlayScrim}
      align="center"
      justify="center"
    >
      <Stack
        width={50}
        height={50}
        align="center"
        justify="center"
        background={SemanticColor.SurfaceBackground}
        radius="sm"
      >
        <ActivityIndicator color={colors.primaryColor} />
      </Stack>
    </Stack>
  )
}
