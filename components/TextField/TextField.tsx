import React from 'react'
import {TextInput, TextInputProps} from 'react-native'
import {useTypeStyle} from '../../typography'
import {SemanticColor} from '../../colors'
import {useColorResolver} from '../../theme'
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
    const resolve = useColorResolver()
    return (
      <Stack
        borderBottomWidth="hairline"
        borderColor={SemanticColor.BorderDefault}
        paddingVertical="sm"
      >
        <TextInput
          ref={ref}
          placeholderTextColor={resolve(SemanticColor.TextSecondary)}
          style={[type, {textAlign: align}]}
          {...inputProps}
        />
      </Stack>
    )
  },
)
