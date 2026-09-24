import React from 'react'
import {StyleSheet, Text as RNText, View} from 'react-native'
import {useColors} from '../../colors/useColors'

export interface ZmanimRowProps {
  time: string
  label: string
  /** Dims the row once its zman has already passed. */
  past?: boolean
}

/** One row in the Luach Zmanim panel — time on one side, label on the
 * other. Always renders on the dark kotel-photo hero (the panel forces the
 * dark theme unconditionally), independent of the app's actual setting. */
export const ZmanimRow: React.FunctionComponent<ZmanimRowProps> = ({
  time,
  label,
  past,
}) => {
  const colors = useColors()
  const labelColor = past ? colors.secondaryTextColor : colors.primaryTextColor
  return (
    <View style={styles.row}>
      <RNText style={[styles.text, {color: colors.primaryTextColor}]}>
        {time}
      </RNText>
      <RNText
        style={[
          styles.text,
          past ? styles.pastTitle : styles.title,
          {color: labelColor},
        ]}
      >
        {label}
      </RNText>
    </View>
  )
}

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignSelf: 'stretch',
    paddingVertical: 4,
  },
  text: {fontSize: 18, paddingVertical: 4},
  title: {fontWeight: 'bold'},
  pastTitle: {fontWeight: 'normal'},
})
