import React from 'react'
import {useModal} from '@modal'
import {
  AlertModalConfig,
  getActionColor,
  getActionLabel,
  isActionButton,
} from '@models'
import {StyleSheet, Text, View} from 'react-native'
import {useColors, Colors} from '../../colors/useColors'
import {AlertCard} from '../AlertCard'

export const AlertModalPresenter = ({
  message,
  title,
  primaryAction,
  secondaryAction,
}: AlertModalConfig) => {
  const {removeModal} = useModal()
  const colors = useColors()
  const styles = styleCreator(colors)

  const primaryButtonPress = () => {
    if (isActionButton(primaryAction)) {
      primaryAction.action()
    }
    removeModal()
  }
  const secondaryButtonPress = () => {
    if (isActionButton(secondaryAction)) {
      secondaryAction.action()
    }
    removeModal()
  }

  return (
    <AlertCard title={title} onDismissBackground={removeModal}>
      <Text style={styles.body}>{message}</Text>
      <View style={styles.buttonBox}>
        {secondaryAction && (
          <Text
            style={[
              styles.button,
              styles.secondaryButton,
              getActionColor(secondaryAction)
                ? {color: getActionColor(secondaryAction)}
                : undefined,
            ]}
            onPress={secondaryButtonPress}
          >
            {getActionLabel(secondaryAction)}
          </Text>
        )}
        {primaryAction && (
          <Text
            style={[
              styles.button,
              getActionColor(primaryAction)
                ? {color: getActionColor(primaryAction)}
                : undefined,
            ]}
            onPress={primaryButtonPress}
          >
            {getActionLabel(primaryAction)}
          </Text>
        )}
      </View>
    </AlertCard>
  )
}

const styleCreator = (colors: Colors) =>
  StyleSheet.create({
    body: {padding: 16, textAlign: 'center', fontSize: 16},
    buttonBox: {
      flexDirection: 'row',
      alignItems: 'stretch',
      justifyContent: 'center',
      paddingBottom: 8,
    },
    button: {
      flex: 1,
      color: colors.primaryColor,
      fontWeight: '500',
      fontSize: 18,
      textAlign: 'center',
      textAlignVertical: 'center',
      padding: 8,
    },
    secondaryButton: {color: colors.secondaryTextColor},
  })
