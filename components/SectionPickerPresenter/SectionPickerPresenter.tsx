import React from 'react'
import {SectionpickerModalConfig} from '@models'
import {FlatList, StyleSheet, Text, TouchableOpacity} from 'react-native'
import {useModal} from '@modal'
import {useColors, Colors} from '../../colors'
import {BottomSheetModal} from '../BottomSheetModal'

export const SectionPickerPresenter = ({
  onSelect,
  currentKey,
  data,
}: SectionpickerModalConfig) => {
  const {dismissModal} = useModal()
  const colors = useColors()

  const itemSelected = (key: string) => () => {
    onSelect(key)
    dismissModal()
  }

  const styles = styleGenerator(colors)

  const Picker = (
    <FlatList
      overScrollMode="never"
      bounces={false}
      data={data}
      renderItem={({item, index}) => (
        <TouchableOpacity onPress={itemSelected(item.key)} key={index}>
          <Text
            style={[
              styles.text,
              item.key === currentKey ? styles.selectedText : undefined,
            ]}
          >
            {item.label}
          </Text>
        </TouchableOpacity>
      )}
    />
  )

  return <BottomSheetModal children={Picker} />
}

const styleGenerator = (colors: Colors) =>
  StyleSheet.create({
    text: {
      color: colors.primaryTextColor,
      textAlign: 'center',
      fontSize: 20,
      paddingVertical: 8,
      alignSelf: 'stretch',
    },
    selectedText: {
      color: colors.primaryColor,
    },
  })
