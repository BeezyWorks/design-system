import React from 'react'
import {ZmanimModalConfig} from '@models'
import {getHebrewDate} from '@selectors'
import {useSelector} from 'state/store'
import {FlatList} from 'react-native-gesture-handler'
import {StyleSheet, Text, View} from 'react-native'
import moment from 'moment'
import {zmanimNames} from 'siddurCalendar/zmanim/zman.model'
import {formatHebrewDate} from 'siddurCalendar/hebrewDate.class'
import {useTranslation} from 'translation/translation.hook'
import {getValuesForZmanim} from 'siddurCalendar/zmanim/zman.calculator'
import {useColors, Colors} from '../../colors'
import {BottomSheetModal} from '../BottomSheetModal'

export const ZmanSheetPresenter = ({zmanim}: ZmanimModalConfig) => {
  const hebcal = useSelector(getHebrewDate)
  const colors = useColors()
  const now = moment()
  const styles = styleCreator(colors)
  const {formatTime, translateSheet} = useTranslation()
  const labels = translateSheet(zmanimNames, false)
  const ZmanList = (
    <FlatList
      data={getValuesForZmanim(zmanim, hebcal)}
      renderItem={({item: zman}) => (
        <View style={styles.row} key={zman.key}>
          <Text style={[styles.text]}>{formatTime(zman.date)}</Text>
          <Text
            style={[
              styles.text,
              styles.title,
              zman.date.isBefore(now) ? styles.pastZman : undefined,
            ]}
          >
            {labels[zman.key]}
          </Text>
        </View>
      )}
    />
  )

  return (
    <BottomSheetModal
      title={formatHebrewDate(hebcal.date)}
      children={ZmanList}
    />
  )
}

const styleCreator = (colors: Colors) =>
  StyleSheet.create({
    row: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      paddingVertical: 4,
      paddingHorizontal: 16,
      alignSelf: 'stretch',
    },
    text: {fontSize: 18, color: colors.primaryTextColor, paddingVertical: 4},
    title: {fontWeight: 'bold', color: colors.primaryTextColor},
    pastZman: {color: colors.secondaryTextColor, fontWeight: 'normal'},
  })
