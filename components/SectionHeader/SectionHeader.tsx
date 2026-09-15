import React from 'react'
import {View} from 'react-native'
import {layout} from '../../layout'
import {Text} from '../Text'

export interface SectionHeaderProps {
  /** Empty/omitted renders a blank spacer row — matches the davening
   * reader's "hide title when there's only one section" behavior while
   * still reserving the section's leading gap. */
  title?: string
}

/** The davening reader's section title — the gap above it is pinned to the
 * sticky header's height (`layout.headerHeight`) so a section landed on via
 * the section picker settles in just below the header instead of under it. */
export const SectionHeader: React.FunctionComponent<SectionHeaderProps> = ({
  title,
}) => (
  <View style={{marginTop: layout.headerHeight}}>
    <Text variant="bodyStrong" tone="primaryColor" align="right">
      {title}
    </Text>
  </View>
)
