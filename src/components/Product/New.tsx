import { gql, useMutation } from '@apollo/client'
import { Button } from '~/components/ui/Button'
import { Card, CardBody } from '~/components/ui/Card'
import { ErrorMessage } from '~/components/ui/ErrorMessage'
import { Form, useZodForm } from '~/components/ui/Form'
import { Input } from '~/components/ui/Input'
import { TextArea } from '~/components/ui/TextArea'
import { useRouter } from 'next/router'
import React from 'react'
import { object, string } from 'zod'

import { GridItemEight, GridItemFour, GridLayout } from '../GridLayout'
import SettingsHelper from '../shared/SettingsHelper'
import {
  CreateProductMutation,
  CreateProductMutationVariables
} from './__generated__/New.generated'

const newProductSchema = object({
  name: string().min(1),
  slug: string().min(1), // TODO: Don't allow space
  description: string().max(255)
})

const NewProduct: React.FC = () => {
  const router = useRouter()
  const [createProduct, createProductResult] = useMutation<
    CreateProductMutation,
    CreateProductMutationVariables
  >(
    gql`
      mutation CreateProductMutation($input: CreateProductInput!) {
        createProduct(input: $input) {
          id
          slug
          description
        }
      }
    `,
    {
      onCompleted(data) {
        router.push(`/products/${data?.createProduct?.slug}`)
      }
    }
  )

  const form = useZodForm({
    schema: newProductSchema
  })

  return (
    <GridLayout>
      <GridItemFour>
        <SettingsHelper
          heading="New Product"
          description="Launch your dream product in Devparty"
        />
      </GridItemFour>
      <GridItemEight>
        <Card className="space-y-5">
          <CardBody className="space-y-4">
            <Form
              form={form}
              className="space-y-4"
              onSubmit={({ name, slug, description }) =>
                createProduct({
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
                title="Error creating product"
                error={createProductResult.error}
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
                {...form.register('slug')}
              />
              <TextArea
                label="Bio"
                placeholder="Tell us what you made!"
                {...form.register('description')}
              />
              <div className="ml-auto">
                <Button type="submit">Create</Button>
              </div>
            </Form>
          </CardBody>
        </Card>
      </GridItemEight>
    </GridLayout>
  )
}

export default NewProduct
