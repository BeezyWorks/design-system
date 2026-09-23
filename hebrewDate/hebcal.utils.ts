import {HDate, gematriya} from '@hebcal/core'
import moment, {isDate, isMoment} from 'moment'
import {HebrewMoment, isHebrewMoment, MonthDate} from './hebrewMoment.model'
import {DateValue} from './dateValue'
import {Months} from './months'

export const removeUglyHebCalChars = (str: string) =>
  str.replace(/\(/, '').replace(/\)/, '').replace('״', '').replace('׳', '')

export const formatGematriya = (num: number) =>
  removeUglyHebCalChars(gematriya(num) as string)

const hebrewMomentToHebcal = ({day, month, year}: HebrewMoment) => {
  const todayHDate = new HDate()
  return new HDate(day, month, year || todayHDate.getFullYear())
}

export const toHebcalDate = (date: DateValue) => {
  if (isHebrewMoment(date)) {
    return hebrewMomentToHebcal(date)
  }
  return new HDate(toJSDate(date))
}

export const toJSDate = (_date: DateValue): Date => {
  if (isDate(_date)) return new Date(_date)
  if (typeof _date === 'number') return moment(_date).toDate()
  if (isMoment(_date)) return _date.toDate()
  if (isHebrewMoment(_date)) {
    return hebrewMomentToHebcal(_date).greg()
  }
  return new Date()
}

export const toMoment = (date: DateValue) =>
  moment.isMoment(date) ? moment(date) : moment(toJSDate(date))

export const toHebrewMoment = (date: DateValue): HebrewMoment => {
  if (isHebrewMoment(date)) return {...date}
  const hDate = new HDate(toJSDate(date))
  return {
    day: hDate.getDate() as MonthDate,
    month: hDate.getMonth() as Months,
    year: hDate.getFullYear(),
  }
}

export const HebrewLocale = 'he-x-NoNikud'
