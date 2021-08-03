import { object, string } from 'zod'
import { Input } from '../ui/Input'
import { Form, useZodForm } from '../ui/Form'
import { useMutation, gql } from '@apollo/client'
import { ErrorMessage } from '../ui/ErrorMessage'
import { useAuthRedirect } from '../utils/useAuthRedirect'
import {
  SignUpFormMutation,
  SignUpFormMutationVariables
} from './__generated__/SignUpForm.generated'
import Button from '../ui/Button'
import Link from 'next/link'
import React from 'react'
import { Card, CardBody } from '../ui/Card'

const signUpSchema = object({
  username: string().min(2).max(30),
  email: string().email(),
  password: string().min(6)
})

export const SignUpForm: React.FC = () => {
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
            <span className="text-blue-500">
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
                <Button type="submit">Sign Up</Button>
              </div>
            </Form>
          </CardBody>
        </Card>
      </div>
    </div>
  )
}
