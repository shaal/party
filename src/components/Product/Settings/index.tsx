import { gql, useQuery } from '@apollo/client'
import { PageLoading } from '@components/ui/PageLoading'
import AppContext from '@components/utils/AppContext'
import { useRouter } from 'next/router'
import React, { useContext } from 'react'
import { Product } from 'src/__generated__/schema.generated'

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
      owner {
        id
      }
    }
  }
`

const Settings = () => {
  const router = useRouter()
  const { currentUser } = useContext(AppContext)
  const { data, loading } = useQuery<ProductSettingsQuery>(
    PRODUCT_SETTINGS_QUERY,
    {
      variables: { slug: router.query.slug },
      skip: !router.isReady
    }
  )

  if (loading) {
    return <PageLoading message="Loading settings" />
  }

  if (data?.product?.owner?.id !== currentUser?.id)
    return window.location.replace('/home')

  return <ProductSettings product={data?.product as Product} />
}

export default Settings
