import React from 'react'
import {ImageBackground, ImageSourcePropType, StyleSheet} from 'react-native'
import {LinearGradient} from 'expo-linear-gradient'
import {SemanticColor} from '../../colors'
import {RadiusToken} from '../../radius'
import {useColorResolver} from '../../theme'
import {Stack} from '../Stack'

export interface PhotoBackgroundProps {
  /** The photo (a `require`d asset or a `{uri}`). */
  source: ImageSourcePropType
  children?: React.ReactNode
  /** Default `100%`. */
  width?: number | `${number}%`
  /** Default `100%`. */
  height?: number | `${number}%`
  radius?: RadiusToken
  /** Hangs the photo upside down. */
  flipped?: boolean
}

// Where the scrim is lightest: the middle of the photo, between the text
// at the top and the glass at the bottom.
const SCRIM_LOCATIONS = [0, 0.32, 0.55, 1] as const

/** A full-bleed photo for a hero or a whole home screen, under a
 * top-to-bottom scrim: darker at the top and bottom where text and glass
 * sit, lighter through the middle so the photo still shows. The same in
 * every mode; set text over it with `Text`'s `onPhoto` and panels with
 * `GlassSurface`. The `style`/`colors` props are those libraries' own
 * contracts, derived from tokens here — not a style escape hatch. */
export const PhotoBackground: React.FunctionComponent<PhotoBackgroundProps> = ({
  source,
  children,
  width = '100%',
  height = '100%',
  radius,
  flipped,
}) => {
  const resolve = useColorResolver()
  return (
    <Stack
      width={width}
      height={height}
      radius={radius}
      overflow={radius ? 'hidden' : undefined}
    >
      <ImageBackground
        source={source}
        style={styles.image}
        imageStyle={flipped ? styles.flipped : undefined}
      >
        <LinearGradient
          colors={[
            resolve(SemanticColor.OverlayPhotoScrim),
            resolve(SemanticColor.OverlayScrimSoft),
            resolve(SemanticColor.OverlayScrimSoft),
            resolve(SemanticColor.OverlayPhotoScrim),
          ]}
          locations={SCRIM_LOCATIONS}
          style={styles.overlay}
        />
        {children}
      </ImageBackground>
    </Stack>
  )
}

const styles = StyleSheet.create({
  overlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    pointerEvents: 'none',
  },
  image: {flex: 1, width: '100%', height: '100%'},
  flipped: {transform: [{rotate: '180deg'}]},
})
