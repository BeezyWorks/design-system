import React from 'react'
import {View, StyleSheet} from 'react-native'
import {useColors, Colors} from '../../colors'

export const SlideIndicator = () => {
  const colors = useColors()
  const styles = styleCreator(colors)
  return <View style={styles.base} />
}

const styleCreator = (colors: Colors) =>
  StyleSheet.create({
    base: {
      backgroundColor: colors.secondaryTextColor,
      height: 5,
      width: 50,
      borderRadius: 2.5,
      alignSelf: 'center',
      marginTop: 8,
    },
  })
