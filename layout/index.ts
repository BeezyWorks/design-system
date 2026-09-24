// Fixed layout constants that aren't part of the spacing scale — sizes tied
// to a specific piece of chrome (the header) rather than general rhythm.
export const layout = {
  headerHeight: 64,
} as const
export * from './chrome'
export * from './sideNav'
