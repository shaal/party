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
import { GridLayout } from '../ui/GridLayout'
import Button from '../ui/Button'
import Link from 'next/link'
import { Fragment } from 'react'
import Navbar from '../ui/Navbar'

const loginSchema = object({
  email: string().email(),
  password: string().min(6)
})

export function LoginForm() {
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
      <GridLayout>
        <div className="mb-4">
          <Link href="/signup">Don&rsquo;t have an account? Sign up.</Link>
        </div>

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
            autoFocus
            {...form.register('email')}
          />
          <Input
            label="Password"
            type="password"
            autoComplete="current-password"
            {...form.register('password')}
          />
          <Button type="submit">Login</Button>
        </Form>
      </GridLayout>
    </Fragment>
  )
}
