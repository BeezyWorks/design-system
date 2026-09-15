// Applies alpha to a `#rrggbb` (or `#rgb`) token so screens never hand-roll
// `color + 'xx'` hex-alpha suffixes or literal `rgba(...)` strings.
export const withOpacity = (hexColor: string, opacity: number): string => {
  if (hexColor.startsWith('rgba') || hexColor.startsWith('rgb')) {
    return hexColor
  }
  let hex = hexColor.replace('#', '')
  if (hex.length === 3) {
    hex = hex
      .split('')
      .map((char) => char + char)
      .join('')
  }
  const r = parseInt(hex.substring(0, 2), 16)
  const g = parseInt(hex.substring(2, 4), 16)
  const b = parseInt(hex.substring(4, 6), 16)
  return `rgba(${r}, ${g}, ${b}, ${opacity})`
}
