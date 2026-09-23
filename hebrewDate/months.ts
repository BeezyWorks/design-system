export const Months = {
  Nissan: 1,
  Eyar: 2,
  Sivan: 3,
  Taamuz: 4,
  Av: 5,
  Elul: 6,
  Tishrei: 7,
  Cheshvan: 8,
  Kislev: 9,
  Teves: 10,
  Shvat: 11,
  Adar: 12,
  AdarII: 13,
} as const

export type Months = (typeof Months)[keyof typeof Months]

export const isMonth = (value: unknown): value is Months =>
  typeof value === 'number' && value >= Months.Nissan && value <= Months.AdarII

const monthNamesLeapYear: Record<Months, string> = {
  '1': 'ניסן',
  '2': 'אייר',
  '3': 'סיון',
  '4': 'תמוז',
  '5': 'אב',
  '6': 'אלול',
  '7': 'תשרי',
  '8': 'חשון',
  '9': 'כסלו',
  '10': 'טבת',
  '11': 'שבט',
  '12': 'אדר א',
  '13': 'אדר ב',
}
const monthNamesNormalyear: Record<Months, string> = {
  ...monthNamesLeapYear,
  '12': 'אדר',
}

export const getNameForMonth = (month: Months, isLeapYear: boolean) =>
  isLeapYear ? monthNamesLeapYear[month] : monthNamesNormalyear[month]
