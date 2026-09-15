import React from 'react'
import {GenericModalConfig} from '@models'
import {BottomSheetModal} from '../BottomSheetModal'

export const GenericPresenter = (config: GenericModalConfig) => {
  return (
    <BottomSheetModal title={config.title}>{config.content}</BottomSheetModal>
  )
}
