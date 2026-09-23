import {HDate} from '@hebcal/core'
import {toHebrewMoment, toJSDate} from './hebcal.utils'
import {MonthDate} from './hebrewMoment.model'
import {getNameForMonth, Months} from './months'

/** UI-level month identity for a Hebrew date picker. `Adar` and `AdarI`
 * both store as `Months.Adar` (hebcal itself only has one numeric month
 * for "the only Adar" vs "Adar I" — which name applies depends solely on
 * whether the year they land in is a leap year) — they're offered as
 * separate picker rows only so a user thinking in either term finds it
 * directly. `AdarII` is the true second month, `Months.AdarII`. */
export type HebrewMonthKey =
  | 'Nissan'
  | 'Eyar'
  | 'Sivan'
  | 'Taamuz'
  | 'Av'
  | 'Elul'
  | 'Tishrei'
  | 'Cheshvan'
  | 'Kislev'
  | 'Teves'
  | 'Shvat'
  | 'Adar'
  | 'AdarI'
  | 'AdarII'

export interface HebrewMonthOption {
  key: HebrewMonthKey
  label: string
  month: Months
  /** Only exists in a leap Hebrew year (Adar I / Adar II). */
  leapOnly: boolean
  /** The most days this month can ever have across any year — e.g.
   * Cheshvan/Kislev swing 29-30, so the day picker allows up to 30 for
   * either rather than tying the lock to one specific year (the same way
   * a Gregorian picker still offers "29 February" every year). */
  maxDays: number
}

export const HEBREW_MONTH_OPTIONS: HebrewMonthOption[] = [
  {
    key: 'Nissan',
    label: getNameForMonth(Months.Nissan, true),
    month: Months.Nissan,
    leapOnly: false,
    maxDays: 30,
  },
  {
    key: 'Eyar',
    label: getNameForMonth(Months.Eyar, true),
    month: Months.Eyar,
    leapOnly: false,
    maxDays: 29,
  },
  {
    key: 'Sivan',
    label: getNameForMonth(Months.Sivan, true),
    month: Months.Sivan,
    leapOnly: false,
    maxDays: 30,
  },
  {
    key: 'Taamuz',
    label: getNameForMonth(Months.Taamuz, true),
    month: Months.Taamuz,
    leapOnly: false,
    maxDays: 29,
  },
  {
    key: 'Av',
    label: getNameForMonth(Months.Av, true),
    month: Months.Av,
    leapOnly: false,
    maxDays: 30,
  },
  {
    key: 'Elul',
    label: getNameForMonth(Months.Elul, true),
    month: Months.Elul,
    leapOnly: false,
    maxDays: 29,
  },
  {
    key: 'Tishrei',
    label: getNameForMonth(Months.Tishrei, true),
    month: Months.Tishrei,
    leapOnly: false,
    maxDays: 30,
  },
  {
    key: 'Cheshvan',
    label: getNameForMonth(Months.Cheshvan, true),
    month: Months.Cheshvan,
    leapOnly: false,
    maxDays: 30,
  },
  {
    key: 'Kislev',
    label: getNameForMonth(Months.Kislev, true),
    month: Months.Kislev,
    leapOnly: false,
    maxDays: 30,
  },
  {
    key: 'Teves',
    label: getNameForMonth(Months.Teves, true),
    month: Months.Teves,
    leapOnly: false,
    maxDays: 29,
  },
  {
    key: 'Shvat',
    label: getNameForMonth(Months.Shvat, true),
    month: Months.Shvat,
    leapOnly: false,
    maxDays: 30,
  },
  {
    key: 'Adar',
    label: getNameForMonth(Months.Adar, false),
    month: Months.Adar,
    leapOnly: false,
    maxDays: 29,
  },
  {
    key: 'AdarI',
    label: getNameForMonth(Months.Adar, true),
    month: Months.Adar,
    leapOnly: true,
    maxDays: 30,
  },
  {
    key: 'AdarII',
    label: getNameForMonth(Months.AdarII, true),
    month: Months.AdarII,
    leapOnly: true,
    maxDays: 29,
  },
]

export const getHebrewMonthOption = (key: HebrewMonthKey): HebrewMonthOption =>
  HEBREW_MONTH_OPTIONS.find((option) => option.key === key) ??
  HEBREW_MONTH_OPTIONS[0]

/** Finds a nearby Hebrew year whose leap-ness matches `leap`, so a
 * leap-only month selection (Adar I / Adar II) always anchors to a year
 * where that month actually exists. The Hebrew calendar's 19-year
 * Metonic cycle guarantees both a leap and a non-leap year occur within
 * any 19 consecutive years, so this always terminates. */
export const findHebrewYearMatchingLeap = (
  fromYear: number,
  leap: boolean,
): number => {
  for (let offset = 0; offset < 19; offset++) {
    const year = fromYear + offset
    if (HDate.isLeapYear(year) === leap) return year
  }
  return fromYear
}

export interface HebrewDateValue {
  day: number
  monthKey: HebrewMonthKey
}

const monthKeyForHebrewMonth = (
  month: Months,
  isLeapYear: boolean,
): HebrewMonthKey => {
  if (month === Months.AdarII) return 'AdarII'
  if (month === Months.Adar) return isLeapYear ? 'AdarI' : 'Adar'
  return (
    HEBREW_MONTH_OPTIONS.find((option) => option.month === month)?.key ??
    'Nissan'
  )
}

/** Today's Hebrew day/month, expressed as a picker value — the editor's
 * default when a user hasn't picked a Hebrew date yet. */
export const todaysHebrewDateValue = (): HebrewDateValue => {
  const today = toHebrewMoment(new Date())
  const isLeap = HDate.isLeapYear(today.year ?? new Date().getFullYear())
  return {day: today.day, monthKey: monthKeyForHebrewMonth(today.month, isLeap)}
}

/** Converts a picker value into a real `Date` to store — anchored to a
 * Hebrew year matching the selection's leap-ness so an Adar I/II pick
 * always lands on a year where that month actually exists, AND so a
 * plain "Adar" pick doesn't silently anchor to a leap year and come back
 * out (e.g. in the events list) mislabeled as "Adar I" — `Months.Adar`
 * is the same numeric month either way, but which name is correct for it
 * depends entirely on the anchor year's leap-ness. Which exact anchor
 * year is used doesn't otherwise matter for a repeating event beyond
 * that: it only exists to satisfy `HDate`'s constructor, since day/month
 * is all a repeating Hebrew event's occurrences are re-derived from
 * later. */
export const hebrewDateValueToDate = ({
  day,
  monthKey,
}: HebrewDateValue): Date => {
  const option = getHebrewMonthOption(monthKey)
  const todayHebrewYear = toHebrewMoment(new Date()).year ?? 0
  const year =
    monthKey === 'Adar'
      ? findHebrewYearMatchingLeap(todayHebrewYear, false)
      : option.leapOnly
        ? findHebrewYearMatchingLeap(todayHebrewYear, true)
        : todayHebrewYear
  return toJSDate({month: option.month, day: day as MonthDate, year})
}

/** The inverse of `hebrewDateValueToDate`, for opening the editor on an
 * existing Hebrew-dated event. */
export const dateToHebrewDateValue = (date: Date): HebrewDateValue => {
  const moment = toHebrewMoment(date)
  const isLeap = HDate.isLeapYear(moment.year ?? new Date().getFullYear())
  return {
    day: moment.day,
    monthKey: monthKeyForHebrewMonth(moment.month, isLeap),
  }
}
