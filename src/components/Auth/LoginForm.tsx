import { gql, useMutation } from '@apollo/client'
import { Button } from '@components/ui/Button'
import { Card, CardBody } from '@components/ui/Card'
import { ErrorMessage } from '@components/ui/ErrorMessage'
import { Form, useZodForm } from '@components/ui/Form'
import { Input } from '@components/ui/Input'
import { useAuthRedirect } from '@components/utils/useAuthRedirect'
import Link from 'next/link'
import React from 'react'
import { object, string } from 'zod'

import {
  LoginFormMutation,
  LoginFormMutationVariables
} from './__generated__/LoginForm.generated'

const loginSchema = object({
  email: string().email(),
  password: string().min(6)
})

const LoginForm: React.FC = () => {
  const authRedirect = useAuthRedirect()
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
        authRedirect()
      }
    }
  )

  const form = useZodForm({
    schema: loginSchema
  })

  return (
    <div className="flex flex-grow items-center justify-center px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold">
            Login to your account
          </h2>
          <p className="mt-2 text-center text-sm text-gray-600">
            or{' '}
            <span className="text-indigo-500">
              <Link href="/signup">sign up now</Link>
            </span>
          </p>
        </div>
        <Card>
          <CardBody>
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
                <Button className="w-full" type="submit">
                  Login
                </Button>
              </div>
            </Form>
          </CardBody>
        </Card>
      </div>
    </div>
  )
}

export default LoginForm
