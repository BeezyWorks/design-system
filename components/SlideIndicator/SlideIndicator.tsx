import React from 'react'
import {View, StyleSheet} from 'react-native'
import {SemanticColor} from '../../colors'
import {useColorResolver, ColorResolver} from '../../theme'

export const SlideIndicator = () => {
  const resolve = useColorResolver()
  const styles = styleCreator(resolve)
  return <View style={styles.base} />
}

const styleCreator = (resolve: ColorResolver) =>
  StyleSheet.create({
    base: {
      backgroundColor: resolve(SemanticColor.TextSecondary),
      height: 5,
      width: 50,
      borderRadius: 2.5,
      alignSelf: 'center',
      marginTop: 8,
    },
  })
