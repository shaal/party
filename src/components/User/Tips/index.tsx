import Slug from '@components/shared/Slug'
import { Button } from '@components/ui/Button'
import { Modal } from '@components/ui/Modal'
import { CashIcon } from '@heroicons/react/outline'
import { useState } from 'react'
import { User } from 'src/__generated__/schema.generated'

import TipsDetails from './TipsDetails'

interface Props {
  user: User
}

const Tips: React.FC<Props> = ({ user }) => {
  const [showModal, setShowModal] = useState<boolean>(false)

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
      {showModal && (
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
          <TipsDetails user={user} />
        </Modal>
      )}
    </div>
  )
}

export default Tips
