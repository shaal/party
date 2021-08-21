import { gql, useMutation } from '@apollo/client'
import { Button } from '~/components/ui/Button'
import { ErrorMessage } from '~/components/ui/ErrorMessage'
import { Form, useZodForm } from '~/components/ui/Form'
import { Input } from '~/components/ui/Input'
import { SuccessMessage } from '~/components/ui/SuccessMessage'
import React from 'react'
import { object, string } from 'zod'

import { User } from '../../../../__generated__/schema.generated'
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
  user: User
}

const SocialSettingsForm: React.FC<Props> = ({ user }) => {
  const [editSocial, editSocialResult] = useMutation<
    SocialSettingsMutation,
    SocialSettingsMutationVariables
  >(gql`
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
  `)

  const form = useZodForm({
    schema: editProfileSchema,
    defaultValues: {
      website: user.profile.website as string,
      twitter: user.profile.twitter as string,
      github: user.profile.github as string,
      discord: user.profile.discord as string
    }
  })

  return (
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
        <SuccessMessage>Social successfully updated!</SuccessMessage>
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
  )
}

export default SocialSettingsForm
