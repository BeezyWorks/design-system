import React from 'react'
import {act} from 'react-test-renderer'
import {renderWithTheme, themes} from '../../testing/renderWithTheme'
import {AccountCard} from '../AccountCard'
import {AuthForm} from '../AuthForm'
import {Avatar, avatarInitials} from '../Avatar'
import {ConfirmPrompt} from '../ConfirmPrompt'
import {ProviderButton} from '../ProviderButton'

const noop = () => {}
const resolved = () => Promise.resolve()
const user = {name: 'Rivka Cohen', email: 'rivka@example.com'}

describe.each(themes)('auth components (%s theme)', (theme) => {
  it.each(['google', 'apple'] as const)('ProviderButton %s', (provider) => {
    const r = renderWithTheme(
      <ProviderButton provider={provider} onPress={noop} />,
      theme,
    )
    expect(r.toJSON()).toMatchSnapshot()
  })

  it('AccountCard signed out', () => {
    const r = renderWithTheme(<AccountCard onSignIn={noop} />, theme)
    expect(r.toJSON()).toMatchSnapshot()
  })

  it('AccountCard signed in', () => {
    const r = renderWithTheme(
      <AccountCard user={user} status="Synced just now" />,
      theme,
    )
    expect(r.toJSON()).toMatchSnapshot()
  })

  it('AuthForm', () => {
    const r = renderWithTheme(
      <AuthForm
        providers={['apple', 'google']}
        onSignIn={resolved}
        onSignUp={resolved}
        onForgotPassword={resolved}
      />,
      theme,
    )
    expect(r.toJSON()).toMatchSnapshot()
  })

  it('ConfirmPrompt', () => {
    const r = renderWithTheme(
      <ConfirmPrompt
        title="Delete account?"
        message="This can't be undone."
        confirmLabel="Delete"
        destructive
        onConfirm={noop}
        onCancel={noop}
        secondaryAction={{title: 'Export settings', onPress: noop}}
      />,
      theme,
    )
    expect(r.toJSON()).toMatchSnapshot()
  })
})

describe('avatarInitials', () => {
  it('uses first and last word of the name', () => {
    expect(avatarInitials('rivka bas sarah cohen')).toBe('RC')
    expect(avatarInitials('Moshe')).toBe('M')
  })
  it('falls back to the email, then "?"', () => {
    expect(avatarInitials('  ', 'dovid@example.com')).toBe('D')
    expect(avatarInitials(null, null)).toBe('?')
  })
  it('renders initials without an image', () => {
    const r = renderWithTheme(<Avatar name="Rivka Cohen" />, 'light')
    expect(JSON.stringify(r.toJSON())).toContain('RC')
  })
})

describe('AuthForm behaviour', () => {
  const byTestID = (r: ReturnType<typeof renderWithTheme>, id: string) =>
    // The outermost (component) node carrying the testID — Button's
    // `onPress`, TextField's `onChangeText`.
    r.root.findAll(
      (n) => n.props.testID === id && typeof n.type !== 'string',
    )[0]

  it('validates before calling onSignIn', async () => {
    const onSignIn = jest.fn(resolved)
    const r = renderWithTheme(<AuthForm onSignIn={onSignIn} />, 'light')
    await act(async () => byTestID(r, 'auth-submit').props.onPress())
    expect(onSignIn).not.toHaveBeenCalled()
    expect(JSON.stringify(r.toJSON())).toContain('Enter a valid email address.')

    await act(async () => {
      byTestID(r, 'auth-email').props.onChangeText(' a@b.co ')
      byTestID(r, 'auth-password').props.onChangeText('short')
    })
    await act(async () => byTestID(r, 'auth-submit').props.onPress())
    expect(onSignIn).not.toHaveBeenCalled()
    expect(JSON.stringify(r.toJSON())).toContain('Use at least 8 characters.')

    await act(async () =>
      byTestID(r, 'auth-password').props.onChangeText('longenough'),
    )
    await act(async () => byTestID(r, 'auth-submit').props.onPress())
    expect(onSignIn).toHaveBeenCalledWith({
      email: 'a@b.co',
      password: 'longenough',
    })
  })

  it("shows a rejection's message", async () => {
    const onSignIn = jest.fn(() => Promise.reject(new Error('Wrong password')))
    const r = renderWithTheme(<AuthForm onSignIn={onSignIn} />, 'light')
    await act(async () => {
      byTestID(r, 'auth-email').props.onChangeText('a@b.co')
      byTestID(r, 'auth-password').props.onChangeText('longenough')
    })
    await act(async () => byTestID(r, 'auth-submit').props.onPress())
    expect(JSON.stringify(r.toJSON())).toContain('Wrong password')
  })
})
