import { gql, useQuery } from '@apollo/client'
import { useRouter } from 'next/router'
import React, { Fragment } from 'react'

import { Product } from '~/__generated__/schema.generated'
import { PageLoading } from '~/components/ui/PageLoading'

import { ProductSettingsQuery } from './__generated__/index.generated'
import ProductSettings from './ProductSettings'

export const PRODUCT_SETTINGS_QUERY = gql`
  query ProductSettingsQuery($slug: String!) {
    product(slug: $slug) {
      id
      slug
      name
      description
      avatar
    }
  }
`

const Settings: React.FC = () => {
  const router = useRouter()
  const { data, loading } = useQuery<ProductSettingsQuery>(
    PRODUCT_SETTINGS_QUERY,
    {
      variables: {
        slug: router.query.slug
      },
      skip: !router.isReady
    }
  )

  if (loading) {
    return <PageLoading message="Loading settings..." />
  }

  return (
    <Fragment>
      <ProductSettings product={data?.product as Product} />
    </Fragment>
  )
}

export default Settings
