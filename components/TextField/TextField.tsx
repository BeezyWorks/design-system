import React from 'react'
import {TextInput, TextInputProps} from 'react-native'
import {useTypeStyle} from '../../typography'
import {useColors, SemanticColor} from '../../colors'
import {Stack} from '../Stack'

export type TextFieldAlign = 'left' | 'right' | 'center'

export interface TextFieldProps extends Pick<
  TextInputProps,
  | 'placeholder'
  | 'value'
  | 'onChangeText'
  | 'onEndEditing'
  | 'autoFocus'
  | 'returnKeyType'
  | 'clearButtonMode'
  | 'testID'
> {
  /** Default `left`. */
  align?: TextFieldAlign
}

/** A single-line text input with an underline affordance — the design
 * system replacement for `react-native-elements`' `Input`. */
export const TextField = React.forwardRef<TextInput, TextFieldProps>(
  ({align = 'left', ...inputProps}, ref) => {
    const type = useTypeStyle('body')
    const colors = useColors()
    return (
      <Stack
        borderBottomWidth="hairline"
        borderColor={SemanticColor.BorderDefault}
        paddingVertical="sm"
      >
        <TextInput
          ref={ref}
          placeholderTextColor={colors.secondaryTextColor}
          style={[type, {textAlign: align}]}
          {...inputProps}
        />
      </Stack>
    )
  },
)
