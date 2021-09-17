import { gql, useMutation } from '@apollo/client'
import { Button } from '@components/ui/Button'
import { ErrorMessage } from '@components/ui/ErrorMessage'
import { Form, useZodForm } from '@components/ui/Form'
import { Input } from '@components/ui/Input'
import { SuccessMessage } from '@components/ui/SuccessMessage'
import { UserAddIcon } from '@heroicons/react/outline'
import React, { useState } from 'react'
import { object, string } from 'zod'

import Waitlist from '../Waitlist'
import {
  JoinWaitlistFormMutation,
  JoinWaitlistFormMutationVariables
} from './__generated__/Form.generated'

export const signUpSchema = object({
  username: string()
    .min(2, { message: 'Username should atleast have 2 characters' })
    .max(30, { message: 'Useranme should be within 30 characters' })
    .regex(/^[a-z0-9_\.]+$/, { message: '👤 Invalid username' }),
  email: string().email({ message: '📧 Invalid email' }),
  password: string().min(6, {
    message: '👀 Password should atleast have 6 characters'
  })
})

const SUCCESS_MESSAGE = 'Hang tight - you’re currently on the waitlist now 🎉'

const SignupForm: React.FC = () => {
  const [showModal, setShowModal] = useState<boolean>(false)
  const [signUp, signUpResult] = useMutation<
    JoinWaitlistFormMutation,
    JoinWaitlistFormMutationVariables
  >(
    gql`
      mutation JoinWaitlistFormMutation($input: JoinWaitlistInput!) {
        joinWaitlist(input: $input) {
          id
          inWaitlist
        }
      }
    `,
    {
      onCompleted() {
        setShowModal(true)
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
            input: { username, email, password }
          }
        })
      }
    >
      <ErrorMessage
        title="Error creating account"
        error={signUpResult.error}
        className="mb-3"
      />
      {signUpResult.data && (
        <SuccessMessage className="mb-3">{SUCCESS_MESSAGE}</SuccessMessage>
      )}
      {showModal && (
        <Waitlist showModal={showModal} setShowModal={setShowModal} />
      )}
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
          className=" w-full flex items-center justify-center space-x-1.5"
        >
          <UserAddIcon className="h-5 w-5" />
          <div>Join Waitlist</div>
        </Button>
      </div>
    </Form>
  )
}

export default SignupForm
