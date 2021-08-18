import { gql, useQuery } from '@apollo/client'
import { CubeIcon } from '@heroicons/react/outline'
import Link from 'next/link'
import { useRouter } from 'next/router'
import React, { useContext } from 'react'

import { Product } from '../../__generated__/schema.generated'
import { GridItemEight, GridItemFour, GridLayout } from '../GridLayout'
import ProductProfileLarge from '../shared/ProductProfileLarge'
import PostShimmer from '../shared/Shimmer/PostShimmer'
import UserProfileShimmer from '../shared/Shimmer/UserProfileShimmer'
import { Button } from '../ui/Button'
import { Card, CardBody } from '../ui/Card'
import { ErrorMessage } from '../ui/ErrorMessage'
import AppContext from '../utils/AppContext'
import { ProductsQuery } from './__generated__/Products.generated'

export const PRODUCTS_QUERY = gql`
  query ProductsQuery {
    products {
      edges {
        node {
          id
          name
          slug
          avatar
          description
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
              <UserProfileShimmer showFollow />
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
              <ProductProfileLarge
                key={product?.node?.id}
                product={product?.node as Product}
              />
            ))}
          </CardBody>
        </Card>
      </GridItemEight>
      <GridItemFour>
        <Card>
          <CardBody className="space-y-3">
            <div>
              Launch a new product to Devparty and get noticed by peoples
            </div>
            <Link href="/products/new" passHref>
              <Button className="flex items-center space-x-1">
                <CubeIcon className="h-4 w-4" />
                <div>Create new Product</div>
              </Button>
            </Link>
          </CardBody>
        </Card>
      </GridItemFour>
    </GridLayout>
  )
}

export default Products
