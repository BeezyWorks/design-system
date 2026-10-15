import React from 'react'
import {SemanticColor} from '../../colors'
import {useRtl} from '../../layout'
import {Stack} from '../Stack'
import {Text} from '../Text'
import {TextField} from '../TextField'
import {Button} from '../Button'
import {Divider} from '../Divider'
import {Icon} from '../Icon'
import {AuthProvider, ProviderButton} from '../ProviderButton'

export type AuthFormMode = 'signIn' | 'signUp' | 'forgotPassword'

export interface AuthFormStrings {
  signInTitle: string
  signUpTitle: string
  forgotPasswordTitle: string
  forgotPasswordBody: string
  continueWithGoogle: string
  continueWithApple: string
  or: string
  name: string
  email: string
  password: string
  signIn: string
  signUp: string
  sendResetLink: string
  forgotPassword: string
  noAccount: string
  haveAccount: string
  backToSignIn: string
  checkEmailTitle: string
  /** `{email}` is replaced with the address. */
  verifyEmailBody: string
  /** `{email}` is replaced with the address. */
  resetEmailBody: string
  invalidEmail: string
  /** `{min}` is replaced with the minimum length. */
  passwordTooShort: string
  nameRequired: string
  genericError: string
}

export const defaultAuthFormStrings: AuthFormStrings = {
  signInTitle: 'Sign in',
  signUpTitle: 'Create an account',
  forgotPasswordTitle: 'Reset your password',
  forgotPasswordBody:
    "Enter your account's email and we'll send you a link to choose a new password.",
  continueWithGoogle: 'Continue with Google',
  continueWithApple: 'Continue with Apple',
  or: 'or',
  name: 'Name',
  email: 'Email',
  password: 'Password',
  signIn: 'Sign in',
  signUp: 'Create account',
  sendResetLink: 'Send reset link',
  forgotPassword: 'Forgot password?',
  noAccount: "Don't have an account? Create one",
  haveAccount: 'Already have an account? Sign in',
  backToSignIn: 'Back to sign in',
  checkEmailTitle: 'Check your email',
  verifyEmailBody:
    'We sent a link to {email}. Open it to verify your account, then sign in.',
  resetEmailBody:
    'If {email} has an account, a link to reset its password is on its way.',
  invalidEmail: 'Enter a valid email address.',
  passwordTooShort: 'Use at least {min} characters.',
  nameRequired: 'Enter your name.',
  genericError: 'Something went wrong. Please try again.',
}

export interface AuthFormProps {
  /** Social providers to offer, in order. Omit or empty for email only. */
  providers?: AuthProvider[]
  onProvider?: (provider: AuthProvider) => Promise<void> | void
  onSignIn: (credentials: {email: string; password: string}) => Promise<void>
  /** Omit to hide sign-up. Resolving shows the "check your email" state. */
  onSignUp?: (details: {
    name: string
    email: string
    password: string
  }) => Promise<void>
  /** Omit to hide "Forgot password?". Resolving shows "check your email". */
  onForgotPassword?: (email: string) => Promise<void>
  initialMode?: AuthFormMode
  /** Translations; anything missing falls back to English. */
  strings?: Partial<AuthFormStrings>
  /** Default 8 (Better Auth's default). */
  minPasswordLength?: number
  /** Above the title — an app mark, a reason to sign in. */
  header?: React.ReactNode
}

type Busy = AuthProvider | 'email' | null
type Sent = {kind: 'verify' | 'reset'; email: string} | null

const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

const fill = (template: string, values: Record<string, string | number>) =>
  template.replace(/\{(\w+)\}/g, (match, key) =>
    key in values ? String(values[key]) : match,
  )

/** The whole sign-in surface: provider buttons, then email + password, with
 * sign-up, "forgot password" and a "check your email" confirmation. No
 * networking — every action is a promise the app supplies. While one runs
 * the form is busy; if it rejects, the rejection's `message` is shown (so
 * throw an already-translated message), else `genericError`. Successful
 * sign-in is the app's to handle (it'll usually navigate away). */
