import { gql, useQuery } from '@apollo/client'
import { CubeIcon } from '@heroicons/react/outline'
import React from 'react'

import { Product } from '~/__generated__/schema.generated'
import ProductProfile from '@components/shared/ProductProfile'
import ProductProfileShimmer from '@components/shared/Shimmer/ProductProfileShimmer'
import { Card, CardBody } from '@components/ui/Card'
import { ErrorMessage } from '@components/ui/ErrorMessage'

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

const RecentProductsCard = ({ children }: any) => {
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
      <RecentProductsCard>
        <div className="space-y-3">
          <ProductProfileShimmer />
          <ProductProfileShimmer />
          <ProductProfileShimmer />
          <ProductProfileShimmer />
          <ProductProfileShimmer />
        </div>
      </RecentProductsCard>
    )

  return (
    <RecentProductsCard>
      <ErrorMessage title="Failed to load products" error={error} />
      <div className="space-y-3">
        {data?.products?.edges?.map((product: any) => (
          <ProductProfile
            key={product?.node?.id}
            product={product?.node as Product}
          />
        ))}
      </div>
    </RecentProductsCard>
  )
}

export default RecentProducts
