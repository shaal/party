import { gql, useQuery } from '@apollo/client'
import Slug from '@components/shared/Slug'
import { Button } from '@components/ui/Button'
import { Modal } from '@components/ui/Modal'
import { CashIcon } from '@heroicons/react/outline'
import { useState } from 'react'
import { User } from 'src/__generated__/schema.generated'

import { UserTipsQuery } from './__generated__/index.generated'

const USER_TIPS_QUERY = gql`
  query UserTipsQuery($username: String!) {
    user(username: $username) {
      id
      tip {
        id
        cash
        paypal
        github
        buymeacoffee
        bitcoin
        ethereum
      }
    }
  }
`

interface Props {
  user: User
}

const Tips: React.FC<Props> = ({ user }) => {
  const [showModal, setShowModal] = useState<boolean>(false)
  const { data, loading } = useQuery<UserTipsQuery>(USER_TIPS_QUERY, {
    variables: { username: user?.username },
    skip: !user?.username
  })

  if (loading) return null

  return (
    <div>
      <Button
        className="text-sm"
        icon={<CashIcon className="h-4 w-4" />}
        outline
        onClick={() => setShowModal(!showModal)}
      >
        Tip
      </Button>
      <Modal
        onClose={() => setShowModal(!showModal)}
        title={
          <div className="flex items-center space-x-1.5">
            <div>Send dev tips to</div>
            <Slug slug={user?.username} prefix="@" />
          </div>
        }
        show={showModal}
      >
        <div className="p-5">
          {loading ? (
            <div>Loading dev tips...</div>
          ) : (
            <div className="font-bold">TBD</div>
          )}
        </div>
      </Modal>
    </div>
  )
}

export default Tips
