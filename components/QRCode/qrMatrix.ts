import qrcode from 'qrcode-generator'

/* eslint-disable no-bitwise -- UTF-8 encoding is bit arithmetic */

// Encode payloads as UTF-8 (the library defaults to Latin-1, which mangles
// anything beyond ASCII — Hebrew in a URL fragment, say). Done by hand: the
// library's ESM build doesn't ship its `stringToBytesFuncs`, and Hermes has no
// TextEncoder guarantee.
const toUTF8Bytes = (s: string): number[] => {
  const bytes: number[] = []
  for (const ch of s) {
    const cp = ch.codePointAt(0) as number
    if (cp < 0x80) {
      bytes.push(cp)
    } else if (cp < 0x800) {
      bytes.push(0xc0 | (cp >> 6), 0x80 | (cp & 0x3f))
    } else if (cp < 0x10000) {
      bytes.push(
        0xe0 | (cp >> 12),
        0x80 | ((cp >> 6) & 0x3f),
        0x80 | (cp & 0x3f),
      )
    } else {
      bytes.push(
        0xf0 | (cp >> 18),
        0x80 | ((cp >> 12) & 0x3f),
        0x80 | ((cp >> 6) & 0x3f),
        0x80 | (cp & 0x3f),
      )
    }
  }
  return bytes
}
qrcode.stringToBytes = toUTF8Bytes

export interface QRMatrix {
  /** Modules per side (no quiet zone). */
  size: number
  isDark: (row: number, col: number) => boolean
}

/** Encodes `value` at error-correction level H (≈30% recoverable), which is
 * what leaves room for a logo over the middle. Throws if it can't fit. */
export const createQRMatrix = (value: string): QRMatrix => {
  const qr = qrcode(0, 'H')
  qr.addData(value)
  qr.make()
  return {size: qr.getModuleCount(), isDark: (r, c) => qr.isDark(r, c)}
}

/** One SVG path of every dark module, skipping any inside the (module-unit)
 * clear box — where the logo plate sits. */
export const matrixToPath = (
  matrix: QRMatrix,
  clear?: {from: number; to: number},
): string => {
  let d = ''
  for (let r = 0; r < matrix.size; r++) {
    for (let c = 0; c < matrix.size; c++) {
      if (!matrix.isDark(r, c)) {
        continue
      }
      if (
        clear &&
        r >= clear.from &&
        r < clear.to &&
        c >= clear.from &&
        c < clear.to
      ) {
        continue
      }
      d += `M${c} ${r}h1v1h-1z`
    }
  }
  return d
}
