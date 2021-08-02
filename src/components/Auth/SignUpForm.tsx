import { object, string } from 'zod'
import { Container } from '../ui/Container'
import { Input } from '../ui/Input'
import { SubmitButton } from '../ui/SubmitButton'
import { Form, useZodForm } from '../ui/Form'
import { useMutation, gql } from '@apollo/client'
import { ErrorMessage } from '../ui/ErrorMessage'
import { Link } from '../ui/Link'
import { useAuthRedirect } from '../utils/useAuthRedirect'
import {
  SignUpFormMutation,
  SignUpFormMutationVariables
} from './__generated__/SignUpForm.generated'

const signUpSchema = object({
  name: string().min(1),
  email: string().email(),
  password: string().min(6),
  confirmPassword: string().min(6)
}).refine((data) => data.password === data.confirmPassword, {
  message: 'Passwords do not match',
  path: ['confirmPassword']
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
    <Container title="Sign Up">
      <div className="mb-4">
        <Link href="/login" preserveRedirect>
          Already have an account? Log in.
        </Link>
      </div>

      <Form
        form={form}
        onSubmit={({ name, email, password }) =>
          signUp({
            variables: {
              input: { name, email, password }
            }
          })
        }
      >
        <ErrorMessage
          title="Error creating account"
          error={signUpResult.error}
        />

        <Input
          label="Name"
          type="text"
          autoComplete="name"
          autoFocus
          {...form.register('name')}
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
        <Input
          label="Confirm Password"
          type="password"
          autoComplete="new-password"
          {...form.register('confirmPassword')}
        />
        <SubmitButton>Sign Up</SubmitButton>
      </Form>
    </Container>
  )
}
