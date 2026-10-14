import {createQRMatrix, matrixToPath} from '../qrMatrix'

describe('qrMatrix', () => {
  it('encodes a URL with finder patterns in three corners', () => {
    const m = createQRMatrix('https://siddur.one')
    expect(m.size).toBeGreaterThanOrEqual(21)
    expect(m.isDark(0, 0)).toBe(true)
    expect(m.isDark(0, m.size - 1)).toBe(true)
    expect(m.isDark(m.size - 1, 0)).toBe(true)
  })

  it('handles non-ASCII payloads', () => {
    expect(() => createQRMatrix('https://siddur.one/?q=שלום')).not.toThrow()
  })

  it('drops modules inside the clear box', () => {
    const m = createQRMatrix('https://siddur.one')
    const full = matrixToPath(m)
    const clear = {from: 8, to: m.size - 8}
    expect(matrixToPath(m, clear).length).toBeLessThan(full.length)
  })
})
