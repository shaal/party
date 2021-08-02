import { object, string } from 'zod'
import { Input } from '../ui/Input'
import { Form, useZodForm } from '../ui/Form'
import { gql, useMutation } from '@apollo/client'
import { ErrorMessage } from '../ui/ErrorMessage'
import { useAuthRedirect } from '../utils/useAuthRedirect'
import {
  LoginFormMutation,
  LoginFormMutationVariables
} from './__generated__/LoginForm.generated'
import Button from '../ui/Button'
import Link from 'next/link'
import React, { Fragment } from 'react'
import Navbar from '../ui/Navbar'
import { Card, CardBody } from '../ui/Card'

const loginSchema = object({
  email: string().email(),
  password: string().min(6)
})

export const LoginForm: React.FC = () => {
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
    <Fragment>
      <Navbar />
      <div className="flex flex-grow items-center justify-center px-4 sm:px-6 lg:px-8">
        <div className="max-w-md w-full space-y-8">
          <div>
            <h2 className="mt-6 text-center text-3xl font-extrabold">
              Login to your account
            </h2>
            <p className="mt-2 text-center text-sm text-gray-600">
              or{' '}
              <span className="text-blue-500">
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
                <ErrorMessage title="Login failed." error={loginResult.error} />
                <Input
                  label="Email"
                  type="email"
                  autoComplete="email"
                  placeholder="me@example.com"
                  autoFocus
                  {...form.register('email')}
                />
                <Input
                  label="Password"
                  type="password"
                  autoComplete="current-password"
                  placeholder="••••••••••"
                  {...form.register('password')}
                />
                <Button type="submit">Login</Button>
              </Form>
            </CardBody>
          </Card>
        </div>
      </div>
    </Fragment>
  )
}
