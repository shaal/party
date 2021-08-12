import { gql, useQuery } from '@apollo/client'
import { useRouter } from 'next/router'
import React, { useContext } from 'react'

import { Product } from '../../__generated__/schema.generated'
import { GridItemEight, GridItemFour, GridLayout } from '../GridLayout'
import ProductProfile from '../shared/ProductProfile'
import PostShimmer from '../shared/Shimmer/PostShimmer'
import UserProfileLargeShimmer from '../shared/Shimmer/UserProfileShimmer'
import { Button } from '../ui/Button'
import { Card, CardBody } from '../ui/Card'
import { ErrorMessage } from '../ui/ErrorMessage'
import AppContext from '../utils/AppContext'
import { ProductsQuery } from './__generated__/index.generated'

export const PRODUCTS_QUERY = gql`
  query ProductsQuery {
    products {
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

const Products: React.FC = () => {
  const router = useRouter()
  const { currentUser } = useContext(AppContext)
  const { data, loading, error } = useQuery<ProductsQuery>(PRODUCTS_QUERY)

  if (loading)
    return (
      <GridLayout>
        <GridItemEight>
          <PostShimmer />
        </GridItemEight>
        <GridItemFour>
          <Card>
            <CardBody>
              <UserProfileLargeShimmer showFollow />
            </CardBody>
          </Card>
        </GridItemFour>
      </GridLayout>
    )

  return (
    <GridLayout>
      <GridItemEight>
        <Card className="space-y-5">
          <CardBody className="space-y-4">
            <ErrorMessage title="Failed to load post" error={error} />
            {data?.products?.edges?.map((product: any) => (
              <ProductProfile
                key={product?.node?.id}
                product={product?.node as Product}
              />
            ))}
          </CardBody>
        </Card>
      </GridItemEight>
      <GridItemFour>
        <Card>
          <CardBody>
            <Button>Create new Product</Button>
          </CardBody>
        </Card>
      </GridItemFour>
    </GridLayout>
  )
}

export default Products
