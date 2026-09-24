import React from 'react'
import {StyleSheet, Text as RNText, View} from 'react-native'
import {EventCategory} from '../../colors'
import {useColors} from '../../colors/useColors'
import {EventDot} from '../EventDot'

export interface AgendaRowProps {
  name: string
  category: EventCategory
}

/** One event row in the Luach Agenda panel — the holiday/event name and its
 * category color dot (see `EventDot`). Always renders on the dark
 * kotel-photo hero (the panel forces the dark theme unconditionally),
 * independent of the app's actual setting. */
export const AgendaRow: React.FunctionComponent<AgendaRowProps> = ({
  name,
  category,
}) => {
  const colors = useColors()
  return (
    <View style={styles.row}>
      <RNText style={[styles.text, {color: colors.primaryTextColor}]}>
        {name}
      </RNText>
      <View style={styles.dot}>
        <EventDot category={category} size={10} />
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  row: {flexDirection: 'row', alignItems: 'center'},
  text: {fontSize: 16, padding: 8, textAlign: 'right', flex: 1},
  dot: {marginHorizontal: 8},
})
