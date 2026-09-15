import React from 'react'
import {StyleSheet, Text, TouchableWithoutFeedback, View} from 'react-native'
import {useColors, Colors} from '../../colors'

export interface AlertCardProps {
  title?: string
  onDismissBackground: () => void
  children: React.ReactNode
}

// Shared scrim+centered-card shell behind both `AlertModalPresenter` (a
// message + action buttons) and `GenericAlertModalPresenter` (arbitrary
// content) — the two were previously near-identical copies of this same
// wrapper/card/header styling.
export const AlertCard: React.FunctionComponent<AlertCardProps> = ({
  title,
  onDismissBackground,
  children,
}) => {
  const colors = useColors()
  const styles = styleCreator(colors)
  return (
    <View style={styles.wrapper}>
      <TouchableWithoutFeedback onPress={onDismissBackground}>
        <View style={StyleSheet.absoluteFill} />
      </TouchableWithoutFeedback>
      <View style={styles.card}>
        {!!title && (
          <View style={styles.header}>
            <Text style={styles.headerText}>{title}</Text>
          </View>
        )}
        {children}
      </View>
    </View>
  )
}

const styleCreator = (colors: Colors) =>
  StyleSheet.create({
    wrapper: {
      ...StyleSheet.absoluteFill,
      backgroundColor: colors.scrimColor,
      alignItems: 'center',
    },
    card: {
      backgroundColor: colors.backgroundColor,
      marginTop: 260,
      borderRadius: 8,
      width: 250,
    },
    header: {
      padding: 16,
      borderBottomWidth: 1,
      borderBottomColor: colors.scrimColor,
    },
    headerText: {
      fontSize: 20,
      textAlign: 'center',
      fontWeight: 'bold',
      color: colors.secondaryTextColor,
    },
  })
