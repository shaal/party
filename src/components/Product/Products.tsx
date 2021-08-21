import { gql, useQuery } from '@apollo/client'
import { CubeIcon } from '@heroicons/react/outline'
import Link from 'next/link'
import React from 'react'

import Footer from '~/components/shared/Footer'
import ProductProfileLarge from '~/components/shared/ProductProfileLarge'
import PostShimmer from '~/components/shared/Shimmer/PostShimmer'
import UserProfileShimmer from '~/components/shared/Shimmer/UserProfileShimmer'
import { Button } from '~/components/ui/Button'
import { Card, CardBody } from '~/components/ui/Card'
import { ErrorMessage } from '~/components/ui/ErrorMessage'

import { Product } from '../../__generated__/schema.generated'
import { GridItemEight, GridItemFour, GridLayout } from '../GridLayout'
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
        <Card>
          <CardBody className="space-y-6">
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
        <Footer />
      </GridItemFour>
    </GridLayout>
  )
}

export default Products
