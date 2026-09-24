// Fixed (non-theme-adaptive) palette for tagging calendar/event categories —
// these are deliberately the same in light and dark mode, per the original
// `yearHolidays.model.ts` tailwind-500 palette.
export const eventCategoryColors = {
  fastDay: '#EF4444',
  erevMinorHoliday: '#FDBA74',
  minorHoliday: '#F97316',
  roshChodesh: '#F97316',
  unspecified: '#FCD34D',
  yomTov: '#3B82F6',
  erevYomTov: '#93C5FD',
  userEvent: '#22C55E',
} as const

export type EventCategory = keyof typeof eventCategoryColors

export {SemanticColor} from './semantic'
export type {ThemeMode} from './themes'
export {withOpacity} from './withOpacity'
export * from './palette'