export const AuthForm: React.FunctionComponent<AuthFormProps> = ({
  providers = [],
  onProvider,
  onSignIn,
  onSignUp,
  onForgotPassword,
  initialMode = 'signIn',
  strings: stringOverrides,
  minPasswordLength = 8,
  header,
}) => {
  const strings = {...defaultAuthFormStrings, ...stringOverrides}
  const rtl = useRtl()
  const align = rtl ? 'right' : 'left'
  const [mode, setMode] = React.useState<AuthFormMode>(initialMode)
  const [name, setName] = React.useState('')
  const [email, setEmail] = React.useState('')
  const [password, setPassword] = React.useState('')
  const [busy, setBusy] = React.useState<Busy>(null)
  const [error, setError] = React.useState<string | null>(null)
  const [sent, setSent] = React.useState<Sent>(null)
  const mounted = React.useRef(true)
  React.useEffect(
    () => () => {
      mounted.current = false
    },
    [],
  )

  const switchMode = (next: AuthFormMode) => {
    setMode(next)
    setError(null)
    setSent(null)
  }

  const run = async (
    which: Exclude<Busy, null>,
    action: () => Promise<void>,
  ) => {
    setBusy(which)
    setError(null)
    try {
      await action()
    } catch (e) {
      if (mounted.current)
        setError(
          e instanceof Error && e.message ? e.message : strings.genericError,
        )
    } finally {
      if (mounted.current) setBusy(null)
    }
  }

  const trimmedEmail = email.trim()
  const validate = (): string | null => {
    if (mode === 'signUp' && !name.trim()) return strings.nameRequired
    if (!EMAIL.test(trimmedEmail)) return strings.invalidEmail
    if (mode !== 'forgotPassword' && password.length < minPasswordLength)
      return fill(strings.passwordTooShort, {min: minPasswordLength})
    return null
  }

  const submit = () => {
    if (busy) return
    const problem = validate()
    if (problem) {
      setError(problem)
      return
    }
    run('email', async () => {
      if (mode === 'signIn') {
        await onSignIn({email: trimmedEmail, password})
      } else if (mode === 'signUp' && onSignUp) {
        await onSignUp({name: name.trim(), email: trimmedEmail, password})
        if (mounted.current) setSent({kind: 'verify', email: trimmedEmail})
      } else if (mode === 'forgotPassword' && onForgotPassword) {
        await onForgotPassword(trimmedEmail)
        if (mounted.current) setSent({kind: 'reset', email: trimmedEmail})
      }
    })
  }

  if (sent) {
    return (
      <Stack gap="md" align="center" paddingVertical="lg">
        <Stack
          width={56}
          height={56}
          radius="full"
          align="center"
          justify="center"
          background={SemanticColor.AccentTint}
        >
          <Icon name="mail" size={26} color={SemanticColor.TextAccent} />
        </Stack>
        <Text variant="title" align="center">
          {strings.checkEmailTitle}
        </Text>
        <Text variant="body" secondary align="center">
          {fill(
            sent.kind === 'verify'
              ? strings.verifyEmailBody
              : strings.resetEmailBody,
            {email: sent.email},
          )}
        </Text>
        <Button
          title={strings.backToSignIn}
          variant="ghost"
          onPress={() => {
            setPassword('')
            switchMode('signIn')
          }}
        />
      </Stack>
    )
  }

  const title =
    mode === 'signIn'
      ? strings.signInTitle
      : mode === 'signUp'
        ? strings.signUpTitle
        : strings.forgotPasswordTitle
  const showProviders = mode !== 'forgotPassword' && providers.length > 0
  const submitTitle =
    mode === 'signIn'
      ? strings.signIn
      : mode === 'signUp'
        ? strings.signUp
        : strings.sendResetLink

  return (
    <Stack gap="lg">
      {header}
      <Stack gap="xs">
        <Text variant="titleLarge" align={align}>
          {title}
        </Text>
        {mode === 'forgotPassword' && (
          <Text variant="body" secondary align={align}>
            {strings.forgotPasswordBody}
          </Text>
        )}
      </Stack>

      {showProviders && (
        <>
          <Stack gap="sm">
            {providers.map((provider) => (
              <ProviderButton
                key={provider}
                provider={provider}
                label={
                  provider === 'google'
                    ? strings.continueWithGoogle
                    : strings.continueWithApple
                }
                loading={busy === provider}
                disabled={!!busy && busy !== provider}
                onPress={() =>
                  run(provider, async () => {
                    await onProvider?.(provider)
                  })
                }
                testID={`auth-provider-${provider}`}
              />
            ))}
          </Stack>
          <Stack direction="row" align="center" gap="sm">
            <Stack grow width={0}>
              <Divider />
            </Stack>
            <Text variant="caption" secondary>
              {strings.or}
            </Text>
            <Stack grow width={0}>
              <Divider />
            </Stack>
          </Stack>
        </>
      )}

      <Stack gap="md">
        {mode === 'signUp' && (
          <Field label={strings.name} align={align}>
            <TextField
              variant="boxed"
              size="lg"
              align={align}
              value={name}
              onChangeText={setName}
              autoComplete="name"
              textContentType="name"
              autoCapitalize="words"
              returnKeyType="next"
              accessibilityLabel={strings.name}
              testID="auth-name"
            />
          </Field>
        )}
        <Field label={strings.email} align={align}>
          <TextField
            variant="boxed"
            size="lg"
            align="left"
            value={email}
            onChangeText={setEmail}
            autoComplete="email"
            textContentType={mode === 'signIn' ? 'username' : 'emailAddress'}
            keyboardType="email-address"
            autoCapitalize="none"
            autoCorrect={false}
            returnKeyType={mode === 'forgotPassword' ? 'send' : 'next'}
            onSubmitEditing={mode === 'forgotPassword' ? submit : undefined}
            accessibilityLabel={strings.email}
            testID="auth-email"
          />
        </Field>
        {mode !== 'forgotPassword' && (
          <Field label={strings.password} align={align}>
            <TextField
              variant="boxed"
              size="lg"
              align="left"
              value={password}
              onChangeText={setPassword}
              secureTextEntry
              autoComplete={
                mode === 'signUp' ? 'new-password' : 'current-password'
              }
              textContentType={mode === 'signUp' ? 'newPassword' : 'password'}
              autoCapitalize="none"
              autoCorrect={false}
              returnKeyType="go"
              onSubmitEditing={submit}
              accessibilityLabel={strings.password}
              testID="auth-password"
            />
          </Field>
        )}
        {!!error && (
          <Text
            variant="detail"
            color={SemanticColor.TextDanger}
            align={align}
            testID="auth-error"
          >
            {error}
          </Text>
        )}
        <Button
          title={submitTitle}
          size="lg"
          fullWidth
          loading={busy === 'email'}
          disabled={!!busy && busy !== 'email'}
          onPress={submit}
          testID="auth-submit"
        />
      </Stack>

      <Stack gap="xs" align="center">
        {mode === 'signIn' && onForgotPassword && (
          <Button
            title={strings.forgotPassword}
            variant="ghost"
            size="sm"
            disabled={!!busy}
            onPress={() => switchMode('forgotPassword')}
          />
        )}
        {mode === 'signIn' && onSignUp && (
          <Button
            title={strings.noAccount}
            variant="ghost"
            size="sm"
            disabled={!!busy}
            onPress={() => switchMode('signUp')}
          />
        )}
        {mode !== 'signIn' && (
          <Button
            title={
              mode === 'signUp' ? strings.haveAccount : strings.backToSignIn
            }
            variant="ghost"
            size="sm"
            disabled={!!busy}
            onPress={() => switchMode('signIn')}
          />
        )}
      </Stack>
    </Stack>
  )
}

const Field: React.FunctionComponent<{
  label: string
  align: 'left' | 'right'
  children: React.ReactNode
}> = ({label, align, children}) => (
  <Stack gap="xs">
    <Text variant="label" secondary align={align}>
      {label}
    </Text>
    {children}
  </Stack>
)
