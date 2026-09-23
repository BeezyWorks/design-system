import {isMonth, Months} from './months'

export type MonthDate =
  | 1
  | 2
  | 3
  | 4
  | 5
  | 6
  | 7
  | 8
  | 9
  | 10
  | 11
  | 12
  | 13
  | 14
  | 15
  | 16
  | 17
  | 18
  | 19
  | 20
  | 21
  | 22
  | 23
  | 24
  | 25
  | 26
  | 27
  | 28
  | 29
  | 30

export const isMonthDate = (value: unknown): value is MonthDate =>
  typeof value === 'number' && value > 0 && value <= 30
export interface HebrewMoment {
  month: Months
  day: MonthDate
  year?: number
}

export const isHebrewMoment = (value: unknown): value is HebrewMoment =>
  typeof value === 'object' &&
  isMonth((value as HebrewMoment).month) &&
  isMonthDate((value as HebrewMoment).day) &&
  (typeof (value as HebrewMoment).year === 'number' ||
    (value as HebrewMoment).year === undefined)
