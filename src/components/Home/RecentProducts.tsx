import { gql, useQuery } from '@apollo/client'
import ProductProfile from '@components/shared/ProductProfile'
import ProductProfileShimmer from '@components/shared/Shimmer/ProductProfileShimmer'
import { Card, CardBody } from '@components/UI/Card'
import { ErrorMessage } from '@components/UI/ErrorMessage'
import { CubeIcon } from '@heroicons/react/solid'
import React from 'react'
import { Product } from 'src/__generated__/schema.generated'

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

const RecentProductsCard: React.FC = ({ children }) => {
  return (
    <div className="mb-4">
      <div className="flex items-center gap-2 mb-3 lg:mb-2 px-3 lg:px-0">
        <CubeIcon className="h-4 w-4 text-green-500" />
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
  const products = data?.products?.edges?.map((edge) => edge?.node)

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
        {products?.map((product) => (
          <ProductProfile key={product?.id} product={product as Product} />
        ))}
      </div>
    </RecentProductsCard>
  )
}

export default RecentProducts
