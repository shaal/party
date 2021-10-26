import { Button } from '@components/UI/Button'
import { Card, CardBody } from '@components/UI/Card'
import { Modal } from '@components/UI/Modal'
import { FingerPrintIcon } from '@heroicons/react/outline'
import { useState } from 'react'

import Mint from './Mint'

const MintNFT: React.FC = () => {
  const [showModal, setShowModal] = useState<boolean>(false)
  return (
    <Card>
      <CardBody className="space-y-3">
        <div>Mint this post as NFT gas-free in Polygon network</div>
        <Button
          icon={<FingerPrintIcon className="h-4 w-4" />}
          onClick={() => setShowModal(!showModal)}
        >
          Mint NFT
        </Button>
        <Modal
          onClose={() => setShowModal(!showModal)}
          title="NFT Settings"
          show={showModal}
        >
          <Mint />
        </Modal>
      </CardBody>
    </Card>
  )
}

export default MintNFT
