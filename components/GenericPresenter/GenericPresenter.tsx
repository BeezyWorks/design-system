import React from 'react'
import {GenericModalConfig} from '@models'
import {BottomSheetModal} from '../BottomSheetModal'

export const GenericPresenter = (config: GenericModalConfig) => {
  return (
    <BottomSheetModal
      title={config.title}
      titleNode={config.titleNode}
      headerLeft={config.headerLeft}
      headerRight={config.headerRight}
    >
      {config.content}
    </BottomSheetModal>
  )
}
