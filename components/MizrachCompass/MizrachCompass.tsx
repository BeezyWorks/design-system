import React from 'react'
import {View} from 'react-native'
import {TouchableWithoutFeedback} from 'react-native-gesture-handler'
import {Icon} from '../Icon'

export interface MizrachCompassProps {
  /** Degrees to rotate the needle toward the mizrach/Jerusalem bearing. */
  rotation: number
  onPress: () => void
}

/** The mizrach/Jerusalem-direction compass needle. Unlike the rest of
 * `@design`, it genuinely needs a raw numeric `transform` — it spins
 * continuously as the device heading changes, which the `Stack` token API
 * has no declarative prop for — so that one style value lives here rather
 * than in a token. */
export const MizrachCompass: React.FunctionComponent<MizrachCompassProps> = ({
  rotation,
  onPress,
}) => (
  <TouchableWithoutFeedback onPress={onPress}>
    <View style={{transform: [{rotate: `${rotation}deg`}]}}>
      <Icon name="navigation" size={30} />
    </View>
  </TouchableWithoutFeedback>
)
