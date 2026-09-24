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
  | 'multiline'
  | 'accessibilityLabel'
  | 'testID'
> {
  /** Default `left`. */
  align?: TextFieldAlign
  /** `underline` (default) — a single line on a hairline; `boxed` — a
   * bordered field on a quiet fill, for multi-line notes. */
  variant?: 'underline' | 'boxed'
}

/** A text input: by default a single line with an underline affordance
 * (the replacement for `react-native-elements`' `Input`); `boxed` for
 * free-form, multi-line text. */
export const TextField = React.forwardRef<TextInput, TextFieldProps>(
  ({align = 'left', variant = 'underline', ...inputProps}, ref) => {
    const type = useTypeStyle('body')
    const resolve = useColorResolver()
    if (variant === 'boxed') {
      return (
        <Stack
          borderWidth={1}
          borderColor={SemanticColor.BorderDefault}
          background={SemanticColor.SurfaceSelected}
          radius="sm"
          paddingHorizontal="sm"
          paddingVertical="xs"
          minHeight={inputProps.multiline ? 72 : undefined}
        >
          <TextInput
            ref={ref}
            placeholderTextColor={resolve(SemanticColor.TextSecondary)}
            textAlignVertical={inputProps.multiline ? 'top' : 'center'}
            style={[type, {textAlign: align, flexGrow: 1}]}
            {...inputProps}
          />
        </Stack>
      )
    }
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
