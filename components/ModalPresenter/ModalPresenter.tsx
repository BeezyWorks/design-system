import React from 'react'
import {ModalConfigOptions, ModalType} from '@models'
import {GenericPresenter} from '../GenericPresenter'
import {PickerPresenter} from '../PickerPresenter'
import {ZmanSheetPresenter} from '../ZmanSheetPresenter'
import {SectionPickerPresenter} from '../SectionPickerPresenter'
import {DatePickerModalPresenter} from '../DatePickerModalPresenter'
import {AlertModalPresenter} from '../AlertModalPresenter'
import {LoaderModalPresenter} from '../LoaderModalPresenter'
import {GenericAlertModalPresenter} from '../GenericAlertModalPresenter'

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const TAG = 'ModalPresenter'

export const ModalPresenter = (config: ModalConfigOptions<any>) => {
  switch (config.type) {
    case ModalType.Generic:
      return <GenericPresenter {...config} />
    case ModalType.Picker:
      return <PickerPresenter {...config} />
    case ModalType.ZmanSheet:
      return <ZmanSheetPresenter {...config} />
    case ModalType.SectionPicker:
      return <SectionPickerPresenter {...config} />
    case ModalType.DatePicker:
      return <DatePickerModalPresenter {...config} />
    case ModalType.Alert:
      return <AlertModalPresenter {...config} />
    case ModalType.Loader:
      return <LoaderModalPresenter {...config} />
    case ModalType.GenericAlert:
      return <GenericAlertModalPresenter {...config} />
  }
  return null
}
