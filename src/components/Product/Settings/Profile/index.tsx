import { gql, useQuery } from '@apollo/client'
import { PageLoading } from '@components/UI/PageLoading'
import AppContext from '@components/utils/AppContext'
import { GetProductSettingsQuery, Product } from '@graphql/types.generated'
import { useRouter } from 'next/router'
import React, { useContext } from 'react'

import ProductSettingsForm from './Form'

export const PRODUCT_SETTINGS_QUERY = gql`
  query GetProductSettings($slug: String!) {
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

const ProductSettings = () => {
  const router = useRouter()
  const { currentUser } = useContext(AppContext)
  const { data, loading } = useQuery<GetProductSettingsQuery>(
    PRODUCT_SETTINGS_QUERY,
    {
      variables: { slug: router.query.slug },
      skip: !router.isReady
    }
  )
  const product = data?.product

  if (loading) {
    return <PageLoading message="Loading settings" />
  }

  if (product?.owner?.id !== currentUser?.id)
    return window.location.replace('/home')

  return <ProductSettingsForm product={product as Product} />
}

export default ProductSettings
