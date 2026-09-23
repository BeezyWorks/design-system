import React, {useState} from 'react'
import {SemanticColor} from '../../colors'
import {Platform} from 'react-native'
import DateTimePicker from '@react-native-community/datetimepicker'
import moment from 'moment'
import {isThemeDark} from '@models'
import {getAppTheme} from '@selectors'
import {useSelector} from 'state/store'
import {Stack} from '../Stack'
import {Text} from '../Text'
import {Touchable} from '../Touchable'
import {Icon} from '../Icon'

export interface GregorianDateFieldProps {
  value: Date
  onChange: (date: Date) => void
}

/** The standard native date picker (`@react-native-community/datetimepicker`)
 * for the Gregorian row of the event editor — always includes a year.
 * iOS embeds its spinner inline; Android's picker only exists as a system
 * dialog, so a tap on the field opens it. */
export const GregorianDateField: React.FunctionComponent<
  GregorianDateFieldProps
> = ({value, onChange}) => {
  const theme = useSelector(getAppTheme)
  const [showAndroidPicker, setShowAndroidPicker] = useState(false)

  const onPickerChange = (_: unknown, date?: Date) => {
    if (Platform.OS === 'android') setShowAndroidPicker(false)
    if (date) onChange(date)
  }

  if (Platform.OS === 'android') {
    return (
      <Stack gap="xs">
        <Touchable onPress={() => setShowAndroidPicker(true)}>
          <Stack
            direction="row"
            justify="spaceBetween"
            align="center"
            paddingVertical="sm"
            paddingHorizontal="md"
            radius="sm"
            background={SemanticColor.SurfaceCard}
          >
            <Text variant="item">{moment(value).format('D MMMM YYYY')}</Text>
            <Icon
              name="chevron-down"
              size={16}
              color={SemanticColor.TextSecondary}
            />
          </Stack>
        </Touchable>
        {showAndroidPicker && (
          <DateTimePicker
            themeVariant={isThemeDark(theme) ? 'dark' : 'light'}
            value={value}
            mode="date"
            display="default"
            onChange={onPickerChange}
          />
        )}
      </Stack>
    )
  }

  return (
    <DateTimePicker
      themeVariant={isThemeDark(theme) ? 'dark' : 'light'}
      value={value}
      mode="date"
      display="spinner"
      onChange={onPickerChange}
    />
  )
}
