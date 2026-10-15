import React from 'react'
import {Image} from 'react-native'
import {SemanticColor} from '../../colors'
import {Stack} from '../Stack'
import {Text} from '../Text'

export interface AvatarProps {
  /** Used for the initials when there's no image (or it fails to load). */
  name?: string | null
  /** Falls back to `name` for the initials. */
  email?: string | null
  imageUrl?: string | null
  /** Diameter. Default 44. */
  size?: number
}

/** Up to two initials: first and last word of the name, else the first
 * letter of the email. */
export const avatarInitials = (name?: string | null, email?: string | null) => {
  const words = (name ?? '').trim().split(/\s+/).filter(Boolean)
  if (words.length) {
    const first = Array.from(words[0])[0] ?? ''
    const last = words.length > 1 ? Array.from(words[words.length - 1])[0] : ''
    return (first + (last ?? '')).toUpperCase()
  }
  return (Array.from((email ?? '').trim())[0] ?? '?').toUpperCase()
}

/** A round account picture, or the account's initials on the brand tint. */
export const Avatar: React.FunctionComponent<AvatarProps> = ({
  name,
  email,
  imageUrl,
  size = 44,
}) => {
  const [failed, setFailed] = React.useState(false)
  React.useEffect(() => setFailed(false), [imageUrl])
  const showImage = !!imageUrl && !failed
  return (
    <Stack
      width={size}
      height={size}
      radius="full"
      overflow="hidden"
      align="center"
      justify="center"
      background={SemanticColor.AccentTint}
    >
      {showImage ? (
        <Image
          source={{uri: imageUrl}}
          onError={() => setFailed(true)}
          style={{width: size, height: size}}
          accessibilityIgnoresInvertColors
        />
      ) : (
        <Text
          variant={size >= 56 ? 'titleLarge' : 'headline'}
          color={SemanticColor.TextAccent}
        >
          {avatarInitials(name, email)}
        </Text>
      )}
    </Stack>
  )
}
