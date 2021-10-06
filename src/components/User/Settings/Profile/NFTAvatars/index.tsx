import { Button } from '@components/ui/Button'
import { Modal } from '@components/ui/Modal'
import { useState } from 'react'
import { IS_DEVELOPMENT } from 'src/constants'
import Web3 from 'web3'
import Web3Modal from 'web3modal'

import NFTAvatarsModal from './Modal'

const NFTAvatars: React.FC = () => {
  const [showNFTModal, setShowNFTModal] = useState<boolean>(false)
  const [ethAddress, setEthAddress] = useState<string>()

  const connectWallet = async () => {
    const web3Modal = new Web3Modal()
    const connection = await web3Modal.connect()
    const web3 = new Web3(connection)

    // @ts-ignore
    setEthAddress(web3?.currentProvider?.selectedAddress)
    setShowNFTModal(!showNFTModal)
  }

  return (
    <div>
      <Button type="button" className="text-xs" onClick={connectWallet}>
        From NFT
      </Button>
      <Modal
        onClose={() => setShowNFTModal(!showNFTModal)}
        title={
          <div>
            Pick avatar from OpenSea{' '}
            {IS_DEVELOPMENT && <span className="text-red-500">(Testnet)</span>}
          </div>
        }
        show={showNFTModal}
      >
        <NFTAvatarsModal ethAddress={ethAddress as string} />
      </Modal>
    </div>
  )
}

export default NFTAvatars
