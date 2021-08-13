import { gql, useQuery } from '@apollo/client'
import { useRouter } from 'next/router'
import React from 'react'

import { GridItemEight, GridItemFour, GridLayout } from '../GridLayout'
import { Card, CardBody } from '../ui/Card'
import { ErrorMessage } from '../ui/ErrorMessage'
import { ProductQuery } from './__generated__/Product.generated'

export const PRODUCT_QUERY = gql`
  query ProductQuery($id: ID!) {
    product(id: $id) {
      id
      name
      slug
      avatar
      description
    }
  }
`

const Product: React.FC = () => {
  const router = useRouter()
  const { data, loading, error } = useQuery<ProductQuery>(PRODUCT_QUERY, {
    variables: {
      slug: router.query.slug
    },
    skip: !router.isReady
  })

  if (loading) return <GridLayout>Loading</GridLayout>

  return (
    <GridLayout>
      <GridItemFour>
        <Card>
          <CardBody>WIP</CardBody>
        </Card>
      </GridItemFour>
      <GridItemEight>
        <div className="space-y-5">
          <ErrorMessage title="Failed to load post" error={error} />
          {data?.product?.name}
        </div>
      </GridItemEight>
    </GridLayout>
  )
}

export default Product
