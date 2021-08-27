import { gql, useMutation } from '@apollo/client'
import React from 'react'
import { object, string } from 'zod'

import { Button } from '~/components/ui/Button'
import { Card, CardBody } from '~/components/ui/Card'
import { ErrorMessage } from '~/components/ui/ErrorMessage'
import { Form, useZodForm } from '~/components/ui/Form'
import { Input } from '~/components/ui/Input'
import { useAuthRedirect } from '~/components/utils/useAuthRedirect'

import {
  LoginFormMutation,
  LoginFormMutationVariables
} from './__generated__/Form.generated'

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
  )
}

export default LoginForm