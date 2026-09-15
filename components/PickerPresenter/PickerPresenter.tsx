import React, {useState} from 'react'
import {PickerModalConfig} from '@models'
import {FlatList, StyleSheet, Text} from 'react-native'
import {useModal} from '@modal'
import {Picker} from '@react-native-picker/picker'
import {useColors, Colors} from '../../colors'
import {Touchable} from '../Touchable'
import {Button} from '../Button'
import {Stack} from '../Stack'
import {BottomSheetModal} from '../BottomSheetModal'

export const PickerPresenter = <
  P extends string,
  T extends {label: string; key: P},
>({
  onSelect,
  options,
  title,
  selectedOptionKey,
  selectLabel = 'Select',
  display = 'list',
}: PickerModalConfig<P, T>) => {
  const {dismissModal} = useModal()
  const colors = useColors()
  const [selected, setSelected] = useState(selectedOptionKey)

  const itemSelected = (key: P) => () => {
    onSelect(key)
    dismissModal()
  }

  const styles = styleGenerator(colors)

  const ListPicker = (
    <FlatList
      data={options}
      renderItem={({item}) => {
        return (
          <Touchable onPress={itemSelected(item.key)}>
            <Text
              style={[
                styles.item,
                selectedOptionKey === item.key
                  ? styles.selectedItem
                  : undefined,
              ]}
            >
              {item.label}
            </Text>
          </Touchable>
        )
      }}
    />
  )

  const onWheelDone = () => {
    if (selected) onSelect(selected)
    dismissModal()
  }

  const WheelTypePicker = (
    <Stack paddingHorizontal="md">
      <Picker
        selectedValue={selected}
        onValueChange={setSelected}
        itemStyle={styles.iosWheelItem}
      >
        {options.map(({key, label}) => (
          <Picker.Item key={key} label={label} value={key} />
        ))}
      </Picker>
      <Button title={selectLabel} onPress={onWheelDone} />
    </Stack>
  )

  return (
    <BottomSheetModal
      title={title}
      children={display === 'list' ? ListPicker : WheelTypePicker}
    />
  )
}

const styleGenerator = (colors: Colors) =>
  StyleSheet.create({
    item: {
      fontSize: 20,
      textAlign: 'center',
      paddingVertical: 8,
      fontWeight: '100',
    },
    selectedItem: {
      color: colors.secondaryTextColor,
      fontWeight: 'bold',
      fontSize: 20,
    },
    iosWheelItem: {color: colors.primaryTextColor},
  })
