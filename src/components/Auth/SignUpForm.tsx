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
import { GridLayout } from '../ui/GridLayout'
import Button from '../ui/Button'
import Link from 'next/link'
import { Fragment } from 'react'
import Navbar from '../ui/Navbar'
import { Card, CardBody } from '../ui/Card'

const signUpSchema = object({
  username: string().min(2).max(30),
  email: string().email(),
  password: string().min(6)
})

export function SignUpForm() {
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
    <Fragment>
      <Navbar />
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
                <Input
                  label="Username"
                  type="text"
                  autoComplete="username"
                  placeholder="johndoe"
                  autoFocus
                  {...form.register('username')}
                />
                <Input
                  label="Email"
                  type="email"
                  autoComplete="email"
                  placeholder="me@example.com"
                  {...form.register('email')}
                />
                <Input
                  label="Password"
                  type="password"
                  autoComplete="new-password"
                  placeholder="••••••••••"
                  {...form.register('password')}
                />
                <Button type="submit">Sign Up</Button>
              </Form>
            </CardBody>
          </Card>
        </div>
      </div>
    </Fragment>
  )
}
