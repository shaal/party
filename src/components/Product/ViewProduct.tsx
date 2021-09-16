import { gql, useQuery } from '@apollo/client'
import { useRouter } from 'next/router'
import React from 'react'

import { Product } from '~/__generated__/schema.generated'
import { ErrorMessage } from '@components/ui/ErrorMessage'

import { GridItemEight, GridItemFour, GridLayout } from '../GridLayout'
import { PageLoading } from '../ui/PageLoading'
import { ProductQuery } from './__generated__/ViewProduct.generated'
import Details from './Details'
import ProductFeed from './Feed'

export const PRODUCT_QUERY = gql`
  query ProductQuery($where: WhereProductInput!) {
    product(where: $where) {
      id
      name
      slug
      avatar
      description
      website
      twitter
      producthunt
      github
      discord
      user {
        id
        username
        profile {
          id
          name
          avatar
          bio
        }
      }
    }
  }
`

const ViewProduct: React.FC = () => {
  const router = useRouter()
  const { data, loading, error } = useQuery<ProductQuery>(PRODUCT_QUERY, {
    variables: {
      where: { slug: router.query.slug }
    },
    skip: !router.isReady
  })

  if (loading) return <PageLoading message="Loading product" />

  return (
    <GridLayout>
      <GridItemFour>
        <Details product={data?.product as Product} />
      </GridItemFour>
      <GridItemEight>
        <div className="space-y-5">
          <ErrorMessage title="Failed to load post" error={error} />
          <ProductFeed product={data?.product as Product} />
        </div>
      </GridItemEight>
    </GridLayout>
  )
}

export default ViewProduct
