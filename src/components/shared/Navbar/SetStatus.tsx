import { Modal } from '@components/UI/Modal'

interface Props {
  showStatusModal: boolean
  setShowStatusModal: React.Dispatch<React.SetStateAction<boolean>>
}

const SetStatus: React.FC<Props> = ({
  showStatusModal,
  setShowStatusModal
}) => {
  return (
    <Modal
      onClose={() => setShowStatusModal(!showStatusModal)}
      title="Your Invite Code"
      show={showStatusModal}
    >
      WIP
    </Modal>
  )
}

export default SetStatus
