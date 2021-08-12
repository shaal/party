import { gql, useQuery } from '@apollo/client'
import { useRouter } from 'next/router'
import React, { useContext } from 'react'

import { GridItemEight, GridItemFour, GridLayout } from '../GridLayout'
import PostShimmer from '../shared/Shimmer/PostShimmer'
import UserProfileLargeShimmer from '../shared/Shimmer/UserProfileLargeShimmer'
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
        <div className="space-y-5">
          <ErrorMessage title="Failed to load post" error={error} />
        </div>
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
