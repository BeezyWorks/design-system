import React from 'react'
import {Image} from 'react-native'
import {SemanticColor} from '../../colors'
import {RadiusToken} from '../../radius'
import {avatarInitials} from '../Avatar'
import {Icon, IconName} from '../Icon'
import {Stack} from '../Stack'
import {Text} from '../Text'

export interface ArtworkProps {
  /** The picture's URL. When missing or it fails to load, the placeholder
   * shows. */
  imageUrl?: string | null
  /** Initials for the placeholder (and its accessibility label). Without
   * it the placeholder is `placeholderIcon`. */
  name?: string | null
  /** Side length. Default 44. */
  size?: number
  /** Corner radius. Default `sm`; `md` from 64 up looks proportionate. */
  radius?: RadiusToken
  /** The placeholder glyph when there is no `name`. Default `headphones`. */
  placeholderIcon?: IconName
}

/** A square cover picture — a podcast, a book — with rounded corners and a
 * placeholder (the name's initials, else an icon) on the brand tint. The
 * square sibling of the round `Avatar`. */
export const Artwork: React.FunctionComponent<ArtworkProps> = ({
  imageUrl,
  name,
  size = 44,
  radius = 'sm',
  placeholderIcon = 'headphones',
}) => {
  const [failed, setFailed] = React.useState(false)
  React.useEffect(() => setFailed(false), [imageUrl])
  const showImage = !!imageUrl && !failed
  const initials = name ? avatarInitials(name) : ''
  return (
    <Stack
      width={size}
      height={size}
      radius={radius}
      overflow="hidden"
      align="center"
      justify="center"
      background={SemanticColor.AccentTint}
      accessibilityLabel={name ?? undefined}
    >
      {showImage ? (
        <Image
          source={{uri: imageUrl}}
          onError={() => setFailed(true)}
          style={{width: size, height: size}}
          accessibilityIgnoresInvertColors
        />
      ) : initials ? (
        <Text
          variant={size >= 56 ? 'titleLarge' : 'headline'}
          color={SemanticColor.TextAccent}
        >
          {initials}
        </Text>
      ) : (
        <Icon
          name={placeholderIcon}
          size={Math.round(size * 0.5)}
          color={SemanticColor.TextAccent}
        />
      )}
    </Stack>
  )
}
