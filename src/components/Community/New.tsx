import { gql, useMutation } from '@apollo/client'
import { GridItemEight, GridItemFour, GridLayout } from '@components/GridLayout'
import SettingsHelper from '@components/shared/SettingsHelper'
import { Button } from '@components/ui/Button'
import { Card, CardBody } from '@components/ui/Card'
import { ErrorMessage } from '@components/ui/ErrorMessage'
import { Form, useZodForm } from '@components/ui/Form'
import { Input } from '@components/ui/Input'
import { Spinner } from '@components/ui/Spinner'
import { TextArea } from '@components/ui/TextArea'
import { PlusIcon } from '@heroicons/react/outline'
import { useRouter } from 'next/router'
import React from 'react'
import { object, string } from 'zod'

import {
  CreateCommunityMutation,
  CreateCommunityMutationVariables
} from './__generated__/New.generated'

const newCommunitySchema = object({
  name: string()
    .min(2, { message: '🍀 Name should be atleast 2 characters' })
    .max(50, { message: '🍀 Name should not exceed 100 characters' }),
  slug: string()
    .min(2, { message: '🎭 Slug should be atleast 2 characters' })
    .max(50, { message: '🎭 Slug should not exceed 100 characters' })
    .regex(/^[a-z0-9_\.]+$/, { message: '🎭 Invalid slug' }),
  description: string()
    .max(190, { message: '🎭 Description should not exceed 190 characters' })
    .nullable()
})

const NewCommunity: React.FC = () => {
  const router = useRouter()
  const [createCommunity, createCommunityResult] = useMutation<
    CreateCommunityMutation,
    CreateCommunityMutationVariables
  >(
    gql`
      mutation CreateCommunityMutation($input: CreateCommunityInput!) {
        createCommunity(input: $input) {
          id
          slug
          description
        }
      }
    `,
    {
      onCompleted(data) {
        router.push(`/products/${data?.createCommunity?.slug}`)
      }
    }
  )

  const form = useZodForm({
    schema: newCommunitySchema
  })

  return (
    <GridLayout>
      <GridItemFour>
        <SettingsHelper
          heading="New Community"
          description="Launch your dream community in Devparty"
        />
      </GridItemFour>
      <GridItemEight>
        <Card className="space-y-5">
          <CardBody className="space-y-4">
            <Form
              form={form}
              className="space-y-4"
              onSubmit={({ name, slug, description }) =>
                createCommunity({
                  variables: {
                    input: {
                      name,
                      slug,
                      description
                    }
                  }
                })
              }
            >
              <ErrorMessage
                title="Error creating community"
                error={createCommunityResult.error}
              />
              <Input
                label="Product name"
                type="text"
                placeholder="Minecraft"
                {...form.register('name')}
              />
              <Input
                label="Slug"
                type="text"
                placeholder="minecraft"
                prefix="https://devparty.io/communities/"
                {...form.register('slug')}
              />
              <TextArea
                label="Bio"
                placeholder="Tell us what you made!"
                {...form.register('description')}
              />
              <div className="ml-auto">
                <Button
                  type="submit"
                  icon={
                    form.formState.isSubmitting ? (
                      <Spinner size="xs" />
                    ) : (
                      <PlusIcon className="h-4 w-4" />
                    )
                  }
                >
                  Create
                </Button>
              </div>
            </Form>
          </CardBody>
        </Card>
      </GridItemEight>
    </GridLayout>
  )
}

export default NewCommunity
