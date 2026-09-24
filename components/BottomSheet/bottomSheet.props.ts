import React from 'react'

export interface BottomSheetProps {
  title?: string
  /** Renders in place of the plain `title` string — for a sheet whose
   * header needs its own type style (e.g. the Notifications editor's
   * "Sheet Title" convention) rather than every other sheet's shared
   * title style. */
  titleNode?: React.ReactNode
  /** Custom header-row actions (e.g. Cancel/Save) — absent for every
   * existing sheet, which keeps the plain centered-title-only look. */
  headerLeft?: React.ReactNode
  headerRight?: React.ReactNode
  children: React.ReactNode
}

export interface BottomSheetHeaderProps {
  title?: string
  titleNode?: React.ReactNode
  left?: React.ReactNode
  right?: React.ReactNode
  onPan: (dy: number) => void
  onPanRelease: () => void
}
