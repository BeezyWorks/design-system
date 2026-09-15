import React from 'react'
import {ScrollView, StyleSheet} from 'react-native'

export interface PanelScrollProps {
  children?: React.ReactNode
  /** Centers short content vertically instead of stacking it at the top —
   * used by the Dashboard panel. */
  centerContent?: boolean
  paddingVertical?: number
  paddingHorizontal?: number
  paddingBottom?: number
}

/** A `flex: 1` scrollable panel — the shared fill behavior every Luach
 * swiper/grid panel (Dashboard, Zmanim, Agenda, the wide-grid page itself)
 * needs so its content scrolls within a fixed-height box instead of the box
 * growing to fit it. Unlike `ScrollStack`, this also takes numeric padding,
 * since these panels' padding comes from device-specific runtime values
 * (safe-area/tab-bar clearance), not the spacing scale. */
export const PanelScroll: React.FunctionComponent<PanelScrollProps> = ({
  children,
  centerContent,
  paddingVertical,
  paddingHorizontal,
  paddingBottom,
}) => (
  <ScrollView
    style={styles.scroll}
    contentContainerStyle={[
      centerContent ? styles.centered : undefined,
      {paddingVertical, paddingHorizontal, paddingBottom},
    ]}
  >
    {children}
  </ScrollView>
)

const styles = StyleSheet.create({
  scroll: {flex: 1},
  centered: {justifyContent: 'center', flexGrow: 1},
})
