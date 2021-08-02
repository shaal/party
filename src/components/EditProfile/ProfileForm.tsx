import { gql, useMutation } from '@apollo/client'
import { object, string } from 'zod'
import { ErrorMessage } from '../ui/ErrorMessage'
import { Form, useZodForm } from '../ui/Form'
import { Input } from '../ui/Input'
import { Link } from '../ui/Link'
import { SubmitButton } from '../ui/SubmitButton'
import { SuccessMessage } from '../ui/SuccessMessage'
import {
  ProfileFormMutation,
  ProfileFormMutationVariables,
  ProfileForm_User
} from './__generated__/ProfileForm.generated'

const editProfileSchema = object({
  name: string().min(1)
})

export const ProfileFormFragment = gql`
  fragment ProfileForm_user on User {
    id
    name
  }
`

interface Props {
  user: ProfileForm_User
}

export function ProfileForm({ user }: Props) {
  const [editUser, editUserResult] = useMutation<
    ProfileFormMutation,
    ProfileFormMutationVariables
  >(gql`
    mutation ProfileFormMutation($input: EditUserInput!) {
      editUser(input: $input) {
        id
        name
      }
    }
  `)

  const form = useZodForm({
    schema: editProfileSchema,
    defaultValues: {
      name: user.name
    }
  })

  return (
    <Form
      form={form}
      onSubmit={({ name }) => editUser({ variables: { input: { name } } })}
    >
      <ErrorMessage
        title="Error creating account"
        error={editUserResult.error}
      />

      {editUserResult.data && (
        <SuccessMessage>Profile successfully updated!</SuccessMessage>
      )}

      <Input
        label="Name"
        type="text"
        autoComplete="name"
        autoFocus
        {...form.register('name')}
      />

      <SubmitButton>Save Profile</SubmitButton>

      <Link href="/profile/change-password">
        Looking to change your password?
      </Link>
    </Form>
  )
}
