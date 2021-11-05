import { gql, useMutation } from '@apollo/client'
import { Button } from '@components/UI/Button'
import { ErrorMessage } from '@components/UI/ErrorMessage'
import { Form, useZodForm } from '@components/UI/Form'
import { Input } from '@components/UI/Input'
import { Spinner } from '@components/UI/Spinner'
import { useAuthRedirect } from '@components/utils/hooks/useAuthRedirect'
import {
  SignupMutation,
  SignupMutationVariables
} from '@graphql/types.generated'
import { UserAddIcon } from '@heroicons/react/outline'
import { useRouter } from 'next/router'
import React from 'react'

import { signUpSchema } from '../Signup/Form'

const InviteSignupForm: React.FC = () => {
  const authRedirect = useAuthRedirect()
  const router = useRouter()
  const [signUp, signUpResult] = useMutation<
    SignupMutation,
    SignupMutationVariables
  >(
    gql`
      mutation Signup($input: SignupInput!) {
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
    <Form
      form={form}
      onSubmit={({ username, email, password }) =>
        signUp({
          variables: {
            input: {
              username,
              email,
              password,
              invite: router.query.code as string
            }
          }
        })
      }
    >
      <ErrorMessage
        title="Error creating account"
        error={signUpResult.error}
        className="mb-3"
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
        <Button
          size="lg"
          type="submit"
          className=" w-full justify-center"
          icon={
            form.formState.isSubmitting ? (
              <Spinner size="xs" className="mr-1" />
            ) : (
              <UserAddIcon className="h-5 w-5" />
            )
          }
        >
          Sign Up
        </Button>
      </div>
    </Form>
  )
}

export default InviteSignupForm
