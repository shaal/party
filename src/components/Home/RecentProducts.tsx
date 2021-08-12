import { gql, useQuery } from '@apollo/client'
import { CubeIcon } from '@heroicons/react/outline'
import React from 'react'

import { Product } from '../../__generated__/schema.generated'
import ProductProfileLarge from '../shared/ProductProfileLarge'
import ProductProfileLargeShimmer from '../shared/Shimmer/ProductProfileLargeShimmer'
import { Card, CardBody } from '../ui/Card'
import { ErrorMessage } from '../ui/ErrorMessage'
import { RecentProductsQuery } from './__generated__/RecentProducts.generated'

export const RECENT_PRODUCTS_QUERY = gql`
  query RecentProductsQuery {
    products(first: 5) {
      edges {
        node {
          id
          name
          slug
          avatar
        }
      }
    }
  }
`

const RecentUsersCard = ({ children }: any) => {
  return (
    <div className="mb-4">
      <div className="mb-2 flex items-center gap-2">
        <CubeIcon className="h-4 w-4" />
        <div>Recent products</div>
      </div>
      <Card>
        <CardBody>{children}</CardBody>
      </Card>
    </div>
  )
}

const RecentProducts: React.FC = () => {
  const { data, loading, error } = useQuery<RecentProductsQuery>(
    RECENT_PRODUCTS_QUERY
  )

  if (loading)
    return (
      <RecentUsersCard>
        <div className="space-y-3">
          <ProductProfileLargeShimmer />
          <ProductProfileLargeShimmer />
          <ProductProfileLargeShimmer />
          <ProductProfileLargeShimmer />
          <ProductProfileLargeShimmer />
        </div>
      </RecentUsersCard>
    )

  return (
    <RecentUsersCard>
      <ErrorMessage title="Failed to load posts" error={error} />
      <div className="space-y-3">
        {data?.products?.edges?.map((product: any) => (
          <ProductProfileLarge
            key={product?.node?.id}
            product={product?.node as Product}
          />
        ))}
      </div>
    </RecentUsersCard>
  )
}

export default RecentProducts
