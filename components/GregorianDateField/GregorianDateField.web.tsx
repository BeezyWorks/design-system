import React from 'react'
import moment from 'moment'
import {useColors} from '../../colors'
import {radius} from '../../radius'
import {spacing} from '../../spacing'

export interface GregorianDateFieldProps {
  value: Date
  onChange: (date: Date) => void
}

/** `@react-native-community/datetimepicker` has no web implementation (it
 * renders nothing there), so the web build falls back to the browser's
 * own native date input — a single well-styled control (the closest web
 * equivalent of "the standard date picker"), which always includes a
 * year, matching the native field. */
export const GregorianDateField: React.FunctionComponent<
  GregorianDateFieldProps
> = ({value, onChange}) => {
  const colors = useColors()

  return (
    <input
      type="date"
      value={moment(value).format('YYYY-MM-DD')}
      onChange={(event) => {
        const next = moment(event.target.value, 'YYYY-MM-DD', true)
        if (next.isValid()) onChange(next.toDate())
      }}
      style={{
        fontSize: 16,
        fontFamily: 'inherit',
        padding: `${spacing.sm}px ${spacing.md}px`,
        borderRadius: radius.sm,
        border: `1px solid ${colors.border}`,
        background: colors.backgroundColorDirty,
        color: colors.primaryTextColor,
        width: '100%',
        boxSizing: 'border-box',
      }}
    />
  )
}
