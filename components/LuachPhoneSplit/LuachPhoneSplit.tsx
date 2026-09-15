import React from 'react'
import {StyleSheet, View} from 'react-native'

export interface LuachPhoneSplitProps {
  top: React.ReactNode
  bottom: React.ReactNode
  /** `row` on landscape; `columnReverse` on Purim (so the pager sits above
   * the hero); `column` otherwise. */
  direction: 'column' | 'columnReverse' | 'row'
}

/** The phone Luach layout's hero/pager split — a 5:4 flex-weighted ratio
 * between the top chrome (compass/upcoming-button/flavor-text) and the
 * bottom panel pager. `Stack`'s `grow` is a uniform `flexGrow: 1` and can't
 * express this weighting, so the ratio lives here, as the one piece of the
 * phone layout that isn't expressible as `@design` tokens. */
export const LuachPhoneSplit: React.FunctionComponent<LuachPhoneSplitProps> = ({
  top,
  bottom,
  direction,
}) => (
  <View style={[styles.root, {flexDirection: flexDirectionFor(direction)}]}>
    <View style={styles.top}>{top}</View>
    <View style={styles.bottom}>{bottom}</View>
  </View>
)

const flexDirectionFor = (
  direction: LuachPhoneSplitProps['direction'],
): 'column' | 'column-reverse' | 'row' => {
  switch (direction) {
    case 'row':
      return 'row'
    case 'columnReverse':
      return 'column-reverse'
    default:
      return 'column'
  }
}

const styles = StyleSheet.create({
  root: {flex: 1},
  top: {flex: 5, alignItems: 'center', justifyContent: 'space-between'},
  bottom: {flex: 4},
})
