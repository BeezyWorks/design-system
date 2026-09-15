import React, {useState} from 'react'
import DateTimePicker from '@react-native-community/datetimepicker'
import {DatePickerModalConfig, isThemeDark} from '@models'
import {useModal} from '@modal'
import {Platform} from 'react-native'
import {getAppTheme} from '@selectors'
import {useSelector} from 'state/store'
import {Stack} from '../Stack'
import {Button} from '../Button'
import {BottomSheetModal} from '../BottomSheetModal'

export const DatePickerModalPresenter = ({
  date,
  onSelected,
}: DatePickerModalConfig) => {
  const {dismissModal, removeModal} = useModal()
  const theme = useSelector(getAppTheme)
  const [currentDate, setCurrentDate] = useState(date)

  const onChange = (_: unknown, changeDate?: Date) => {
    if (!changeDate) return
    setCurrentDate(changeDate)
    if (Platform.OS === 'android') {
      onSelected(changeDate)
      removeModal()
    }
  }

  const onDone = () => {
    onSelected(currentDate || new Date())
    if (Platform.OS === 'ios') dismissModal()
    else removeModal()
  }

  const iOSDatePicker = (
    <Stack padding="sm" gap="sm">
      <DateTimePicker
        themeVariant={isThemeDark(theme) ? 'dark' : 'light'}
        value={currentDate || new Date()}
        mode="date"
        display="spinner"
        onChange={onChange}
      />
      <Button title="Select" onPress={onDone} />
    </Stack>
  )

  const AndroidDatePicker = currentDate ? null : (
    <DateTimePicker
      themeVariant={isThemeDark(theme) ? 'dark' : 'light'}
      value={currentDate || new Date()}
      mode="date"
      display="default"
      onChange={onChange}
    />
  )

  return Platform.OS === 'ios' ? (
    <BottomSheetModal children={iOSDatePicker} />
  ) : (
    AndroidDatePicker
  )
}
