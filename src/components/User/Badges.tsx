import { gql, useQuery } from '@apollo/client'
import { PlusIcon } from '@heroicons/react/outline'
import { useContext } from 'react'

import { User } from '~/__generated__/schema.generated'

import { Button } from '../ui/Button'
import AppContext from '../utils/AppContext'
import { UserProductsQuery } from './__generated__/OwnedProducts.generated'

export const USER_PRODUCTS_QUERY = gql`
  query UserProductsQuery($where: WhereProductsInput) {
    products(where: $where) {
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
`

interface Props {
  user: User
}

const Badges: React.FC<Props> = ({ user }) => {
  const { currentUser } = useContext(AppContext)
  const { data, loading } = useQuery<UserProductsQuery>(USER_PRODUCTS_QUERY, {
    variables: {
      where: { userId: user?.id }
    }
  })

  return (
    <div className="space-y-2">
      <div className="font-bold">Badges</div>
      <div>
        {currentUser?.id === user?.id && (
          <Button variant="secondary" outline>
            <PlusIcon className="h-5 w-5" />
          </Button>
        )}
      </div>
    </div>
  )
}

export default Badges
