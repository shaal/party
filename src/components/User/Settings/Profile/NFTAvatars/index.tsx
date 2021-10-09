import { Button } from '@components/ui/Button'
import { Modal } from '@components/ui/Modal'
import mixpanel from 'mixpanel-browser'
import { useState } from 'react'
import { IS_DEVELOPMENT } from 'src/constants'

import NFTAvatarsModal from './Modal'

interface Props {
  ethAddress: string
}

const NFTAvatars: React.FC<Props> = ({ ethAddress }) => {
  const [showNFTModal, setShowNFTModal] = useState<boolean>(false)

  return (
    <div>
      <Button
        type="button"
        className="text-xs"
        onClick={() => {
          mixpanel.track('user.profile.nft_avatars.modal.open')
          setShowNFTModal(!showNFTModal)
        }}
      >
        From NFT
      </Button>
      <Modal
        onClose={() => {
          mixpanel.track('user.profile.nft_avatars.modal.close')
          setShowNFTModal(!showNFTModal)
        }}
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
