import React from 'react'
import {StyleSheet, View} from 'react-native'
import {BackgroundDarkDirty} from '../../colors'

export interface PanelGrid2x2Props {
  /** Top-right, top-left, bottom-right, bottom-left — RTL reading order,
   * since each row renders `row-reverse`. */
  children: [React.ReactNode, React.ReactNode, React.ReactNode, React.ReactNode]
}

// Tall enough for react-native-calendars to render a full 6-week month
// (header + weekday row + 6 day rows) without scrolling, and reused for the
// section's own vertical padding and the gap between panels — matches the
// original `PANEL_GRID_GAP`.
const GRID_GAP = 20

/** The iPad/wide Home screen's 2x2 grid of Dashboard/Zmanim/Calendar/Agenda
 * panels — full-bleed on a fixed-dark section background, RTL row ordering
 * so each row reads right-to-left like the rest of the app. */
export const PanelGrid2x2: React.FunctionComponent<PanelGrid2x2Props> = ({
  children,
}) => {
  const [a, b, c, d] = children
  return (
    <View style={styles.section}>
      <View style={styles.grid}>
        <View style={styles.row}>
          {a}
          {b}
        </View>
        <View style={styles.row}>
          {c}
          {d}
        </View>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  section: {backgroundColor: BackgroundDarkDirty, paddingVertical: GRID_GAP},
  grid: {gap: GRID_GAP},
  row: {flexDirection: 'row-reverse', gap: GRID_GAP},
})
