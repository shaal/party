import { gql, useMutation, useQuery } from '@apollo/client'
import { Button } from '@components/UI/Button'
import { Card, CardBody } from '@components/UI/Card'
import { Form, useZodForm } from '@components/UI/Form'
import { Input } from '@components/UI/Input'
import { ProgressBar } from '@components/UI/ProgressBar'
import { Spinner } from '@components/UI/Spinner'
import { TextArea } from '@components/UI/TextArea'
import { PROFILE_SETTINGS_QUERY } from '@components/User/Settings/Profile'
import { ProfileSettingsQuery } from '@components/User/Settings/Profile/__generated__/index.generated'
import {
  ArrowCircleRightIcon,
  ArrowLeftIcon,
  CheckCircleIcon
} from '@heroicons/react/outline'
import Link from 'next/link'
import React from 'react'
import toast from 'react-hot-toast'
import { object, string } from 'zod'

import {
  OnboardingProfileSettingsMutation,
  OnboardingProfileSettingsMutationVariables
} from './__generated__/Profile.generated'

const editProfileSchema = object({
  name: string()
    .min(2, { message: '👤 Name should atleast have 2 characters' })
    .max(50, { message: '👤 Name should be within 50 characters' }),
  bio: string()
    .max(190, { message: '👤 Bio should not exceed 190 characters' })
    .nullable(),
  location: string()
    .max(50, { message: '📍 Location should not exceed 50 characters' })
    .nullable()
})

const Profile: React.FC = () => {
  const { data, loading } = useQuery<ProfileSettingsQuery>(
    PROFILE_SETTINGS_QUERY
  )
  const [editUser] = useMutation<
    OnboardingProfileSettingsMutation,
    OnboardingProfileSettingsMutationVariables
  >(
    gql`
      mutation OnboardingProfileSettingsMutation($input: EditUserInput!) {
        editUser(input: $input) {
          id
        }
      }
    `,
    {
      onError(error) {
        toast.error(error.message)
      },
      onCompleted() {
        toast.success('Profile updated successfully!')
      }
    }
  )

  const currentUser = data?.me

  const form = useZodForm({
    schema: editProfileSchema,
    defaultValues: {
      name: currentUser?.profile?.name,
      bio: currentUser?.profile?.bio as string,
      location: currentUser?.profile?.location as string
    }
  })

  return (
    <div className="onboarding-bg page-center">
      <Card className="w-full sm:max-w-xl border-2 shadow-lg">
        <CardBody className="linkify space-y-2">
          <div className="flex items-center mb-5 space-x-5">
            <Link href="/onboarding/topics" passHref>
              <Button
                className="mx-auto rounded-full"
                size="lg"
                variant="secondary"
                icon={<ArrowLeftIcon className="h-4 w-4" />}
                outline
              />
            </Link>
            <ProgressBar percentage={50} />
            <Link href="/onboarding/follow" passHref>
              <Button
                className="mx-auto"
                icon={<ArrowCircleRightIcon className="h-4 w-4" />}
              >
                Continue
              </Button>
            </Link>
          </div>
          <div className="space-y-1">
            <div className="text-2xl font-bold">Build your profile</div>
            <div className="text-gray-500">
              Tell us a little bit about yourself — this is how others will see
              you on Devparty. You’ll always be able to edit this later in your
              Settings.
            </div>
          </div>
          <div className="pt-5 max-h-[50vh] overflow-y-auto">
            {loading ? (
              <div className="p-3 font-bold text-center space-y-2">
                <Spinner size="md" className="mx-auto" />
                <div>Get ready to build your profile!</div>
              </div>
            ) : (
              <Form
                form={form}
                className="space-y-4"
                onSubmit={({ name, bio, location }) =>
                  editUser({
                    variables: {
                      input: {
                        username: currentUser?.username as string,
                        email: currentUser?.email as string,
                        name,
                        bio: bio as string,
                        location: location as string,
                        avatar: currentUser?.profile?.avatar as string,
                        cover: currentUser?.profile?.cover as string
                      }
                    }
                  })
                }
              >
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
                <div className="ml-auto">
                  <Button
                    type="submit"
                    icon={
                      form.formState.isSubmitting ? (
                        <Spinner size="xs" />
                      ) : (
                        <CheckCircleIcon className="h-4 w-4" />
                      )
                    }
                  >
                    Save
                  </Button>
                </div>
              </Form>
            )}
          </div>
        </CardBody>
      </Card>
    </div>
  )
}

export default Profile
