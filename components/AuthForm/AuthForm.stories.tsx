import React from 'react'
import type {Meta, StoryObj} from '@storybook/react-native-web-vite'
import {Stack} from '../Stack'
import {AuthForm} from './AuthForm'

const wait = (ms: number) =>
  new Promise<void>((resolve) => setTimeout(resolve, ms))

const meta = {
  title: 'Auth/AuthForm',
  component: AuthForm,
  parameters: {layout: 'padded'},
  decorators: [
    (Story) => (
      <Stack maxWidth={420}>
        <Story />
      </Stack>
    ),
  ],
  args: {
    providers: ['apple', 'google'],
    onProvider: () => wait(800),
    onSignIn: async () => {
      await wait(800)
      throw new Error('That email and password don’t match.')
    },
    onSignUp: () => wait(800),
    onForgotPassword: () => wait(800),
  },
} satisfies Meta<typeof AuthForm>
export default meta
type Story = StoryObj<typeof meta>

export const SignIn: Story = {}
export const SignUp: Story = {args: {initialMode: 'signUp'}}
export const ForgotPassword: Story = {args: {initialMode: 'forgotPassword'}}
export const EmailOnly: Story = {args: {providers: [], onSignUp: undefined}}
