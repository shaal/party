import { gql, useMutation } from '@apollo/client'
import React from 'react'
import { object, string } from 'zod'

import { GridLayout } from '~/components/GridLayout'
import { Button } from '~/components/ui/Button'
import { ErrorMessage } from '~/components/ui/ErrorMessage'
import { Form, useZodForm } from '~/components/ui/Form'
import { Input } from '~/components/ui/Input'
import { SuccessMessage } from '~/components/ui/SuccessMessage'

import {
  ChangePasswordMutation,
  ChangePasswordMutationVariables
} from './__generated__/ChangePassword.generated'

const changePasswordSchema = object({
  currentPassword: string().min(6),
  newPassword: string().min(6),
  confirmNewPassword: string().min(6)
}).refine((data) => data.newPassword === data.confirmNewPassword, {
  message: 'Passwords do not match',
  path: ['confirmNewPassword']
})

const ChangePassword: React.FC = () => {
  const [changePassword, changePasswordResult] = useMutation<
    ChangePasswordMutation,
    ChangePasswordMutationVariables
  >(gql`
    mutation ChangePasswordMutation($input: ChangePasswordInput!) {
      changePassword(input: $input)
    }
  `)

  const form = useZodForm({ schema: changePasswordSchema })

  return (
    <GridLayout>
      <Form
        form={form}
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
        <Button type="submit">Change Password</Button>
      </Form>
    </GridLayout>
  )
}

export default ChangePassword
