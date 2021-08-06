import { gql, useMutation } from '@apollo/client'
import Link from 'next/link'
import React from 'react'
import { object, string } from 'zod'

import { User } from '~/__generated__/schema.generated'

import { Button } from '../ui/Button'
import { ErrorMessage } from '../ui/ErrorMessage'
import { Form, useZodForm } from '../ui/Form'
import { Input } from '../ui/Input'
import { SuccessMessage } from '../ui/SuccessMessage'
import {
  ProfileFormMutation,
  ProfileFormMutationVariables
} from './__generated__/ProfileForm.generated'

const editProfileSchema = object({
  username: string().min(1)
})

interface Props {
  user: User
}

const ProfileForm: React.FC<Props> = ({ user }) => {
  const [editUser, editUserResult] = useMutation<
    ProfileFormMutation,
    ProfileFormMutationVariables
  >(gql`
    mutation ProfileFormMutation($input: EditUserInput!) {
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

      <Link href="/settings/change-password">
        Looking to change your password?
      </Link>
    </Form>
  )
}

export default ProfileForm
