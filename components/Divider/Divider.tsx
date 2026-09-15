import React from 'react'
import {StyleSheet} from 'react-native'
import {Stack} from '../Stack'
import {Colors} from '../../colors'

export interface DividerProps {
  tone?: keyof Colors
}

export const Divider: React.FunctionComponent<DividerProps> = ({
  tone = 'border',
}) => <Stack height={StyleSheet.hairlineWidth} width="100%" background={tone} />
