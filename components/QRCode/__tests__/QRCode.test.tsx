import React from 'react'
import {renderWithTheme} from '../../../testing/renderWithTheme'
import {QRCode} from '../QRCode'

it('renders with and without a logo', () => {
  const logo = {uri: 'https://example.com/logo.png'}
  const withLogo = renderWithTheme(
    <QRCode value="https://siddur.one" logo={logo} />,
  )
  const plain = renderWithTheme(
    <QRCode value="https://siddur.one" logo={false} />,
  )
  expect(withLogo.toJSON()).toBeTruthy()
  expect(JSON.stringify(withLogo.toJSON())).toContain('logo.png')
  expect(JSON.stringify(plain.toJSON())).not.toContain('logo.png')
})
