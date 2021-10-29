import { Modal } from '@components/UI/Modal'
import { useState } from 'react'
import { Nft } from 'src/__generated__/schema.generated'
import { STATIC_ASSETS } from 'src/constants'

import ViewNFT from './ViewNFT'

interface Props {
  nft: Nft
}

const NFTIcon: React.FC<Props> = ({ nft }) => {
  const [showModal, setShowModal] = useState<boolean>(false)

  return (
    <div className="!ml-auto flex">
      <button onClick={() => setShowModal(!showModal)}>
        <img
          className="h-[20px] w-[20px]"
          src={`${STATIC_ASSETS}/brands/polygon.svg`}
          alt="Polygon Logo"
        />
      </button>
      <Modal
        onClose={() => setShowModal(!showModal)}
        title="Buy NFT"
        show={showModal}
      >
        <ViewNFT nft={nft} />
      </Modal>
    </div>
  )
}

export default NFTIcon
