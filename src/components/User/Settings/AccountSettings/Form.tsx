import { gql, useMutation } from '@apollo/client'
import Link from 'next/link'
import React, { useEffect, useState } from 'react'
import { object, string } from 'zod'

import { User } from '../../../../__generated__/schema.generated'
import { Button } from '../../../ui/Button'
import { ErrorMessage } from '../../../ui/ErrorMessage'
import { Form, useZodForm } from '../../../ui/Form'
import { Input } from '../../../ui/Input'
import { SuccessMessage } from '../../../ui/SuccessMessage'
import { TextArea } from '../../../ui/TextArea'
import { uploadToIPFS } from '../../../utils/uploadToIPFS'
import {
  AccountSettingsMutation,
  AccountSettingsMutationVariables
} from './__generated__/Form.generated'

const editProfileSchema = object({
  username: string().min(1),
  email: string().email().min(1),
  name: string().min(1),
  bio: string().max(255).nullable(),
  location: string().max(50).nullable(),
  avatar: string()
})

interface Props {
  user: User
}

const AccountSettingsForm: React.FC<Props> = ({ user }) => {
  const [avatar, setAvatar] = useState<string>()
  const [cover, setCover] = useState<string>()
  const [editUser, editUserResult] = useMutation<
    AccountSettingsMutation,
    AccountSettingsMutationVariables
  >(gql`
    mutation AccountSettingsMutation($input: EditUserInput!) {
      editUser(input: $input) {
        id
        username
        email
        profile {
          id
          name
          bio
          location
          avatar
          cover
        }
      }
    }
  `)

  useEffect(() => {
    if (user?.profile?.avatar) setAvatar(user?.profile?.avatar)
    if (user?.profile?.cover) setCover(user?.profile?.cover)
  }, [])

  const handleUpload = async (evt: any, type: string) => {
    evt.preventDefault()
    // setLoading({ type, status: true })

    try {
      const cdnURL = await uploadToIPFS(evt.target.files)
      type === 'avatar' ? setAvatar(cdnURL) : setCover(cdnURL)
    } finally {
      // setLoading({ type, status: false })
    }
  }

  const form = useZodForm({
    schema: editProfileSchema,
    defaultValues: {
      username: user.username,
      email: user.email as string,
      name: user.profile.name,
      bio: user.profile.bio as string,
      location: user.profile.location as string,
      avatar: user.profile.avatar as string
    }
  })

  return (
    <Form
      form={form}
      className="space-y-4"
      onSubmit={({ username, email, name, bio, location }) =>
        editUser({
          variables: {
            input: {
              username,
              email,
              name,
              bio: bio as string,
              location: location as string,
              avatar: avatar as string,
              cover: cover as string
            }
          }
        })
      }
    >
      <ErrorMessage
        title="Error creating account"
        error={editUserResult.error}
      />
      {editUserResult.data && (
        <SuccessMessage>Profile successfully updated!</SuccessMessage>
      )}
      <Input label="ID" type="text" value={user?.id} disabled />
      <Input
        label="Username"
        type="text"
        placeholder="johndoe"
        {...form.register('username')}
      />
      <Input
        label="Email"
        type="email"
        placeholder="johndoe@example.com"
        {...form.register('email')}
      />
      <Input
        label="Name"
        type="text"
        placeholder="John Doe"
        {...form.register('name')}
      />
      <TextArea
        label="Bio"
        placeholder="Tell us about yourself!"
        {...form.register('bio')}
      />
      <Input
        label="Location"
        type="text"
        placeholder="Czech Republic"
        {...form.register('location')}
      />
      <div className="space-y-1.5">
        <label>Avatar</label>
        <div className="flex items-center gap-3">
          <img className="rounded-full h-24 w-24" src={avatar} alt={avatar} />
          <input type="file" onChange={(evt) => handleUpload(evt, 'avatar')} />
        </div>
      </div>
      <div className="space-y-1.5">
        <label>Cover</label>
        <div className="space-y-3">
          {cover && (
            <div>
              <img
                className="rounded-lg object-cover bg-gradient-to-r from-blue-500 to-purple-500 h-60 w-full"
                src={cover}
                alt={cover}
              />
            </div>
          )}
          <input type="file" onChange={(evt) => handleUpload(evt, 'cover')} />
        </div>
      </div>

      <div className="flex items-center justify-between pt-3">
        <Link href="/settings/change-password">Change password?</Link>
        <Button type="submit">Save</Button>
      </div>
    </Form>
  )
}

export default AccountSettingsForm
