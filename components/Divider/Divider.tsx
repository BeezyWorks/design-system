import React from 'react'
import {StyleSheet} from 'react-native'
import {Stack} from '../Stack'
import {SemanticColor} from '../../colors'

export interface DividerProps {
  color?: SemanticColor
}

export const Divider: React.FunctionComponent<DividerProps> = ({
  color = SemanticColor.BorderDefault,
}) => (
  <Stack height={StyleSheet.hairlineWidth} width="100%" background={color} />
)
