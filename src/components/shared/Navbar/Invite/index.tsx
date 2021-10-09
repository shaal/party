import { Button } from '@components/ui/Button'
import { Modal } from '@components/ui/Modal'
import { TicketIcon } from '@heroicons/react/outline'
import mixpanel from 'mixpanel-browser'
import { useState } from 'react'

import InviteDetails from './InviteDetails'

const Invite: React.FC = () => {
  const [showModal, setShowModal] = useState<boolean>(false)
  return (
    <div>
      <Button
        className="text-xs"
        icon={<TicketIcon className="h-4 w-4" />}
        onClick={() => {
          mixpanel.track('user.invite.modal.open')
          setShowModal(!showModal)
        }}
      >
        Invite
      </Button>
      <Modal
        onClose={() => {
          mixpanel.track('user.invite.modal.close')
          setShowModal(!showModal)
        }}
        title="Your Invite Code"
        show={showModal}
      >
        <InviteDetails />
      </Modal>
    </div>
  )
}

export default Invite
