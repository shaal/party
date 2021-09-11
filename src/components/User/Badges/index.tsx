import { gql, useQuery } from '@apollo/client'
import { Fragment, useContext, useState } from 'react'

import { User } from '~/__generated__/schema.generated'

import { Button } from '../../ui/Button'
import { Modal } from '../../ui/Modal'
import AppContext from '../../utils/AppContext'
import { UserProductsQuery } from '../__generated__/OwnedProducts.generated'
import AddBadgesModal from './AddBadgesModal'

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
  const [showAddBadgesModal, setShowBadgesModal] = useState<boolean>(false)
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
          <Fragment>
            <Button
              variant="secondary"
              outline
              onClick={() => setShowBadgesModal(!showAddBadgesModal)}
            >
              Edit
            </Button>
            {showAddBadgesModal && (
              <Modal
                onClose={() => setShowBadgesModal(!showAddBadgesModal)}
                title="Your badges"
                show={showAddBadgesModal}
              >
                <AddBadgesModal />
              </Modal>
            )}
          </Fragment>
        )}
      </div>
    </div>
  )
}

export default Badges
