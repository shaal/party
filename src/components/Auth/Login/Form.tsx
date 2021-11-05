import { gql, useMutation } from '@apollo/client'
import { Button } from '@components/UI/Button'
import { ErrorMessage } from '@components/UI/ErrorMessage'
import { Form, useZodForm } from '@components/UI/Form'
import { Input } from '@components/UI/Input'
import { Spinner } from '@components/UI/Spinner'
import { useAuthRedirect } from '@components/utils/hooks/useAuthRedirect'
import {
  LoginFormMutation,
  LoginFormMutationVariables
} from '@graphql/types.generated'
import { LogoutIcon } from '@heroicons/react/outline'
import dynamic from 'next/dynamic'
import { useRouter } from 'next/router'
import React from 'react'
import { object, string } from 'zod'

const LoginWithWallet = dynamic(() => import('./LoginWithWallet'), {
  loading: () => <div className="shimmer w-full h-10 rounded-lg" />
})
const LoginWithGitHub = dynamic(() => import('./LoginWithGitHub'), {
  loading: () => <div className="shimmer w-full h-10 rounded-lg" />
})

const loginSchema = object({
  email: string().email({ message: '📧 Invalid email' }),
  password: string().min(6, {
    message: '👀 Password should atleast have 6 characters'
  })
})

const LoginForm: React.FC = () => {
  const authRedirect = useAuthRedirect()
  const router = useRouter()
  const [login, loginResult] = useMutation<
    LoginFormMutation,
    LoginFormMutationVariables
  >(
    gql`
      mutation LoginForm($input: LoginInput!) {
        login(input: $input) {
          id
          inWaitlist
        }
      }
    `,
    {
      onCompleted(data) {
        if (data?.login?.inWaitlist) {
          router.push('/waitlist')
        } else {
          authRedirect()
        }
      }
    }
  )

  const form = useZodForm({
    schema: loginSchema
  })

  return (
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
        <Button
          size="lg"
          type="submit"
          className=" w-full justify-center"
          icon={
            form.formState.isSubmitting ? (
              <Spinner size="xs" className="mr-1" />
            ) : (
              <LogoutIcon className="h-5 w-5" />
            )
          }
        >
          Login
        </Button>
        <div className="grid grid-cols-2 gap-2">
          <LoginWithWallet />
          <LoginWithGitHub />
        </div>
      </div>
    </Form>
  )
}

export default LoginForm
