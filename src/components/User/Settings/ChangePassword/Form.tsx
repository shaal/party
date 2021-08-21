import { gql, useMutation } from '@apollo/client'
import { Button } from '@components/ui/Button'
import { ErrorMessage } from '@components/ui/ErrorMessage'
import { Form, useZodForm } from '@components/ui/Form'
import { Input } from '@components/ui/Input'
import { SuccessMessage } from '@components/ui/SuccessMessage'
import { useRouter } from 'next/router'
import React from 'react'
import { object, string } from 'zod'

import {
  ChangePasswordMutation,
  ChangePasswordMutationVariables
} from './__generated__/Form.generated'

const changePasswordSchema = object({
  currentPassword: string().min(6),
  newPassword: string().min(6),
  confirmNewPassword: string().min(6)
}).refine((data) => data.newPassword === data.confirmNewPassword, {
  message: 'Passwords do not match',
  path: ['confirmNewPassword']
})

const ChangePasswordForm: React.FC = () => {
  const router = useRouter()
  const [changePassword, changePasswordResult] = useMutation<
    ChangePasswordMutation,
    ChangePasswordMutationVariables
  >(
    gql`
      mutation ChangePasswordMutation($input: ChangePasswordInput!) {
        changePassword(input: $input)
      }
    `,
    {
      onCompleted() {
        router.push('/login')
      }
    }
  )

  const form = useZodForm({ schema: changePasswordSchema })

  return (
    <Form
      form={form}
      className="space-y-4"
      onSubmit={({ currentPassword, newPassword }) =>
        changePassword({
          variables: { input: { currentPassword, newPassword } }
        })
      }
    >
      <ErrorMessage
        title="Failed to change password"
        error={changePasswordResult.error}
      />

      {changePasswordResult.data && (
        <SuccessMessage>Password has been changed!</SuccessMessage>
      )}

      <Input
        label="Current Password"
        type="password"
        autoComplete="current-password"
        {...form.register('currentPassword')}
      />
      <Input
        label="New Password"
        type="password"
        autoComplete="new-password"
        {...form.register('newPassword')}
      />
      <Input
        label="Confirm New Password"
        type="password"
        autoComplete="new-password"
        {...form.register('confirmNewPassword')}
      />
      <div className="ml-auto">
        <Button type="submit">Change Password</Button>
      </div>
    </Form>
  )
}

export default ChangePasswordForm
