import { gql, useMutation } from '@apollo/client'
import Link from 'next/link'
import React from 'react'
import { object, string } from 'zod'

import { User } from '~/__generated__/schema.generated'
import { Button } from '~/components/ui/Button'
import { ErrorMessage } from '~/components/ui/ErrorMessage'
import { Form, useZodForm } from '~/components/ui/Form'
import { Input } from '~/components/ui/Input'
import { SuccessMessage } from '~/components/ui/SuccessMessage'

import {
  AccountSettingsMutation,
  AccountSettingsMutationVariables
} from './__generated__/Form.generated'

const editProfileSchema = object({
  username: string().min(1)
})

interface Props {
  user: User
}

const AccountSettingsForm: React.FC<Props> = ({ user }) => {
  const [editUser, editUserResult] = useMutation<
    AccountSettingsMutation,
    AccountSettingsMutationVariables
  >(gql`
    mutation AccountSettingsMutation($input: EditUserInput!) {
      editUser(input: $input) {
        id
        username
      }
    }
  `)

  const form = useZodForm({
    schema: editProfileSchema,
    defaultValues: {
      username: user.username
    }
  })

  return (
    <Form
      form={form}
      onSubmit={({ username }) =>
        editUser({ variables: { input: { username } } })
      }
    >
      <ErrorMessage
        title="Error creating account"
        error={editUserResult.error}
      />

      {editUserResult.data && (
        <SuccessMessage>Profile successfully updated!</SuccessMessage>
      )}

      <Input
        label="Username"
        type="text"
        autoComplete="username"
        autoFocus
        {...form.register('username')}
      />

      <Button type="submit">Save Profile</Button>

      <Link href="/settings/change-password">Change password?</Link>
    </Form>
  )
}

export default AccountSettingsForm
