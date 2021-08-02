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
    <GridLayout>
      <div className="mb-4">
        <Link href="/login">Already have an account? Log in.</Link>
      </div>

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
          autoFocus
          {...form.register('username')}
        />
        <Input
          label="Email"
          type="email"
          autoComplete="email"
          {...form.register('email')}
        />
        <Input
          label="Password"
          type="password"
          autoComplete="new-password"
          {...form.register('password')}
        />
        <Button type="submit">Sign Up</Button>
      </Form>
    </GridLayout>
  )
}
