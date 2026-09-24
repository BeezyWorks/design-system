import React from 'react'
import {TextInput, TextInputProps} from 'react-native'
import {useTypeStyle} from '../../typography'
import {SemanticColor} from '../../colors'
import {useColorResolver} from '../../theme'
import {Stack} from '../Stack'
import {Icon} from '../Icon'
import {IconButton} from '../IconButton'

export interface SearchFieldProps extends Pick<
  TextInputProps,
  'placeholder' | 'value' | 'onChangeText' | 'autoFocus' | 'testID'
> {
  /** Announced by screen readers for the field. */
  accessibilityLabel?: string
  /** Label for the clear button. Default `Clear search`. */
  clearLabel?: string
}

/** A pill-shaped search input: a leading magnifier, the query, and a clear
 * button that appears once there is text. Controlled — filter your list from
 * `value`. */
export const SearchField = React.forwardRef<TextInput, SearchFieldProps>(
  (
    {value, onChangeText, clearLabel = 'Clear search', ...inputProps},
    ref,
  ) => {
    const type = useTypeStyle('body')
    const resolve = useColorResolver()
    return (
      <Stack
        direction="row"
        align="center"
        gap="sm"
        radius="full"
        paddingHorizontal="md"
        background={SemanticColor.SurfaceSelected}
      >
        <Icon name="search" size={18} color={SemanticColor.TextSecondary} />
        <TextInput
          ref={ref}
          value={value}
          onChangeText={onChangeText}
          placeholderTextColor={resolve(SemanticColor.TextSecondary)}
          returnKeyType="search"
          autoCapitalize="none"
          autoCorrect={false}
          clearButtonMode="never"
          style={[type, {flex: 1, paddingVertical: 10}]}
          {...inputProps}
        />
        {!!value && (
          <IconButton
            name="close"
            size={16}
            padding="xs"
            color={SemanticColor.TextSecondary}
            accessibilityLabel={clearLabel}
            onPress={() => onChangeText?.('')}
          />
        )}
      </Stack>
    )
  },
)
