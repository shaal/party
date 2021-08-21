import { gql, useMutation } from '@apollo/client'
import { Button } from '~/components/ui/Button'
import { Card, CardBody } from '~/components/ui/Card'
import { ErrorMessage } from '~/components/ui/ErrorMessage'
import { Form, useZodForm } from '~/components/ui/Form'
import { Input } from '~/components/ui/Input'
import { useAuthRedirect } from '~/components/utils/useAuthRedirect'
import Link from 'next/link'
import React from 'react'
import { object, string } from 'zod'

import {
  SignUpFormMutation,
  SignUpFormMutationVariables
} from './__generated__/SignUpForm.generated'

const signUpSchema = object({
  username: string().min(2).max(30),
  email: string().email(),
  password: string().min(6)
})

const SignUpForm: React.FC = () => {
  const authRedirect = useAuthRedirect()
  const [signUp, signUpResult] = useMutation<
    SignUpFormMutation,
    SignUpFormMutationVariables
  >(
    gql`
      mutation SignUpFormMutation($input: SignUpInput!) {
        signUp(input: $input) {
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
    schema: signUpSchema
  })

  return (
    <div className="flex flex-grow items-center justify-center px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold">
            Sign up your account
          </h2>
          <p className="mt-2 text-center text-sm text-gray-600">
            or{' '}
            <span className="text-indigo-500">
              <Link href="/login">login now</Link>
            </span>
          </p>
        </div>
        <Card>
          <CardBody>
            <Form
              form={form}
              onSubmit={({ username, email, password }) =>
                signUp({
                  variables: {
                    input: { username, email, password }
                  }
                })
              }
            >
              <ErrorMessage
                title="Error creating account"
                error={signUpResult.error}
                className="mb-2"
              />
              <div className="space-y-4">
                <div>
                  <Input
                    label="Username"
                    type="text"
                    autoComplete="username"
                    placeholder="johndoe"
                    autoFocus
                    {...form.register('username')}
                  />
                </div>
                <div>
                  <Input
                    label="Email"
                    type="email"
                    autoComplete="email"
                    placeholder="me@example.com"
                    {...form.register('email')}
                  />
                </div>
                <div>
                  <Input
                    label="Password"
                    type="password"
                    autoComplete="new-password"
                    placeholder="••••••••••"
                    {...form.register('password')}
                  />
                </div>
                <Button className="w-full" type="submit">
                  Sign Up
                </Button>
              </div>
            </Form>
          </CardBody>
        </Card>
      </div>
    </div>
  )
}

export default SignUpForm
