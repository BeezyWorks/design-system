import React from 'react'
import {useModal} from '@modal'
import {GenericAlertModalConfig} from '@models'
import {AlertCard} from '../AlertCard'

export const GenericAlertModalPresenter = ({
  title,
  content,
}: GenericAlertModalConfig) => {
  const {removeModal} = useModal()

  return (
    <AlertCard title={title} onDismissBackground={removeModal}>
      {content}
    </AlertCard>
  )
}
