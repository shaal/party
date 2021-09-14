import { gql, useMutation } from '@apollo/client'
import { LogoutIcon } from '@heroicons/react/outline'
import React from 'react'
import { object, string } from 'zod'

import { Button } from '~/components/ui/Button'
import { ErrorMessage } from '~/components/ui/ErrorMessage'
import { Form, useZodForm } from '~/components/ui/Form'
import { Input } from '~/components/ui/Input'

import {
  LoginFormMutation,
  LoginFormMutationVariables
} from './__generated__/Form.generated'

const loginSchema = object({
  email: string().email(),
  password: string().min(6)
})

const LoginForm: React.FC = () => {
  const [login, loginResult] = useMutation<
    LoginFormMutation,
    LoginFormMutationVariables
  >(
    gql`
      mutation LoginFormMutation($input: LoginInput!) {
        login(input: $input) {
          id
        }
      }
    `,
    {
      onCompleted() {
        window.location.replace('/')
      }
    }
  )

  const form = useZodForm({
    schema: loginSchema
  })

  return (
    <Form
      form={form}
      onSubmit={({ email, password }) =>
        login({ variables: { input: { email, password } } })
      }
    >
      <ErrorMessage
        title="Login failed."
        error={loginResult.error}
        className="mb-3"
      />
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
          className=" w-full flex items-center justify-center space-x-1.5"
        >
          <LogoutIcon className="h-5 w-5" />
          <div>Login</div>
        </Button>
      </div>
    </Form>
  )
}

export default LoginForm
