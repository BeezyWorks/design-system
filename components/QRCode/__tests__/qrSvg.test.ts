import {qrSvgString} from '../qrSvg'

const parts = {
  path: 'M0 0h1v1h-1z',
  viewBox: 29,
  quietZone: 4,
  color: 'brown',
  background: 'white',
}

it('draws a plain code without a logo', () => {
  const svg = qrSvgString(parts, 512)
  expect(svg).toContain('viewBox="0 0 29 29"')
  expect(svg).toContain('width="512"')
  expect(svg).not.toContain('<image')
})

it('embeds the logo on a plate and escapes the href', () => {
  const svg = qrSvgString(
    {...parts, plate: {from: 11, modules: 7}, logoHref: 'data:x;a="b"&c'},
    256,
  )
  expect(svg).toContain('<image')
  expect(svg).toContain('href="data:x;a=&quot;b&quot;&amp;c"')
})
