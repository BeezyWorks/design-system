import React from 'react'
import {StyleSheet} from 'react-native'
import {GestureHandlerRootView} from 'react-native-gesture-handler'
import {SafeAreaProvider} from 'react-native-safe-area-context'
import {DesignSystemProvider, DesignSystemProviderProps} from '../../theme'

/** The app root in one element: gesture handling (which `Slider` needs),
 * safe-area insets (which `Screen` reads) and `DesignSystemProvider`. Mount
 * it once, at the top of the app, in place of wiring the three by hand —
 * it keeps the root views' `flex: 1` inside the design system. */
export const DesignSystemRoot: React.FunctionComponent<
  DesignSystemProviderProps
> = ({children, ...providerProps}) => (
  <GestureHandlerRootView style={styles.root}>
    <SafeAreaProvider>
      <DesignSystemProvider {...providerProps}>{children}</DesignSystemProvider>
    </SafeAreaProvider>
  </GestureHandlerRootView>
)

const styles = StyleSheet.create({root: {flex: 1}})
