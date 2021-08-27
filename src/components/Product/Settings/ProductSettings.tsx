import { gql, useMutation } from '@apollo/client'
import Link from 'next/link'
import React, { useEffect, useState } from 'react'
import toast from 'react-hot-toast'
import { object, string } from 'zod'

import { Product } from '~/__generated__/schema.generated'
import {
  GridItemEight,
  GridItemFour,
  GridLayout
} from '~/components/GridLayout'
import SettingsHelper from '~/components/shared/SettingsHelper'
import { Button } from '~/components/ui/Button'
import { Card, CardBody } from '~/components/ui/Card'
import { ErrorMessage } from '~/components/ui/ErrorMessage'
import { Form, useZodForm } from '~/components/ui/Form'
import { Input } from '~/components/ui/Input'
import { SuccessMessage } from '~/components/ui/SuccessMessage'
import { uploadToIPFS } from '~/components/utils/uploadToIPFS'

import {
  ProductSettingsMutation,
  ProductSettingsMutationVariables
} from './__generated__/ProductSettings.generated'

const editProductSchema = object({
  slug: string().min(1),
  name: string().min(1)
})

interface Props {
  product: Product
}

const SUCCESS_MESSAGE = 'Product successfully updated!'

const ProductSettings: React.FC<Props> = ({ product }) => {
  const [avatar, setAvatar] = useState<string>()
  const [editProduct, editProductResult] = useMutation<
    ProductSettingsMutation,
    ProductSettingsMutationVariables
  >(
    gql`
      mutation ProductSettingsMutation($input: EditProductInput!) {
        editProduct(input: $input) {
          id
          slug
          name
        }
      }
    `,
    {
      onCompleted() {
        toast.success(SUCCESS_MESSAGE)
      }
    }
  )

  useEffect(() => {
    if (product?.avatar) setAvatar(product?.avatar)
  }, [product])

  const handleUpload = async (evt: any) => {
    evt.preventDefault()
    // setLoading({ type, status: true })

    try {
      const attachment = await uploadToIPFS(evt.target.files)
      setAvatar(attachment.url)
    } finally {
      // setLoading({ type, status: false })
    }
  }

  const form = useZodForm({
    schema: editProductSchema,
    defaultValues: {
      slug: product?.slug,
      name: product?.name
    }
  })

  return (
    <GridLayout>
      <GridItemFour>
        <SettingsHelper
          heading="Product settings"
          description={'Update your product information and identities.'}
        />
      </GridItemFour>
      <GridItemEight>
        <Card>
          <CardBody>
            <Form
              form={form}
              className="space-y-4"
              onSubmit={({ slug, name }) =>
                editProduct({
                  variables: {
                    input: {
                      id: product?.id,
                      slug,
                      name,
                      avatar: avatar as string
                    }
                  }
                })
              }
            >
              <ErrorMessage
                title="Error updating profile"
                error={editProductResult.error}
              />
              {editProductResult.data && (
                <SuccessMessage>{SUCCESS_MESSAGE}</SuccessMessage>
              )}
              <Input label="ID" type="text" value={product?.id} disabled />
              <Input
                label="Slug"
                type="text"
                placeholder="minecraft"
                {...form.register('slug')}
              />
              <Input
                label="Name"
                type="text"
                placeholder="John Doe"
                {...form.register('name')}
              />
              <div className="space-y-1.5">
                <label>Avatar</label>
                <div className="flex items-center gap-3">
                  <img
                    className="rounded-full h-24 w-24"
                    src={avatar}
                    alt={avatar}
                  />
                  <input type="file" onChange={(evt) => handleUpload(evt)} />
                </div>
              </div>
              <div className="flex items-center justify-between pt-3">
                <Link href="/settings/password">Change password?</Link>
                <Button type="submit">Save</Button>
              </div>
            </Form>
          </CardBody>
        </Card>
      </GridItemEight>
    </GridLayout>
  )
}

export default ProductSettings
