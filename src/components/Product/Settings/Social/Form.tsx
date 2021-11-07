import { gql, useMutation } from '@apollo/client'
import { GridItemEight, GridItemFour, GridLayout } from '@components/GridLayout'
import { Button } from '@components/UI/Button'
import { Card, CardBody } from '@components/UI/Card'
import { Form, useZodForm } from '@components/UI/Form'
import { Input } from '@components/UI/Input'
import { Spinner } from '@components/UI/Spinner'
import {
  EditProductSocialSettingsMutation,
  EditProductSocialSettingsMutationVariables,
  Product
} from '@graphql/types.generated'
import { CheckCircleIcon } from '@heroicons/react/outline'
import React from 'react'
import toast from 'react-hot-toast'
import { object, string } from 'zod'

import Sidebar from '../Sidebar'

const editSocialSchema = object({
  twitter: string()
    .max(50, { message: '👤 Username should be within 50 characters' })
    .regex(/^[a-z0-9_\.]+$/, { message: '👤 Invalid Twitter username' })
    .nullable(),
  github: string()
    .max(50, { message: '👤 Username should be within 50 characters' })
    .regex(/^[a-z0-9_\.]+$/, { message: '👤 Invalid GitHub username' })
    .nullable(),
  website: string()
    .max(100, { message: '🔗 Website url should be within 100 characters' })
    .url({ message: '🔗 Invalid URL' })
    .nullable(),
  discord: string()
    .max(100, { message: '👤 Username should be within 50 characters' })
    .url({ message: '👤 Invalid Discord url' })
    .nullable()
})

interface Props {
  product: Product
}

const SUCCESS_MESSAGE = 'Social successfully updated!'

const SocialSettingsForm: React.FC<Props> = ({ product }) => {
  const [editProductSocial] = useMutation<
    EditProductSocialSettingsMutation,
    EditProductSocialSettingsMutationVariables
  >(
    gql`
      mutation EditProductSocialSettings($input: EditProductSocialInput!) {
        editProductSocial(input: $input) {
          id
          twitter
          github
          website
          discord
        }
      }
    `,
    {
      onError(error) {
        toast.error(error.message)
      },
      onCompleted() {
        toast.success(SUCCESS_MESSAGE)
      }
    }
  )

  const form = useZodForm({
    schema: editSocialSchema,
    defaultValues: {
      twitter: product.twitter as string,
      github: product.github as string,
      website: product.website as string,
      discord: product.discord as string
    }
  })

  return (
    <GridLayout>
      <GridItemFour>
        <Sidebar slug={product?.slug as string} />
      </GridItemFour>
      <GridItemEight>
        <Card>
          <CardBody>
            <Form
              form={form}
              className="space-y-4"
              onSubmit={({ twitter, github, website, discord }) =>
                editProductSocial({
                  variables: {
                    input: {
                      id: product?.id,
                      website: website as string,
                      twitter: twitter as string,
                      github: github as string,
                      discord: discord as string
                    }
                  }
                })
              }
            >
              <Input
                label="Twitter"
                type="text"
                placeholder="minecraft"
                prefix="https://twitter.com/"
                {...form.register('twitter')}
              />
              <Input
                label="GitHub"
                type="text"
                placeholder="minecraft"
                prefix="https://github.com/"
                {...form.register('github')}
              />
              <Input
                label="Website"
                type="text"
                placeholder="https://minecraft.com"
                {...form.register('website')}
              />
              <Input
                label="Discord"
                type="text"
                placeholder="https://discord.gg/minecraft"
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
