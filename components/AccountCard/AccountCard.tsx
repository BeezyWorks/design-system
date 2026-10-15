import React from 'react'
import {SemanticColor} from '../../colors'
import {useRtl} from '../../layout'
import {Card} from '../Card'
import {Stack} from '../Stack'
import {Text} from '../Text'
import {Button} from '../Button'
import {Avatar} from '../Avatar'

export interface AccountUser {
  name?: string | null
  email: string
  image?: string | null
}

export type AccountStatusTone = 'neutral' | 'success' | 'warning'

export interface AccountCardProps {
  /** Signed in when present; otherwise the card invites signing in. */
  user?: AccountUser | null
  /** Signed in: one quiet line under the email ("Synced just now", "Update
   * the app to keep syncing"). */
  status?: string
  statusTone?: AccountStatusTone
  /** Signed in: actions under the identity row (sign out, delete…). */
  children?: React.ReactNode
  /** Signed out. */
  signInTitle?: string
  signInMessage?: string
  signInLabel?: string
  onSignIn?: () => void
}

const toneColor: Record<AccountStatusTone, SemanticColor> = {
  neutral: SemanticColor.TextSecondary,
  success: SemanticColor.TextSuccess,
  warning: SemanticColor.TextDanger,
}

/** The account entry at the top of a settings screen. Signed out: a short
 * pitch and a sign-in button. Signed in: avatar, name, email, an optional
 * sync status, and whatever actions the app passes as children. */
export const AccountCard: React.FunctionComponent<AccountCardProps> = ({
  user,
  status,
  statusTone = 'neutral',
  children,
  signInTitle = 'Sign in',
  signInMessage = 'Keep your settings safe and in sync across your devices.',
  signInLabel = 'Sign in',
  onSignIn,
}) => {
  const rtl = useRtl()
  const align = rtl ? 'right' : 'left'

  if (!user) {
    return (
      <Card gap="md">
        <Stack gap="xs">
          <Text variant="sectionHeader" align={align}>
            {signInTitle}
          </Text>
          <Text variant="body" secondary align={align}>
            {signInMessage}
          </Text>
        </Stack>
        <Button
          title={signInLabel}
          fullWidth
          onPress={onSignIn}
          testID="account-sign-in"
        />
      </Card>
    )
  }

  const displayName = user.name?.trim() || user.email
  return (
    <Card gap="md">
      <Stack direction={rtl ? 'rowReverse' : 'row'} align="center" gap="md">
        <Avatar name={user.name} email={user.email} imageUrl={user.image} />
        <Stack grow width={0} gap="none">
          <Text variant="headline" align={align} numberOfLines={1}>
            {displayName}
          </Text>
          {displayName !== user.email && (
            <Text variant="detail" secondary align={align} numberOfLines={1}>
              {user.email}
            </Text>
          )}
          {!!status && (
            <Text
              variant="caption"
              color={toneColor[statusTone]}
              align={align}
              testID="account-status"
            >
              {status}
            </Text>
          )}
        </Stack>
      </Stack>
      {children}
    </Card>
  )
}
