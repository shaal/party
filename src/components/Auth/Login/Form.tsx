import { gql, useMutation } from '@apollo/client'
import { Button } from '@components/ui/Button'
import { ErrorMessage } from '@components/ui/ErrorMessage'
import { Form, useZodForm } from '@components/ui/Form'
import { Input } from '@components/ui/Input'
import { Spinner } from '@components/ui/Spinner'
import { useAuthRedirect } from '@components/utils/useAuthRedirect'
import { LogoutIcon } from '@heroicons/react/outline'
import mixpanel from 'mixpanel-browser'
import dynamic from 'next/dynamic'
import React, { useState } from 'react'
import { object, string } from 'zod'

import Waitlist from '../Waitlist'
import {
  LoginFormMutation,
  LoginFormMutationVariables
} from './__generated__/Form.generated'

const LoginWithWallet = dynamic(() => import('./LoginWithWallet'), {
  loading: () => <div className="shimmer w-full h-10 rounded-lg" />
})
const LoginWithGitHub = dynamic(() => import('./LoginWithGitHub'), {
  loading: () => <div className="shimmer w-full h-10 rounded-lg" />
})

const loginSchema = object({
  email: string().email({ message: '📧 Invalid email' }),
  password: string().min(6, {
    message: '👀 Password should atleast have 6 characters'
  })
})

const LoginForm: React.FC = () => {
  const [showModal, setShowModal] = useState<boolean>(false)
  const authRedirect = useAuthRedirect()
  const [login, loginResult] = useMutation<
    LoginFormMutation,
    LoginFormMutationVariables
  >(
    gql`
      mutation LoginFormMutation($input: LoginInput!) {
        login(input: $input) {
          id
          inWaitlist
        }
      }
    `,
    {
      onError() {
        mixpanel.track('login.email.failed')
      },
      onCompleted(data) {
        mixpanel.track('login.email.success')
        if (data?.login?.inWaitlist) {
          setShowModal(true)
        } else {
          authRedirect()
        }
      }
    }
  )

  const form = useZodForm({
    schema: loginSchema
  })

  return (
    <Form
      form={form}
      onSubmit={({ email, password }) => {
        mixpanel.track('login.email.click')
        login({ variables: { input: { email, password } } })
      }}
    >
      <ErrorMessage
        title="Login failed."
        error={loginResult.error}
        className="mb-3"
      />
      {showModal && (
        <Waitlist showModal={showModal} setShowModal={setShowModal} />
      )}
      <div className="space-y-4">
        <div>
          <Input
            label="Email"
            type="email"
            autoComplete="email"
            placeholder="me@example.com"
            autoFocus
            {...form.register('email')}
          />
        </div>
        <div>
          <Input
            label="Password"
            type="password"
            autoComplete="current-password"
            placeholder="••••••••••"
            {...form.register('password')}
          />
        </div>
        <Button
          size="lg"
          type="submit"
          className=" w-full justify-center"
          icon={
            form.formState.isSubmitting ? (
              <Spinner size="xs" className="mr-1" />
            ) : (
              <LogoutIcon className="h-5 w-5" />
            )
          }
        >
          Login
        </Button>
        <div className="grid grid-cols-2 gap-2">
          <LoginWithWallet />
          <LoginWithGitHub />
        </div>
      </div>
    </Form>
  )
}

export default LoginForm
