import React, {useState} from 'react'
import {Platform, TextInput, TextInputProps} from 'react-native'
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
    const [focused, setFocused] = useState(false)
    return (
      <Stack
        direction="row"
        align="center"
        gap="sm"
        radius="full"
        paddingHorizontal="md"
        background={SemanticColor.SurfaceSelected}
        // Focus shows on the pill itself (the browser's ring would draw a box
        // around just the text inside it); the border is always there, so
        // focusing doesn't shift the content.
        borderWidth={1.5}
        borderColor={
          focused ? SemanticColor.AccentPrimary : SemanticColor.SurfaceSelected
        }
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
          style={[type, {flex: 1, paddingVertical: 10}, webNoOutline]}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
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

// The pill draws focus instead (see above).
const webNoOutline =
  Platform.OS === 'web' ? ({outlineStyle: 'none'} as object) : undefined
