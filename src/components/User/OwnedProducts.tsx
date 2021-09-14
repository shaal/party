import { gql, useQuery } from '@apollo/client'
import Link from 'next/link'

import { User } from '~/__generated__/schema.generated'

import { Tooltip } from '../ui/Tooltip'
import { UserProductsQuery } from './__generated__/OwnedProducts.generated'

export const USER_PRODUCTS_QUERY = gql`
  query UserProductsQuery($username: ID!) {
    user(username: $username) {
      products {
        edges {
          node {
            id
            slug
            name
            avatar
          }
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
    variables: { username: user?.username }
  })
  const products = data?.user?.products?.edges?.map((edge) => edge?.node)

  const Product = ({ product }: any) => {
    return (
      <Tooltip content={product?.name}>
        <Link href={`/products/${product?.slug}`} passHref>
          <a>
            <img
              className="h-9 w-9 rounded-lg"
              src={product?.avatar}
              alt={`#${product?.slug}'s avatar`}
            />
          </a>
        </Link>
      </Tooltip>
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
      {products?.length !== 0 && <div className="font-bold">Products</div>}
      <div className="flex flex-wrap gap-1.5 w-3/4">
        {products?.map((product: any) => (
          <Product product={product?.node} key={product?.node?.id} />
        ))}
      </div>
    </div>
  )
}

export default OwnedProducts
