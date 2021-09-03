import { gql, useMutation } from '@apollo/client'
import React from 'react'
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

import Sidebar from '../Sidebar'
import {
  SocialSettingsMutation,
  SocialSettingsMutationVariables
} from './__generated__/Form.generated'

const editProfileSchema = object({
  website: string().max(100).nullable(),
  twitter: string().max(50).nullable(),
  github: string().max(50).nullable(),
  discord: string().max(50).nullable()
})

interface Props {
  currentUser: User
}

const SUCCESS_MESSAGE = 'Social successfully updated!'

const IntegrationSettingsForm: React.FC<Props> = ({ currentUser }) => {
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
    schema: editProfileSchema,
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
                <Button type="submit">Save</Button>
              </div>
            </Form>
          </CardBody>
        </Card>
      </GridItemEight>
    </GridLayout>
  )
}

export default IntegrationSettingsForm
