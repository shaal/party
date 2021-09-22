import { gql, useMutation } from '@apollo/client'
import { GridItemEight, GridItemFour, GridLayout } from '@components/GridLayout'
import { Button } from '@components/ui/Button'
import { Card, CardBody } from '@components/ui/Card'
import { ErrorMessage } from '@components/ui/ErrorMessage'
import { Form, useZodForm } from '@components/ui/Form'
import { Input } from '@components/ui/Input'
import { Spinner } from '@components/ui/Spinner'
import { SuccessMessage } from '@components/ui/SuccessMessage'
import { CheckCircleIcon } from '@heroicons/react/outline'
import React from 'react'
import toast from 'react-hot-toast'
import { User } from 'src/__generated__/schema.generated'
import { object, string } from 'zod'

import Sidebar from '../Sidebar'
import {
  SocialSettingsMutation,
  SocialSettingsMutationVariables
} from './__generated__/Form.generated'

const editSocialSchema = object({
  website: string()
    .max(100, { message: '🔗 Website url should be within 30 characters' })
    .url({ message: '🔗 Invalid URL' })
    .nullable(),
  twitter: string()
    .max(50, { message: '👤 Username should be within 50 characters' })
    .regex(/^[a-z0-9_\.]+$/, { message: '👤 Invalid Twitter username' })
    .nullable(),
  github: string()
    .max(50, { message: '👤 Username should be within 50 characters' })
    .regex(/^[a-z0-9_\.]+$/, { message: '👤 Invalid GitHub username' })
    .nullable(),
  discord: string()
    .max(50, { message: '👤 Username should be within 50 characters' })
    .regex(/^[a-z0-9_\.]+$/, { message: '👤 Invalid Discord username' })
    .nullable()
})

interface Props {
  currentUser: User
}

const SUCCESS_MESSAGE = 'Social successfully updated!'

const SocialSettingsForm: React.FC<Props> = ({ currentUser }) => {
  const [editSocial, editSocialResult] = useMutation<
    SocialSettingsMutation,
    SocialSettingsMutationVariables
  >(
    gql`
      mutation SocialSettingsMutation($input: EditSocialInput!) {
        editSocial(input: $input) {
          profile {
            id
            website
            twitter
            github
            discord
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

  const form = useZodForm({
    schema: editSocialSchema,
    defaultValues: {
      website: currentUser.profile.website as string,
      twitter: currentUser.profile.twitter as string,
      github: currentUser.profile.github as string,
      discord: currentUser.profile.discord as string
    }
  })

  return (
    <GridLayout>
      <GridItemFour>
        <Sidebar />
      </GridItemFour>
      <GridItemEight>
        <Card>
          <CardBody>
            <Form
              form={form}
              className="space-y-4"
              onSubmit={({ website, twitter, github, discord }) =>
                editSocial({
                  variables: {
                    input: {
                      website: website as string,
                      twitter: twitter as string,
                      github: github as string,
                      discord: discord as string
                    }
                  }
                })
              }
            >
              <ErrorMessage
                title="Error updating social"
                error={editSocialResult.error}
              />
              {editSocialResult.data && (
                <SuccessMessage>{SUCCESS_MESSAGE}</SuccessMessage>
              )}
              <Input
                label="Website"
                type="text"
                placeholder="https://johndoe.com"
                {...form.register('website')}
              />
              <Input
                label="Twitter"
                type="text"
                placeholder="johndoe"
                {...form.register('twitter')}
              />
              <Input
                label="GitHub"
                type="text"
                placeholder="johndoe"
                {...form.register('github')}
              />
              <Input
                label="Discord"
                type="text"
                placeholder="Johndoe#1998"
                {...form.register('discord')}
              />
              <div className="ml-auto pt-3">
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
          </CardBody>
        </Card>
      </GridItemEight>
    </GridLayout>
  )
}

export default SocialSettingsForm
