import React from 'react'
import {StyleSheet, Text, TouchableWithoutFeedback, View} from 'react-native'
import {SemanticColor} from '../../colors'
import {useColorResolver, ColorResolver} from '../../theme'

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
  const resolve = useColorResolver()
  const styles = styleCreator(resolve)
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

const styleCreator = (resolve: ColorResolver) =>
  StyleSheet.create({
    wrapper: {
      ...StyleSheet.absoluteFill,
      backgroundColor: resolve(SemanticColor.OverlayScrim),
      alignItems: 'center',
    },
    card: {
      backgroundColor: resolve(SemanticColor.SurfaceBackground),
      marginTop: 260,
      borderRadius: 8,
      width: 250,
    },
    header: {
      padding: 16,
      borderBottomWidth: 1,
      borderBottomColor: resolve(SemanticColor.BorderStrong),
    },
    headerText: {
      fontSize: 20,
      textAlign: 'center',
      fontWeight: 'bold',
      color: resolve(SemanticColor.TextSecondary),
    },
  })
