import { gql, useQuery } from '@apollo/client'
import Link from 'next/link'

import { User } from '~/__generated__/schema.generated'

import { UserProductsQuery } from './__generated__/OwnedProducts.generated'

export const USER_PRODUCTS_QUERY = gql`
  query UserProductsQuery($where: WhereProductsInput) {
    products(where: $where) {
      edges {
        node {
          id
          slug
          avatar
        }
      }
    }
  }
`

interface Props {
  user: User
}

const OwnedProducts: React.FC<Props> = ({ user }) => {
  const { data, loading } = useQuery<UserProductsQuery>(USER_PRODUCTS_QUERY, {
    variables: {
      where: { userId: user?.id }
    }
  })

  const Product = ({ product }: any) => {
    return (
      <Link href={`/products/${product?.slug}`} passHref>
        <img
          className="h-9 w-9 rounded-lg cursor-pointer"
          src={product?.avatar}
          alt={`#${product?.slug}'s avatar`}
        />
      </Link>
    )
  }

  if (loading)
    return (
      <div className="space-y-2">
        <div className="font-bold">Products</div>
        <div className="flex flex-wrap gap-1.5 w-3/4">
          <div className="shimmer h-9 w-9 rounded-lg"></div>
          <div className="shimmer h-9 w-9 rounded-lg"></div>
          <div className="shimmer h-9 w-9 rounded-lg"></div>
        </div>
      </div>
    )

  return (
    <div className="space-y-2">
      {data?.products?.edges?.length !== 0 && (
        <div className="font-bold">Products</div>
      )}
      <div className="flex flex-wrap gap-1.5 w-3/4">
        {data?.products?.edges?.map((product: any) => (
          <Product product={product?.node} key={product?.node?.id} />
        ))}
      </div>
    </div>
  )
}

export default OwnedProducts
