import { gql, useMutation } from '@apollo/client'
import Link from 'next/link'
import React, { useEffect, useState } from 'react'
import toast from 'react-hot-toast'
import { object, string } from 'zod'

import { User } from '~/__generated__/schema.generated'
import {
  GridItemEight,
  GridItemFour,
  GridLayout
} from '~/components/GridLayout'
import { Button } from '~/components/ui/Button'
import { Card, CardBody } from '~/components/ui/Card'
import { ErrorMessage } from '~/components/ui/ErrorMessage'
import { Form, useZodForm } from '~/components/ui/Form'
import { Input } from '~/components/ui/Input'
import { SuccessMessage } from '~/components/ui/SuccessMessage'
import { TextArea } from '~/components/ui/TextArea'
import { uploadToIPFS } from '~/components/utils/uploadToIPFS'

import Sidebar from '../Sidebar'
import {
  ProfileSettingsMutation,
  ProfileSettingsMutationVariables,
  RegenerateInviteMutation,
  RegenerateInviteMutationVariables
} from './__generated__/Form.generated'

const editProfileSchema = object({
  username: string().min(1),
  name: string().min(1),
  bio: string().max(255).nullable(),
  location: string().max(50).nullable(),
  avatar: string()
})

interface Props {
  currentUser: User
}

const SUCCESS_MESSAGE = 'Profile successfully updated!'

const ProfileSettingsForm: React.FC<Props> = ({ currentUser }) => {
  const [avatar, setAvatar] = useState<string>()
  const [cover, setCover] = useState<string>()
  const [editUser, editUserResult] = useMutation<
    ProfileSettingsMutation,
    ProfileSettingsMutationVariables
  >(
    gql`
      mutation ProfileSettingsMutation($input: EditUserInput!) {
        editUser(input: $input) {
          id
          username
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
    `,
    {
      onCompleted() {
        toast.success(SUCCESS_MESSAGE)
      }
    }
  )

  const [regenerateInvite] = useMutation<
    RegenerateInviteMutation,
    RegenerateInviteMutationVariables
  >(
    gql`
      mutation RegenerateInviteMutation {
        regenerateInvite {
          id
          code
          usedTimes
        }
      }
    `,
    {
      onError() {
        toast.error('Something went wrong!')
      },
      onCompleted() {
        toast.success('Invite code regenerated successfully!')
      }
    }
  )

  useEffect(() => {
    if (currentUser?.profile?.avatar) setAvatar(currentUser?.profile?.avatar)
    if (currentUser?.profile?.cover) setCover(currentUser?.profile?.cover)
  }, [currentUser])

  const handleUpload = async (evt: any, type: string) => {
    evt.preventDefault()
    // setLoading({ type, status: true })

    try {
      const attachment = await uploadToIPFS(evt.target.files)
      type === 'avatar' ? setAvatar(attachment.url) : setCover(attachment.url)
    } finally {
      // setLoading({ type, status: false })
    }
  }

  const form = useZodForm({
    schema: editProfileSchema,
    defaultValues: {
      username: currentUser.username,
      name: currentUser.profile.name,
      bio: currentUser.profile.bio as string,
      location: currentUser.profile.location as string,
      avatar: currentUser.profile.avatar as string
    }
  })

  return (
    <GridLayout>
      <GridItemFour>
        <Sidebar />
      </GridItemFour>
      <GridItemEight>
        <Card className="mb-4">
          <CardBody>
            <Form
              form={form}
              className="space-y-4"
              onSubmit={({ username, name, bio, location }) =>
                editUser({
                  variables: {
                    input: {
                      username,
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
                title="Error updating profile"
                error={editUserResult.error}
              />
              {editUserResult.data && (
                <SuccessMessage>{SUCCESS_MESSAGE}</SuccessMessage>
              )}
              <Input label="ID" type="text" value={currentUser?.id} disabled />
              <Input
                label="Email"
                type="email"
                value={currentUser?.email}
                disabled
              />
              <Input
                label="Username"
                type="text"
                placeholder="johndoe"
                {...form.register('username')}
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
                  <img
                    className="rounded-full h-24 w-24"
                    src={avatar}
                    alt={avatar}
                  />
                  <input
                    type="file"
                    onChange={(evt) => handleUpload(evt, 'avatar')}
                  />
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
                  <input
                    type="file"
                    onChange={(evt) => handleUpload(evt, 'cover')}
                  />
                </div>
              </div>

              <div className="flex items-center justify-between pt-3">
                <Link href="/settings/password">Change password?</Link>
                <Button type="submit">Save</Button>
              </div>
            </Form>
          </CardBody>
        </Card>
        <Card>
          <CardBody>
            <div className="text-xl font-bold mb-2">Invite</div>
            <div className="flex items-center justify-between">
              <div className="font-mono font-bold">
                {currentUser?.invite?.code}
              </div>
              <div className="flex items-center space-x-2">
                <div>
                  You invited{' '}
                  <span className="font-bold">
                    {currentUser?.invite?.usedTimes} users
                  </span>
                </div>
                <Button
                  size="sm"
                  variant="danger"
                  className="text-sm"
                  onClick={() => regenerateInvite()}
                >
                  Regenerate
                </Button>
              </div>
            </div>
          </CardBody>
        </Card>
      </GridItemEight>
    </GridLayout>
  )
}

export default ProfileSettingsForm
