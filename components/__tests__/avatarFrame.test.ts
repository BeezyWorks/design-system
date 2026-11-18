import {
  avatarFrameStyle,
  avatarFrameZoom,
  formatAvatarImage,
  parseAvatarImage,
  placeAvatarFrame,
} from '../Avatar/avatarFrame'

const src = 'https://example.com/me.jpg?s=80'

describe('placeAvatarFrame', () => {
  it('fills the circle with the short side at zoom 1', () => {
    expect(placeAvatarFrame(2, 1)).toEqual({width: 2, height: 1, x: 0, y: 0})
    expect(placeAvatarFrame(0.5, 1)).toEqual({width: 1, height: 2, x: 0, y: 0})
  })

  it('never leaves a gap in the circle', () => {
    expect(placeAvatarFrame(2, 1, 9, 9)).toEqual({
      width: 2,
      height: 1,
      x: 0.5,
      y: 0,
    })
    expect(placeAvatarFrame(1, 3, -9, 9)).toEqual({
      width: 3,
      height: 3,
      x: -1,
      y: 1,
    })
  })

  it('limits the zoom', () => {
    expect(avatarFrameZoom(placeAvatarFrame(1, 99))).toBe(5)
    expect(avatarFrameZoom(placeAvatarFrame(1, 0.1))).toBe(1)
  })
})

describe('avatar image links', () => {
  it('round-trips a frame', () => {
    const frame = placeAvatarFrame(1.5, 2, 0.25, -0.125)
    const link = formatAvatarImage(src, frame)
    expect(link).toBe(`${src}#frame=3,2,0.25,-0.125`)
    expect(parseAvatarImage(link)).toEqual({src, frame})
  })

  it('keeps an untouched picture a plain link', () => {
    expect(formatAvatarImage(src, placeAvatarFrame(1.5, 1))).toBe(src)
    expect(formatAvatarImage(src, null)).toBe(src)
    expect(parseAvatarImage(src)).toEqual({src, frame: null})
  })

  it('handles no link', () => {
    expect(parseAvatarImage(null)).toEqual({src: null, frame: null})
  })

  it('keeps a fragment that belongs to the image', () => {
    expect(parseAvatarImage(`${src}#top#frame=2,2,0,0`).src).toBe(`${src}#top`)
    expect(parseAvatarImage(`${src}#top`)).toEqual({
      src: `${src}#top`,
      frame: null,
    })
  })

  it.each(['', '1,1,0', 'a,b,c,d', '0.5,1,0,0', '2,2,,0', '9999,1,0,0'])(
    'ignores the bad frame %s but still finds the image',
    (text) => {
      expect(parseAvatarImage(`${src}#frame=${text}`)).toEqual({
        src,
        frame: null,
      })
    },
  )

  it('pulls an out-of-range position back into the circle', () => {
    expect(parseAvatarImage(`${src}#frame=2,1,5,5`).frame).toEqual({
      width: 2,
      height: 1,
      x: 0.5,
      y: 0,
    })
  })
})

describe('avatarFrameStyle', () => {
  it('centers the picture, then shifts it', () => {
    expect(
      avatarFrameStyle({width: 2, height: 1, x: 0.25, y: 0}, 100),
    ).toEqual({
      position: 'absolute',
      width: 200,
      height: 100,
      left: -50,
      top: 0,
      transform: [{translateX: 25}, {translateY: 0}],
    })
  })
})
