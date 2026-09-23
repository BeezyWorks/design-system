import {withOpacity} from '../withOpacity'

describe('withOpacity', () => {
  it('converts a 6-digit hex token to rgba', () => {
    expect(withOpacity('#ff8000', 0.5)).toBe('rgba(255, 128, 0, 0.5)')
  })

  it('expands 3-digit shorthand hex', () => {
    expect(withOpacity('#fff', 0)).toBe('rgba(255, 255, 255, 0)')
    expect(withOpacity('#0af', 1)).toBe('rgba(0, 170, 255, 1)')
  })

  it('accepts hex without the leading #', () => {
    expect(withOpacity('000000', 0.04)).toBe('rgba(0, 0, 0, 0.04)')
  })

  it('passes rgb/rgba strings through unchanged', () => {
    expect(withOpacity('rgba(1, 2, 3, 0.9)', 0.1)).toBe('rgba(1, 2, 3, 0.9)')
    expect(withOpacity('rgb(1, 2, 3)', 0.1)).toBe('rgb(1, 2, 3)')
  })
})
